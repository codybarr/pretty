---
name: ark-ui-component-selection
description: Use whenever a user asks to build, change, or style a user interface. Consult the Ark UI MCP server before choosing interaction components so the implementation uses the appropriate accessible primitive and its documented usage pattern.
---

# Ark UI component selection

Use this skill for every UI task: pages, forms, dashboards, navigation, overlays, data entry, and interactive controls. It is about selecting the right accessible interaction primitive before implementing its visuals.

## Required workflow

1. Translate the request into interaction needs, not component names. Identify:
   - the user goal and selection cardinality (one, many, or free-form)
   - whether choices are known, searchable, hierarchical, or editable
   - whether the interaction is inline, contextual, modal, or persistent
   - keyboard, focus, validation, loading, and error requirements
2. Before writing interactive UI code, consult Ark UI's MCP tools. If the current client exposes them, call them directly. Otherwise, use the `ark-ui-mcp-shell` companion skill and the project helper `scripts/ark-ui-mcp` to make the same tool calls from the shell. Use `list_components` to choose candidates, `list_examples` and `get_example` for framework-specific usage, and `styling_guide` before styling components. Use props/docs tools as needed. Do not launch `npx -y @ark-ui/mcp` by itself: it only starts the stdio server. If direct tools and the shell helper are both unavailable, fall back to official Ark UI docs and be transparent; never claim MCP was consulted unless results were actually retrieved.
3. Briefly state the selected component(s) and why they match the interaction. Then implement using the retrieved example as the behavioral baseline.
4. Do not replace an available Ark UI primitive with hand-rolled ARIA, focus management, popover positioning, or keyboard interaction. Build custom visual wrappers only around the documented primitive.

## Selection guide

- **Boolean on/off**: `Switch`; use `Checkbox` when the value is part of a form or a set of independently selectable options.
- **One choice from a small visible set**: `Radio Group`; use `Segment Group` for compact view/mode switching.
- **One choice from a longer list**: `Select`; use `Combobox` when filtering/search or free-form typing is required.
- **Several choices**: `Checkbox` group; use `Tags Input` for entered/removable values.
- **A transient action list**: `Menu`; use `Context Menu` only if the MCP component list documents it for the current Ark UI version.
- **Supplementary contextual content**: `Tooltip` for short labels, `Hover Card` for richer preview content, `Popover` for interactive contextual content.
- **Interrupting or confirmation flow**: `Dialog`; use `Drawer` for a side-mounted flow that benefits from preserving page context.
- **Inline edits**: `Editable`; do not make static text contenteditable by hand.
- **Dates, times, numbers, or credentials**: `Date Picker`/`Date Input`, `Number Input`, `Time Picker` (if available), and `Password Input` rather than generic text fields.
- **Ranges and quantities**: `Slider` for approximate continuous ranges, `Number Input` for precise values, `Angle Slider` for angular values.
- **Progress and long operations**: `Progress - Linear` or `Progress - Circular`; use `Toast` for non-blocking result feedback.
- **Navigation or large content groups**: `Tabs` for peer panels, `Accordion` for independently expandable sections, `Navigation Menu` for site navigation, `Tree View` for hierarchical navigation, and `Pagination` for page navigation.
- **Collections**: consult the collection tools/examples for async data, list selection, and tree state rather than creating ad hoc selection state.

When the request does not cleanly fit a primitive, use `list_components` and examples to evaluate the closest candidates rather than guessing.

## MCP setup

Ark UI publishes the stdio server as `@ark-ui/mcp`:

```json
{
  "mcpServers": {
    "ark-ui": {
      "command": "npx",
      "args": ["-y", "@ark-ui/mcp"]
    }
  }
}
```

If the MCP server is unavailable in the current agent environment, say so briefly, inspect the installed project dependencies and existing UI conventions, and proceed conservatively. Do not claim that Ark UI documentation was consulted when its tools were not available.

Source: https://ark-ui.com/docs/ai/mcp-server#tools
