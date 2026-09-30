<script lang="ts">
import {
	Button,
	Checkbox,
	Combobox,
	Dialog,
	Field,
	Fieldset,
	RadioGroup,
	NumberInput,
	PasswordInput,
	Select,
	Switch,
	Tabs,
} from "$lib/ui";

let { slug }: { slug: string } = $props();
let displayName = $state("");
let notes = $state("");
let plan = $state<string | null>("design");
let seats = $state("3");
let password = $state("");
let formDisabled = $state(false);
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
{:else if slug === 'field'}
  <div class="grid w-full max-w-copy gap-lg">
    <Field label="Display name" name="displayName" placeholder="Your name" helper="Visible to everyone in your workspace." required bind:value={displayName} />
    <Field label="Email address" type="email" name="email" value="not-an-email" invalid error="Enter a valid email address." />
    <Field label="Notes" name="notes" multiline placeholder="Add a note…" bind:value={notes} />
    <Field label="Workspace ID" value="workspace_042" readOnly size="sm" />
    <Field label="Managed by your organization" value="Cody Barr" disabled />
  </div>
{:else if slug === 'fieldset'}
  <div class="grid w-full max-w-copy gap-lg">
    <Switch label="Lock contact details" bind:checked={formDisabled} />
    <Fieldset legend="Contact details" helper="Where we can reach you." disabled={formDisabled}>
      <Field label="Full name" name="fullName" autocomplete="name" placeholder="Cody Barr" required bind:value={displayName} />
      <Field label="Email address" name="email" type="email" autocomplete="email" placeholder="cody@example.com" />
    </Fieldset>
    <Fieldset legend="Billing details" invalid error="A billing address is required.">
      <Field label="Street address" name="street" autocomplete="street-address" invalid error="Enter your street address." />
    </Fieldset>
  </div>
{:else if slug === 'radio-group'}
  <div class="grid w-full max-w-copy gap-lg">
    <RadioGroup label="Team" {options} name="team" required bind:value={plan} helper="Choose your primary team." />
    <RadioGroup label="Delivery" orientation="horizontal" size="sm" value="weekly" options={[{ label: 'Daily', value: 'daily' }, { label: 'Weekly', value: 'weekly' }, { label: 'Monthly', value: 'monthly', disabled: true }]} />
    <RadioGroup label="Access level" options={[{ label: 'Member', value: 'member' }, { label: 'Admin', value: 'admin' }]} value="member" disabled />
    <RadioGroup label="Billing cycle" size="lg" options={[{ label: 'Monthly', value: 'month' }, { label: 'Yearly', value: 'year' }]} invalid error="Choose a billing cycle." />
  </div>
{:else if slug === 'number-input'}
  <div class="grid w-full max-w-picker gap-lg">
    <NumberInput label="Seats" name="seats" min={1} max={10} required bind:value={seats} helper="Between 1 and 10 seats." />
    <NumberInput label="Budget" name="budget" size="lg" value="125.5" min={0} step={0.5} formatOptions={{ style: 'currency', currency: 'USD' }} />
    <NumberInput label="Quantity" size="sm" invalid error="Quantity is required." />
    <NumberInput label="Read-only quantity" value="12" readOnly />
    <NumberInput label="Unavailable" value="5" disabled />
  </div>
{:else if slug === 'password-input'}
  <div class="grid w-full max-w-copy gap-lg">
    <PasswordInput label="Password" name="password" required bind:value={password} helper="Use at least 12 characters." autocomplete="new-password" />
    <PasswordInput label="Confirm password" size="lg" name="confirmPassword" autocomplete="new-password" invalid error="Passwords do not match." />
    <PasswordInput label="Read-only password" size="sm" value="read-only-example" readOnly />
    <PasswordInput label="Unavailable" value="disabled-example" disabled />
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
