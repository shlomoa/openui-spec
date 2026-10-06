import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { test } from "node:test";

import { buildDataModel } from "../src/data-model/build-data-model";
import { buildElementTree } from "../src/data-model/element-model";
import { buildElementBindings } from "../src/generation/element-bindings";
import { mapToAngularProject } from "../src/generation/map-to-angular";
import { implementedTypes, renderElementTree } from "../src/generation/render-elements";
import { emptyRendering, RendererRegistry } from "../src/generation/renderer-registry";
import { getLogger, LogLevel } from "../src/logging/logger";
import { createCatalogIndex } from "../src/spec/catalog-index";

const ANGULAR_GENERATOR_ROOT =
  path.basename(path.dirname(__dirname)) === "dist"
    ? path.resolve(__dirname, "..", "..")
    : path.resolve(__dirname, "..");
const REPOSITORY_ROOT = path.resolve(ANGULAR_GENERATOR_ROOT, "..", "..", "..");
const FIXTURES = path.join(ANGULAR_GENERATOR_ROOT, "tests", "fixtures");

async function loadFixture(name: string, file: string) {
  return buildElementTree(JSON.parse(await readFile(path.join(FIXTURES, name, `input_${name}`, file), "utf8")));
}

/** Routes the render logger to an array and returns it. */
function captureRenderWarnings(): string[] {
  const lines: string[] = [];
  getLogger("amcg.render", { level: LogLevel.WARNING, sink: (line) => lines.push(line) });
  return lines;
}

test("every implemented type is a known catalog type", async () => {
  const catalog = createCatalogIndex(JSON.parse(await readFile(path.join(REPOSITORY_ROOT, "spec", "openui.json"), "utf8")));

  assert.ok(implementedTypes().length > 0);
  for (const type of implementedTypes()) {
    assert.ok(catalog.hasType(type), `Renderer registered for '${type}', which is not a known OpenUI type.`);
  }
});

test("the implemented-type list is sorted and starts with Dialog", () => {
  assert.deepEqual(implementedTypes(), ["Dialog"]);
  assert.deepEqual(new RendererRegistry().register("b", () => undefined).register("a", () => undefined).types, ["a", "b"]);
});

test("a type has one renderer", () => {
  const registry = new RendererRegistry().register("Dialog", () => emptyRendering());
  assert.throws(() => registry.register("Dialog", () => emptyRendering()), /already registered for OpenUI type 'Dialog'/);
});

test("renders a dialog element as a standalone component and falls back for the rest", async () => {
  const warnings = captureRenderWarnings();
  const { rendering, unrenderedTypes } = renderElementTree(await loadFixture("dialog", "dialog.example.json"));

  assert.deepEqual(rendering.files.map((file) => file.path), [
    "src/components/app-confirm-dialog/app-confirm-dialog.component.ts",
    "src/components/app-confirm-dialog/app-confirm-dialog.component.html",
    "src/components/app-confirm-dialog/app-confirm-dialog.component.scss",
  ]);
  // The root, a lowercase `dialog` and a `Dialog` without dialog parts have no renderer output.
  assert.deepEqual(unrenderedTypes, ["Dialog", "dialog", "section", "StatusIndicator"]);
  assert.equal(warnings.length, unrenderedTypes.length);
});

test("warns once per type that has no renderer, naming the type", async () => {
  const warnings = captureRenderWarnings();
  const { rendering, unrenderedTypes } = renderElementTree(await loadFixture("table", "table.example.json"));

  assert.deepEqual(unrenderedTypes, ["Table", "table", "caption", "thead", "tr"]);
  assert.deepEqual(rendering.files, []);
  assert.equal(rendering.template, "");
  assert.equal(warnings.length, 5);
  for (const type of unrenderedTypes) {
    assert.ok(
      warnings.some((line) => line.startsWith("WARNING:amcg.render:") && line.includes(`'${type}'`)),
      `Expected a warning naming '${type}'.`,
    );
  }
});

