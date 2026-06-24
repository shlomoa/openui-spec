# Generated Angular Material examples

Angular Material app that documents the representative components the OpenUI specification
Angular generator emits. The app is structured like the
[Angular Material Components documentation](https://material.angular.dev/components):

- A toolbar plus a side navigation list every documented component, grouped by category.
- `/components` shows the component catalog as cards.
- `/components/:id` opens a component with **API**, **Examples**, and **Styling** tabs.
  - **API** content is derived from the specification documents published to Read the Docs
    (the `spec/*.md` sources).
  - **Examples** includes more than one runnable Angular Material preview per component,
    each shown alongside its generated source.
  - **Styling** lists relevant styling guidance and the generated styles.

The previews intentionally use Angular Material components for the generated shell,
page, table, form, navigation, and action controls so the sample app reflects the
generator's expected output style.

## Development server

```bash
npm start
```

Open `http://localhost:4200/` to browse the generated component catalog.

## Validation

```bash
npm run format:check
npm run lint
npm test
npm run build
```

Use `npm run format` to apply Prettier formatting.
