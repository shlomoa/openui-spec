import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
BUILD_WORKFLOW = REPO_ROOT / ".github" / "workflows" / "build.yml"


class GitHubActionsBuildWorkflowTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.workflow = BUILD_WORKFLOW.read_text(encoding="utf-8")

    def test_build_workflow_runs_for_code_review_events(self):
        self.assertIn("  push:\n", self.workflow)
        self.assertIn("  pull_request:\n", self.workflow)
        self.assertIn("  workflow_dispatch:\n", self.workflow)

    def test_build_workflow_runs_repository_checks(self):
        self.assertIn(
            "python -m unittest discover -s tests -p 'test_*.py'",
            self.workflow,
        )

    def test_build_workflow_installs_python_validation_tools(self):
        self.assertIn(
            "python -m pip install pre-commit==4.6.0 -r requirements-test.txt",
            self.workflow,
        )

    def test_build_workflow_runs_lint_checks(self):
        self.assertIn("pre-commit run --all-files", self.workflow)

    def test_build_workflow_runs_angular_examples_checks(self):
        self.assertIn("working-directory: generators/angular/generated-examples", self.workflow)
        self.assertIn("npm ci", self.workflow)
        self.assertIn("npm run format:check", self.workflow)
        self.assertIn("npm run lint", self.workflow)
        self.assertIn("npm test", self.workflow)
        self.assertIn("npm run build", self.workflow)

    def test_build_workflow_uses_pinned_actions(self):
        actions = re.findall(r"uses:\s+(actions/[^\s@]+)@(v[0-9]+(?:\.[0-9]+)+)", self.workflow)
        self.assertEqual(
            actions,
            [
                ("actions/checkout", "v6.0.3"),
                ("actions/setup-python", "v6.2.0"),
                ("actions/setup-node", "v6.1.0"),
            ],
        )


if __name__ == "__main__":
    unittest.main()
