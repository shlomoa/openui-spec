import { buildUiModel } from "../ir/build-ir";
import { loadOpenUiSpec } from "../spec/load-spec";
import { emitAngularProject } from "../targets/angular/emit-angular-project";
import { mapToAngularProject } from "../targets/angular/map-to-angular";
import { validateOpenUiSpec } from "../validation/validate-spec";
import type { GeneratedFile } from "../writers/file-writer";
import { applyIncrementalPlan, type ApplyResult } from "./apply";
import { buildSpecManifestationIndex } from "./classifier";
import { reconcileGeneratedFiles } from "./reconcile";
import { readWorkspaceIndex } from "./workspace-index";

/**
 * Emits the Angular project files for a validated OpenUI specification using
 * the scope-tree pipeline (load → validate → build IR → map → emit).
 */
export async function emitAngularFilesFromSpec(specPath: string): Promise<GeneratedFile[]> {
  const spec = await loadOpenUiSpec(specPath);
  validateOpenUiSpec(spec);
  const uiModel = buildUiModel(spec);
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
export async function generateIncrementally(specPath: string, outDirectory: string): Promise<ApplyResult> {
  const spec = await loadOpenUiSpec(specPath);
  validateOpenUiSpec(spec);

  const uiModel = buildUiModel(spec);
  const angularProject = mapToAngularProject(uiModel);
  const generatedFiles = emitAngularProject(angularProject);

  const manifestationIndex = buildSpecManifestationIndex(spec);
  const workspace = await readWorkspaceIndex(outDirectory);
  const plan = await reconcileGeneratedFiles(outDirectory, generatedFiles, manifestationIndex, workspace);

  return applyIncrementalPlan(outDirectory, plan);
}
