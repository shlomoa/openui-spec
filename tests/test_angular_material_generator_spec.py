import json
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
ANGULAR_GENERATOR_MD = REPO_ROOT / "spec" / "24-angular-material-generator.md"
MATERIALIZATION_REPORT = REPO_ROOT / "uncompleted_spec_materilization.md"
MKDOCS_CONFIG = REPO_ROOT / "mkdocs.yml"
ANGULAR_PACKAGE_JSON = REPO_ROOT / "generators" / "angular" / "package.json"
ANGULAR_CLI = REPO_ROOT / "generators" / "angular" / "src" / "cli" / "main.ts"
ANGULAR_EMITTER = (
    REPO_ROOT
    / "generators"
    / "angular"
    / "src"
    / "targets"
    / "angular"
    / "emit-angular-project.ts"
)


class AngularMaterialGeneratorSpecTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.markdown = ANGULAR_GENERATOR_MD.read_text(encoding="utf-8")
        cls.report = MATERIALIZATION_REPORT.read_text(encoding="utf-8")
        cls.mkdocs = MKDOCS_CONFIG.read_text(encoding="utf-8")
        cls.package_json = json.loads(ANGULAR_PACKAGE_JSON.read_text(encoding="utf-8"))
        cls.cli_source = ANGULAR_CLI.read_text(encoding="utf-8")
        cls.emitter_source = ANGULAR_EMITTER.read_text(encoding="utf-8")

    def test_examples_section_documents_current_cli_workflow(self) -> None:
        self.assertIn("## Examples", self.markdown)
        self.assertIn("### Example 1 — validate `openui.json` with the current CLI", self.markdown)
        self.assertIn("### Example 2 — generate an Angular Material application", self.markdown)
        self.assertIn("### Example 3 — verify the generated output", self.markdown)

        self.assertIn("npm ci", self.markdown)
        self.assertIn("npm run build", self.markdown)
        self.assertIn(
            "node dist/src/cli/main.js validate --spec ../../openui.json --target angular",
            self.markdown,
        )
        self.assertIn(
            "node dist/src/cli/main.js generate --spec ../../openui.json --target angular --out generated-openui-angular-app",
            self.markdown,
        )

        self.assertEqual(self.package_json["bin"]["openui-angular-gen"], "dist/src/cli/main.js")
        self.assertIn('command: "generate" | "validate"', self.cli_source)
        self.assertIn('target: "angular"', self.cli_source)

    def test_examples_document_expected_generated_artifacts_and_package_pins(self) -> None:
        expected_artifacts = {
            "generated-openui-angular-app/package.json",
            "generated-openui-angular-app/angular.json",
            "generated-openui-angular-app/tsconfig.json",
            "generated-openui-angular-app/src/main.ts",
            "generated-openui-angular-app/src/app/app.component.ts",
            "generated-openui-angular-app/src/app/app.routes.ts",
            "generated-openui-angular-app/src/styles.scss",
            "generated-openui-angular-app/src/app/pages/",
        }
        for artifact in expected_artifacts:
            with self.subTest(artifact=artifact):
                self.assertIn(artifact, self.markdown)

        self.assertIn("@angular/material", self.markdown)
        self.assertIn("@angular/cdk", self.markdown)
        self.assertIn('"@angular/material": "22.0.2"', self.emitter_source)
        self.assertIn('"@angular/cdk": "22.0.2"', self.emitter_source)

    def test_examples_document_repository_local_verification(self) -> None:
        self.assertIn("Use the generator's repository-supported build and CLI workflow", self.markdown)
        self.assertIn("npm run build", self.markdown)
        self.assertIn(
            "node dist/src/cli/main.js validate --spec ../../openui.json --target angular",
            self.markdown,
        )
        self.assertIn(
            "node dist/src/cli/main.js generate --spec ../../openui.json --target angular --out generated-openui-angular-app",
            self.markdown,
        )
        self.assertIn("Generated Angular Material artifacts verified.", self.markdown)
        self.assertIn("npm install", self.markdown)
        self.assertIn("npm run build", self.markdown)

    def test_readthedocs_navigation_and_materialization_report_are_synchronized(self) -> None:
        self.assertIn("Angular Material Generator: 24-angular-material-generator.md", self.mkdocs)
        self.assertIn(
            "| Angular Material Generator      | Yes                         | No                                           | No                                             |",
            self.report,
        )
        self.assertIn("No ReadTheDocs examples action remains", self.report)


if __name__ == "__main__":
    unittest.main()