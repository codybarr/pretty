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
			"dialog drawer popover tooltip hover-card menu toast listbox navigation-menu floating-panel tour".split(
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
	checkbox: {
		summary:
			"A form-ready boolean choice with a visible label, keyboard focus, and an Ark hidden input.",
		code: `<script lang="ts">\n  import { Checkbox } from '$lib/ui';\n  let accepted = $state(false);\n</script>\n\n<Checkbox label="Send me product updates" name="updates" bind:checked={accepted} />`,
	},
	switch: {
		summary:
			"Use a switch for an immediately applied setting, rather than a submitted form choice.",
		code: `<script lang="ts">\n  import { Switch } from '$lib/ui';\n  let enabled = $state(true);\n</script>\n\n<Switch label="Email notifications" bind:checked={enabled} />`,
	},
	select: {
		summary:
			"Choose one option from a fixed list. The bindable value follows Ark’s string-array convention.",
		code: `<script lang="ts">\n  import { Select } from '$lib/ui';\n  let value = $state<string[]>([]);\n  const options = [\n    { label: 'Design', value: 'design' },\n    { label: 'Engineering', value: 'engineering' },\n    { label: 'Product', value: 'product' },\n  ];\n</script>\n\n<Select label="Team" {options} bind:value name="team" />`,
	},
	tabs: {
		summary:
			"Switch among peer content panels with roving focus and arrow-key navigation.",
		code: `<script lang="ts">\n  import { Tabs } from '$lib/ui';\n  let active = $state('overview');\n</script>\n\n{#snippet overview()}Overview content{/snippet}\n{#snippet activity()}Recent activity{/snippet}\n\n<Tabs bind:value={active} tabs={[\n  { label: 'Overview', value: 'overview', content: overview },\n  { label: 'Activity', value: 'activity', content: activity },\n]} />`,
	},
	dialog: {
		summary:
			"A modal task surface with Ark-managed focus trapping, dismissal, and return focus.",
		code: `<script lang="ts">\n  import { Dialog } from '$lib/ui';\n</script>\n\n{#snippet trigger()}Open details{/snippet}\n<Dialog title="Details" description="Review the information below." {trigger}>\n  <p>Your details go here.</p>\n</Dialog>`,
	},
};
