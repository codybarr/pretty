<script lang="ts">
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import { IconX } from "@tabler/icons-svelte";
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
	triggerClass = button(),
	triggerLabel,
	triggerTitle,
	initialFocusEl,
	layout = "default",
}: {
	title: string;
	description?: string;
	trigger: Snippet;
	children: Snippet;
	open?: boolean;
	size?: "sm" | "md";
	class?: string;
	triggerClass?: string;
	triggerLabel?: string;
	triggerTitle?: string;
	initialFocusEl?: () => HTMLElement | null;
	layout?: "default" | "search";
} = $props();
</script>

<ArkDialog.Root bind:open {initialFocusEl} lazyMount={layout === 'search'} unmountOnExit={layout === 'search'}>
  <ArkDialog.Trigger class={triggerClass} aria-label={triggerLabel} title={triggerTitle}>{@render trigger()}</ArkDialog.Trigger>
  <!-- Non-portaled so locally scoped preview theme variables reach the overlay. -->
  <ArkDialog.Backdrop class="fixed inset-0 z-40 bg-foreground/40" />
  <ArkDialog.Positioner class={`fixed inset-0 z-50 flex justify-center overflow-y-auto p-md ${layout === 'search' ? 'items-start pt-4xl max-phone:pt-xl' : 'items-center'}`}>
    <ArkDialog.Content class={`${panel()} ${layout === 'search' ? 'relative w-full max-w-copy overflow-hidden' : dialogContent({ size })} ${className}`} >
      <ArkDialog.Title class={layout === 'search' ? 'sr-only' : 'pr-2xl text-section font-semibold text-foreground'}>{title}</ArkDialog.Title>
      {#if description}<ArkDialog.Description class="mt-xs text-sm text-muted-foreground">{description}</ArkDialog.Description>{/if}
      <div class={layout === 'search' ? 'text-sm text-foreground' : 'mt-md text-sm text-foreground'}>{@render children()}</div>
      <ArkDialog.CloseTrigger class={`absolute right-xs top-xs grid size-2xl cursor-pointer place-items-center rounded-xs text-muted-foreground ${focus()}`} aria-label="Close dialog">
        <IconX size={24} aria-hidden="true" />
      </ArkDialog.CloseTrigger>
    </ArkDialog.Content>
  </ArkDialog.Positioner>
</ArkDialog.Root>
