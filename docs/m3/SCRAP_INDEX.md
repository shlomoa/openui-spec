# Material 3 scrap index

A lookup of what was scraped from the Material 3 sources, to answer questions without
reading the sites again. The machine-readable data is in [`data/`](data/); the reports
are [m3-terminology.md](m3-terminology.md) and [m3-components.md](m3-components.md).

## Sources and snapshots

| Source                                                                                                                                              | Snapshot                                                                             | Scraped with                                                                       | Data                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| [M3 glossary](https://m3.material.io/foundations/glossary)                                                                                          | 2026-10-11, page title `Glossary – Material Design 3`                                | `tools/scrape_glossary.js` (headless Chromium; the page is rendered by JavaScript) | [`data/glossary.json`](data/glossary.json)     |
| [Material Web `docs/components`](https://github.com/material-components/material-web/tree/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components) | commit `47adb655bd7a88c4d62e8faac2873084eed555dc`, 2026-10-07, package version 2.5.0 | `git clone --depth 1`, then `tools/parse_components.py`                            | [`data/components.json`](data/components.json) |

Curated mappings (hand-written): [`data/curated_terms.json`](data/curated_terms.json) and
[`data/curated_components.json`](data/curated_components.json). The reports are built by
`tools/build_reports.py`; see [README.md](README.md#refresh) for the commands.

Not scraped: the pages the glossary links to under `m3.material.io` (the design
articles), the Material Web `docs/theming` and `labs/` folders, and the rest of
m3.material.io.
The design-article URLs are recorded, not their content.

## Facts about the sources

- The glossary has 67 terms in one flat A–Z list. Compound terms use a prefix: `Color: …` (9 terms) and `Design tokens: …` (4). It has no images. 26 terms carry a 'Learn more' link to a page outside the glossary.
- Each glossary term has a stable anchor (a UUID); `…/glossary#<uuid>` scrolls to it. The UUID is in `glossary.json` as `anchor`.
- Material Web is `@material/web` 2.5.0, built on Lit. Its README and roadmap say it is **in maintenance mode pending new maintainers**: no new components are planned.
- `docs/components` has 20 pages, 39 documented custom elements and 2 more (`md-elevation`, `md-icon`) whose pages have no API section. Pages are written for the Material Web catalog, so they carry catalog-only comments that the parser removes.
- Components not built, per the roadmap: Autocomplete, Badge, Banner, Bottom app bar, Bottom sheet, Card, Data table, Date picker, Navigation bar, Navigation drawer, Navigation rail, Search, Segmented button, Snackbar, Time picker, Top app bar, Tooltip. Of these, Card, Navigation bar and drawer, Navigation tab, Badge and Segmented button exist as experimental code under `labs/` without a docs page.
- Every Material Web page follows one outline: intro, Types, Usage, Accessibility, Theming (CSS tokens `--md-<component>-…` that default to `--md-sys-…` system tokens), API (Properties, Methods, Events).
- Accessibility rules repeated across pages: give icon-only controls an `aria-label`; checkboxes, radios and switches are not labelled by `<label>` and need `aria-label`; disabled buttons and chips leave the tab order unless `soft-disabled`; group radios in `role=radiogroup`.

## Glossary index

Alphabetical as in the source. 'Match' is the proposal of [m3-terminology.md](m3-terminology.md).

| Term                              | Match        | Gist                                                                                                                                              | Anchor                                                                                         |
| --------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Adaptive design**               | Related      | A design approach in which the interface changes based on known user, device, or environmental conditions. Adaptive design in Material includes…  | [`277d89f3`](https://m3.material.io/foundations/glossary#277d89f3-f11e-431b-b2da-ca2eaefc5cbf) |
| **App bar**                       | Alias        | A component that displays information and actions at the top of a screen.                                                                         | [`55bc602a`](https://m3.material.io/foundations/glossary#55bc602a-0e19-464e-8d5f-7499b784add0) |
| **Banner**                        | Related      | A component displaying a prominent message and related optional actions.                                                                          | [`6b3b061d`](https://m3.material.io/foundations/glossary#6b3b061d-49da-4d8e-a869-91f802b9c57c) |
| **Bottom sheet**                  | Exact        | A component containing supplementary content that’s anchored to the bottom of the screen.                                                         | [`cba6a0d1`](https://m3.material.io/foundations/glossary#cba6a0d1-97b5-48aa-a3c7-d5c0fc3dbddf) |
| **Button**                        | Exact        | A component helping people initiate actions such as sending an email, sharing a document, or liking a post.                                       | [`4965dbd8`](https://m3.material.io/foundations/glossary#4965dbd8-dbbc-494d-9b4a-6eac24b53fc7) |
| **Card**                          | Exact        | A component containing content and actions that relate information about a subject.                                                               | [`6c0d9137`](https://m3.material.io/foundations/glossary#6c0d9137-98d2-43d7-8da7-99897685a4d1) |
| **Checkbox**                      | Exact        | A component allowing users to select one or more items from a set. Checkboxes can turn an option on or off.                                       | [`e1c36a36`](https://m3.material.io/foundations/glossary#e1c36a36-8041-4801-8c2f-0e6e80fb8c29) |
| **Chip**                          | Related      | A component for helping people enter information, make selections, filter content, or trigger actions. Chips can show multiple interactive…       | [`c512f903`](https://m3.material.io/foundations/glossary#c512f903-03b8-42c3-87b6-4d9d4e2fc204) |
| **Color: Baseline scheme**        | Gap          | The baseline scheme refers to the group of selected tones that make up the default colors values used for light and dark themes.                  | [`f458d1ce`](https://m3.material.io/foundations/glossary#f458d1ce-83e6-42c5-b355-2d684e2cbe41) |
| **Color: Dynamic color**          | Gap          | A customization feature in which a user-generated color scheme is mapped to an app’s color scheme.                                                | [`056f4cc0`](https://m3.material.io/foundations/glossary#056f4cc0-8abb-4ca0-b27b-131fe5ed63fc) |
| **Color: Extended color**         | Gap          | A color specified (in addition to key colors) in order to fill color roles for custom schemes. Extended color is a category for idiosyncratic…    | [`501638f4`](https://m3.material.io/foundations/glossary#501638f4-47c9-4fe0-9deb-7887e39b823f) |
| **Color: Key color**              | Gap          | A key color is not an extracted color–it’s a derivation of the source color. Key colors are a concept useful to understanding dynamic color, but… | [`46e55b98`](https://m3.material.io/foundations/glossary#46e55b98-057a-4a50-bebd-263efe734137) |
| **Color: Scheme**                 | Related      | Any mapping of color roles to specific tones from a tonal palette. Schemes consist of multiple color roles. A dark scheme informally describes a… | [`49df66f9`](https://m3.material.io/foundations/glossary#49df66f9-3301-4fb5-8481-aecc4513e611) |
| **Color: Source color**           | Gap          | The single color that’s extracted to define all five key colors is called a source color. While it may not be needed in code, it’s a useful…      | [`17043a03`](https://m3.material.io/foundations/glossary#17043a03-80be-4cf4-8291-f2812aaaaaf8) |
| **Color: Tonal palette**          | Gap          | A tonal palette comprises a 13-tone range that serves as the basis for mapping tones to specific roles. A tonal palette offers variations in…     | [`66a6d37f`](https://m3.material.io/foundations/glossary#66a6d37f-b69c-4ca2-80c6-385db855c3ce) |
| **Color: Tone**                   | Gap          | A grouping of tones are colors with the same hue and chroma. Informally, tone means degrees of lightness.                                         | [`acdf5f05`](https://m3.material.io/foundations/glossary#acdf5f05-34f3-4664-beaf-13086e7b5e11) |
| **Color: User-generated schemes** | Gap          | An aspect of dynamic color that describes the colors derived and applied from an individual user’s wallpaper selection or Android preset colors.  | [`fe6c9e0b`](https://m3.material.io/foundations/glossary#fe6c9e0b-c6fb-48c4-9a0f-b758e27d5728) |
| **Condition**                     | Related      | A signal that determines when and how an adaptive layout or component should adapt.                                                               | [`1531195c`](https://m3.material.io/foundations/glossary#1531195c-efe3-4c41-adba-909032f24935) |
| **Contrast**                      | Gap          | Difference between colors. For accessibility, contrast refers strictly to the difference in tone. A difference of 40 in tone guarantees a WCAG…   | [`8ef34537`](https://m3.material.io/foundations/glossary#8ef34537-74da-4c50-af56-4126287b7227) |
| **Customization**                 | Related      | A modification made to a UI reflecting an app, OEM, or individual user's visual preferences and brand. Customization can focus on individual UI…  | [`43c15edb`](https://m3.material.io/foundations/glossary#43c15edb-298b-449a-9552-3369ff3c67a3) |
| **Dark theme**                    | Narrower     | A dark theme is a low-light UI that displays mostly dark surfaces.                                                                                | [`48d5cab3`](https://m3.material.io/foundations/glossary#48d5cab3-a106-4a1f-b8a6-d8f33478ca48) |
| **Data table**                    | Alias        | A component displaying sets of data across rows and columns.                                                                                      | [`f9b7de4f`](https://m3.material.io/foundations/glossary#f9b7de4f-5694-4da5-93e8-40482093d110) |
| **Date picker**                   | Exact        | A component that lets users select a date, or a range of dates.                                                                                   | [`b421e50d`](https://m3.material.io/foundations/glossary#b421e50d-768c-4b6f-814d-e4e05131bbba) |
| **Design attribute**              | Related      | The style aspect that a design token or hard-coded value applies to, such as color or font.                                                       | [`c775040c`](https://m3.material.io/foundations/glossary#c775040c-1dbf-4824-bba8-600ffce00827) |
| **Design guidelines**             | Out of scope | Guidelines are descriptive written and illustrated docs that demonstrate usage and behavior mainly through examples. They're the long-form…       | [`ba9a0b15`](https://m3.material.io/foundations/glossary#ba9a0b15-782a-4a0a-85fc-4e32605534e3) |
| **Design specs**                  | Out of scope | Specs are annotated designs and docs that specify the values and parameters that define a component or a feature’s coded capabilities.            | [`eeb680dd`](https://m3.material.io/foundations/glossary#eeb680dd-23d8-4233-82c0-6733f8a2adfd) |
| **Design System Package (DSP)**   | Out of scope | An open-format folder structure created by Adobe to help teams share design system information across tools.                                      | [`5f9cfdd4`](https://m3.material.io/foundations/glossary#5f9cfdd4-028d-4530-8ac8-ae2a1f5ede66) |
| **Design tokens**                 | Related      | A design token represents a small, reusable design decision that’s part of a design system's visual style. Tokens replace static values with…     | [`bea414bf`](https://m3.material.io/foundations/glossary#bea414bf-cdbf-41ee-8438-c038ed85510c) |
| **Design tokens: Context**        | Gap          | The set of conditions in which tokens can point to non-default values (for example, dark theme, dense layout).                                    | [`1b50420b`](https://m3.material.io/foundations/glossary#1b50420b-edae-40b0-b12c-bd8a0ca0cbb3) |
| **Design tokens: Role**           | Homonym      | A shortened version of the system token name (for example, Secondary container color; Headline 1).                                                | [`9c8e7015`](https://m3.material.io/foundations/glossary#9c8e7015-e922-40a8-9024-c4697ac60cdc) |
| **Design tokens: Types**          | Gap          | Reference tokens: All available tokenized values. (for example, md.ref.palette.secondary200)                                                      | [`df45669e`](https://m3.material.io/foundations/glossary#df45669e-cd31-4349-a1cf-fc6eb03adc91) |
| **Design tokens: Value**          | Related      | The information defining a design attribute, either stored in a token or hard-coded.                                                              | [`002102ca`](https://m3.material.io/foundations/glossary#002102ca-3acf-4e57-a8c4-a43a47dd8807) |
| **Dialog**                        | Exact        | A component providing important prompts in a user flow. They can require an action, communicate information, or help users accomplish a task.     | [`61ea8fa6`](https://m3.material.io/foundations/glossary#61ea8fa6-bddd-4bc1-9fae-c585078a1103) |
| **Divider**                       | Exact        | A thin line that groups content in lists and layouts.                                                                                             | [`8eefb525`](https://m3.material.io/foundations/glossary#8eefb525-3d6a-4a09-ac47-3c94452ebeaa) |
| **Element**                       | Homonym      | The part of the component that a token or value applies to, such as the container or label text.                                                  | [`d437ddcb`](https://m3.material.io/foundations/glossary#d437ddcb-4328-448d-9877-3bc93a5642a9) |
| **Extended FAB**                  | Alias        | A component for helping people take primary actions. They're wider than FABs to accommodate a text label and larger target area.                  | [`7d6d8a70`](https://m3.material.io/foundations/glossary#7d6d8a70-5948-488c-a617-0d4c318f636d) |
| **Floating action button (FAB)**  | Alias        | A component representing the most important action on a screen. They put key actions within reach.                                                | [`973f85c5`](https://m3.material.io/foundations/glossary#973f85c5-552a-4cfe-8e99-958eb0bd75b4) |
| **HCT**                           | Gap          | HCT is an abbreviation of hue, chroma, tone. It’s the name of the color space that enables dynamic color. HCT is based on CAM16 hue and chroma;…  | [`0d0f4b17`](https://m3.material.io/foundations/glossary#0d0f4b17-d22b-4907-b158-19e3df127ad8) |
| **Image list**                    | Related      | A component displaying a collection of images in an organized grid.                                                                               | [`dc64d933`](https://m3.material.io/foundations/glossary#dc64d933-304e-4913-a863-b9e3b08951ac) |
| **Libraries**                     | Out of scope | Developer libraries supported by Material 3 include Android and Jetpack Compose, with in-progress support being developed for Flutter and Web.    | [`58845955`](https://m3.material.io/foundations/glossary#58845955-3907-4e16-82c1-ef38cb7ea929) |
| **List**                          | Exact        | A component comprised of continuous, vertical indexes of text or images.                                                                          | [`e8884762`](https://m3.material.io/foundations/glossary#e8884762-6c68-4ba2-adf8-352f509a7ca4) |
| **Material Components**           | Out of scope | Open-source UI elements created to help developers implement Material Design across Android, Flutter, and the web.                                | [`baf53292`](https://m3.material.io/foundations/glossary#baf53292-7b0c-4a03-902d-ff062c40a16a) |
| **Material Design**               | Out of scope | Material is an adaptable system of guidelines, components, and tools that support the best practices of user interface design. Backed by…         | [`49d47276`](https://m3.material.io/foundations/glossary#49d47276-0230-4b2c-83bd-88fc349ff808) |
| **Material Theming**              | Related      | The ability to systematically customize Material Design to better reflect your product’s brand.                                                   | [`dafe1bac`](https://m3.material.io/foundations/glossary#dafe1bac-ffaf-402e-a70d-198392f40acc) |
| **Menu**                          | Exact        | A component that displays a list of choices on a temporary surface.                                                                               | [`4478ae15`](https://m3.material.io/foundations/glossary#4478ae15-d43e-4e1e-b427-77423c4ca894) |
| **Mode**                          | Homonym      | Binary setting provided by a system to help people use the device better. Examples: Focus mode, airplane mode, and battery saver mode.            | [`21cc4a93`](https://m3.material.io/foundations/glossary#21cc4a93-3328-43e0-86ef-4cae1b0a51a5) |
| **Navigation bar**                | Exact        | A component offering a persistent and convenient way to switch between primary destinations in an app.                                            | [`3877de70`](https://m3.material.io/foundations/glossary#3877de70-4765-496d-a392-6a8ed9c87fdd) |
| **Navigation drawer**             | Exact        | A component providing ergonomic access to destinations in an app.                                                                                 | [`0c0cccb1`](https://m3.material.io/foundations/glossary#0c0cccb1-88c8-4a4d-8bb2-bc046db8f141) |
| **Navigation rail**               | Exact        | A component providing access to primary destinations in apps when using tablet and desktop screens.                                               | [`b5ccc775`](https://m3.material.io/foundations/glossary#b5ccc775-7f26-4870-8e03-27f5300a795a) |
| **Orbiter**                       | Gap          | Floating UI elements that control the content within spatial panels.                                                                              | [`88a76ec1`](https://m3.material.io/foundations/glossary#88a76ec1-b3b2-4373-9c04-07c198328729) |
| **Pane**                          | Exact        | The building blocks of a layout. Content and actions are grouped into panes, which adapt the content to best fit the screen.                      | [`38cac2f5`](https://m3.material.io/foundations/glossary#38cac2f5-8a0a-4e98-82a0-365737c578a8) |
| **Progress indicator**            | Broader      | A component displaying an unspecified wait time or the length of a process.                                                                       | [`ea34aebe`](https://m3.material.io/foundations/glossary#ea34aebe-f017-4fb5-bd04-2126d738066d) |
| **Radio button**                  | Exact        | A component allowing users to select one option from a set.                                                                                       | [`6a1b4296`](https://m3.material.io/foundations/glossary#6a1b4296-e1b0-465b-b7ac-56cb8c3720ce) |
| **Role**                          | Homonym      | Short nickname describing the purpose of a design token within a design system. Also known as slots. Examples: On surface; Body 1.                | [`bcba3347`](https://m3.material.io/foundations/glossary#bcba3347-5cb3-4160-9d33-b24243481dcf) |
| **Side sheet**                    | Exact        | A component containing supplementary content that’s anchored to the left or right edge of the screen.                                             | [`65978720`](https://m3.material.io/foundations/glossary#65978720-6d8c-4747-a956-2ca9ce7e968f) |
| **Slider**                        | Exact        | A component that allows users to make selections from a range of values.                                                                          | [`f7a3e724`](https://m3.material.io/foundations/glossary#f7a3e724-4f8a-43a6-beab-8e6338f14b3a) |
| **Snackbar**                      | Exact        | A component that provides brief messages about app processes at the bottom of the screen.                                                         | [`d2165c3c`](https://m3.material.io/foundations/glossary#d2165c3c-b699-4015-b101-127835803270) |
| **Spatial**                       | Gap          | Relates to the placement of UI in space through extended reality (XR).                                                                            | [`3da13c1f`](https://m3.material.io/foundations/glossary#3da13c1f-4ebb-47c7-9d7b-b12a7d87bcb3) |
| **Style**                         | Related      | One or more properties, typically customizable, that define an aspect of a UI's appearance, such as color, typography, or shape.                  | [`09d3f023`](https://m3.material.io/foundations/glossary#09d3f023-3d77-42c9-b309-ae70deab1623) |
| **Switch**                        | Exact        | A component that toggles the state of a single item on or off.                                                                                    | [`5edfd309`](https://m3.material.io/foundations/glossary#5edfd309-f599-450f-b93f-4b62d8a90e77) |
| **Tab**                           | Exact        | A component used to organize content across different screens, data sets, and other interactions.                                                 | [`5c2af810`](https://m3.material.io/foundations/glossary#5c2af810-5a3e-4b95-9a66-7810f74984ec) |
| **Text field**                    | Exact        | A component that lets users enter and edit text.                                                                                                  | [`3d35c83c`](https://m3.material.io/foundations/glossary#3d35c83c-81a5-4195-b454-b5efbd14a8dd) |
| **Theme**                         | Exact        | A set of styles, such as color, elevation, and type, that can be applied globally to an app's UI components as a way to consistently adjust…      | [`8b4bc4e5`](https://m3.material.io/foundations/glossary#8b4bc4e5-a7c9-4b4a-94fd-fbb78de7f262) |
| **Time picker**                   | Exact        | A component that helps users select and set a specific time.                                                                                      | [`f516ba0e`](https://m3.material.io/foundations/glossary#f516ba0e-d5ce-4bb2-9d3f-e9630d1239ce) |
| **Toolbar**                       | Alias        | A component displaying navigation and key actions at the bottom of mobile screens.                                                                | [`e79c2858`](https://m3.material.io/foundations/glossary#e79c2858-a74f-4bdc-94da-d4006a2c024b) |
| **Tooltip**                       | Exact        | A component that displays informative text when users hover over, focus on, or tap an element.                                                    | [`cf61f8c2`](https://m3.material.io/foundations/glossary#cf61f8c2-aafa-4d58-9c8b-90c0acbce3df) |
| **XR**                            | Out of scope | Extended reality includes UI viewed in virtual reality or in passthrough blended with the physical environment.                                   | [`9fdd5f82`](https://m3.material.io/foundations/glossary#9fdd5f82-f940-4661-8deb-f0e8517f9bf4) |

## Component index

### Buttons (`button.md`)

Buttons help people initiate actions, from sending an email, to sharing a document, to liking a post. There are five types of common buttons: elevated, filled, filled tonal, outlined, and text.

- Page: [button.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/button.md); [catalog](https://material-web.dev/components/button/)
- Design article: [components/buttons](https://m3.material.io/components/buttons)
- Source code: [button](https://github.com/material-components/material-web/tree/main/button)
- Outline: Types, Usage, Accessibility, Elevated button, Filled button, Filled tonal button, Outlined button, Text button, Theming, API
- Slots used in examples: `icon`
- CSS tokens (18): `--md-elevated-button-container-color`, `--md-elevated-button-container-shape`, `--md-elevated-button-label-text-color`, `--md-elevated-button-label-text-font`, `--md-filled-button-container-color`, `--md-filled-button-container-shape`, `--md-filled-button-label-text-color`, `--md-filled-button-label-text-font`, `--md-filled-tonal-button-container-color`, `--md-filled-tonal-button-container-shape`, `--md-filled-tonal-button-label-text-color`, `--md-filled-tonal-button-label-text-font`, `--md-outlined-button-container-shape`, `--md-outlined-button-label-text-color`, `--md-outlined-button-label-text-font`, `--md-outlined-button-outline-color`, `--md-text-button-label-text-color`, `--md-text-button-label-text-font`
- Accessibility: Add an `aria-label` attribute to buttons whose labels need a more descriptive label. ### Focusable and disabled By default, disabled buttons are not focusable with the keyboard, while "soft-disabled" buttons are. Some use cases encourage focusability of disabled toolbar items to increase their discoverability. See the ARIA guidelines on focusability of disabled controls for guidance on when this is recommended.
- Images (13): `images/button/types.webp`, `images/button/usage.webp`, `images/button/usage-icon.webp`, `images/button/usage-elevated-button.webp`, `images/button/usage-filled-tonal-button.webp`, `images/button/usage-outlined-button.webp`, `images/button/usage-text-button.webp`, `images/button/theming-elevated-button.webp`, `images/button/theming-filled-button.webp`, `images/button/theming-filled-tonal-button.webp`, `images/button/theming-outlined-button.webp`, `images/button/theming-text-button.webp`, `images/button/hero.webp`

#### `<md-elevated-button>` (MdElevatedButton)

- Properties (12): `soft-disabled`=false, `href`='', `download`='', `target`='', `trailing-icon`=false, `has-icon`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`

#### `<md-filled-button>` (MdFilledButton)

- Properties (12): `soft-disabled`=false, `href`='', `download`='', `target`='', `trailing-icon`=false, `has-icon`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`

#### `<md-filled-tonal-button>` (MdFilledTonalButton)

- Properties (12): `soft-disabled`=false, `href`='', `download`='', `target`='', `trailing-icon`=false, `has-icon`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`

#### `<md-outlined-button>` (MdOutlinedButton)

- Properties (12): `soft-disabled`=false, `href`='', `download`='', `target`='', `trailing-icon`=false, `has-icon`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`

#### `<md-text-button>` (MdTextButton)

- Properties (12): `soft-disabled`=false, `href`='', `download`='', `target`='', `trailing-icon`=false, `has-icon`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`

### Checkbox (`checkbox.md`)

Checkboxes allow users to select one or more items from a set. Checkboxes can turn an option on or off. There's one type of checkbox in Material. Use this selection control when the user needs to select one or more options from a list.

- Page: [checkbox.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/checkbox.md); [catalog](https://material-web.dev/components/checkbox/)
- Design article: [components/checkbox](https://m3.material.io/components/checkbox)
- Source code: [checkbox](https://github.com/material-components/material-web/tree/main/checkbox)
- Outline: Usage, Accessibility, Theming, API
- CSS tokens (4): `--md-checkbox-container-shape`, `--md-checkbox-outline-color`, `--md-checkbox-selected-container-color`, `--md-checkbox-selected-icon-color`
- Accessibility: Add an `aria-label` attribute to checkboxes without labels or checkboxes whose labels need to be more descriptive. > Note: checkboxes are not automatically labelled by `<label>` elements and > always need an `aria-label`. See b/294081528.
- Images (4): `images/checkbox/usage.webp`, `images/checkbox/usage-label.webp`, `images/checkbox/theming.webp`, `images/checkbox/hero.webp`

#### `<md-checkbox>` (MdCheckbox)

- Properties (11): `checked`=false, `indeterminate`=false, `required`=false, `value`='on', `name`, `disabled`, `form`, `labels`, `validity`, `validationMessage`, `willValidate`
- Methods: `formResetCallback()`, `formStateRestoreCallback()`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- Events: `change`, `input`

### Chips (`chip.md`)

Chips help people enter information, make selections, filter content, or trigger actions. While buttons are expected to appear consistently and with familiar calls to action, chips should appear dynamically as a group of multiple interactive elements.

- Page: [chip.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/chip.md); [catalog](https://material-web.dev/components/chip/)
- Design article: [components/chips](https://m3.material.io/components/chips)
- Source code: [chips](https://github.com/material-components/material-web/tree/main/chips)
- Outline: Types, Usage, Accessibility, Assist chip, Filter chip, Input chip, Suggestion chip, Theming, API
- Slots used in examples: `icon`, `selected-icon`
- CSS tokens (21): `--md-assist-chip-container-shape`, `--md-assist-chip-icon-size`, `--md-assist-chip-label-text-color`, `--md-assist-chip-label-text-font`, `--md-assist-chip-outline-color`, `--md-filter-chip-container-shape`, `--md-filter-chip-icon-size`, `--md-filter-chip-label-text-color`, `--md-filter-chip-label-text-font`, `--md-filter-chip-outline-color`, `--md-filter-chip-selected-container-color`, `--md-input-chip-container-shape`, `--md-input-chip-icon-size`, `--md-input-chip-label-text-color`, `--md-input-chip-label-text-font`, `--md-input-chip-outline-color`, `--md-suggestion-chip-container-shape`, `--md-suggestion-chip-icon-size`, `--md-suggestion-chip-label-text-color`, `--md-suggestion-chip-label-text-font`, `--md-suggestion-chip-outline-color`
- Accessibility: Add an `aria-label` attribute to chip sets or reference a label with `aria-labelledby`. Add an `aria-label` to chips whose labels need to be more descriptive. ### Focusable and disabled By default, disabled chips are not focusable with the keyboard, while "soft-disabled" chips are. Some use cases encourage focusability of disabled toolbar items to increase their discoverability. See the ARIA guidelines on focusability of disabled controls for guidance on when this is recommended.
- Images (5): `images/chips/hero.webp`, `...`, `...`, `...`, `...`

#### `<md-chip-set>` (MdChipSet)

- Properties (1): `chips`

#### `<md-assist-chip>` (MdAssistChip)

- Properties (9): `elevated`=false, `href`='', `download`='', `target`='', `disabled`=false, `soft-disabled`=false, `always-focusable`=false, `label`='', `has-icon`=false
- Events: `update-focus`

#### `<md-filter-chip>` (MdFilterChip)

- Properties (11): `elevated`=false, `removable`=false, `selected`=false, `has-selected-icon`=false, `disabled`=false, `soft-disabled`=false, `always-focusable`=false, `label`='', `has-icon`=false, `handleTrailingActionFocus`, `ariaLabelRemove`
- Events: `remove`, `update-focus`

#### `<md-input-chip>` (MdInputChip)

- Properties (12): `avatar`=false, `href`='', `target`='', `remove-only`=false, `selected`=false, `disabled`=false, `soft-disabled`=false, `always-focusable`=false, `label`='', `has-icon`=false, `handleTrailingActionFocus`, `ariaLabelRemove`
- Events: `remove`, `update-focus`

#### `<md-suggestion-chip>` (MdSuggestionChip)

- Properties (9): `elevated`=false, `href`='', `download`='', `target`='', `disabled`=false, `soft-disabled`=false, `always-focusable`=false, `label`='', `has-icon`=false
- Events: `update-focus`

### Dialogs (`dialog.md`)

Dialogs provide important prompts in a user flow.

- Page: [dialog.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/dialog.md); [catalog](https://material-web.dev/components/dialog/)
- Design article: [components/dialogs](https://m3.material.io/components/dialogs)
- Source code: [dialog](https://github.com/material-components/material-web/tree/main/dialog)
- Outline: Usage, Accessibility, Theming, API
- Slots used in examples: `actions`, `content`, `headline`
- CSS tokens (5): `--md-dialog-container-color`, `--md-dialog-headline-color`, `--md-dialog-headline-font`, `--md-dialog-supporting-text-color`, `--md-dialog-supporting-text-font`
- Accessibility: Dialogs are labelled by their headlines. Add an `aria-label` attribute to dialogs without a headline. ### Alerts Add a `type="alert"` attribute to dialogs that need to communicate an important message and require a user's response. Common examples include error messages that require confirmation and other action confirmation prompts.
- Images (1): `images/dialog/hero.webp`

#### `<md-dialog>` (MdDialog)

- Properties (7): `quick`=false, `returnValue`='', `type`, `no-focus-trap`=false, `open`, `getOpenAnimation`=function { ... }, `getCloseAnimation`=function { ... }
- Methods: `show()`, `close()`
- Events: `open`, `opened`, `close`, `closed`, `cancel`

### Divider (`divider.md`)

A divider is a thin line that groups content in lists and containers. Dividers can reinforce tapability, such as when used to separate list items or define tappable regions in an accordion.

- Page: [divider.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/divider.md); [catalog](https://material-web.dev/components/divider/)
- Design article: [components/divider](https://m3.material.io/components/divider)
- Source code: [divider](https://github.com/material-components/material-web/tree/main/divider)
- Outline: Usage, Accessibility, Theming, API
- CSS tokens (2): `--md-divider-color`, `--md-divider-thickness`
- Accessibility: Dividers are decorative by default and not announced by assistive technology. Add a `role="separator"` attribute to non-decorative dividers that should be announced.
- Images (5): `images/divider/hero.webp`, `images/divider/usage.webp`, `images/divider/usage-inset.webp`, `images/divider/usage-inset-start.webp`, `images/divider/theming.webp`

#### `<md-divider>` (MdDivider)

- Properties (3): `inset`=false, `inset-start`=false, `inset-end`=false

### Elevation (`elevation.md`)

Elevation is the relative distance between two surfaces along the z-axis. Material's elevation system is deliberately limited to just a handful of levels. This creative constraint means you need to make thoughtful decisions about your UI’s elevation story.

- Page: [elevation.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/elevation.md); [catalog](https://material-web.dev/components/elevation/)
- Design article: [styles/elevation](https://m3.material.io/styles/elevation)
- Source code: [elevation](https://github.com/material-components/material-web/tree/main/elevation)
- Outline: Usage, Accessibility, Theming
- Elements: `md-elevation` (no API section)
- CSS tokens (2): `--md-elevation-level`, `--md-elevation-shadow-color`
- Accessibility: Elevation is a visual component and does not have accessibility concerns.
- Images (4): `images/elevation/hero.webp`, `images/elevation/usage.webp`, `images/elevation/usage-animation.gif`, `images/elevation/theming.webp`

### Floating action buttons (FAB) (`fab.md`)

FAB represents the most important action on a screen. It puts key actions within reach. Extended FABs help people take primary actions. They're wider than FABs to accommodate a text label and larger target area.

- Page: [fab.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/fab.md); [catalog](https://material-web.dev/components/fab/)
- Design article: [components/extended-fab](https://m3.material.io/components/extended-fab), [components/floating-action-button](https://m3.material.io/components/floating-action-button)
- Source code: [fab](https://github.com/material-components/material-web/tree/main/fab)
- Outline: Types, Usage, Accessibility, FAB, Branded FAB, Theming, API
- Slots used in examples: `icon`
- CSS tokens (14): `--md-fab-branded-container-color`, `--md-fab-branded-container-shape`, `--md-fab-branded-icon-size`, `--md-fab-branded-label-text-font`, `--md-fab-container-color`, `--md-fab-container-shape`, `--md-fab-icon-color`, `--md-fab-icon-size`, `--md-fab-label-text-font`, `--md-fab-large-container-shape`, `--md-fab-large-icon-size`, `--md-fab-lowered-container-color`, `--md-fab-small-container-shape`, `--md-fab-small-icon-size`
- Accessibility: Icon-only FABs must include an `aria-label` that describes its action. Otherwise if `aria-label` is not provided, the FAB will default to announcing its visible contents. Extended FABs use their `label` for accessibility. Add an `aria-label` for additional context if needed. By supplying the `label` attribute, the extended FAB will make sure that the icon is not announced.
- Images (16): `images/fab/fabs.webp`, `images/fab/extended-fabs.webp`, `images/fab/usage-fab.webp`, `images/fab/usage-lowered.webp`, `images/fab/usage-fab.webp`, `images/fab/usage-extended.webp`, `images/fab/usage-without-icon.webp`, `images/fab/usage-color.webp`, `images/fab/usage-sizes.webp`, `images/fab/usage-branded.webp`, `images/fab/usage-branded-extended.webp`, `images/fab/usage-branded-sizes.webp`, `images/fab/theming-fab.webp`, `images/fab/theming-extended.webp`, `images/fab/theming-branded.webp`, `images/fab/hero.webp`

#### `<md-fab>` (MdFab)

- Properties (4): `variant`='surface', `size`='medium', `label`='', `lowered`=false

#### `<md-branded-fab>` (MdBrandedFab)

- Properties (4): `variant`='surface', `size`='medium', `label`='', `lowered`=false
- Methods: `getRenderClasses()`

### Focus ring (`focus-ring.md`)

Focus rings are accessible outlines for components to show keyboard focus. Focus rings follow the same heuristics as `:focus-visible` to determine when they are visible.

- Page: [focus-ring.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/focus-ring.md); [catalog](https://material-web.dev/components/focus-ring/)
- Design article: none
- Source code: [focus](https://github.com/material-components/material-web/tree/main/focus)
- Outline: Usage, Accessibility, Theming, API
- CSS tokens (3): `--md-focus-ring-color`, `--md-focus-ring-shape`, `--md-focus-ring-width`
- Accessibility: Focus rings are visual components and do not have assistive technology requirements.
- Images (5): `images/focus/hero.gif`, `images/focus/usage.gif`, `images/focus/usage-inward.gif`, `images/focus/usage-animation.gif`, `images/focus/theming.gif`

#### `<md-focus-ring>` (MdFocusRing)

- Properties (4): `visible`=false, `inward`=false, `htmlFor`, `control`
- Methods: `attach()`, `detach()`
- Events: `visibility-changed`

### Icon Buttons (`icon-button.md`)

Icon buttons help people take supplementary actions with a single tap.

- Page: [icon-button.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/icon-button.md); [catalog](https://material-web.dev/components/icon-button/)
- Design article: [components/icon-buttons](https://m3.material.io/components/icon-buttons)
- Source code: [iconbutton](https://github.com/material-components/material-web/tree/main/iconbutton)
- Outline: Types, Usage, Accessibility, Icon Button, Filled Icon Button, Filled Tonal Icon Button, Outlined Icon Button, Theming, API
- Slots used in examples: `selected`
- CSS tokens (19): `--md-filled-icon-button-container-height`, `--md-filled-icon-button-container-shape`, `--md-filled-icon-button-container-width`, `--md-filled-icon-button-icon-size`, `--md-filled-icon-button-selected-container-color`, `--md-filled-tonal-icon-button-container-height`, `--md-filled-tonal-icon-button-container-shape`, `--md-filled-tonal-icon-button-container-width`, `--md-filled-tonal-icon-button-icon-size`, `--md-filled-tonal-icon-button-selected-container-color`, `--md-icon-button-icon-color`, `--md-icon-button-icon-size`, `--md-icon-button-state-layer-shape`, `--md-outlined-icon-button-container-height`, `--md-outlined-icon-button-container-shape`, `--md-outlined-icon-button-container-width`, `--md-outlined-icon-button-icon-size`, `--md-outlined-icon-button-outline-color`, `--md-outlined-icon-button-outline-width`
- Accessibility: Add an `aria-label` attribute to icon buttons whose labels need a more descriptive label. ### Toggle Add an `aria-label-selected` attribute to toggle buttons whose labels need a more descriptive label when selected. ### Focusable and disabled By default, disabled icon buttons are not focusable with the keyboard, while "soft-disabled" icon buttons are. Some use cases encourage focusability of disabled toolbar items to increase their discoverability. See the ARIA guidelines on focusability of disabled controls for guidance on when this is recommended.
- Images (12): `images/iconbutton/buttons.webp`, `images/iconbutton/usage.webp`, `images/iconbutton/usage-toggle.webp`, `images/iconbutton/usage-standard.webp`, `images/iconbutton/usage-filled.webp`, `images/iconbutton/usage-filled-tonal.webp`, `images/iconbutton/usage-outlined.webp`, `images/iconbutton/theming-standard.webp`, `images/iconbutton/theming-filled.webp`, `images/iconbutton/theming-filled-tonal.webp`, `images/iconbutton/theming-outlined.webp`, `images/iconbutton/hero.webp`

#### `<md-icon-button>` (MdIconButton)

- Properties (14): `soft-disabled`=false, `flip-icon-in-rtl`=false, `href`='', `download`='', `target`='', `aria-label-selected`='', `toggle`=false, `selected`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`
- Events: `input`, `change`

#### `<md-filled-icon-button>` (MdFilledIconButton)

- Properties (14): `soft-disabled`=false, `flip-icon-in-rtl`=false, `href`='', `download`='', `target`='', `aria-label-selected`='', `toggle`=false, `selected`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`
- Events: `input`, `change`

#### `<md-filled-tonal-icon-button>` (MdFilledTonalIconButton)

- Properties (14): `soft-disabled`=false, `flip-icon-in-rtl`=false, `href`='', `download`='', `target`='', `aria-label-selected`='', `toggle`=false, `selected`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`
- Events: `input`, `change`

#### `<md-outlined-icon-button>` (MdOutlinedIconButton)

- Properties (14): `soft-disabled`=false, `flip-icon-in-rtl`=false, `href`='', `download`='', `target`='', `aria-label-selected`='', `toggle`=false, `selected`=false, `name`, `disabled`, `type`='submit', `value`='', `form`, `labels`
- Events: `input`, `change`

### Icon (`icon.md`)

Icons can be used to represent common actions. Material Symbols are a set of variable icon fonts created at seven weights across three different styles.

- Page: [icon.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/icon.md); [catalog](https://material-web.dev/components/icon/)
- Design article: [styles/icons](https://m3.material.io/styles/icons), [styles/icons/overview](https://m3.material.io/styles/icons/overview)
- Source code: [icon](https://github.com/material-components/material-web/tree/main/icon)
- Outline: Usage, Accessibility, Theming
- Elements: `md-icon` (no API section)
- CSS tokens (2): `--md-icon-font`, `--md-icon-size`
- Accessibility: Icons are mostly intended to be used inside of other components that have accessibility settings. If used on their own, Icons should be given an accessible name if they are focusable. If you use icons by name, they will be announced by screen readers without any extra steps. If using codepoints, wrap the codepoint in a `<span>` with an `aria-label` attribute. If using SVG icons, add an `aria-label` attribute to the SVG element.
- Images (6): `images/icon/hero.gif`, `images/icon/usage.webp`, `images/icon/usage_rounded.webp`, `images/icon/usage_sharp.webp`, `images/icon/usage_filled.webp`, `images/icon/theming.webp`

### Lists (`list.md`)

Lists are continuous, vertical indexes of text and images

- Page: [list.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/list.md); [catalog](https://material-web.dev/components/list/)
- Design article: [components/lists](https://m3.material.io/components/lists)
- Source code: [list](https://github.com/material-components/material-web/tree/main/list)
- Outline: Usage, Icon Items, Image Items, Accessibility, Theming, API
- Slots used in examples: `end`, `headline`, `start`, `supporting-text`, `trailing-supporting-text`
- CSS tokens (20): `--md-list-container-color`, `--md-list-item-container-shape`, `--md-list-item-label-text-color`, `--md-list-item-label-text-font`, `--md-list-item-leading-avatar-color`, `--md-list-item-leading-avatar-label-color`, `--md-list-item-leading-avatar-label-font`, `--md-list-item-leading-avatar-shape`, `--md-list-item-leading-avatar-size`, `--md-list-item-leading-icon-color`, `--md-list-item-leading-icon-size`, `--md-list-item-leading-image-height`, `--md-list-item-leading-image-shape`, `--md-list-item-leading-image-width`, `--md-list-item-supporting-text-color`, `--md-list-item-supporting-text-font`, `--md-list-item-trailing-icon-color`, `--md-list-item-trailing-icon-size`, `--md-list-item-trailing-supporting-text-color`, `--md-list-item-trailing-supporting-text-font`
- Accessibility: List can have its `role` and `tabindex` set via the `role` and `tabindex` attributes, and list items can have their `role` and `tabindex` set via the `type` and `tabindex` attributes respectively. > NOTE: List item has a limited set of `type`s that can be set on it. This is to > ensure that your list remains accessible with all other properties and options > presented to it. See the `ListItemType` TypeScript type exported by list item > for the current accepted values. By default these values are set to `role="list"` and `tabindex="-1"` for list, and `role="listitem"` and `tabindex="0"` for li
- Images (13): `images/list/usage.webp`, `images/list/usage-icon.webp`, `images/list/usage-image.webp`, `images/list/theming-list.webp`, `images/list/theming-icon.webp`, `images/list/theming-image.webp`, `images/list/hero.webp`, `https://placekitten.com/112/112`, `https://placekitten.com/114/114`, `https://placekitten.com/116/116`, `https://placekitten.com/200/100`, `https://placekitten.com/202/101`, `https://placekitten.com/212/106`

#### `<md-list>` (MdList)

- Properties (1): `items`
- Methods: `activateNextItem()`, `activatePreviousItem()`

#### `<md-list-item>` (MdListItem)

- Properties (4): `disabled`=false, `type`='text', `href`='', `target`=''
- Methods: `click()`
- Events: `request-activation`

### Menus (`menu.md`)

Menus display a list of choices on a temporary surface.

- Page: [menu.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/menu.md); [catalog](https://material-web.dev/components/menu/)
- Design article: [components/menus](https://m3.material.io/components/menus)
- Source code: [menu](https://github.com/material-components/material-web/tree/main/menu)
- Outline: Usage, Accessibility, Theming, API
- Slots used in examples: `end`, `headline`, `item`, `menu`, `start`
- CSS tokens (4): `--md-menu-container-color`, `--md-menu-container-shape`, `--md-menu-item-container-color`, `--md-menu-item-selected-container-color`
- Accessibility: By default Menu is set up to function as a `role="menu"` with children as `role="menuitem"`. A common use case for this is the menu button example, where you would need to add keyboard interactions to the button to open the menu (see W3C example). Menu can also be adapted for other use cases. The role of the `md-list` inside the menu can be set with the `type` attribute. The role of each individual `md-menu-item` can also be set with the `type` attribute. Anything else slotted into the menu that is not a list item in most cases should be set to `role="none"`, and `md-divider` should have `role
- Images (7): `images/menu/usage.webp`, `images/menu/usage-submenu.webp`, `images/menu/usage-popover.webp`, `images/menu/usage-fixed.webp`, `images/menu/usage-document.webp`, `images/menu/theming.webp`, `images/menu/hero.webp`

#### `<md-menu>` (MdMenu)

- Properties (21): `anchor`='', `positioning`='absolute', `quick`=false, `has-overflow`=false, `open`=false, `x-offset`=0, `y-offset`=0, `no-horizontal-flip`=false, `no-vertical-flip`=false, `typeahead-delay`=200, `anchor-corner`=Corner.END_START, `menu-corner`=Corner.START_START, `stay-open-on-outside-click`=false, `stay-open-on-focusout`=false, `skip-restore-focus`=false, `default-focus`=FocusState.FIRST_ITEM, `no-navigation-wrap`=false, `isSubmenu`=false, `typeaheadController`=function { ... }, `anchorElement`, `items`
- Methods: `getBoundingClientRect()`, `getClientRects()`, `close()`, `show()`, `activateNextItem()`, `activatePreviousItem()`, `reposition()`
- Events: `opening`, `opened`, `closing`, `closed`

#### `<md-menu-item>` (MdMenuItem)

- Properties (7): `disabled`=false, `type`='menuitem', `href`='', `target`='', `keep-open`=false, `selected`=false, `typeaheadText`
- Events: `close-menu`

#### `<md-sub-menu>` (MdSubMenu)

- Properties (7): `anchor-corner`=Corner.START_END, `menu-corner`=Corner.START_START, `hover-open-delay`=400, `hover-close-delay`=400, `md-sub-menu`=true, `item`, `menu`
- Methods: `show()`, `close()`
- Events: `deactivate-items`, `request-activation`, `deactivate-typeahead`, `activate-typeahead`

### Progress indicators (`progress.md`)

Progress indicators inform users about the status of ongoing processes, such as loading an app or submitting a form. There are two types of progress indicators: linear and circular.

- Page: [progress.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/progress.md); [catalog](https://material-web.dev/components/progress/)
- Design article: [components/progress-indicators](https://m3.material.io/components/progress-indicators)
- Source code: [progress](https://github.com/material-components/material-web/tree/main/progress)
- Outline: Types, Usage, Accessibility, Circular progress, Linear progress, Theming, API
- CSS tokens (8): `--md-circular-progress-active-indicator-color`, `--md-circular-progress-active-indicator-width`, `--md-circular-progress-size`, `--md-linear-progress-active-indicator-color`, `--md-linear-progress-active-indicator-height`, `--md-linear-progress-track-color`, `--md-linear-progress-track-height`, `--md-linear-progress-track-shape`
- Accessibility: Add an `aria-label` attribute to progress indicators to give them a descriptive name.
- Images (3): `images/progress/theming-circular.webp`, `images/progress/theming-linear.webp`, `images/progress/hero.webp`

#### `<md-linear-progress>` (MdLinearProgress)

- Properties (5): `buffer`=0, `value`=0, `max`=1, `indeterminate`=false, `four-color`=false

#### `<md-circular-progress>` (MdCircularProgress)

- Properties (4): `value`=0, `max`=1, `indeterminate`=false, `four-color`=false

### Radio button (`radio.md`)

Radio buttons let people select one option from a set of options.

- Page: [radio.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/radio.md); [catalog](https://material-web.dev/components/radio/)
- Design article: [components/radio-button](https://m3.material.io/components/radio-button)
- Source code: [radio](https://github.com/material-components/material-web/tree/main/radio)
- Outline: Usage, Accessibility, Theming, API
- CSS tokens (3): `--md-radio-icon-color`, `--md-radio-icon-size`, `--md-radio-selected-icon-color`
- Accessibility: Add an `aria-label` attribute to radios without labels or radios whose labels need to be more descriptive. Place radios inside a `role="radiogroup"`. Radio groups must display a label, either with `aria-label` or `aria-labelledby`. > Note: radios are not automatically labelled by `<label>` elements and always > need an `aria-label`. See b/294081528.
- Images (1): `images/radio/hero.webp`

#### `<md-radio>` (MdRadio)

- Properties (10): `required`=false, `value`='on', `checked`, `name`, `disabled`, `form`, `labels`, `validity`, `validationMessage`, `willValidate`
- Methods: `formResetCallback()`, `formStateRestoreCallback()`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- Events: `input`, `change`

### Ripple (`ripple.md`)

Ripples are state layers used to communicate the status of a component or interactive element. A state layer is a semi-transparent covering on an element that indicates its state. A layer can be applied to an entire element or in a circular shape.

- Page: [ripple.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/ripple.md); [catalog](https://material-web.dev/components/ripple/)
- Design article: [foundations/interaction/states/state-layers](https://m3.material.io/foundations/interaction/states/state-layers)
- Source code: [ripple](https://github.com/material-components/material-web/tree/main/ripple)
- Outline: Usage, Accessibility, Theming, API
- CSS tokens (2): `--md-ripple-hover-color`, `--md-ripple-pressed-color`
- Accessibility: Ripples are visual components and do not have assistive technology requirements.
- Images (4): `images/ripple/usage.gif`, `images/ripple/usage-unbounded.gif`, `images/ripple/theming.gif`, `images/ripple/hero.gif`

#### `<md-ripple>` (MdRipple)

- Properties (3): `disabled`=false, `htmlFor`, `control`
- Methods: `attach()`, `detach()`

### Select (`select.md`)

Select menus display a list of choices on temporary surfaces and display the currently selected menu item above the menu.

- Page: [select.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/select.md); [catalog](https://material-web.dev/components/select/)
- Design article: none
- Source code: [select](https://github.com/material-components/material-web/tree/main/select)
- Outline: Usage, Theming, API
- Slots used in examples: `headline`
- CSS tokens (8): `--md-filled-select-text-field-container-color`, `--md-filled-select-text-field-container-shape`, `--md-filled-select-text-field-input-text-color`, `--md-filled-select-text-field-input-text-font`, `--md-outlined-select-text-field-container-shape`, `--md-outlined-select-text-field-input-text-color`, `--md-outlined-select-text-field-input-text-font`, `--md-outlined-select-text-field-outline-color`
- Images (4): `images/select/usage.webp`, `images/select/theming-filled.webp`, `images/select/theming-outlined.webp`, `images/select/hero.webp`

#### `<md-filled-select>` (MdFilledSelect)

- Properties (24): `quick`=false, `required`=false, `error-text`='', `label`='', `no-asterisk`=false, `supporting-text`='', `error`=false, `menu-positioning`='popover', `clamp-menu-width`=false, `typeahead-delay`=DEFAULT_TYPEAHEAD_BUFFER_TIME, `has-leading-icon`=false, `display-text`='', `menu-align`='start', `value`, `selected-index`, `name`, `disabled`, `options`, `selectedOptions`, `form`, `labels`, `validity`, `validationMessage`, `willValidate`
- Methods: `select()`, `selectIndex()`, `reset()`, `showPicker()`, `getUpdateComplete()`, `formResetCallback()`, `formStateRestoreCallback()`, `click()`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- Events: `change`, `input`, `opening`, `opened`, `closing`, `closed`

#### `<md-outlined-select>` (MdOutlinedSelect)

- Properties (24): `quick`=false, `required`=false, `error-text`='', `label`='', `no-asterisk`=false, `supporting-text`='', `error`=false, `menu-positioning`='popover', `clamp-menu-width`=false, `typeahead-delay`=DEFAULT_TYPEAHEAD_BUFFER_TIME, `has-leading-icon`=false, `display-text`='', `menu-align`='start', `value`, `selected-index`, `name`, `disabled`, `options`, `selectedOptions`, `form`, `labels`, `validity`, `validationMessage`, `willValidate`
- Methods: `select()`, `selectIndex()`, `reset()`, `showPicker()`, `getUpdateComplete()`, `formResetCallback()`, `formStateRestoreCallback()`, `click()`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- Events: `change`, `input`, `opening`, `opened`, `closing`, `closed`

#### `<md-select-option>` (MdSelectOption)

- Properties (6): `disabled`=false, `selected`=false, `value`='', `type`='option' as const, `typeaheadText`, `displayText`
- Events: `close-menu`, `request-selection`, `request-deselection`

### Sliders (`slider.md`)

Sliders allow users to view and select a value (or range) along a track. They're ideal for adjusting settings such as volume and brightness, or for applying image filters. Sliders can use icons or labels to represent a numeric or relative scale.

- Page: [slider.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/slider.md); [catalog](https://material-web.dev/components/slider/)
- Design article: [components/sliders](https://m3.material.io/components/sliders)
- Source code: [slider](https://github.com/material-components/material-web/tree/main/slider)
- Outline: Usage, Theming, API
- CSS tokens (6): `--md-slider-active-track-color`, `--md-slider-active-track-shape`, `--md-slider-handle-color`, `--md-slider-handle-shape`, `--md-slider-inactive-track-color`, `--md-slider-inactive-track-shape`
- Images (2): `images/slider/theming.webp`, `images/slider/hero.webp`

#### `<md-slider>` (MdSlider)

- Properties (22): `min`=0, `max`=100, `value`, `value-start`, `value-end`, `value-label`='', `value-label-start`='', `value-label-end`='', `aria-label-start`='', `aria-valuetext-start`='', `aria-label-end`='', `aria-valuetext-end`='', `step`=1, `ticks`=false, `labeled`=false, `range`=false, `name`, `disabled`, `nameStart`, `nameEnd`, `form`, `labels`
- Methods: `formResetCallback()`, `formStateRestoreCallback()`
- Events: `change`, `input`

### Switch (`switch.md`)

Switches toggle the state of an item on or off.

- Page: [switch.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/switch.md); [catalog](https://material-web.dev/components/switch/)
- Design article: [components/switch](https://m3.material.io/components/switch)
- Source code: [switch](https://github.com/material-components/material-web/tree/main/switch)
- Outline: Usage, Accessibility, Theming, API
- CSS tokens (6): `--md-switch-handle-color`, `--md-switch-handle-shape`, `--md-switch-selected-handle-color`, `--md-switch-selected-track-color`, `--md-switch-track-color`, `--md-switch-track-shape`
- Accessibility: Add an `aria-label` attribute to switches without labels or switches whose labels need to be more descriptive. > Note: switches are not automatically labelled by `<label>` elements and always > need an `aria-label`. See b/294081528.
- Images (1): `images/switch/hero.webp`

#### `<md-switch>` (MdSwitch)

- Properties (12): `selected`=false, `icons`=false, `show-only-selected-icon`=false, `required`=false, `value`='on', `name`, `disabled`, `form`, `labels`, `validity`, `validationMessage`, `willValidate`
- Methods: `formResetCallback()`, `formStateRestoreCallback()`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- Events: `input`, `change`

### Tabs (`tabs.md`)

Tabs organize groups of related content that are at the same level of hierarchy.

- Page: [tabs.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/tabs.md); [catalog](https://material-web.dev/components/tabs/)
- Design article: [components/tabs](https://m3.material.io/components/tabs)
- Source code: [tabs](https://github.com/material-components/material-web/tree/main/tabs)
- Outline: Types, Usage, Primary tabs, Secondary tabs, Accessibility, Theming, API
- Slots used in examples: `icon`
- CSS tokens (10): `--md-primary-tab-active-indicator-color`, `--md-primary-tab-container-color`, `--md-primary-tab-container-shape`, `--md-primary-tab-icon-color`, `--md-primary-tab-label-text-font`, `--md-secondary-tab-active-indicator-color`, `--md-secondary-tab-container-color`, `--md-secondary-tab-container-shape`, `--md-secondary-tab-icon-color`, `--md-secondary-tab-label-text-font`
- Accessibility: Add an `aria-label` attribute to `<md-tabs>` and any individual tab whose label needs to be more descriptive, such as icon-only tabs. ### Tab panels Every tab must reference a `role="tabpanel"` element with `aria-controls`. Tab panels must be labelled with `aria-label` or `aria-labelledby`. It's common to reference the panel's tab with `aria-labelledby`.
- Images (2): `images/tabs/theming.webp`, `images/tabs/hero.webp`

#### `<md-tabs>` (MdTabs)

- Properties (4): `auto-activate`=false, `active-tab-index`, `tabs`, `activeTab`
- Methods: `scrollToTab()`
- Events: `change`

#### `<md-primary-tab>` (MdPrimaryTab)

- Properties (6): `inline-icon`=false, `md-tab`=true, `active`=false, `has-icon`=false, `icon-only`=false, `selected`

#### `<md-secondary-tab>` (MdSecondaryTab)

- Properties (5): `md-tab`=true, `active`=false, `has-icon`=false, `icon-only`=false, `selected`

### Text field (`text-field.md`)

Text fields let users enter text into a UI.

- Page: [text-field.md](https://github.com/material-components/material-web/blob/47adb655bd7a88c4d62e8faac2873084eed555dc/docs/components/text-field.md); [catalog](https://material-web.dev/components/text-field/)
- Design article: [components/text-fields](https://m3.material.io/components/text-fields)
- Source code: [textfield](https://github.com/material-components/material-web/tree/main/textfield)
- Outline: Types, Usage, Accessibility, Filled text field, Outlined text field, Theming, API
- Slots used in examples: `leading-icon`, `selected`, `trailing-icon`
- CSS tokens (9): `--md-filled-text-field-container-color`, `--md-filled-text-field-container-shape`, `--md-filled-text-field-focus-active-indicator-color`, `--md-filled-text-field-input-text-font`, `--md-filled-text-field-label-text-font`, `--md-outlined-text-field-container-shape`, `--md-outlined-text-field-focus-outline-color`, `--md-outlined-text-field-input-text-font`, `--md-outlined-text-field-label-text-font`
- Accessibility: Add an `aria-label` attribute to text fields with external labels or text fields whose labels need to be more descriptive.
- Images (11): `images/textfield/usage.webp`, `images/textfield/usage-type.webp`, `images/textfield/usage-label.webp`, `images/textfield/usage-textarea.webp`, `images/textfield/usage-icons.webp`, `images/textfield/usage-prefix.webp`, `images/textfield/usage-supporting-text.webp`, `images/textfield/usage-char-counter.webp`, `images/textfield/theming-filled.webp`, `images/textfield/theming-outlined.webp`, `images/textfield/hero.webp`

#### `<md-filled-text-field>` (MdFilledTextField)

- Properties (39): `error`=false, `error-text`='', `label`='', `no-asterisk`=false, `required`=false, `value`='', `prefix-text`='', `suffix-text`='', `has-leading-icon`=false, `has-trailing-icon`=false, `supporting-text`='', `text-direction`='', `rows`=2, `cols`=20, `inputmode`='', `max`='', `maxlength`=-1, `min`='', `minlength`=-1, `no-spinner`=false, `pattern`='', `placeholder`='', `readonly`=false, `multiple`=false, `step`='', `type`='text', `autocomplete`='', `name`, `disabled`, `selectionDirection`, `selectionEnd`, `selectionStart`, `valueAsNumber`, `valueAsDate`, `form`, `labels`, `validity`, `validationMessage`, `willValidate`
- Methods: `select()`, `setRangeText()`, `setSelectionRange()`, `showPicker()`, `stepDown()`, `stepUp()`, `reset()`, `formResetCallback()`, `formStateRestoreCallback()`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- Events: `select`, `change`, `input`

#### `<md-outlined-text-field>` (MdOutlinedTextField)

- Properties (39): `error`=false, `error-text`='', `label`='', `no-asterisk`=false, `required`=false, `value`='', `prefix-text`='', `suffix-text`='', `has-leading-icon`=false, `has-trailing-icon`=false, `supporting-text`='', `text-direction`='', `rows`=2, `cols`=20, `inputmode`='', `max`='', `maxlength`=-1, `min`='', `minlength`=-1, `no-spinner`=false, `pattern`='', `placeholder`='', `readonly`=false, `multiple`=false, `step`='', `type`='text', `autocomplete`='', `name`, `disabled`, `selectionDirection`, `selectionEnd`, `selectionStart`, `valueAsNumber`, `valueAsDate`, `form`, `labels`, `validity`, `validationMessage`, `willValidate`
- Methods: `select()`, `setRangeText()`, `setSelectionRange()`, `showPicker()`, `stepDown()`, `stepUp()`, `reset()`, `formResetCallback()`, `formStateRestoreCallback()`, `checkValidity()`, `reportValidity()`, `setCustomValidity()`
- Events: `select`, `change`, `input`
