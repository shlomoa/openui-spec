import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
PUBLISH_WORKFLOW = REPO_ROOT / ".github" / "workflows" / "publish.yml"


class GitHubActionsPublishWorkflowTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.workflow = PUBLISH_WORKFLOW.read_text(encoding="utf-8")

    def test_publish_workflow_runs_on_release_and_dispatch(self):
        self.assertIn("  release:\n", self.workflow)
        self.assertIn("    types: [published]\n", self.workflow)
        self.assertIn("  workflow_dispatch:\n", self.workflow)

    def test_publish_workflow_uses_least_privilege_permissions(self):
        self.assertIn("permissions:\n  contents: read\n", self.workflow)
        self.assertIn("      id-token: write\n", self.workflow)

    def test_publish_workflow_uses_pypi_environment(self):
        self.assertIn("    environment: pypi\n", self.workflow)

    def test_publish_workflow_builds_distribution(self):
        self.assertIn("python -m pip install build", self.workflow)
        self.assertIn("python -m build", self.workflow)

    def test_publish_workflow_publishes_with_trusted_publishing(self):
        self.assertIn("uses: pypa/gh-action-pypi-publish@release/v1", self.workflow)

    def test_publish_workflow_uses_pinned_actions(self):
        actions = re.findall(r"uses:\s+(actions/[^\s@]+)@(v[0-9]+(?:\.[0-9]+)+)", self.workflow)
        self.assertEqual(
            actions,
            [
                ("actions/checkout", "v6.0.3"),
                ("actions/setup-python", "v6.2.0"),
            ],
        )


if __name__ == "__main__":
    unittest.main()
