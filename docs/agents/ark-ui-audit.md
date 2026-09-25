# Ark UI / theme wrapper audit

Source: Ark UI MCP `list_components({framework: 'svelte'})`; installed package `@ark-ui/svelte` 5.24.x. The MCP catalog and installed package may differ (for example, `time-picker` appears in the tool schema but not in the Svelte component list). Verify exports against the installed version before adding a wrapper.

## Existing usage and theme

`src/routes/+page.svelte` uses Color Picker, Segment Group and Tabs directly. The preview owns light/dark and rounded/square tokens locally in `src/app.css`; the primary/accent variables are set on the preview element. Tailwind v4 has a *named* spacing/radius/color scale and the linter rejects arbitrary utilities. Styled wrappers must inherit CSS variables rather than read global state. Portaling overlays to `body` would break preview-scoped tokens: keep content within the theme scope or explicitly provide a theme-aware portal container. Dark mode currently changes neutral tokens only; primary and accent are supplied by the preview itself. `--color-primary-foreground` must be derived to preserve contrast.

The Ark UI MCP basic Svelte examples and styling guides were consulted for Checkbox, Switch, Select, Dialog and Tabs. Segment Group's styling guide returned 404; its basic example was available. State hooks use Ark data attributes; custom Tailwind variants `ark-checked` and `ark-indeterminate` live in `src/app.css`.

## Coverage and next steps

The five opinionated wrappers in `src/lib/ui` are exercised by live demos in `/components/[slug]`: Checkbox (boolean form input), Switch (boolean setting), Select (single-choice options with a bindable array matching Ark's API), Tabs (items with Svelte content snippets), Dialog (trigger and body snippets). Each uses CVA-backed Tailwind mappings for shared styles and size/density props; the compound Ark parts retain keyboard, focus and form behavior. They are not a full catalog implementation. `/components` lists all 64 primitives returned by the Ark Svelte MCP catalog. The remaining routes explicitly show an unimplemented status instead of claiming a working demo.

Suggested next batches, in dependency/usage order:

1. **Forms and choice:** field, fieldset, radio-group, segment-group, toggle, toggle-group, number-input, password-input, pin-input, tags-input, rating-group, slider, angle-slider, editable, file-upload, date-input, date-picker. Ensure name, required, invalid, read-only, disabled, controlled/default values and hidden inputs remain accessible. Do not force all these into a single scalar value shape.
2. **Overlays and actions:** popover, tooltip, hover-card, menu, drawer, toast, combobox, listbox, navigation-menu, floating-panel, tour. Resolve theme-scoped portals and stacking before broad implementation. Distinguish modal from non-modal, hover-only from interactive, and searchable from fixed lists.
3. **Content and navigation:** accordion, collapsible, carousel, pagination, steps, tree-view, toc, scroll-area, splitter, json-tree-view, marquee, highlight, progress, avatar, image-cropper, color-picker, signature-pad, qr-code, timer, clipboard, download-trigger, swap.
4. **Infrastructure, not typical visual wrappers:** client-only, environment, focus-trap, format, frame, hotkeys, locale, portal, presence. These are utilities/composition primitives; document usage and expose directly only where useful, rather than manufacture visual props.

For each batch: fetch MCP `list_examples` + `get_example` and `styling_guide`, decide a use-case-specific API, implement semantic markup over the documented Ark structure, validate with `svelte-check`, Svelte autofixer, lint, and keyboard/form tests. Avoid mechanically generating a wrapper per export: different primitives have different binding models and requirements. Add live previews for theme/corner variations, validation, disabled, keyboard navigation and mobile before declaring catalog coverage complete.
