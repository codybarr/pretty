<script lang="ts">
import { Checkbox, Dialog, Select, Switch, Tabs } from "$lib/ui";

let { slug }: { slug: string } = $props();
let accepted = $state(false);
let enabled = $state(true);
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

{#if slug === 'checkbox'}
  <div class="grid gap-md"><Checkbox label="Send me product updates" name="updates" bind:checked={accepted} /><p class="font-mono text-xs text-muted-foreground">Checked: {accepted ? 'true' : 'false'}</p></div>
{:else if slug === 'switch'}
  <div class="grid gap-md"><Switch label="Email notifications" bind:checked={enabled} /><p class="font-mono text-xs text-muted-foreground">Enabled: {enabled ? 'true' : 'false'}</p></div>
{:else if slug === 'select'}
  <div class="grid max-w-picker gap-md"><Select label="Team" {options} bind:value={team} name="team" /><p class="font-mono text-xs text-muted-foreground">Selected: {team[0] ?? 'none'}</p></div>
{:else if slug === 'tabs'}
  <div class="w-full max-w-copy"><Tabs bind:value={tab} tabs={[{ label: 'Overview', value: 'overview', content: overview }, { label: 'Activity', value: 'activity', content: activity }]} /></div>
{:else if slug === 'dialog'}
  <Dialog title="Details" description="Review the information below." trigger={openDetails}><p>Your details go here.</p></Dialog>
{/if}
