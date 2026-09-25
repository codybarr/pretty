<script lang="ts">
import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";
import { checkboxControl, focus, label as labelStyle } from "./variants";

let {
	label,
	checked = $bindable(false),
	disabled = false,
	name,
	value = "on",
	size = "md",
	class: className = "",
}: {
	label: string;
	checked?: boolean;
	disabled?: boolean;
	name?: string;
	value?: string;
	size?: "sm" | "md";
	class?: string;
} = $props();
</script>

<ArkCheckbox.Root class={`inline-flex items-center gap-sm text-sm text-foreground data-disabled:opacity-50 ${className}`}  bind:checked {disabled} {name} {value}>
  <ArkCheckbox.Control class={`${checkboxControl({ size })} ${focus()}`} >
    <ArkCheckbox.Indicator class="text-xs">✓</ArkCheckbox.Indicator>
  </ArkCheckbox.Control>
  <ArkCheckbox.Label class={labelStyle()}>{label}</ArkCheckbox.Label>
  <ArkCheckbox.HiddenInput />
</ArkCheckbox.Root>
