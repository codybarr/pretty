export const groups = [
	{
		title: "Forms & selection",
		slugs:
			"checkbox switch select combobox radio-group segment-group toggle toggle-group number-input password-input pin-input tags-input rating-group slider angle-slider editable field fieldset file-upload date-input date-picker".split(
				" ",
			),
	},
	{
		title: "Overlays & actions",
		slugs:
			"button dialog drawer popover tooltip hover-card menu toast listbox navigation-menu floating-panel tour".split(
				" ",
			),
	},
	{
		title: "Content & navigation",
		slugs:
			"tabs accordion collapsible carousel pagination steps tree-view toc scroll-area splitter json-tree-view marquee highlight progress avatar image-cropper color-picker signature-pad qr-code timer clipboard download-trigger swap".split(
				" ",
			),
	},
	{
		title: "Utilities",
		slugs:
			"client-only environment focus-trap format frame hotkeys locale portal presence".split(
				" ",
			),
	},
] as const;

export const titleFor = (slug: string) =>
	slug
		.split("-")
		.map((part) =>
			part === "qr" ? "QR" : part[0].toUpperCase() + part.slice(1),
		)
		.join(" ");
export const allSlugs = groups.flatMap((group) => group.slugs);

export const examples: Record<string, { summary: string; code: string }> = {
	field: {
		summary:
			"A labeled text input or textarea with Ark-managed helper/error associations and required indicators. Supports native input attributes, bindable string values, sm/md/lg sizes, invalid, disabled, and read-only states. Set multiline for a textarea; validation is supplied by the caller.",
		code: `<script lang="ts">\n  import { Field } from '$lib/ui';\n  let name = $state('');\n  let notes = $state('');\n</script>\n\n<Field label="Full name" name="name" autocomplete="name" required bind:value={name} helper="Your public display name." />\n<Field label="Notes" name="notes" multiline bind:value={notes} />\n<Field label="Email" type="email" invalid error="Enter a valid email address." />`,
	},
	fieldset: {
		summary:
			"Groups related fields under a semantic legend. Helper and error text are associated by Ark; disabled propagates to descendant fields. Accepts Ark Fieldset root props and a children snippet.",
		code: `<script lang="ts">\n  import { Field, Fieldset } from '$lib/ui';\n</script>\n\n<Fieldset legend="Contact details" helper="Where we can reach you.">\n  <Field label="Full name" name="name" autocomplete="name" required />\n  <Field label="Email" name="email" type="email" autocomplete="email" />\n</Fieldset>`,
	},
	"radio-group": {
		summary:
			"One choice from a visible set, with arrow-key navigation and native form inputs. Bind value as string or null. Supports disabled options, horizontal/vertical orientation, sm/md/lg sizes, required and invalid states, and Ark Radio Group root props.",
		code: `<script lang="ts">\n  import { RadioGroup } from '$lib/ui';\n  let team = $state<string | null>(null);\n</script>\n\n<RadioGroup label="Team" name="team" required bind:value={team} options={[\n  { label: 'Design', value: 'design' },\n  { label: 'Engineering', value: 'engineering' },\n  { label: 'Product', value: 'product', disabled: true },\n]} />`,
	},
	"number-input": {
		summary:
			"Precise numeric entry with keyboard and stepper controls. The bindable value is a string so empty and intermediate input remain representable. Supports Ark root props including min/max, step, formatting, name, required, disabled and read-only, plus helper/error text and sm/md/lg sizes.",
		code: `<script lang="ts">\n  import { NumberInput } from '$lib/ui';\n  let seats = $state('3');\n</script>\n\n<NumberInput label="Seats" name="seats" min={1} max={10} step={1} required bind:value={seats} helper="Between 1 and 10 seats." />`,
	},
	"password-input": {
		summary:
			"A labeled password field with Ark-managed visibility toggling. Bind value and optionally visible. Supports name, autocomplete (current-password by default), required, disabled, read-only, invalid, helper/error text and sm/md/lg sizes. Validation is supplied by the caller.",
		code: `<script lang="ts">\n  import { PasswordInput } from '$lib/ui';\n  let password = $state('');\n  let visible = $state(false);\n</script>\n\n<PasswordInput label="Password" name="password" autocomplete="new-password" required bind:value={password} bind:visible helper="Use at least 12 characters." />`,
	},
	button: {
		summary:
			"A native action button with primary (default), secondary, outline, ghost, and danger variants. Sizes sm, md (default), and lg have minimum heights of 32, 40, and 48px. Standard button attributes and events are forwarded; type defaults to button, so form submission is opt-in.",
		code: `<script lang="ts">\n  import { Button } from '$lib/ui';\n  let count = $state(0);\n</script>\n\n<Button onclick={() => count += 1}>Clicked {count} times</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="danger">Delete</Button>\n\n<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>\n<Button disabled>Unavailable</Button>\n<Button type="submit" form="settings">Save settings</Button>`,
	},
	"color-picker": {
		summary:
			"A compact color picker with hex and opacity inputs, a transparency-aware swatch, and a popover with a color area, hue/alpha sliders, and a screen eyedropper where supported. Bind value as an Ark Color object. Set alpha to false for solid colors, or hideLabel for an externally labeled layout. Accepts Ark root props including name, disabled, readOnly, and invalid.",
		code: `<script lang="ts">\n  import { ColorPicker } from '$lib/ui';\n  import { parseColor } from '@ark-ui/svelte/color-picker';\n  let color = $state(parseColor('#e4573e'));\n</script>\n\n<ColorPicker label="Color" name="color" bind:value={color} />\n<ColorPicker label="Solid color" alpha={false} />\n<ColorPicker label="Unavailable" disabled />`,
	},
	checkbox: {
		summary:
			"A form-ready boolean choice with a visible label, keyboard focus, and an Ark hidden input.",
		code: `<script lang="ts">\n  import { Checkbox } from '$lib/ui';\n  let accepted = $state(false);\n</script>\n\n<Checkbox label="Send me product updates" name="updates" bind:checked={accepted} />`,
	},
	switch: {
		summary:
			"Use a switch for an immediately applied setting, rather than a submitted form choice. Set size to sm (small, 2 × 1rem), md (medium, 3 × 1.5rem), or lg (large, 4 × 2rem). Dimensions are track width × height; md is the default.",
		code: `<script lang="ts">\n  import { Switch } from '$lib/ui';\n  let small = $state(true);\n  let medium = $state(true);\n  let large = $state(true);\n</script>\n\n<Switch label="Small" size="sm" bind:checked={small} />\n<Switch label="Medium (default)" size="md" bind:checked={medium} />\n<Switch label="Large" size="lg" bind:checked={large} />`,
	},
	select: {
		summary:
			"Choose one option from a fixed list. The bindable value follows Ark’s string-array convention.",
		code: `<script lang="ts">\n  import { Select } from '$lib/ui';\n  let value = $state<string[]>([]);\n  const options = [\n    { label: 'Design', value: 'design' },\n    { label: 'Engineering', value: 'engineering' },\n    { label: 'Product', value: 'product' },\n  ];\n</script>\n\n<Select label="Team" {options} bind:value name="team" />`,
	},
	combobox: {
		summary:
			"Search and select from a list with Arrow keys and Enter. Supports bindable value, disabled options, and an inline layout for command search overlays.",
		code: `<script lang="ts">\n  import { Combobox } from '$lib/ui';\n  let value = $state<string[]>([]);\n  const options = [\n    { label: 'Design', value: 'design' },\n    { label: 'Engineering', value: 'engineering' },\n    { label: 'Product', value: 'product' },\n  ];\n</script>\n\n<Combobox label="Team" {options} bind:value name="team" />`,
	},
	tabs: {
		summary:
			"Switch among peer content panels with roving focus and arrow-key navigation.",
		code: `<script lang="ts">\n  import { Tabs } from '$lib/ui';\n  let active = $state('overview');\n</script>\n\n{#snippet overview()}Overview content{/snippet}\n{#snippet activity()}Recent activity{/snippet}\n\n<Tabs bind:value={active} tabs={[\n  { label: 'Overview', value: 'overview', content: overview },\n  { label: 'Activity', value: 'activity', content: activity },\n]} />`,
	},
	toast: {
		summary:
			"Non-blocking feedback with semantic status icons, stacking, pause-on-hover, drag-to-dismiss, and optional inline actions. Create a toaster per component tree and render one Toaster for it. Supports success, error, warning, info, and loading; inherits local light/dark and corner tokens without a portal. Placement, duration, and maximum visible notifications are configured through Ark’s createToaster.",
		code: `<script lang="ts">\n  import { Button, Toaster, createToaster } from '$lib/ui';\n  const toaster = createToaster({\n    placement: 'bottom-end',\n    overlap: true,\n    gap: 12,\n    max: 4,\n    duration: 6000,\n    offsets: '1rem',\n  });\n</script>\n\n<Button onclick={() => toaster.success({\n  title: 'Changes saved',\n  description: 'Your workspace is up to date.',\n})}>Save changes</Button>\n\n<Button variant="outline" onclick={() => toaster.info({\n  title: 'Item archived',\n  action: { label: 'Undo', onClick: () => toaster.success({ title: 'Item restored' }) },\n})}>Archive</Button>\n\n<Toaster {toaster} />`,
	},
	dialog: {
		summary:
			"A modal task surface with Ark-managed focus trapping, dismissal, and return focus.",
		code: `<script lang="ts">\n  import { Dialog } from '$lib/ui';\n</script>\n\n{#snippet trigger()}Open details{/snippet}\n<Dialog title="Details" description="Review the information below." {trigger}>\n  <p>Your details go here.</p>\n</Dialog>`,
	},
};
