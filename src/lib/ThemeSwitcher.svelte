<script lang="ts">
import { Select, createListCollection } from "@ark-ui/svelte/select";
import { IconChevronDown } from "@tabler/icons-svelte";

// Keep the available themes in one place when a second stylesheet is added.
const themes = createListCollection({
	items: [{ label: "Slick", value: "slick" }],
});
</script>

<Select.Root class="relative flex items-center gap-sm" collection={themes} defaultValue={["slick"]}>
	<Select.Label class="font-mono text-xs text-muted-foreground max-phone:sr-only">Theme</Select.Label>
	<Select.Control>
		<Select.Trigger class="flex min-w-0 cursor-pointer items-center gap-sm rounded-xs border border-border bg-surface px-sm py-xs text-sm text-foreground hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-label="Site theme">
			<span class="size-xs shrink-0 rounded-full bg-primary" aria-hidden="true"></span>
			<Select.ValueText />
			<Select.Indicator><IconChevronDown size={14} aria-hidden="true" /></Select.Indicator>
		</Select.Trigger>
	</Select.Control>
	<!-- Keep the popup inside the themed subtree when more themes are added. -->
	<Select.Positioner>
		<Select.Content class="z-30 min-w-max rounded-xs border border-border bg-surface p-xs text-foreground shadow-lg" style="min-width: var(--reference-width)">
			{#each themes.items as item (item.value)}
				<Select.Item class="flex cursor-pointer items-center justify-between gap-md rounded-xs px-sm py-xs text-sm data-highlighted:bg-muted data-state-checked:text-primary" {item}>
					<Select.ItemText>{item.label}</Select.ItemText>
					<Select.ItemIndicator aria-hidden="true">✓</Select.ItemIndicator>
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Positioner>
	<Select.HiddenSelect />
</Select.Root>
