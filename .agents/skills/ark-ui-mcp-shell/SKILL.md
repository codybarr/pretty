---
name: ark-ui-mcp-shell
description: Invoke Ark UI's stdio MCP tools from the shell when MCP tools are not directly exposed by the current client (including pi). Use for Ark UI component discovery, examples, props, docs, and styling guidance.
---

# Ark UI MCP through the shell

The project helper `scripts/ark-ui-mcp` starts `@ark-ui/mcp`, performs the MCP handshake, calls a tool, and prints its result. Use it instead of attempting to launch `npx -y @ark-ui/mcp` by itself (that command only starts a server and waits for protocol input).

## Calling tools

```bash
scripts/ark-ui-mcp tools
scripts/ark-ui-mcp list_components '{"framework":"svelte"}'
scripts/ark-ui-mcp list_examples '{"framework":"svelte","component":"select"}'
scripts/ark-ui-mcp get_example '{"framework":"svelte","component":"select","exampleId":"<id-from-list_examples>"}'
scripts/ark-ui-mcp styling_guide '{"component":"select"}'
scripts/ark-ui-mcp get_component_props '{"framework":"svelte","component":"select"}'
scripts/ark-ui-mcp search_docs '{"query":"select keyboard interaction"}'
scripts/ark-ui-mcp get_docs '{"slug":"<slug-from-search_docs>"}'
```

Pass each tool's arguments as a JSON object in the second argument. Discover current tool names and input schemas with `scripts/ark-ui-mcp tools`; do not assume the server's tool set is fixed. For examples, call `list_examples` first and pass an ID from its output to `get_example`. For docs, use `search_docs` before `get_docs` when the slug is unknown.

Use the tools relevant to the task: `list_components` for primitive selection, `list_examples` and `get_example` for framework usage, and `styling_guide` before styling Ark UI components. Use props or docs lookup when needed. If the helper fails, report the failure honestly and fall back to official docs; do not claim MCP results that were not retrieved.
