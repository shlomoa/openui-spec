# Populating Angular Generator Test Use Cases

An input workspace is an Angular Material app workspace.
These test cases will be used to demonstrate the impact (outcome) of running the generator.

## Example — From scratch

Example is in generators\angular\generator\tests\fixtures\example_from_scratch

- input_app-file-select folder contains the app-file-select.example.json file only.
- output_app-file-select contains the expected generated output given the json file.
- This is an example:
  - do not assume it represents all possible cases.
  - it assumes the spec for all the tags exists and is implemented in the generator.

## Example — Incremental

Example is in generators\angular\generator\tests\fixtures\example_incremental
- input_app-file-select folder contains an existing workspace with `app-file-upload`
  component already present, plus the `app-file-select.example.json` specification.
- output_app-file-select contains the expected workspace after incremental generation:
  both `app-file-select` (added) and `app-file-upload` (preserved) are present.
- This demonstrates the incremental reconciliation algorithm:
  - Existing components not in the JSON diff are preserved (Match).
  - New components described in the JSON are added (Add).

## Incremental generation scenarios

The generator supports four reconciliation scenarios:

| JSON | Workspace | Scenario     | Test fixture                                                 |
|:-----|:----------|:-------------|:-------------------------------------------------------------|
| Yes  | No        | Add          | `example_from_scratch/` (workspace starts empty)             |
| No   | Yes       | Delete       | (future: remove a component from JSON, verify removal)       |
| Yes  | Yes       | Match        | (re-run on same input, verify no changes)                    |
| Yes  | Yes       | Not matching | `example_incremental/` (workspace has existing content)      |

### Add scenario
- The generator creates new component files and wires them to the parent.
- Demonstrated by `example_from_scratch/`: empty workspace → full application.

### Incremental (Add to existing) scenario
- The generator adds new component while preserving existing workspace content.
- Demonstrated by `example_incremental/`: workspace with `app-file-upload` →
  workspace with both `app-file-upload` and `app-file-select`.

### Delete scenario (future)
- Removing a node from the JSON specification causes the generator to remove
  the corresponding component files and unwire parent references.

### Match scenario (future)
- Re-running the generator with an unchanged JSON specification produces no
  filesystem changes in the output workspace.


## Execution task list

1. **Inventory source example JSON files**
   - Find every `spec/examples/**/*.example.json` file.
   - Treat these files as the source examples for Angular generator test fixtures.
   - Do not include mirrored `site/examples` files.

2. **Use the Angular generator fixture root**
   - Create fixture workspaces under:
     `generators/angular/generator/tests/fixtures/`

3. **Create one fixture workspace pair per example**
   - For each `<object_name>.example.json`, create:
     - `input_<object_name>/`
     - `output_<object_name>/`
   - Example source:
     `spec/examples/Widgets/dialog.example.json`
   - Example targets:
     - `generators/angular/generator/tests/fixtures/input_dialog/`
     - `generators/angular/generator/tests/fixtures/output_dialog/`

4. **Copy each example JSON into its input fixture**
   - Copy the source example JSON to:
     `generators/angular/generator/tests/fixtures/input_<object_name>/<object_name>.example.json`
   - Preserve the original filename.
   - Keep the original `spec/examples/**/*.example.json` files in place because they
     are specification documentation examples.

5. **Create an input workspace scaffold**
   - Read the example JSON to determine the object type, title, and use case.
   - Derive required scaffold files from the use case.
   - Inside `input_<object_name>/`
     - Document the following process in a scaffold_generation.md file
     - Generate the baseline workspace using npm commands
     - Add additional structure and content using ng commands.
     - Wire everything correctly.

6. **Create output fixture placeholders**
   - copy content from the input folder to the output, for example:
     copy `generators/angular/generator/tests/fixtures/input_dialog/*` `generators/angular/generator/tests/fixtures/output_dialog/`

7. **Run the generator**
   - In the output folder run the generator given using the input example JSON as input.

8. **Add app validation tests**
   - Add validation tests to the output fixture workspace.
   - These tests should validate that the generator produced the expected results.

9. **Run the generator validation**
   - Run the generator validation tests:
     - `Push-Location generators/angular/generator`
     - `npm test`
     - `Pop-Location`

10. **Run full validation**
    - Run repository validation:
      - `./.venv/Scripts/python -m unittest discover -s tests`
      - `./.venv/Scripts/python -m ruff check .`
      - `./.venv/Scripts/python -m ruff format --check .`
      - `git diff --check`
    - Run Angular generator validation:
      - `Push-Location generators/angular/generator`
      - `npm test`
      - `Pop-Location`
