<script lang="ts">
import { Field as ArkField } from "@ark-ui/svelte/field";
import { PasswordInput as ArkPasswordInput } from "@ark-ui/svelte/password-input";
import { IconEye, IconEyeOff } from "@tabler/icons-svelte";
import type { ComponentProps } from "svelte";
import type { HTMLInputAttributes } from "svelte/elements";
import { field, input, inputAction, label as labelStyle } from "./variants";

let {
	label,
	value = $bindable(""),
	visible = $bindable(false),
	helper,
	error,
	size = "md",
	placeholder,
	autocomplete = "current-password",
	class: className = "",
	...props
}: Omit<
	ComponentProps<typeof ArkPasswordInput.Root>,
	"children" | "visible"
> & {
	label: string;
	value?: string;
	visible?: boolean;
	helper?: string;
	error?: string;
	placeholder?: string;
	autocomplete?: HTMLInputAttributes["autocomplete"];
	size?: "sm" | "md" | "lg";
} = $props();
</script>

<ArkField.Root class={`${field()} data-disabled:opacity-50 ${className}`} invalid={props.invalid} disabled={props.disabled} readOnly={props.readOnly} required={props.required}>
 <ArkPasswordInput.Root {...props} bind:visible class="grid gap-xs">
  <ArkPasswordInput.Label class={labelStyle()}>{label}<ArkField.RequiredIndicator class="ml-xs text-danger" /></ArkPasswordInput.Label>
  <ArkPasswordInput.Control class="relative flex items-center">
   <ArkPasswordInput.Input class={input({ size, adornment: "end" })} bind:value {placeholder} {autocomplete} />
   <ArkPasswordInput.VisibilityTrigger title={visible ? 'Hide password' : 'Show password'} class={`${inputAction()} right-xs`}>
    <ArkPasswordInput.Indicator class="inline-flex">
     {#snippet fallback()}<IconEyeOff size={16} aria-hidden="true" />{/snippet}
     <IconEye size={16} aria-hidden="true" />
    </ArkPasswordInput.Indicator>
   </ArkPasswordInput.VisibilityTrigger>
  </ArkPasswordInput.Control>
 </ArkPasswordInput.Root>
 {#if helper}<ArkField.HelperText class="text-xs text-muted-foreground">{helper}</ArkField.HelperText>{/if}
 {#if error}<ArkField.ErrorText class="text-xs text-danger">{error}</ArkField.ErrorText>{/if}
</ArkField.Root>
