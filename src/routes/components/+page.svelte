<script lang="ts">
import { resolve } from "$app/paths";
import { examples, titleFor } from "$lib/components-docs/catalog";
</script>

<svelte:head><title>Components — Hue Studio</title></svelte:head>
<div class="max-w-intro">
  <p class="font-mono text-xs text-primary">SLICK / COMPONENTS</p>
  <h1 class="mt-md text-display font-bold leading-tight max-phone:text-mobile-display">The component library.</h1>
  <p class="mt-lg text-base leading-relaxed text-muted-foreground">Theme-aware controls built on Ark UI. Explore a component to see it in action and copy its Svelte usage.</p>
  <h2 class="mt-2xl border-b border-border pb-sm text-section font-semibold">Live examples</h2>
  <div class="grid grid-cols-2 gap-sm py-md max-phone:grid-cols-1">
    {#each Object.keys(examples) as slug (slug)}
      <a href={resolve('/components/[slug]', { slug })} class="flex items-center justify-between rounded-xs border border-border bg-surface px-md py-md text-sm font-semibold text-foreground no-underline hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">{titleFor(slug)} <span aria-hidden="true">↗</span></a>
    {/each}
  </div>
  <p class="mt-md text-sm text-muted-foreground">The sidebar also lists components still awaiting theme wrappers. Their pages show the current status rather than a non-working example.</p>
</div>
