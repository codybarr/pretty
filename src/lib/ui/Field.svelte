<script lang="ts">
import { Field as ArkField } from "@ark-ui/svelte/field";
import type {
	HTMLInputAttributes,
	HTMLTextareaAttributes,
} from "svelte/elements";
import { field, input, label as labelStyle } from "./variants";

let {
	label,
	value = $bindable(""),
	helper,
	error,
	invalid = false,
	disabled = false,
	readOnly = false,
	required = false,
	multiline = false,
	size = "md",
	class: className = "",
	...attributes
}: Omit<
	HTMLInputAttributes & HTMLTextareaAttributes,
	"size" | "value" | "readonly" | "disabled" | "required"
> & {
	label: string;
	value?: string;
	helper?: string;
	error?: string;
	invalid?: boolean;
	disabled?: boolean;
	required?: boolean;
	readOnly?: boolean;
	multiline?: boolean;
	size?: "sm" | "md" | "lg";
} = $props();
</script>

<ArkField.Root class={`${field()} data-disabled:opacity-50 ${className}`} {invalid} {disabled} {readOnly} {required}>
 <ArkField.Label class={labelStyle()}>{label}<ArkField.RequiredIndicator class="ml-xs text-danger" /></ArkField.Label>
 {#if multiline}
  <ArkField.Textarea {...attributes} rows={attributes.rows ?? 4} class={`${input({ size })} resize-y`} bind:value />
 {:else}
  <ArkField.Input {...attributes} class={input({ size })} bind:value />
 {/if}
 {#if helper}<ArkField.HelperText class="text-xs text-muted-foreground">{helper}</ArkField.HelperText>{/if}
 {#if error}<ArkField.ErrorText class="text-xs text-danger">{error}</ArkField.ErrorText>{/if}
</ArkField.Root>
