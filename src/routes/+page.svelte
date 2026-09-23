<script lang="ts">
import { resolve } from "$app/paths";
import { ColorPicker, parseColor } from "@ark-ui/svelte/color-picker";
import { SegmentGroup } from "@ark-ui/svelte/segment-group";
import { Tabs } from "@ark-ui/svelte/tabs";

let primary = $state(parseColor("#4967d5"));
let mode = $state<"light" | "dark">("light");
let corners = $state<"rounded" | "square">("rounded");
let saved = $state(false);

let hex = $derived(primary.toString("hex"));
let foreground = $derived(getForeground(hex));
let accent = $derived(`color-mix(in srgb, ${hex} ${mode === "light" ? "11%" : "24%"}, ${mode === "light" ? "white" : "#182033"})`);
let accentForeground = $derived(mode === "light" ? hex : "white");

function getForeground(color: string) {
	const channels = color.slice(1).match(/.{2}/g)?.map((channel) => parseInt(channel, 16) / 255) ?? [0, 0, 0];
	const [r, g, b] = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.42 ? "#172033" : "#ffffff";
}

const mono = "font-mono tracking-widest";
const kicker = `${mono} text-xs text-muted-foreground`;
const label = "text-sm font-semibold text-foreground";
const description = "text-sm leading-relaxed text-muted-foreground";
const segment = "relative z-10 cursor-pointer whitespace-nowrap rounded-xs px-sm py-sm text-sm text-muted-foreground data-[state=checked]:text-foreground data-focus-visible:outline-2 data-focus-visible:outline-primary";
const segmentRoot = "relative isolate flex rounded-xs border border-border bg-muted p-xs";
const segmentIndicator = "absolute segment-indicator z-0 rounded-xs bg-surface shadow-sm transition-all duration-150 motion-reduce:transition-none";
const field = "grid gap-xs font-mono text-xs tracking-wider text-muted-foreground";
const input = "w-full rounded-xs border border-border bg-background px-sm py-sm font-sans text-sm tracking-normal text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
</script>

<svelte:head>
	<title>Hue Studio — Theme builder</title>
	<meta name="description" content="Shape a color system and see it come to life in a realistic interface." />
</svelte:head>

