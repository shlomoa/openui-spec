import { buildUiModel } from "../ir/build-ir";
import { loadDefaultOpenUiCatalog } from "../spec/catalog-index";
import { loadOpenUiDocument } from "../spec/load-spec";
import { emitAngularProject } from "../targets/angular/emit-angular-project";
import { mapToAngularProject } from "../targets/angular/map-to-angular";
import { validateOpenUiGeneratorInput } from "../validation/validate-spec";
import type { GeneratedFile } from "../writers/file-writer";
import { applyIncrementalPlan, type ApplyResult } from "./apply";
import { buildSpecManifestationIndex } from "./classifier";
import { reconcileGeneratedFiles } from "./reconcile";
import { readWorkspaceIndex } from "./workspace-index";

/**
 * Emits the Angular project files for a validated OpenUI input document using
 * the shared generation pipeline (load → validate → build IR → map → emit).
 * Catalog scope-tree fixtures and concrete input examples both flow through
 * this path after validation selects the appropriate input mode.
 */
export async function emitAngularFilesFromInput(inputPath: string): Promise<GeneratedFile[]> {
  const input = await loadOpenUiDocument(inputPath);
  const catalog = await loadDefaultOpenUiCatalog(inputPath);
  validateOpenUiGeneratorInput(input, catalog);
  const uiModel = buildUiModel(input);
  const angularProject = mapToAngularProject(uiModel);
  return emitAngularProject(angularProject);
}

/**
 * Runs the incremental generation pipeline: emit the desired files, index the
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
export async function generateIncrementally(inputPath: string, outDirectory: string): Promise<ApplyResult> {
  const input = await loadOpenUiDocument(inputPath);
  const catalog = await loadDefaultOpenUiCatalog(inputPath);
  validateOpenUiGeneratorInput(input, catalog);

  const uiModel = buildUiModel(input);
  const angularProject = mapToAngularProject(uiModel);
  const generatedFiles = emitAngularProject(angularProject);

  const manifestationIndex = buildSpecManifestationIndex(input);
  const workspace = await readWorkspaceIndex(outDirectory);
  const plan = await reconcileGeneratedFiles(outDirectory, generatedFiles, manifestationIndex, workspace);

  return applyIncrementalPlan(outDirectory, plan);
}
