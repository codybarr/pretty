<script lang="ts">
import {
	Combobox as ArkCombobox,
	createListCollection,
} from "@ark-ui/svelte/combobox";
import {
	IconChevronDown,
	IconSearch,
	IconArrowUpRight,
} from "@tabler/icons-svelte";
import {
	control,
	field,
	focus,
	label as labelStyle,
	option,
	panel,
} from "./variants";

type Option = {
	label: string;
	value: string;
	description?: string;
	disabled?: boolean;
};
let {
	label,
	options,
	value = $bindable<string[]>([]),
	placeholder = "Search options…",
	name,
	disabled = false,
	inline = false,
	inputId,
	onselect,
	ondismiss,
	class: className = "",
}: {
	label: string;
	options: Option[];
	value?: string[];
	placeholder?: string;
	name?: string;
	disabled?: boolean;
	inline?: boolean;
	inputId?: string;
	onselect?: (value: string) => void;
	ondismiss?: () => void;
	class?: string;
} = $props();
let query = $state("");
let filtered = $derived(
	options.filter((item) => {
		const text =
			`${item.label} ${item.value} ${item.description ?? ""}`.toLowerCase();
		return query
			.trim()
			.toLowerCase()
			.split(/\s+/)
			.every((word) => text.includes(word));
	}),
);
let collection = $derived(createListCollection({ items: filtered }));
</script>

{#snippet optionList()}
  <ArkCombobox.Content class={inline ? 'search-results overflow-y-auto overscroll-contain p-sm outline-none' : `${panel()} max-h-preview-height overflow-y-auto p-xs`}>
    <ArkCombobox.Empty class="px-sm py-xl text-center text-sm text-muted-foreground">No results found.</ArkCombobox.Empty>
    {#each collection.items as item (item.value)}
      <ArkCombobox.Item class={option()} {item}>
        <div class="grid min-w-0 gap-xs">
          <ArkCombobox.ItemText class="truncate">{item.label}</ArkCombobox.ItemText>
          {#if item.description}<span class="text-xs text-muted-foreground">{item.description}</span>{/if}
        </div>
        {#if inline}<IconArrowUpRight size={16} class="shrink-0 text-muted-foreground" aria-hidden="true" />{:else}<ArkCombobox.ItemIndicator aria-hidden="true">✓</ArkCombobox.ItemIndicator>{/if}
      </ArkCombobox.Item>
    {/each}
  </ArkCombobox.Content>
{/snippet}

<ArkCombobox.Root
  class={`${field()} ${className}`}
  {collection} bind:value {name} {disabled}
  ids={inputId ? { input: inputId } : undefined}
  open={inline ? true : undefined}
  inputBehavior="autohighlight"
  selectionBehavior={inline ? 'preserve' : 'replace'}
  openOnClick loopFocus
  onInputValueChange={(details) => query = details.inputValue}
  onSelect={(details) => onselect?.(details.itemValue)}
  onOpenChange={(details) => { if (inline && details.reason === 'escape-key') ondismiss?.(); }}
>
  <ArkCombobox.Label class={inline ? 'sr-only' : labelStyle()}>{label}</ArkCombobox.Label>
  <ArkCombobox.Control class={inline ? 'flex items-center gap-sm border-b border-border py-sm pl-md pr-2xl' : 'relative'}>
    {#if inline}<IconSearch size={20} class="shrink-0 text-muted-foreground" aria-hidden="true" />{/if}
    <ArkCombobox.Input
      class={inline ? 'min-h-button-md w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground' : `${control()} w-full rounded-xs py-sm pl-md pr-2xl`}
      {placeholder}
    />
    {#if !inline}
      <ArkCombobox.Trigger class={`absolute right-sm top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground ${focus()}`} aria-label="Show options"><IconChevronDown size={16} aria-hidden="true" /></ArkCombobox.Trigger>
    {/if}
  </ArkCombobox.Control>
  {#if inline}
    {@render optionList()}
  {:else}
    <ArkCombobox.Positioner style="min-width: var(--reference-width)">{@render optionList()}</ArkCombobox.Positioner>
  {/if}
</ArkCombobox.Root>

<style>
  :global(.search-results) { max-height: min(25rem, 60dvh); }
</style>
