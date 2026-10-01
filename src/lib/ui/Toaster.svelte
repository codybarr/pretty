<script lang="ts">
import {
	Toast,
	Toaster as ArkToaster,
	type CreateToasterReturn,
} from "@ark-ui/svelte/toast";
import {
	IconCircleCheck,
	IconAlertCircle,
	IconAlertTriangle,
	IconInfoCircle,
	IconLoader2,
	IconX,
} from "@tabler/icons-svelte";
import { button, focus } from "./variants";
import { toastDrag } from "./toast-drag";

let {
	toaster,
	class: className = "",
}: { toaster: CreateToasterReturn; class?: string } = $props();
const icons = {
	success: IconCircleCheck,
	error: IconAlertCircle,
	warning: IconAlertTriangle,
	info: IconInfoCircle,
	loading: IconLoader2,
};
</script>

<!-- Keep the viewport in the local tree so preview theme tokens are inherited. -->
<ArkToaster {toaster} class={`toast-viewport ${className}`}>
  {#snippet children(toast)}
    {@const Icon = icons[toast().type as keyof typeof icons] ?? IconInfoCircle}
    <Toast.Root {@attach toastDrag(() => toaster.dismiss(toast().id))} class="toast-root flex items-center gap-sm rounded-md border border-border bg-surface p-md text-surface-foreground shadow-lg">
      <span class="toast-icon shrink-0" data-loading={toast().type === 'loading' || undefined}><Icon size={20} aria-hidden="true" /></span>
      <div class="min-w-0 flex-1">
        {#if toast().title}<Toast.Title class="text-sm font-semibold leading-normal wrap-anywhere">{toast().title}</Toast.Title>{/if}
        {#if toast().description}<Toast.Description class="mt-xs text-sm leading-relaxed text-muted-foreground wrap-anywhere">{toast().description}</Toast.Description>{/if}
      </div>
      {#if toast().action}<Toast.ActionTrigger class={button({ variant: 'outline', size: 'sm' })}>{toast().action?.label}</Toast.ActionTrigger>{/if}
      <Toast.CloseTrigger class={`grid size-button-sm shrink-0 cursor-pointer place-items-center rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground ${focus()}`} aria-label="Dismiss notification"><IconX size={18} aria-hidden="true" /></Toast.CloseTrigger>
    </Toast.Root>
  {/snippet}
</ArkToaster>

<style>
  :global(.toast-viewport) {
    width: min(24rem, calc(100vw - 2 * var(--spacing-md)));
    z-index: 60;
  }
  :global(.toast-root) {
    --toast-accent: var(--color-info);
    width: 100%;
    min-height: calc(2 * var(--spacing-md) + var(--spacing-2xl));
    touch-action: pan-y;
    /* Ark may supply unitless zero: don't add it to a length inside calc(). */
    translate: var(--x) var(--y);
    transform: translateX(var(--toast-drag-x, 0px));
    scale: var(--scale);
    z-index: var(--z-index);
    height: var(--height);
    opacity: var(--opacity);
    will-change: translate, opacity, scale;
    transition: translate 400ms, transform 200ms, scale 400ms, opacity 400ms, height 400ms, box-shadow 200ms;
    transition-timing-function: cubic-bezier(0.21, 1.02, 0.73, 1);
  }
  :global(.toast-root[data-dragging]) {
    transition: none;
    cursor: grabbing;
    user-select: none;
  }
  :global(.toast-root[data-state='closed']) {
    /* Keep Ark's stack position while the exit travels right and fades. */
    translate: var(--x) 0;
    pointer-events: none;
    transition: none;
  }
  :global(.toast-root[data-state='closed']:not([data-drag-exit])) {
    animation: toast-exit 150ms ease-out both;
  }
  :global(.toast-root[data-state='closed'][data-stack]) {
    translate: var(--x) calc(var(--lift) * var(--offset));
  }
  :global(.toast-root[data-state='closed'][data-overlap][data-sibling]) {
    translate: var(--x) calc(var(--lift-amount) * var(--index));
  }
  @keyframes toast-exit {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(3rem); }
  }
  :global(.toast-root[data-type='success']) { --toast-accent: var(--color-success); }
  :global(.toast-root[data-type='error']) { --toast-accent: var(--color-danger); }
  :global(.toast-root[data-type='warning']) { --toast-accent: var(--color-warning); }
  :global(.toast-root[data-type='loading']) { --toast-accent: var(--color-muted-foreground); }
  .toast-icon { color: var(--toast-accent); }
  .toast-icon[data-loading] { animation: toast-spin 1s linear infinite; }
  @keyframes toast-spin { to { transform: rotate(360deg); } }
  @keyframes toast-exit-reduced { from { opacity: 1; } to { opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    :global(.toast-root), :global(.toast-root[data-state='closed']) { transition-duration: 0.01ms; }
    :global(.toast-root[data-state='closed']:not([data-drag-exit])) { animation: toast-exit-reduced 100ms ease-out both; }
    .toast-icon[data-loading] { animation: none; }
  }
</style>
