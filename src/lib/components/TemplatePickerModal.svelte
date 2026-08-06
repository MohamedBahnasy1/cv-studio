<script lang="ts">
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import X from "@lucide/svelte/icons/x";
	import Check from "@lucide/svelte/icons/check";
	import Layout from "@lucide/svelte/icons/layout";
	import Award from "@lucide/svelte/icons/award";
	import Stethoscope from "@lucide/svelte/icons/stethoscope";
	import PaletteIcon from "@lucide/svelte/icons/palette";
	import {
		TEMPLATE1_PALETTES,
		TEMPLATE2_PALETTES,
		TEMPLATE3_PALETTES,
	} from "$lib/themes";

	let {
		open = $bindable(false),
		activeTemplate = "template1",
		onSelect,
		onClose,
	}: {
		open: boolean;
		activeTemplate: "template1" | "template2" | "template3";
		onSelect: (template: "template1" | "template2" | "template3") => void;
		onClose: () => void;
	} = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			onClose();
		}
	}

	function selectTemplate(t: "template1" | "template2" | "template3") {
		onSelect(t);
		onClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Backdrop Blur Overlay -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 transition-all duration-300 animate-in fade-in"
		dir="rtl"
		onclick={(e) => {
			if (e.target === e.currentTarget) onClose();
		}}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<!-- Modal Container -->
		<div
			class="bg-background border border-border/80 rounded-3xl p-7 max-w-5xl w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-300 scale-100"
		>
			<!-- Background Glowing Decorative Elements -->
			<div
				class="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
			></div>
			<div
				class="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
			></div>

			<!-- Modal Header & Close Button -->
			<div class="flex items-center justify-between mb-6 relative z-10">
				<button
					type="button"
					aria-label="إغلاق النافذة"
					class="p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 hover:rotate-90 cursor-pointer"
					onclick={onClose}
				>
					<X class="size-5" />
				</button>

				<div class="text-center flex-1">
					<h2
						class="text-2xl max-sm:text-xl font-black text-foreground flex items-center justify-center gap-2"
					>
						<Sparkles class="size-6 text-amber-500 animate-pulse" />
					معرض القوالب
					</h2>
					<p class="text-xs text-muted-foreground mt-1">
						استعرض التخطيطات التفاعلية واختر التصميم الذي يبرز سيرتك بأفضل صورة
					</p>
				</div>

				<div class="w-9"></div>
				<!-- Spacer for symmetry -->
			</div>

			<!-- 3D Perspective Card Deck -->
			<div
				class="grid grid-cols-3 max-md:grid-cols-1 gap-6 my-4 perspective-[1200px] relative z-10"
			>
				<!-- ================= CARD 1: BUBBLES ================= -->
				<div
					role="button"
					tabindex="0"
					class="group relative bg-card border rounded-2xl p-4 cursor-pointer transition-all duration-500 ease-out transform-gpu hover:-translate-y-2 hover:rotate-y-[-8deg] hover:rotate-x-[4deg] hover:shadow-[0_25px_50px_-12px_rgba(54,183,201,0.3)] {activeTemplate ===
					'template1'
						? 'ring-2 ring-primary border-transparent shadow-2xl scale-[1.02] bg-gradient-to-b from-card to-primary/5'
						: 'border-border/80 hover:border-primary/50 opacity-90 hover:opacity-100'}"
					onclick={() => selectTemplate("template1")}
					onkeydown={(e) =>
						e.key === "Enter" && selectTemplate("template1")}
				>
					<!-- Selected Badge -->
					{#if activeTemplate === "template1"}
						<div
							class="absolute top-3 right-3 bg-primary text-white p-1.5 rounded-full shadow-md z-30 flex items-center justify-center animate-in zoom-in-50"
						>
							<Check class="size-4" />
						</div>
					{/if}

					<!-- Top Tag Badge -->
					<div class="flex items-center justify-between mb-3">
						<span
							class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30"
						>
							إبداعي وعصري
						</span>
						<span class="text-[10px] font-semibold text-muted-foreground"
							>Template 01</span
						>
					</div>

					<!-- Mini 3D Preview Canvas -->
					<div
						class="w-full h-48 bg-slate-50 border rounded-xl p-3 overflow-hidden relative mb-4 shadow-inner group-hover:shadow-md transition-all flex flex-col justify-between"
					>
						<!-- Decorative circles artwork mockup -->
						<div
							class="w-10 h-10 rounded-full bg-[#F5C542] absolute -top-4 right-6 opacity-90"
						></div>
						<div
							class="w-14 h-14 rounded-full bg-[#34B7C9] absolute -top-5 -right-3 opacity-90"
						></div>
						<div
							class="w-5 h-5 rounded-full bg-[#EE4326] absolute top-2 right-20"
						></div>

						<!-- Header mockup -->
						<div class="relative z-10 pr-2">
							<div class="text-[10px] font-extrabold text-slate-800">
								Mohamed Bahnasy
							</div>
							<div
								class="text-[8px] font-semibold text-slate-500 mb-1"
							>
								Software Engineer
							</div>
							<div class="w-20 h-1 bg-slate-300 rounded"></div>
						</div>

						<!-- 2-Column layout mockup -->
						<div class="grid grid-cols-12 gap-2 mt-3 relative z-10">
							<div
								class="col-span-7 bg-white p-1.5 rounded border border-slate-200/60 shadow-2xs space-y-1"
							>
								<div class="w-10 h-1.5 bg-[#34B7C9] rounded"></div>
								<div class="w-full h-1 bg-slate-200 rounded"></div>
								<div class="w-3/4 h-1 bg-slate-200 rounded"></div>
							</div>
							<div
								class="col-span-5 bg-white p-1.5 rounded border border-slate-200/60 shadow-2xs space-y-1"
							>
								<div class="w-8 h-1.5 bg-[#F5C542] rounded"></div>
								<div class="w-full h-1 bg-slate-200 rounded"></div>
								<div class="w-4/5 h-1 bg-slate-200 rounded"></div>
							</div>
						</div>

						<!-- Bottom color swatch preview -->
						<div class="flex items-center gap-1 mt-2">
							{#each TEMPLATE1_PALETTES.slice(0, 4) as pal}
								<div
									class="w-3 h-3 rounded-full border border-white shadow-2xs"
									style="background: linear-gradient(135deg, {pal.c1} 50%, {pal.c2} 50%);"
								></div>
							{/each}
							<span class="text-[8px] text-slate-400 font-bold ml-1"
								>+3 خيارات</span
							>
						</div>
					</div>

					<!-- Details -->
					<h3
						class="font-extrabold text-base text-foreground text-center"
					>
						قالب الدوائر (Bubbles)
					</h3>
					<p class="text-xs text-muted-foreground text-center mt-1">
						توزيع متوازن للأعمدة مع حلقات حيوية وألوان عصرية مبهجة
					</p>

					<!-- Bottom Hover CTA -->
					<div
						class="mt-4 pt-3 border-t border-border/60 flex items-center justify-center text-xs font-bold text-primary group-hover:translate-x-[-4px] transition-transform"
					>
						<span>اختر هذا القالب</span>
						<span class="mr-1">←</span>
					</div>
				</div>

				<!-- ================= CARD 2: RIBBON EXECUTIVE ================= -->
				<div
					role="button"
					tabindex="0"
					class="group relative bg-card border rounded-2xl p-4 cursor-pointer transition-all duration-500 ease-out transform-gpu hover:-translate-y-2 hover:rotate-y-[0deg] hover:rotate-x-[4deg] hover:shadow-[0_25px_50px_-12px_rgba(81,107,97,0.3)] {activeTemplate ===
					'template2'
						? 'ring-2 ring-primary border-transparent shadow-2xl scale-[1.02] bg-gradient-to-b from-card to-primary/5'
						: 'border-border/80 hover:border-primary/50 opacity-90 hover:opacity-100'}"
					onclick={() => selectTemplate("template2")}
					onkeydown={(e) =>
						e.key === "Enter" && selectTemplate("template2")}
				>
					<!-- Selected Badge -->
					{#if activeTemplate === "template2"}
						<div
							class="absolute top-3 right-3 bg-primary text-white p-1.5 rounded-full shadow-md z-30 flex items-center justify-center animate-in zoom-in-50"
						>
							<Check class="size-4" />
						</div>
					{/if}

					<!-- Top Tag Badge -->
					<div class="flex items-center justify-between mb-3">
						<span
							class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
						>
							إداري وتنفيذي
						</span>
						<span class="text-[10px] font-semibold text-muted-foreground"
							>Template 02</span
						>
					</div>

					<!-- Mini 3D Preview Canvas -->
					<div
						class="w-full h-48 bg-slate-50 border rounded-xl p-3 overflow-hidden relative mb-4 shadow-inner group-hover:shadow-md transition-all flex flex-col justify-between items-center"
					>
						<!-- Centered Avatar Cutout & Folded Ribbon -->
						<div class="w-full flex flex-col items-center pt-1">
							<div
								class="w-7 h-7 rounded-full bg-slate-300 border-2 border-white shadow-xs z-20 -mb-2"
							></div>
							<div
								class="w-full bg-[#516B61] text-[8px] text-white font-extrabold py-1.5 text-center rounded-xs shadow-xs uppercase tracking-wider relative z-10"
							>
								Mohamed Bahnasy
							</div>
							<div
								class="w-16 h-0.5 bg-slate-300 rounded mt-1.5"
							></div>
						</div>

						<!-- 2-Column layout mockup with percent rings -->
						<div class="w-full grid grid-cols-12 gap-2 mt-2">
							<div
								class="col-span-7 bg-white p-1.5 rounded border border-slate-200/60 space-y-1"
							>
								<div class="w-10 h-1.5 bg-[#516B61] rounded"></div>
								<div class="w-full h-1 bg-slate-200 rounded"></div>
								<div class="w-2/3 h-1 bg-slate-200 rounded"></div>
							</div>
							<div
								class="col-span-5 bg-white p-1.5 rounded border border-slate-200/60 flex flex-col items-center justify-center gap-1"
							>
								<div class="flex gap-1">
									<div
										class="w-4 h-4 rounded-full border border-[#516B61] text-[6px] font-bold flex items-center justify-center"
									>
										80%
									</div>
									<div
										class="w-4 h-4 rounded-full border border-[#516B61] text-[6px] font-bold flex items-center justify-center"
									>
										95%
									</div>
								</div>
								<div
									class="w-10 h-1 bg-[#516B61] rounded-full"
								></div>
							</div>
						</div>

						<!-- Bottom color swatch preview -->
						<div class="flex items-center gap-1 mt-2 w-full justify-start">
							{#each TEMPLATE2_PALETTES.slice(0, 4) as pal}
								<div
									class="w-3 h-3 rounded-full border border-white shadow-2xs"
									style="background-color: {pal.primary};"
								></div>
							{/each}
							<span class="text-[8px] text-slate-400 font-bold ml-1"
								>+2 خيارات</span
							>
						</div>
					</div>

					<!-- Details -->
					<h3
						class="font-extrabold text-base text-foreground text-center"
					>
						قالب الشريط (Ribbon)
					</h3>
					<p class="text-xs text-muted-foreground text-center mt-1">
						هيدر مطوي فاخر مع شارات النسب المئوية الدائرية للغات
					</p>

					<!-- Bottom Hover CTA -->
					<div
						class="mt-4 pt-3 border-t border-border/60 flex items-center justify-center text-xs font-bold text-primary group-hover:translate-x-[-4px] transition-transform"
					>
						<span>اختر هذا القالب</span>
						<span class="mr-1">←</span>
					</div>
				</div>

				<!-- ================= CARD 3: ACADEMIC SIDEBAR ================= -->
				<div
					role="button"
					tabindex="0"
					class="group relative bg-card border rounded-2xl p-4 cursor-pointer transition-all duration-500 ease-out transform-gpu hover:-translate-y-2 hover:rotate-y-[8deg] hover:rotate-x-[4deg] hover:shadow-[0_25px_50px_-12px_rgba(10,25,47,0.35)] {activeTemplate ===
					'template3'
						? 'ring-2 ring-primary border-transparent shadow-2xl scale-[1.02] bg-gradient-to-b from-card to-primary/5'
						: 'border-border/80 hover:border-primary/50 opacity-90 hover:opacity-100'}"
					onclick={() => selectTemplate("template3")}
					onkeydown={(e) =>
						e.key === "Enter" && selectTemplate("template3")}
				>
					<!-- Selected Badge -->
					{#if activeTemplate === "template3"}
						<div
							class="absolute top-3 right-3 bg-primary text-white p-1.5 rounded-full shadow-md z-30 flex items-center justify-center animate-in zoom-in-50"
						>
							<Check class="size-4" />
						</div>
					{/if}

					<!-- Top Tag Badge -->
					<div class="flex items-center justify-between mb-3">
						<span
							class="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1"
						>
							<Stethoscope class="size-3" />
							طبي وأكاديمي
						</span>
						<span class="text-[10px] font-semibold text-muted-foreground"
							>Template 03</span
						>
					</div>

					<!-- Mini 3D Preview Canvas (Accurate Left Sidebar Grid layout!) -->
					<div
						class="w-full h-48 bg-slate-50 border rounded-xl overflow-hidden relative mb-4 shadow-inner group-hover:shadow-md transition-all grid grid-cols-12"
					>
						<!-- LEFT Sidebar (Col Span 4) - Matches actual Template 3! -->
						<div
							class="col-span-4 bg-[#0A192F] p-2 flex flex-col items-center justify-between"
						>
							<div class="flex flex-col items-center w-full">
								<div
									class="w-7 h-7 rounded-full border-2 border-[#F5A623] bg-slate-300 shadow-xs mb-1"
								></div>
								<div
									class="w-10 h-0.5 bg-[#F5A623] mb-1.5 rounded"
								></div>
								<div
									class="w-full h-1 bg-white/30 rounded mb-1"
								></div>
								<div
									class="w-3/4 h-1 bg-white/20 rounded mb-2"
								></div>
							</div>

							<!-- Sidebar progress lines -->
							<div class="w-full space-y-1">
								<div
									class="w-full h-1 bg-[#F5A623] rounded"
								></div>
								<div
									class="w-4/5 h-1 bg-white/40 rounded"
								></div>
							</div>
						</div>

						<!-- RIGHT Content Area (Col Span 8) -->
						<div
							class="col-span-8 p-3 flex flex-col justify-between bg-white relative"
						>
							<!-- Decorative Gold Corner Bar -->
							<div
								class="absolute top-0 right-2 w-2 h-4 bg-[#F5A623] rounded-b-xs"
							></div>

							<div>
								<div
									class="text-[9px] font-black text-[#0A192F] tracking-tight uppercase"
								>
									Dr. Mohamed Bahnasy
								</div>
								<div
									class="text-[7.5px] font-bold text-[#F5A623] uppercase mb-2"
								>
									Academic Lecturer
								</div>

								<div class="space-y-1.5">
									<div
										class="w-full h-1 bg-[#0A192F] rounded"
									></div>
									<div
										class="w-full h-6 bg-slate-100 rounded border border-slate-200/60 p-1"
									>
										<div
											class="w-12 h-1 bg-slate-400 rounded mb-0.5"
										></div>
										<div
											class="w-full h-0.5 bg-slate-300 rounded"
										></div>
									</div>
								</div>
							</div>

							<div
								class="text-[7px] font-serif italic text-[#F5A623]"
							>
								Thank you for your consideration.
							</div>
						</div>
					</div>

					<!-- Details -->
					<h3
						class="font-extrabold text-base text-foreground text-center"
					>
						القالب الأكاديمي (Academic Sidebar)
					</h3>
					<p class="text-xs text-muted-foreground text-center mt-1">
						شريط جانبي داكن فاخر موجه للكادر الطبي والتخصصات الفنية
					</p>

					<!-- Bottom Hover CTA -->
					<div
						class="mt-4 pt-3 border-t border-border/60 flex items-center justify-center text-xs font-bold text-primary group-hover:translate-x-[-4px] transition-transform"
					>
						<span>اختر هذا القالب</span>
						<span class="mr-1">←</span>
					</div>
				</div>
			</div>

			<!-- Footer Action -->
			<div
				class="flex items-center justify-between border-t border-border/60 pt-4 mt-2 relative z-10"
			>
				
				<button
					type="button"
					class="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
					onclick={onClose}
				>
					إغلاق النافذة
				</button>
			</div>
		</div>
	</div>
{/if}
