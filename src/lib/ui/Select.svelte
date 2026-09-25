<script lang="ts">
import {
	Select as ArkSelect,
	createListCollection,
} from "@ark-ui/svelte/select";
import { control, field, label as labelStyle, option, panel } from "./variants";

type Option = { label: string; value: string; disabled?: boolean };
let {
	label,
	options,
	value = $bindable<string[]>([]),
	placeholder = "Select an option",
	name,
	disabled = false,
	size = "md",
	class: className = "",
}: {
	label: string;
	options: Option[];
	value?: string[];
	placeholder?: string;
	name?: string;
	disabled?: boolean;
	size?: "sm" | "md";
	class?: string;
} = $props();
let collection = $derived(createListCollection({ items: options }));
</script>

<ArkSelect.Root class={`${field()} ${className}`}  {collection} bind:value {name} {disabled}>
  <ArkSelect.Label class={labelStyle()}>{label}</ArkSelect.Label>
  <ArkSelect.Control>
    <ArkSelect.Trigger class={`${control({ size })} flex w-full cursor-pointer items-center justify-between gap-sm rounded-xs px-sm text-left`} ><ArkSelect.ValueText {placeholder} /><ArkSelect.Indicator aria-hidden="true">⌄</ArkSelect.Indicator></ArkSelect.Trigger>
  </ArkSelect.Control>
  <!-- Keep the positioner inside the theme scope rather than portaling to body. -->
  <ArkSelect.Positioner>
    <ArkSelect.Content class={`${panel()} max-h-preview-height overflow-y-auto p-xs`} style="min-width: var(--reference-width)" >
      {#each collection.items as item (item.value)}
        <ArkSelect.Item class={option()} {item}>
          <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
          <ArkSelect.ItemIndicator aria-hidden="true">✓</ArkSelect.ItemIndicator>
        </ArkSelect.Item>
      {/each}
    </ArkSelect.Content>
  </ArkSelect.Positioner>
  <ArkSelect.HiddenSelect />
</ArkSelect.Root>
