# openui5-spec

This project provides a specification for the OpenUI5 framework, Although not a fork, it is entirely based on the [OpenUI5](https://openui5.org/) as implemented in [github](https://github.com/UI5/openui5) project. The goal is to use the specification as a basis for a standard.

## Local validation

Use a repository-local Python virtual environment for validation tooling.

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install pre-commit==4.6.0
.\.venv\Scripts\python -m unittest discover -s tests -p 'test_*.py'
.\.venv\Scripts\pre-commit run --all-files
```

On macOS or Linux, use the equivalent `.venv/bin/python` and `.venv/bin/pre-commit` paths.
