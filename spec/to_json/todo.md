# scope*.md to openui.json conversion:

- 1. Create a template.scope.md file
  - 1.1. Use formal structure for fast and robust parsing
  - 1.2. Document in spec/README.md
  - 1.3. Document the formal structure EBNF in spec/README.md
- 2. Implement a converter
  - 2.1. In folder spec/to_json, using python and the formal structure EBNF
  - 2.2. Add tests
