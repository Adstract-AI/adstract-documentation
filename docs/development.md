---
title: Development
description: Local SDK development and release steps.
---

This page covers development for the Python SDK in `adstract-library`.

## Setup

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -e ".[dev]"
pre-commit install
```

## Useful commands

```bash
ruff format .
ruff check .
pyright
pytest
python -m build
```

## Release checklist

1. Bump the version in `pyproject.toml`.
2. Update `CHANGELOG.md`.
3. Commit the changes.
4. Tag the release: `git tag vX.Y.Z`.
5. Push commits and tags: `git push && git push --tags`.
