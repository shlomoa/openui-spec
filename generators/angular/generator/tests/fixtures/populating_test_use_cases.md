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
- This demonstrates the incremental reconciliation algorithm (see
  [spec/README.md § Incremental generation](../../../../../spec/README.md#incremental-generation)):
  - Existing components not in the JSON diff are preserved (Match).
  - New components described in the JSON are added (Add).

## Incremental generation scenarios

The reconciliation algorithm is defined in
[spec/README.md § Incremental generation](../../../../../spec/README.md#incremental-generation).
The following table maps scenarios to test fixtures:

| Scenario     | Test fixture                                            |
| :----------- | :------------------------------------------------------ |
| Add          | `example_from_scratch/` (workspace starts empty)        |
| Delete       | (future: remove a component from JSON, verify removal)  |
| Match        | (re-run on same input, verify no changes)               |
| Not matching | `example_incremental/` (workspace has existing content) |

## Execution task list

### Step 1 - Inventory and create input/output fixture workspaces

1.1. **Use the Angular generator fixture root**

- folder under:
  `generators/angular/generator/tests/fixtures/`

1.2. **Inventory source example JSON files**

- Find every `spec/examples/**/*.example.json` file.
- Treat these files as the source examples for Angular generator test fixtures.
- Do not include mirrored `site/examples` files.

1.3. **Create one fixture workspace pair per example discovered during inventory**

- For each `<object_name>.example.json`, create:
  - a folder named `<object_name>`
  - `<object_name>`/`input_<object_name>/`
  - `<object_name>`/`output_<object_name>/`
- Example source:
  `spec/examples/Widgets/dialog.example.json`
- Example targets:
  - `generators/angular/generator/tests/fixtures/dialog/input_dialog/`
  - `generators/angular/generator/tests/fixtures/dialog/output_dialog/`

### Step 2 - Populate input fixture workspaces

2.1. **Copy each example JSON into its input fixture**

- Copy the source example JSON to:
  `generators/angular/generator/tests/fixtures/<object_name>/input_<object_name>/<object_name>.example.json`
- Preserve the original filename.
- Keep the original `spec/examples/**/*.example.json` files in place because they
  are specification documentation examples.

### Step 3 - POC: Populate dialog input fixture workspace

3.1. **Create an input workspace scaffold - POC with dialog**

- Read the dialog example JSON to determine the object type, title, and use case.
- Derive required scaffold files from the use case.
- Inside `input_dialog`
  - Document the all scafold process stages in a scaffold_generation.md file
  - Generate the baseline workspace using npm commands
  - Add additional structure and content using ng commands.
  - Add content as required to match the dialog example JSON.
  - Wire everything correctly.

### Step 4 - Populate all input fixture workspaces

4.1. **Create an input workspace scaffold for all examples**

- Read the example JSON to determine the object type, title, and use case.
  - Use spec\scopes\evidence.md to get more information about the use case.
  - If the use case is not clear, ask the spec author for clarification, additional details and examples.
- Derive required scaffold files from the use case.
- Inside `input_<object_name>/`
  - Document the all scafold process stages in a scaffold_generation.md file
  - Generate the baseline workspace using npm commands
  - Add additional structure and content using ng commands.
  - Add content as required to match the example JSON.
  - Wire everything correctly.

### Step 5 - POC: Populate dialog output fixture workspaces

5.1. **Create output fixture placeholders**

- copy content from the input folder to the output, for example:
  copy `generators/angular/generator/tests/fixtures/dialog/input_dialog/*` `generators/angular/generator/tests/fixtures/dialog/output_dialog/`

5.2. **Add app validation tests**

- Add validation tests to the output fixture workspace.
- These tests should validate that the generator produced the expected results.

5.3. **Run the generator**

- In the output folder run the generator given using the input example JSON as input.

5.4. **Run the generator validation** - Run the generator validation tests

### Step 6 - Populate all output fixture workspaces

6.1. **Create output fixture placeholders**

- copy content from the input folder to the output, for example:
  copy `generators/angular/generator/tests/fixtures/<object_name>/input_<object_name>/*` `generators/angular/generator/tests/fixtures/<object_name>/output_<object_name>/`

6.2. **Add app validation tests**

- Add validation tests to the output fixture workspace.
- These tests should validate that the generator produced the expected results.

### Step 7 - POC: validate generator and generated workspace for dialog

7.1. **Run the generator**

- run generator in `generators/angular/generator/tests/fixtures/dialog/output_dialog/`

7.2. **Run the generator validation**

- Run generator validation tests

### Step 8 - validate generator, and generated workspaces for all examples

8.1. **Run the generator**

- run generator in `generators/angular/generator/tests/fixtures/<object_name>/output_<object_name>/`

8.2. **Run the generator validation**

- Run generator validation tests

### Step 9 - Full validation

9.1. **Run full validation** - Add the generator validation tests to the output fixture workspace. - Add the generator validation command to the repo validation recipe. - Add the generator validation command to the CI build.yml. - Run repository validation as described in [spec/README.md § Validation](../../../../../spec/README.md#validation)

### Step 10 - Maintain test fixtures

10.1. **Maintain test fixtures**

- Add test fixtures to the repo.
- Document the procedure of using and mintaining them properly.
