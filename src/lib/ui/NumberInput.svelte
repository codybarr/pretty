<script lang="ts">
import { Field as ArkField } from "@ark-ui/svelte/field";
import { NumberInput as ArkNumberInput } from "@ark-ui/svelte/number-input";
import { IconMinus, IconPlus } from "@tabler/icons-svelte";
import type { ComponentProps } from "svelte";
import { field, input, inputAction, label as labelStyle } from "./variants";

let {
	label,
	value = $bindable(""),
	helper,
	error,
	size = "md",
	placeholder,
	class: className = "",
	...props
}: Omit<ComponentProps<typeof ArkNumberInput.Root>, "children" | "value"> & {
	label: string;
	value?: string;
	helper?: string;
	error?: string;
	placeholder?: string;
	size?: "sm" | "md" | "lg";
} = $props();
</script>

<ArkField.Root class={`${field()} data-disabled:opacity-50 ${className}`} invalid={props.invalid} disabled={props.disabled} readOnly={props.readOnly} required={props.required}>
 <ArkNumberInput.Root {...props} bind:value class="grid gap-xs">
  <ArkNumberInput.Label class={labelStyle()}>{label}<ArkField.RequiredIndicator class="ml-xs text-danger" /></ArkNumberInput.Label>
  <ArkNumberInput.Control class="relative flex items-center">
   <ArkNumberInput.Input {placeholder} class={`${input({ size, adornment: "both" })} tabular-nums`} />
   <ArkNumberInput.DecrementTrigger title="Decrease value" class={`${inputAction()} left-xs`}><IconMinus size={16} aria-hidden="true" /></ArkNumberInput.DecrementTrigger>
   <ArkNumberInput.IncrementTrigger title="Increase value" class={`${inputAction()} right-xs`}><IconPlus size={16} aria-hidden="true" /></ArkNumberInput.IncrementTrigger>
  </ArkNumberInput.Control>
 </ArkNumberInput.Root>
 {#if helper}<ArkField.HelperText class="text-xs text-muted-foreground">{helper}</ArkField.HelperText>{/if}
 {#if error}<ArkField.ErrorText class="text-xs text-danger">{error}</ArkField.ErrorText>{/if}
</ArkField.Root>
