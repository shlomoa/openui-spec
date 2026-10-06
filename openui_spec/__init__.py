"""OpenUI specification tooling: the comparison API of the `openui-spec` package.

`compare(reference, new)` is the supported entry point; its output contract is
specified in `spec/tooling/comparison.md`. `__version__` is the version of the
installed `openui-spec` package, which is the OpenUI spec version it implements
(see `RELEASING.md`).
"""

from __future__ import annotations

from importlib.metadata import PackageNotFoundError, version

from .comparison import compare

try:
    __version__ = version("openui-spec")
except PackageNotFoundError:  # running from a source checkout that is not installed
    __version__ = "0+unknown"

__all__ = ["__version__", "compare"]
