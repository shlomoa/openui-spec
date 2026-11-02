"""Verify that release artifacts include required repository data files."""

import sys
import tarfile
import zipfile
from pathlib import Path

REQUIRED_FILE = "SCHEMA_VERSION"


def _find_distribution(directory: Path, pattern: str) -> Path:
    distributions = sorted(directory.glob(pattern))
    if len(distributions) != 1:
        message = f"expected one {pattern} distribution in {directory}, found {len(distributions)}"
        raise ValueError(message)
    return distributions[0]


def _require_file(artifact: Path, members: list[str]) -> None:
    if not any(
        member.endswith(f"/{REQUIRED_FILE}") or member == REQUIRED_FILE for member in members
    ):
        raise ValueError(f"{artifact} does not contain {REQUIRED_FILE}")


def main() -> None:
    distribution_directory = Path("dist")
    source_distribution = _find_distribution(distribution_directory, "*.tar.gz")
    wheel = _find_distribution(distribution_directory, "*.whl")

    with tarfile.open(source_distribution, mode="r:gz") as archive:
        _require_file(source_distribution, archive.getnames())

    with zipfile.ZipFile(wheel) as archive:
        _require_file(wheel, archive.namelist())


if __name__ == "__main__":
    try:
        main()
    except ValueError as error:
        sys.exit(f"Distribution-content check failed: {error}")
