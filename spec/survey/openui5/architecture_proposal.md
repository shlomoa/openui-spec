# OpenUI5 survey: architecture proposal

[Survey README](README.md) · Sources: [overall finding](inventory/_taxonomy_findings.md#overall-finding-no-top-level-restructuring-needed), [B7_HIERARCHY_CHECK.md](inventory/B7_HIERARCHY_CHECK.md)

Status: proposal for review. The canonical tree is unchanged.

## No top-level restructuring

No new top-level category is needed, and the existing seven-way split for concrete
objects (Application, Behaviors, Containers, Controls, Pages, Views, Widgets) should
stay. All 11 clusters fit inside an existing top-level scope once checked against that
scope's own Purpose and Boundaries text. OpenUI5's SAP-specific, Fiori-flavored
vocabulary fitting a taxonomy that was not written against it is a real stress test
that the hierarchy passed.

**Watch item:** 6 of the 11 clusters land under Widgets, already the largest scope.
This is not a case for splitting Widgets today, but continued growth could create one.
