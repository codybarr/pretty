<script lang="ts">
import { Field as ArkField } from "@ark-ui/svelte/field";
import { RadioGroup as ArkRadioGroup } from "@ark-ui/svelte/radio-group";
import type { ComponentProps } from "svelte";
import { field, focus, label as labelStyle, radioControl } from "./variants";

let {
	label,
	options,
	value = $bindable(null),
	helper,
	error,
	size = "md",
	class: className = "",
	...props
}: Omit<ComponentProps<typeof ArkRadioGroup.Root>, "children" | "value"> & {
	label: string;
	options: { label: string; value: string; disabled?: boolean }[];
	value?: string | null;
	helper?: string;
	error?: string;
	size?: "sm" | "md" | "lg";
} = $props();
</script>

<ArkField.Root class={`${field()} ${className}`} invalid={props.invalid} disabled={props.disabled} required={props.required}>
 <ArkRadioGroup.Root {...props} bind:value class="grid gap-sm">
  <ArkRadioGroup.Label class={labelStyle()}>{label}<ArkField.RequiredIndicator class="ml-xs text-danger" /></ArkRadioGroup.Label>
  <div class={props.orientation === 'horizontal' ? 'flex flex-wrap gap-md' : 'grid gap-sm'}>
   {#each options as item (item.value)}
    <ArkRadioGroup.Item value={item.value} disabled={item.disabled} class="inline-flex min-h-button-sm items-center gap-sm text-sm text-foreground cursor-pointer data-disabled:cursor-not-allowed data-disabled:opacity-50">
     <ArkRadioGroup.ItemControl class={`${radioControl({ size })} ${focus()}`} />
     <ArkRadioGroup.ItemText>{item.label}</ArkRadioGroup.ItemText>
     <ArkRadioGroup.ItemHiddenInput />
    </ArkRadioGroup.Item>
   {/each}
  </div>
 </ArkRadioGroup.Root>
 {#if helper}<ArkField.HelperText class="text-xs text-muted-foreground">{helper}</ArkField.HelperText>{/if}
 {#if error}<ArkField.ErrorText class="text-xs text-danger">{error}</ArkField.ErrorText>{/if}
</ArkField.Root>
