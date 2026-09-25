<script lang="ts">
import { Switch as ArkSwitch } from "@ark-ui/svelte/switch";
import { focus, label as labelStyle, switchControl } from "./variants";

let {
	label,
	checked = $bindable(false),
	disabled = false,
	name,
	size = "md",
	class: className = "",
}: {
	label: string;
	checked?: boolean;
	disabled?: boolean;
	name?: string;
	size?: "sm" | "md";
	class?: string;
} = $props();
</script>

<ArkSwitch.Root class={`inline-flex items-center gap-sm text-foreground data-disabled:opacity-50 ${className}`}  bind:checked {disabled} {name}>
  <ArkSwitch.Control class={`${switchControl({ size })} ${focus()}`} ><ArkSwitch.Thumb class="size-sm rounded-full bg-surface shadow-sm transition-transform ark-checked:translate-x-md" /></ArkSwitch.Control>
  <ArkSwitch.Label class={labelStyle()}>{label}</ArkSwitch.Label>
  <ArkSwitch.HiddenInput />
</ArkSwitch.Root>