test("a renderer owns its subtree and a registered type does not warn", async () => {
  const warnings = captureRenderWarnings();
  const registry = new RendererRegistry().register("Table", () => ({ ...emptyRendering(), template: "<table></table>" }));
  const { rendering, unrenderedTypes } = renderElementTree(await loadFixture("table", "table.example.json"), registry);

  assert.equal(rendering.template, "<table></table>");
  assert.deepEqual(unrenderedTypes, []);
  assert.deepEqual(warnings, []);
});

test("maps Uses attributes to property bindings and Produces and Behaves to event bindings", async () => {
  const table = (await loadFixture("table", "table.example.json")).children[0];
  const bindings = buildElementBindings(table);

  assert.deepEqual(bindings.attributes, [
    '(sort)="sortOrders($event)"',
    '(filter)="filterOrders($event)"',
    '(paginate)="paginateOrders($event)"',
  ]);
  assert.deepEqual(bindings.stubs, [
    "protected sortOrders($event: unknown): void {}",
    "protected filterOrders($event: unknown): void {}",
    "protected paginateOrders($event: unknown): void {}",
  ]);
});

test("passes Uses values through as typed binding expressions", () => {
  const element = buildElementTree({
    id: "x",
    type: "ActionControls",
    attrs: {
      "uses.label": '"It\'s \\"ok\\""',
      "uses.open": "isOpen",
      "uses.disabled": "false",
      "uses.items": ['"a"', "b", null],
      "uses.autofocus": null,
      "title": '"plain"',
    },
  });

  assert.deepEqual(buildElementBindings(element).attributes, [
    `[label]="'It\\'s &quot;ok&quot;'"`,
    '[open]="isOpen"',
    '[disabled]="false"',
    `[items]="['a', b, null]"`,
    "autofocus",
  ]);
});

test("emits one stub per handler and none for non-call expressions", () => {
  const element = buildElementTree({
    id: "x",
    type: "ActionControls",
    attrs: {
      "produces.activate": "save($event)",
      "behaves.confirm": "save($event)",
      "produces.change": "update('a, b', count, [1, 2])",
      "produces.close": "onClose",
      "produces.focus": "form.reset()",
      "produces.blur": null,
      "produces.empty": "reset()",
      "produces.trailing": "track(a, )",
    },
  });
  const bindings = buildElementBindings(element);

  assert.deepEqual(bindings.stubs, [
    "protected save($event: unknown): void {}",
    "protected update(argument1: unknown, argument2: unknown, argument3: unknown): void {}",
    "protected reset(): void {}",
    "protected track(argument1: unknown): void {}",
  ]);
  assert.deepEqual(bindings.attributes, [
    '(activate)="save($event)"',
    '(confirm)="save($event)"',
    `(change)="update('a, b', count, [1, 2])"`,
    '(close)="onClose"',
    '(focus)="form.reset()"',
    '(empty)="reset()"',
    '(trailing)="track(a, )"',
  ]);
});

test("merges a rendering into the page of a concrete document", async () => {
  const fixture = JSON.parse(await readFile(path.join(FIXTURES, "table", "input_table", "table.example.json"), "utf8"));
  const dataModel = buildDataModel(fixture);
  const registry = new RendererRegistry().register("table", () => {
    const rendering = emptyRendering();
    rendering.template = "<table mat-table></table>\n";
    rendering.styles = "table { width: 100%; }\n";
    rendering.imports.add("MatTableModule");
    rendering.typeImports.add("@angular/material/table", "MatTableModule");
    rendering.members.push("protected sortOrders($event: unknown): void {}");
    return rendering;
  });
  // The root `Table` has no renderer, so its child `table` is rendered.
  const [page] = mapToAngularProject(dataModel, registry).pages;

  assert.equal(page.template, "<table mat-table></table>\n");
  assert.equal(page.styles, "table { width: 100%; }\n");
  assert.ok(page.imports.includes("MatTableModule"));
  assert.ok(page.componentImports.includes("import { MatTableModule } from '@angular/material/table';"));
  assert.ok(page.members.includes("protected sortOrders($event: unknown): void {}"));
});

test("keeps the placeholder page when nothing renders a template", async () => {
  const fixture = JSON.parse(await readFile(path.join(FIXTURES, "table", "input_table", "table.example.json"), "utf8"));
  const [page] = mapToAngularProject(buildDataModel(fixture)).pages;

  assert.match(page.template, /<section class="spec-page"/);
});
