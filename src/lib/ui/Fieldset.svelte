<script lang="ts">
import { Fieldset as ArkFieldset } from "@ark-ui/svelte/fieldset";
import type { ComponentProps, Snippet } from "svelte";

let {
	legend,
	helper,
	error,
	children,
	class: className = "",
	...props
}: Omit<ComponentProps<typeof ArkFieldset.Root>, "children"> & {
	legend: string;
	helper?: string;
	error?: string;
	children: Snippet;
} = $props();
</script>

<ArkFieldset.Root {...props} class={`m-0 min-w-0 border-0 p-0 text-foreground data-disabled:opacity-50 ${className}`}>
 <ArkFieldset.Legend class="mb-sm p-0 text-base font-semibold">{legend}</ArkFieldset.Legend>
 <div class="grid gap-md">
  {#if helper}<ArkFieldset.HelperText class="text-sm text-muted-foreground">{helper}</ArkFieldset.HelperText>{/if}
  {@render children()}
  {#if error}<ArkFieldset.ErrorText class="text-xs text-danger">{error}</ArkFieldset.ErrorText>{/if}
 </div>
</ArkFieldset.Root>
