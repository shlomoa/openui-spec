import re
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
PUBLISH_NPM_WORKFLOW = REPO_ROOT / ".github" / "workflows" / "publish-npm.yml"
PUBLISH_PYPI_WORKFLOW = REPO_ROOT / ".github" / "workflows" / "publish-pypi.yml"


class GitHubActionsPublishWorkflowTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.npm_workflow = PUBLISH_NPM_WORKFLOW.read_text(encoding="utf-8")
        cls.pypi_workflow = PUBLISH_PYPI_WORKFLOW.read_text(encoding="utf-8")

    def test_publish_npm_workflow_runs_on_workflow_dispatch_with_npm_tag(self):
        self.assertIn("  workflow_dispatch:\n", self.npm_workflow)
        self.assertIn("    inputs:\n", self.npm_workflow)
        self.assertIn("      npm-tag:\n", self.npm_workflow)
        self.assertIn("        default: latest\n", self.npm_workflow)

    def test_publish_npm_workflow_uses_least_privilege_permissions(self):
        self.assertIn(
            "    permissions:\n      contents: read\n      id-token: write\n",
            self.npm_workflow,
        )

    def test_publish_npm_workflow_uses_pinned_actions(self):
        actions = re.findall(r"uses:\s+(actions/[^\s@]+)@(v[0-9]+(?:\.[0-9]+)*)", self.npm_workflow)
        self.assertEqual(
            actions,
            [
                ("actions/checkout", "v4"),
                ("actions/setup-node", "v4"),
            ],
        )

    def test_publish_npm_workflow_builds_and_tests(self):
        self.assertIn("run: npm ci", self.npm_workflow)
        self.assertIn("run: npm run build", self.npm_workflow)
        self.assertIn("run: npm test", self.npm_workflow)

    def test_publish_npm_workflow_publishes_to_npm(self):
        self.assertIn(
            'run: npm publish ./dist/openui-spec --access public --tag "${{ inputs.npm-tag }}"',
            self.npm_workflow,
        )
        self.assertIn("NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}", self.npm_workflow)
        self.assertIn("registry-url: https://registry.npmjs.org", self.npm_workflow)

    def test_publish_pypi_workflow_uses_pypi_environment(self):
        self.assertIn("    environment: pypi\n", self.pypi_workflow)

    def test_publish_pypi_workflow_builds_distribution(self):
        self.assertIn("python -m pip install build", self.pypi_workflow)
        self.assertIn("python -m build", self.pypi_workflow)

    def test_publish_pypi_workflow_publishes_with_trusted_publishing(self):
        self.assertIn("uses: pypa/gh-action-pypi-publish@release/v1", self.pypi_workflow)

    def test_publish_pypi_workflow_uses_pinned_actions(self):
        actions = re.findall(r"uses:\s+(actions/[^\s@]+)@(v[0-9]+(?:\.[0-9]+)*)", self.pypi_workflow)
        self.assertEqual(
            actions,
            [
                ("actions/checkout", "v6.0.3"),
                ("actions/setup-python", "v6.2.0"),
            ],
        )


if __name__ == "__main__":
    unittest.main()
