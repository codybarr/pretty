<script lang="ts">
import {
	ColorPicker as ArkColorPicker,
	parseColor,
} from "@ark-ui/svelte/color-picker";
import { Portal } from "@ark-ui/svelte/portal";
import { IconColorPicker } from "@tabler/icons-svelte";
import type { ComponentProps } from "svelte";
import { focus, input, label as labelStyle, panel } from "./variants";

let {
	label,
	value = $bindable(parseColor("#e4573e")),
	alpha = true,
	hideLabel = false,
	class: className = "",
	...props
}: Omit<
	ComponentProps<typeof ArkColorPicker.Root>,
	"children" | "value" | "format" | "defaultFormat"
> & {
	label: string;
	value?: ComponentProps<typeof ArkColorPicker.Root>["value"];
	alpha?: boolean;
	hideLabel?: boolean;
} = $props();

const thumb = `picker-thumb absolute size-sm rounded-full ${focus()}`;
const action = `grid size-button-md shrink-0 place-items-center overflow-hidden rounded-sm border border-border bg-surface p-0 text-foreground cursor-pointer enabled:hover:border-muted-foreground disabled:cursor-not-allowed ${focus()}`;
</script>

<!-- Hue sliders require a hue-capable internal color format for keyboard stepping. -->
<ArkColorPicker.Root {...props} format="hsla" bind:value class={`grid gap-sm text-foreground data-disabled:opacity-50 ${className}`}>
  <ArkColorPicker.Label class={hideLabel ? 'sr-only' : labelStyle()}>{label}</ArkColorPicker.Label>
  <ArkColorPicker.Control class="flex items-center gap-sm">
    <ArkColorPicker.ChannelInput channel="hex" aria-label={`${label} hex value`} class={`${input()} flex-1 font-mono`} />
    {#if alpha}
      <div class="w-3xl shrink-0">
        <ArkColorPicker.ChannelInput channel="alpha" aria-label={`${label} opacity`} class={`${input()} tabular-nums`} />
      </div>
    {/if}
    <ArkColorPicker.Trigger class={action} aria-label={`Open ${label.toLowerCase()} picker`} title="Open color picker">
      <div class="relative grid size-xl overflow-hidden rounded-xs">
        <ArkColorPicker.TransparencyGrid class="col-start-1 row-start-1 size-full" />
        <ArkColorPicker.ValueSwatch respectAlpha={alpha} class="z-10 col-start-1 row-start-1 size-full" />
      </div>
    </ArkColorPicker.Trigger>
  </ArkColorPicker.Control>
  <Portal>
    <ArkColorPicker.Positioner>
      <ArkColorPicker.Content class={`${panel()} picker-content flex flex-col gap-sm rounded-md p-md outline-none`}>
        <ArkColorPicker.Area class="relative h-picker-area touch-none overflow-hidden rounded-sm">
          <ArkColorPicker.AreaBackground class="size-full rounded-sm" />
          <ArkColorPicker.AreaThumb class={thumb} />
        </ArkColorPicker.Area>
        <div class="flex items-center gap-sm">
          <ArkColorPicker.EyeDropperTrigger class={action} aria-label="Pick color from screen" title="Pick color from screen">
            <IconColorPicker size={16} aria-hidden="true" />
          </ArkColorPicker.EyeDropperTrigger>
          <div class="flex min-w-0 flex-1 flex-col gap-sm">
            <ArkColorPicker.ChannelSlider channel="hue" class="picker-slider relative touch-none rounded-xs">
              <ArkColorPicker.ChannelSliderTrack class="size-full rounded-xs" />
              <ArkColorPicker.ChannelSliderThumb class={thumb} />
            </ArkColorPicker.ChannelSlider>
            {#if alpha}
              <ArkColorPicker.ChannelSlider channel="alpha" class="picker-slider relative touch-none rounded-xs">
                <ArkColorPicker.TransparencyGrid class="absolute inset-0 size-full rounded-xs" />
                <ArkColorPicker.ChannelSliderTrack class="relative size-full rounded-xs" />
                <ArkColorPicker.ChannelSliderThumb class={thumb} />
              </ArkColorPicker.ChannelSlider>
            {/if}
          </div>
        </div>
      </ArkColorPicker.Content>
    </ArkColorPicker.Positioner>
  </Portal>
  <ArkColorPicker.HiddenInput />
</ArkColorPicker.Root>

<style>
  :global(.picker-content) {
    width: 16rem;
    max-width: calc(100vw - 2 * var(--spacing-md));
    transform-origin: var(--transform-origin);
  }

  :global(.picker-slider) {
    height: 0.625rem;
  }

  :global(.picker-thumb) {
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 2px white, 0 0 0 3px rgb(0 0 0 / 15%), 0 1px 3px rgb(0 0 0 / 15%);
  }

  :global(.picker-content[data-state="open"]) {
    animation: picker-enter 150ms ease-out;
  }

  @keyframes picker-enter {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.picker-content) { animation: none; }
  }
</style>