<div class="mx-auto max-w-shell px-xl text-foreground max-tablet:px-lg">
	<header class="flex h-3xl items-center justify-between border-b border-border max-phone:h-2xl">
		<a class="flex items-center gap-sm text-brand font-bold text-foreground no-underline" href={resolve('/')} aria-label="Hue Studio home">
			<span class="flex h-md items-end gap-xs" aria-hidden="true"><span class="h-sm w-xs rotate-12 rounded-full bg-primary"></span><span class="h-md w-xs rotate-12 rounded-full bg-primary"></span><span class="h-md w-xs rotate-12 rounded-full bg-primary"></span></span>
			<span>hue<span class="font-medium text-muted-foreground">studio</span></span>
		</a>
		<div class="flex items-center gap-sm text-sm text-muted-foreground max-tablet:hidden"><span class="inline-block size-xs rounded-full bg-primary"></span> LIVE PREVIEW <span class="mx-xs h-md border-l border-border"></span> UNSAVED SESSION</div>
		<a class="text-sm text-muted-foreground no-underline hover:text-primary" href={resolve('/#preview')}>Explore preview <span aria-hidden="true">↗</span></a>
	</header>

	<main>
		<section class="max-w-intro pt-2xl pb-2xl min-wide:pt-3xl max-phone:pt-2xl max-phone:pb-xl">
			<div class="flex items-center gap-sm font-mono text-sm text-muted-foreground"><span>THEME WORKSHOP</span><span class="w-lg border-t border-border"></span><span>01 / 01</span></div>
			<h1 class="mt-md mb-sm font-serif text-display leading-none font-normal text-foreground max-phone:text-mobile-display">Color is a feeling.<br /><em class="font-normal text-primary">Make it yours.</em></h1>
			<p class="mt-md max-w-copy text-base leading-relaxed text-muted-foreground">A considered palette changes how everything feels. Start with one color, then see it find its place across a real interface.</p>
		</section>

		<div class="grid workspace-columns items-start gap-2xl pb-4xl min-wide:gap-4xl max-tablet:gap-lg max-phone:flex max-phone:flex-col max-phone:gap-xl max-phone:pb-2xl">
			<aside class="w-full rounded-xs border border-border bg-muted p-lg pb-md max-tablet:px-md max-tablet:py-md" aria-label="Theme controls">
				<div class="flex items-start justify-between"><div><div class={kicker}>YOUR FOUNDATION</div><h2 class="mt-sm font-serif text-2xl font-normal">Set the tone</h2></div><span class="grid size-lg place-items-center rounded-full border border-border font-serif text-sm text-muted-foreground">01</span></div>
				<p class="mt-sm mb-lg max-w-panel-copy text-sm leading-relaxed text-muted-foreground max-phone:max-w-copy">Choose a primary color. We’ll build a balanced accent around it.</p>
				<div class="mb-md">
					<div class="mb-sm flex items-center justify-between"><label class={label} for="primary-color-label">Primary color</label><span class={kicker}>FOUNDATION</span></div>
					<ColorPicker.Root class="relative block" bind:value={primary}>
						<ColorPicker.Label class="sr-only" id="primary-color-label">Primary color</ColorPicker.Label>
						<ColorPicker.Control class="flex h-2xl items-center rounded-xs border border-border bg-surface">
							<ColorPicker.ChannelInput class="min-w-0 flex-1 bg-transparent px-sm font-mono text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary" channel="hex" aria-label="Primary color hex value" />
							<ColorPicker.Trigger class="mr-sm flex h-lg w-2xl cursor-pointer items-center gap-xs rounded-xs border border-border bg-surface p-0 focus-visible:outline-2 focus-visible:outline-primary" aria-label="Open color picker"><ColorPicker.ValueSwatch class="h-full w-lg" /><span class="text-sm text-muted-foreground" aria-hidden="true">⌄</span></ColorPicker.Trigger>
						</ColorPicker.Control>
						<ColorPicker.Positioner>
							<ColorPicker.Content class="z-30 w-4xl rounded-xs border border-border bg-surface p-md shadow-xl">
								<ColorPicker.Area class="relative block h-picker-area touch-none overflow-hidden rounded-xs"><ColorPicker.AreaBackground class="absolute inset-0" /><ColorPicker.AreaThumb class="absolute size-md -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white outline outline-foreground" /></ColorPicker.Area>
								<div class="my-sm flex justify-between font-mono text-xs text-muted-foreground"><span>HUE</span><span>DRAG TO EXPLORE</span></div>
								<ColorPicker.ChannelSlider class="relative block h-sm touch-none rounded-full" channel="hue"><ColorPicker.ChannelSliderTrack class="absolute inset-x-0 top-xs h-xs rounded-full hue-spectrum" /><ColorPicker.ChannelSliderThumb class="absolute top-1/2 size-sm -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground bg-surface" /></ColorPicker.ChannelSlider>
						</ColorPicker.Content>
						</ColorPicker.Positioner>
						<ColorPicker.HiddenInput />
					</ColorPicker.Root>
					<div class="mt-md flex flex-wrap items-center gap-sm" aria-label="Suggested primary colors">
						<span class={`mb-xs w-full ${kicker}`}>A GOOD PLACE TO START</span>
						{#each ['#4967d5', '#247a68', '#bd543d', '#8159b7', '#d08a24'] as swatch (swatch)}
							<button class="size-md cursor-pointer rounded-full border-2 border-muted p-0 outline outline-transparent focus-visible:outline-primary aria-pressed:outline-foreground" style:background-color={swatch} aria-label="Use {swatch}" aria-pressed={hex.toLowerCase() === swatch.toLowerCase()} onclick={() => primary = parseColor(swatch)}></button>
						{/each}
					</div>
				</div>
				<div class="my-md border-t border-border"></div>
				<div class="mb-md flex items-center justify-between gap-sm max-tablet:flex-wrap"><div><div class={label}>Appearance</div><p class={description}>See your theme in different light.</p></div>
					<SegmentGroup.Root class={segmentRoot} bind:value={mode} orientation="horizontal" aria-label="Preview appearance"><SegmentGroup.Indicator class={segmentIndicator} /><SegmentGroup.Item class={segment} value="light"><SegmentGroup.ItemText>☼ Light</SegmentGroup.ItemText><SegmentGroup.ItemControl /><SegmentGroup.ItemHiddenInput /></SegmentGroup.Item><SegmentGroup.Item class={segment} value="dark"><SegmentGroup.ItemText>◐ Dark</SegmentGroup.ItemText><SegmentGroup.ItemControl /><SegmentGroup.ItemHiddenInput /></SegmentGroup.Item></SegmentGroup.Root>
				</div>
				<div class="mb-md flex items-center justify-between gap-sm max-tablet:flex-wrap"><div><div class={label}>Corners</div><p class={description}>Choose the shape of your surfaces.</p></div>
					<SegmentGroup.Root class={segmentRoot} bind:value={corners} orientation="horizontal" aria-label="Corner style"><SegmentGroup.Indicator class={segmentIndicator} /><SegmentGroup.Item class={segment} value="rounded"><SegmentGroup.ItemText>Rounded</SegmentGroup.ItemText><SegmentGroup.ItemControl /><SegmentGroup.ItemHiddenInput /></SegmentGroup.Item><SegmentGroup.Item class={segment} value="square"><SegmentGroup.ItemText>Square</SegmentGroup.ItemText><SegmentGroup.ItemControl /><SegmentGroup.ItemHiddenInput /></SegmentGroup.Item></SegmentGroup.Root>
				</div>
				<div class="mt-lg border-t border-border pt-md"><div class={`mb-sm flex justify-between ${kicker}`}><span>GENERATED TOKENS</span><span class="text-primary">● LIVE</span></div>
					<div class="grid h-lg token-columns items-center gap-sm"><span class="size-sm rounded-full bg-primary" style:background-color={hex}></span><code class="text-sm text-foreground">primary</code><span class="font-mono text-xs text-muted-foreground">{hex.toUpperCase()}</span></div>
					<div class="grid h-lg token-columns items-center gap-sm"><span class="size-sm rounded-full bg-accent" style:background-color={accent}></span><code class="text-sm text-foreground">accent</code><span class="font-mono text-xs text-muted-foreground">derived</span></div>
					<div class="grid h-lg token-columns items-center gap-sm"><span class="size-sm rounded-full bg-primary-foreground" style:background-color={foreground}></span><code class="text-sm text-foreground">foreground</code><span class="font-mono text-xs text-muted-foreground">auto contrast</span></div>
				</div>
				<div class="mt-sm flex gap-sm border-t border-border pt-md text-sm leading-relaxed text-muted-foreground"><span aria-hidden="true">ⓘ</span>Backgrounds and surfaces stay calm, so your primary color can do the talking.</div>
			</aside>

			<section class="min-w-0 max-phone:w-full" id="preview" aria-label="Live theme preview">
				<div class="flex items-end justify-between pb-md pt-xs"><div><span class={kicker}>THE THEME, IN CONTEXT</span><h2 class="mt-sm font-serif text-section max-phone:text-xl">From color to composition</h2></div><div class="flex items-center gap-sm pb-xs font-mono text-xs text-muted-foreground"><span class="size-xs rounded-full bg-primary"></span> LIVE</div></div>
				<div class="min-h-preview-height rounded-md border border-border bg-background text-foreground shadow-lg transition-colors duration-200 max-phone:min-h-0 motion-reduce:transition-none" data-theme={mode} data-corners={corners} style:--color-primary={hex} style:--color-primary-foreground={foreground} style:--color-accent={accent} style:--color-accent-foreground={accentForeground}>
					<div class="flex items-center justify-between border-b border-border px-md py-md font-mono text-xs tracking-widest"><span><span class="mr-sm inline-block size-sm rounded-full bg-primary"></span> NORTHSTAR <span class="px-sm text-muted-foreground">/</span> WORKSPACE</span><span class="text-muted-foreground max-phone:hidden">PROFILE SETTINGS <span class="ml-sm text-primary">↗</span></span></div>
					<div class="px-lg pt-lg pb-md max-tablet:px-md max-phone:px-md">
						<div class="flex items-start justify-between gap-sm"><div><div class={kicker}>WORKSPACE / ACCOUNT</div><h3 class="mt-sm mb-xs font-serif text-2xl max-phone:text-section">Your profile</h3><p class={description}>Manage your personal details and how you show up.</p></div><span class="whitespace-nowrap rounded-xs bg-accent px-sm py-xs font-mono text-xs text-accent-foreground">✦ &nbsp;PRO PLAN</span></div>
						<div class="mt-md rounded-sm border border-border bg-surface text-surface-foreground">
							<div class="flex items-center gap-sm border-b border-border px-md py-md"><div class="relative grid size-xl shrink-0 place-items-center rounded-full bg-accent font-serif text-sm text-accent-foreground">AM<span class="absolute -right-[1px] bottom-0 size-sm rounded-full border border-surface bg-primary"></span></div><div class="grid min-w-0 flex-1 gap-xs"><strong class="text-sm font-semibold">Alex Morgan</strong><span class="truncate text-xs text-muted-foreground">alex.morgan@example.com</span></div><button class="cursor-pointer rounded-xs border border-border px-sm py-sm text-xs hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">Change photo</button></div>
							<div class="px-md pb-md"><Tabs.Root defaultValue="profile"><Tabs.List class="flex gap-md border-b border-border"><Tabs.Trigger class="relative cursor-pointer py-sm text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary data-selected:border-b-2 data-selected:border-primary data-selected:font-semibold data-selected:text-primary" value="profile">Profile</Tabs.Trigger><Tabs.Trigger class="relative cursor-pointer py-sm text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary data-selected:border-b-2 data-selected:border-primary data-selected:font-semibold data-selected:text-primary" value="preferences">Preferences</Tabs.Trigger><Tabs.Trigger class="relative cursor-pointer py-sm text-sm text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary data-selected:border-b-2 data-selected:border-primary data-selected:font-semibold data-selected:text-primary" value="security">Security</Tabs.Trigger></Tabs.List>
								<Tabs.Content class="pt-md" value="profile"><div class="grid grid-cols-2 gap-sm max-phone:grid-cols-1"><label class={field}><span>FULL NAME</span><input class={input} value="Alex Morgan" /></label><label class={field}><span>EMAIL ADDRESS</span><input class={input} value="alex.morgan@example.com" /></label></div><label class={`mt-sm ${field}`}><span>ABOUT</span><textarea class={`${input} resize-y`} rows="2">Designing thoughtful digital experiences, one detail at a time.</textarea><small class="font-sans text-xs tracking-normal">A short introduction for your workspace profile.</small></label><div class="mt-md flex items-center justify-between gap-sm"><span class="text-xs text-muted-foreground">Changes save automatically</span><button class="cursor-pointer rounded-xs bg-primary px-sm py-sm text-xs text-primary-foreground hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" onclick={() => { saved = true; setTimeout(() => saved = false, 1800); }}>{saved ? 'Saved ✓' : 'Save changes'} <span aria-hidden="true">→</span></button></div></Tabs.Content>
								<Tabs.Content class="min-h-4xl pt-md" value="preferences"><div class="flex items-center justify-between border-b border-border py-sm"><div class="grid gap-xs"><strong class="text-sm font-medium">Product updates</strong><span class="text-xs text-muted-foreground">Occasional notes on what’s new.</span></div><span class="flex h-md w-lg items-center rounded-full bg-primary p-xs" aria-hidden="true"><i class="size-sm translate-x-sm rounded-full bg-surface"></i></span></div><div class="flex items-center justify-between border-b border-border py-sm"><div class="grid gap-xs"><strong class="text-sm font-medium">Weekly digest</strong><span class="text-xs text-muted-foreground">A summary of your workspace activity.</span></div><span class="flex h-md w-lg items-center rounded-full bg-muted-foreground p-xs" aria-hidden="true"><i class="size-sm rounded-full bg-surface"></i></span></div></Tabs.Content>
								<Tabs.Content class="min-h-4xl pt-md" value="security"><div class="flex items-center gap-sm py-sm"><span class="grid size-lg place-items-center rounded-full bg-accent text-primary">⌑</span><div class="grid flex-1 gap-xs"><strong class="text-sm font-medium">Two-factor authentication</strong><span class="text-xs text-muted-foreground">Add another layer of protection to your account.</span></div><button class="cursor-pointer rounded-xs border border-border px-sm py-sm text-xs hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">Enable</button></div></Tabs.Content>
							</Tabs.Root></div>
						</div>
						<div class="mt-md flex justify-between gap-sm border-t border-border pt-md font-mono text-xs text-muted-foreground"><span><span class="mr-xs inline-block size-xs rounded-full bg-primary"></span> Your workspace is looking good.</span><span>THEME PREVIEW &nbsp;·&nbsp; {mode.toUpperCase()} MODE</span></div>
					</div>
				</div>
				<div class="pt-sm font-mono text-sm text-muted-foreground"><span class="mr-sm text-primary">01</span> A little color goes a long way. Explore the tabs to see it travel.</div>
			</section>
		</div>
	</main>
	<footer class="flex min-h-3xl items-center justify-between border-t border-border font-mono text-xs text-muted-foreground"><span>HUE STUDIO © 2025</span><span>MADE FOR THE DETAILS <span class="text-primary">✳</span></span></footer>
</div>

<style>
	/* Ark UI provides the indicator's positioning variables. */
	:global(.segment-indicator) {
		top: var(--top);
		left: var(--left);
		width: var(--width);
		height: var(--height);
	}

	:global(.hue-spectrum) {
		background: linear-gradient(90deg, red, #ff0, #0f0, #0ff, #00f, #f0f, red);
	}

	.token-columns {
		grid-template-columns: .5rem 1fr auto;
	}

	.workspace-columns {
		grid-template-columns: minmax(17rem, 21rem) minmax(0, 1fr);
	}

	@media (max-width: 53.125rem) {
		.workspace-columns {
			grid-template-columns: minmax(15rem, .8fr) minmax(0, 1.2fr);
		}
	}
</style>
