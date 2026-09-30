<script lang="ts">
import {
	Button,
	Checkbox,
	Combobox,
	Dialog,
	Select,
	Switch,
	Tabs,
} from "$lib/ui";

let { slug }: { slug: string } = $props();
let accepted = $state(false);
let clicks = $state(0);
const buttonVariants = [
	"primary",
	"secondary",
	"outline",
	"ghost",
	"danger",
] as const;
const buttonSizes = ["sm", "md", "lg"] as const;
let small = $state(true);
let medium = $state(true);
let large = $state(true);
let team = $state<string[]>([]);
let tab = $state("overview");
const options = [
	{ label: "Design", value: "design" },
	{ label: "Engineering", value: "engineering" },
	{ label: "Product", value: "product" },
];
</script>

{#snippet overview()}<p class="text-sm text-muted-foreground">Your workspace at a glance. Everything is up to date.</p>{/snippet}
{#snippet activity()}<p class="text-sm text-muted-foreground">No recent activity to show.</p>{/snippet}
{#snippet openDetails()}Open details{/snippet}

{#if slug === 'button'}
  <div class="grid gap-lg">
    {#each buttonSizes as size (size)}
      <div class="flex flex-wrap items-center gap-sm">
        <span class="w-xl font-mono text-xs text-muted-foreground">{size}</span>
        {#each buttonVariants as variant (variant)}
          <Button {variant} {size} onclick={() => clicks += 1}>{variant[0].toUpperCase() + variant.slice(1)}</Button>
        {/each}
      </div>
    {/each}
    <div class="flex flex-wrap items-center gap-sm">
      <span class="w-xl font-mono text-xs text-muted-foreground">Off</span>
      {#each buttonVariants as variant (variant)}
        <Button {variant} disabled>{variant[0].toUpperCase() + variant.slice(1)}</Button>
      {/each}
    </div>
    <p class="font-mono text-xs text-muted-foreground" aria-live="polite">Clicks: {clicks}</p>
  </div>
{:else if slug === 'checkbox'}
  <div class="grid gap-md"><Checkbox label="Send me product updates" name="updates" bind:checked={accepted} /><p class="font-mono text-xs text-muted-foreground">Checked: {accepted ? 'true' : 'false'}</p></div>
{:else if slug === 'switch'}
  <div class="grid gap-md">
    <Switch label="Small (sm)" size="sm" bind:checked={small} />
    <Switch label="Medium (md, default)" size="md" bind:checked={medium} />
    <Switch label="Large (lg)" size="lg" bind:checked={large} />
  </div>
{:else if slug === 'select'}
  <div class="grid max-w-picker gap-md"><Select label="Team" {options} bind:value={team} name="team" /><p class="font-mono text-xs text-muted-foreground">Selected: {team[0] ?? 'none'}</p></div>
{:else if slug === 'combobox'}
  <div class="grid max-w-picker gap-md"><Combobox label="Team" {options} bind:value={team} name="team" /><p class="font-mono text-xs text-muted-foreground">Selected: {team[0] ?? 'none'}</p></div>
{:else if slug === 'tabs'}
  <div class="w-full max-w-copy"><Tabs bind:value={tab} tabs={[{ label: 'Overview', value: 'overview', content: overview }, { label: 'Activity', value: 'activity', content: activity }]} /></div>
{:else if slug === 'dialog'}
  <Dialog title="Details" description="Review the information below." trigger={openDetails}><p>Your details go here.</p></Dialog>
{/if}
