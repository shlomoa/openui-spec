import { buildDataModel } from "../data-model/build-data-model";
import { getLogger } from "../logging/logger";
import { loadDefaultOpenUiCatalog } from "../spec/catalog-index";
import { loadOpenUiDocument } from "../spec/load-spec";
import type { OpenUiDocument } from "../spec/openui-spec.types";
import { validateOpenUiGeneratorInput } from "../spec/validate-spec";
import { emitAngularProject } from "./emit-angular-project";
import { mapToAngularProject } from "./map-to-angular";
import type { GeneratedFile } from "../writers/file-writer";
import { applyIncrementalPlan, type ApplyResult } from "./apply";
import { buildSpecManifestationIndex } from "./classifier";
import { reconcileGeneratedFiles } from "./reconcile";
import { readWorkspaceIndex } from "./workspace-index";

const log = getLogger("amcg.generate");

export interface PreparedAngularGeneration {
  input: OpenUiDocument;
  generatedFiles: GeneratedFile[];
}

/**
 * Loads, validates, models, and emits the desired Angular files for an OpenUI
 * input without reading or mutating an output workspace.
 */
export async function prepareAngularGeneration(inputPath: string): Promise<PreparedAngularGeneration> {
  log.debug(`Loading OpenUI document from '${inputPath}'.`);
  const input = await loadOpenUiDocument(inputPath);
  const catalog = await loadDefaultOpenUiCatalog(inputPath);
  validateOpenUiGeneratorInput(input, catalog);
  log.debug(`Validated OpenUI input '${inputPath}'.`);

  const dataModel = buildDataModel(input);
  log.debug(
    `Built data model '${dataModel.name}' with ${dataModel.pages.length} page(s) and ` +
      `${(dataModel.dialogComponents ?? []).length} dialog component(s).`,
  );

  const angularProject = mapToAngularProject(dataModel);
  log.debug(
    `Mapped to Angular project '${angularProject.packageName}' with ` +
      `${angularProject.pages.length} page component(s) and ${angularProject.dialogComponents.length} dialog component(s).`,
  );

  const generatedFiles = emitAngularProject(angularProject);
  log.debug(`Prepared ${generatedFiles.length} generated file(s) for reconciliation.`);

  return { input, generatedFiles };
}

/**
 * Runs the generation pipeline: emit the desired files, index the
 * existing workspace, reconcile the two (classifying every Add / Match /
 * Modify / Delete and attributing it to its owning spec node), and apply the
 * resulting plan.
 *
 * An empty (or missing) output directory degrades to generation from scratch,
 * where every emitted file is added. A re-run against an up-to-date workspace
 * produces an all-`match` plan and writes nothing. Files previously generated
 * but no longer emitted by the specification are deleted, and any directories
 * emptied by those deletions are pruned.
 */
export async function generate(inputPath: string, outDirectory: string): Promise<ApplyResult> {
  const { input, generatedFiles } = await prepareAngularGeneration(inputPath);
  log.info(`Emitted ${generatedFiles.length} file(s); reconciling against '${outDirectory}'.`);

  const manifestationIndex = buildSpecManifestationIndex(input);
  const workspace = await readWorkspaceIndex(outDirectory);
  log.debug(`Indexed existing workspace '${outDirectory}' with ${workspace.files.size} file(s).`);

  const plan = await reconcileGeneratedFiles(outDirectory, generatedFiles, manifestationIndex, workspace);
  log.debug(
    `Reconciled plan: ${plan.toWrite.length} to write, ${plan.toDelete.length} to delete, ` +
      `${plan.reconciled.length} reconciled entr(y/ies).`,
  );

  const result = await applyIncrementalPlan(outDirectory, plan);
  log.info(`Applied incremental plan for '${outDirectory}'.`);
  log.debug(
    `Apply result: ${result.added.length} added, ${result.modified.length} modified, ` +
      `${result.deleted.length} deleted, ${result.matched.length} matched.`,
  );
  return result;
}
