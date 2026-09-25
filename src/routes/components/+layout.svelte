<script lang="ts">
import { page } from "$app/state";
import { resolve } from "$app/paths";
import ThemeSwitcher from "$lib/ThemeSwitcher.svelte";
import {
	allSlugs,
	examples,
	groups,
	titleFor,
} from "$lib/components-docs/catalog";
let { children } = $props();
</script>

<svelte:head>
  <meta name="description" content="Theme-aware Svelte components built with Ark UI." />
</svelte:head>

<div class="mx-auto max-w-shell px-xl text-foreground max-tablet:px-lg" data-design="slick">
  <header class="flex min-h-3xl flex-wrap items-center justify-between gap-sm border-b border-border py-sm max-phone:min-h-2xl">
    <a href={resolve('/')} class="text-brand font-bold text-foreground no-underline">hue<span class="text-primary">studio</span></a>
    <div class="flex items-center gap-md max-phone:w-full max-phone:justify-between">
      <ThemeSwitcher />
      <nav aria-label="Main navigation" class="flex items-center gap-lg text-sm max-phone:gap-sm">
        <a href={resolve('/')} class="text-muted-foreground hover:text-primary">Workshop</a>
        <a href={resolve('/components')} aria-current="page" class="font-semibold text-primary">Components</a>
      </nav>
    </div>
  </header>
  <div class="catalog-columns grid gap-2xl max-tablet:gap-0">
    <aside class="min-w-0 border-r border-border pr-lg max-tablet:border-r-0 max-tablet:border-b max-tablet:pr-0" aria-label="Component catalog">
      <div class="sticky top-0 max-h-screen overflow-y-auto py-xl max-tablet:static max-tablet:max-h-2xl max-tablet:overflow-x-auto max-tablet:overflow-y-hidden max-tablet:py-sm">
        <a href={resolve('/components')} class="mb-lg block font-mono text-xs text-muted-foreground max-tablet:hidden">SLICK / COMPONENT LIBRARY <span class="text-primary">/ {allSlugs.length}</span></a>
        <nav aria-label="Components" class="grid gap-lg max-tablet:flex max-tablet:gap-md">
          {#each groups as group (group.title)}
            <div class="grid gap-xs max-tablet:flex max-tablet:items-center max-tablet:gap-sm">
              <h2 class="mb-xs font-mono text-xs text-muted-foreground max-tablet:mb-0 max-tablet:whitespace-nowrap">{group.title}</h2>
              {#each group.slugs as slug (slug)}
                <a href={resolve('/components/[slug]', { slug })} aria-current={page.url.pathname.endsWith(`/${slug}`) ? 'page' : undefined} class={`rounded-xs px-sm py-xs text-sm no-underline hover:bg-muted max-tablet:whitespace-nowrap ${page.url.pathname.endsWith(`/${slug}`) ? 'bg-accent font-semibold text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`} >
                  {titleFor(slug)}{#if examples[slug]}<span class="ml-sm text-primary" aria-label="Live example available">•</span>{/if}
                </a>
              {/each}
            </div>
          {/each}
        </nav>
      </div>
    </aside>
    <main id="content" class="min-w-0 py-2xl max-phone:py-xl">{@render children()}</main>
  </div>
</div>

<style>
  .catalog-columns { grid-template-columns: minmax(14rem, 17rem) minmax(0, 1fr); }
  @media (max-width: 53.125rem) { .catalog-columns { grid-template-columns: minmax(0, 1fr); } }
</style>
