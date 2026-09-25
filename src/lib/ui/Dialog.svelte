<script lang="ts">
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import { button, dialogContent, focus, panel } from "./variants";
import type { Snippet } from "svelte";

let {
	title,
	description,
	trigger,
	children,
	open = $bindable(false),
	size = "md",
	class: className = "",
}: {
	title: string;
	description?: string;
	trigger: Snippet;
	children: Snippet;
	open?: boolean;
	size?: "sm" | "md";
	class?: string;
} = $props();
</script>

<ArkDialog.Root bind:open>
  <ArkDialog.Trigger class={button()}>{@render trigger()}</ArkDialog.Trigger>
  <!-- Non-portaled so locally scoped preview theme variables reach the overlay. -->
  <ArkDialog.Backdrop class="fixed inset-0 z-40 bg-foreground/40" />
  <ArkDialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-md">
    <ArkDialog.Content class={`${panel()} ${dialogContent({ size })} ${className}`} >
      <ArkDialog.Title class="pr-lg text-section font-semibold text-foreground">{title}</ArkDialog.Title>
      {#if description}<ArkDialog.Description class="mt-xs text-sm text-muted-foreground">{description}</ArkDialog.Description>{/if}
      <div class="mt-md text-sm text-foreground">{@render children()}</div>
      <ArkDialog.CloseTrigger class={`absolute right-sm top-sm grid size-lg cursor-pointer place-items-center rounded-xs text-muted-foreground hover:bg-muted ${focus()}`}  aria-label="Close dialog">×</ArkDialog.CloseTrigger>
    </ArkDialog.Content>
  </ArkDialog.Positioner>
</ArkDialog.Root>
