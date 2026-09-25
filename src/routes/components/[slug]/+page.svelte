<script lang="ts">
import { examples, titleFor } from "$lib/components-docs/catalog";
import { resolve } from "$app/paths";
import ComponentDemo from "$lib/components-docs/ComponentDemo.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
let example = $derived(examples[data.slug]);
let copied = $state(false);

async function copyCode() {
	if (!example || !navigator.clipboard) return;
	try {
		await navigator.clipboard.writeText(example.code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	} catch {
		copied = false;
	}
}
</script>

<svelte:head><title>{titleFor(data.slug)} — Hue Studio Components</title></svelte:head>

<div class="max-w-intro">
  <div class="flex items-center gap-sm font-mono text-xs text-muted-foreground"><a href={resolve('/components')} class="text-primary hover:underline">COMPONENTS</a><span>/</span><span>{titleFor(data.slug).toUpperCase()}</span></div>
  <h1 class="mt-md text-display font-bold leading-tight max-phone:text-mobile-display">{titleFor(data.slug)}</h1>
  {#if example}
    <p class="mt-md text-base leading-relaxed text-muted-foreground">{example.summary}</p>
  {:else}
    <p class="mt-md text-base leading-relaxed text-muted-foreground">This Ark UI primitive is in the catalog, but its theme-aware wrapper and tested demo are not implemented yet.</p>
  {/if}
</div>

{#if example}
  <section class="mt-2xl" aria-labelledby="preview-title">
    <div class="flex items-end justify-between border-b border-border pb-sm"><div><p class="font-mono text-xs text-primary">01 / INTERACTIVE</p><h2 id="preview-title" class="mt-xs text-section font-semibold">Live preview</h2></div><span class="font-mono text-xs text-muted-foreground">TRY IT OUT</span></div>
    <div class="min-h-picker-area rounded-xs border border-border bg-background p-xl text-foreground max-phone:p-md"><ComponentDemo slug={data.slug} /></div>
  </section>
  <section class="mt-2xl" aria-labelledby="code-title">
    <div class="border-b border-border pb-sm"><p class="font-mono text-xs text-primary">02 / IMPLEMENTATION</p><h2 id="code-title" class="mt-xs text-section font-semibold">Usage</h2></div>
    <div class="mt-md overflow-hidden rounded-sm border border-code-border bg-code">
      <div class="flex min-h-2xl items-center justify-between border-b border-code-border bg-code-header px-md">
        <span class="flex items-center gap-sm font-mono text-xs text-code-foreground"><span class="size-xs rounded-full bg-primary"></span> SVELTE</span>
        <button type="button" onclick={copyCode} class="cursor-pointer rounded-xs px-sm py-xs font-mono text-xs text-code-foreground hover:bg-code focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" aria-live="polite">{copied ? 'Copied ✓' : 'Copy code'}</button>
      </div>
      <div class="highlighted-code" role="region" aria-label="Svelte code example"><pre><code>{#each data.codeLines ?? [] as line (line.number)}<span class="code-line">{#each line.tokens as token (token.offset)}<span style:color={token.color}>{token.content}</span>{/each}</span>{/each}</code></pre></div>
    </div>
  </section>
{:else}
  <div class="mt-2xl border-t border-border pt-lg"><p class="font-mono text-xs text-primary">IN THE ROADMAP</p><p class="mt-sm max-w-intro text-sm leading-relaxed text-muted-foreground">No copyable usage example is shown until a working, accessible implementation is available. See the documented audit in <code>docs/agents/ark-ui-audit.md</code> for the implementation batches.</p></div>
{/if}

<style>
  .highlighted-code { overflow-x: auto; }
  .highlighted-code pre {
    margin: 0;
    padding: 1.25rem 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    line-height: 1.8;
    tab-size: 2;
  }

  .highlighted-code code { counter-reset: line; }
  .code-line { display: block; min-width: max-content; counter-increment: line; }
  .code-line::before {
    content: counter(line);
    display: inline-block;
    width: 2.25rem;
    margin-right: 1.25rem;
    border-right: 1px solid rgb(255 255 255 / 0.12);
    color: #8b949e;
    user-select: none;
  }
</style>
