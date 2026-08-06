<script lang="ts">
	import PersonalInfoForm from "$lib/components/form/PersonalInfoForm.svelte";
	import ProfileForm from "$lib/components/form/ProfileForm.svelte";
	import ExperienceForm from "$lib/components/form/ExperienceForm.svelte";
	import EducationForm from "$lib/components/form/EducationForm.svelte";
	import SkillsForm from "$lib/components/form/SkillsForm.svelte";
	import LanguagesForm from "$lib/components/form/LanguagesForm.svelte";
	import AwardsForm from "$lib/components/form/AwardsForm.svelte";
	import CertificatesForm from "$lib/components/form/CertificatesForm.svelte";
	import PublicationsForm from "$lib/components/form/PublicationsForm.svelte";
	import SocialMediaForm from "$lib/components/form/SocialMediaForm.svelte";
	import Template1 from "$lib/components/templates/Template1.svelte";
	import Template2 from "$lib/components/templates/Template2.svelte";
	import Template3 from "$lib/components/templates/Template3.svelte";
	import TemplatePickerModal from "$lib/components/TemplatePickerModal.svelte";
	import AppLogo from "$lib/components/ui/AppLogo.svelte";
	import Code from "@lucide/svelte/icons/code";
	import { resume, resetResumeStore } from "$lib/store";
	import {
		TEMPLATE1_PALETTES,
		TEMPLATE2_PALETTES,
		TEMPLATE3_PALETTES,
	} from "$lib/themes";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import Printer from "@lucide/svelte/icons/printer";
	import RotateCcw from "@lucide/svelte/icons/rotate-ccw";
	import UserRound from "@lucide/svelte/icons/user-round";
	import FileText from "@lucide/svelte/icons/file-text";
	import Briefcase from "@lucide/svelte/icons/briefcase";
	import GraduationCap from "@lucide/svelte/icons/graduation-cap";
	import Wrench from "@lucide/svelte/icons/wrench";
	import Languages from "@lucide/svelte/icons/languages";
	import Trophy from "@lucide/svelte/icons/trophy";
	import Award from "@lucide/svelte/icons/award";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import Share2 from "@lucide/svelte/icons/share-2";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import PaletteIcon from "@lucide/svelte/icons/palette";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import Eye from "@lucide/svelte/icons/eye";
	import Edit3 from "@lucide/svelte/icons/edit-3";
	import ZoomIn from "@lucide/svelte/icons/zoom-in";
	import ZoomOut from "@lucide/svelte/icons/zoom-out";
	import Maximize2 from "@lucide/svelte/icons/maximize-2";

	let activeTemplate = $state<"template1" | "template2" | "template3">("template1");
	let activePalette1Id = $state<string>(TEMPLATE1_PALETTES[0].id);
	let activePalette2Id = $state<string>(TEMPLATE2_PALETTES[1].id);
	let activePalette3Id = $state<string>(TEMPLATE3_PALETTES[0].id);

	let show3DPicker = $state<boolean>(false);
	let mobileTab = $state<"form" | "preview">("form");
	let zoomLevel = $state<number>(100);

	function zoomIn() {
		if (zoomLevel < 160) zoomLevel = Math.min(160, zoomLevel + 10);
	}
	function zoomOut() {
		if (zoomLevel > 40) zoomLevel = Math.max(40, zoomLevel - 10);
	}
	function resetZoom() {
		zoomLevel = 100;
	}

	const activePalette1 = $derived(
		TEMPLATE1_PALETTES.find((p) => p.id === activePalette1Id) ||
			TEMPLATE1_PALETTES[0],
	);

	const activePalette2 = $derived(
		TEMPLATE2_PALETTES.find((p) => p.id === activePalette2Id) ||
			TEMPLATE2_PALETTES[1],
	);

	const activePalette3 = $derived(
		TEMPLATE3_PALETTES.find((p) => p.id === activePalette3Id) ||
			TEMPLATE3_PALETTES[0],
	);

	function handlePrint() {
		window.print();
	}

	function handleReset() {
		if (confirm("هل أنت متأكد من مسح جميع البيانات؟")) {
			resetResumeStore();
		}
	}
</script>

<svelte:head>
	<title>CV Studio — إنشاء سيرة ذاتية احترافية</title>
	<meta
		name="description"
		content="أنشئ سيرتك الذاتية الاحترافية مجاناً. متوافق مع أنظمة ATS. بدون تسجيل."
	/>
</svelte:head>

<div
	class="grid grid-cols-[440px_1fr] h-screen overflow-hidden max-md:grid-cols-1 max-md:h-screen print:block"
>
	<!-- Mobile Sticky Top View Switcher -->
	<div class="md:hidden flex items-center justify-around bg-card border-b border-border p-2 z-50 shrink-0 print:hidden" dir="rtl">
		<button
			type="button"
			onclick={() => (mobileTab = 'form')}
			class="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer {mobileTab === 'form' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:bg-accent'}"
		>
			<Edit3 class="size-4" />
			<span>تعديل البيانات</span>
		</button>
		<button
			type="button"
			onclick={() => (mobileTab = 'preview')}
			class="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer {mobileTab === 'preview' ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:bg-accent'}"
		>
			<Eye class="size-4" />
			<span>معاينة السيرة الذاتية</span>
		</button>
	</div>

	<!-- Right side: Form panel (RTL) -->
	<aside
		class="flex flex-col h-full min-h-0 border-l border-border bg-background overflow-hidden print:hidden {mobileTab === 'preview' ? 'max-md:hidden' : 'max-md:flex'}"
		dir="rtl"
	>
		<!-- Header -->
		<div class="px-5 pt-4 pb-3 border-b border-border bg-card/50">
			<div class="flex items-center justify-between gap-3">
				<div class="flex items-center gap-2.5">
					<AppLogo class="size-10 shrink-0 drop-shadow-xs" />
					<div>
						<h1 class="text-lg font-bold m-0 flex items-center gap-1.5 leading-tight">
							<span class="text-primary">CV</span> Studio
						</h1>
						<p class="text-[11px] text-muted-foreground mt-0.5 mb-0">
							منصة إنشاء السير الذاتية الطبية والمهنية
						</p>
					</div>
				</div>

				<!-- Developer & Sponsor Credit Badge -->
				<a
					href="https://www.facebook.com/mhmd.bhnsy.527191"
					target="_blank"
					rel="noopener noreferrer"
					title="برعاية وتطوير: د. محمد بهنسي"
					class="group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-indigo-500/10 text-primary border border-primary/25 shadow-2xs hover:shadow-md hover:border-primary/50 hover:scale-102 transition-all duration-300 shrink-0"
				>
					<span class="relative flex h-2 w-2 shrink-0">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
					</span>
					<Sparkles class="size-3.5 text-amber-500 fill-amber-500/20 group-hover:rotate-12 transition-transform shrink-0" />
					<span class="tracking-tight text-[11px]">
						برعاية: <span class="font-bold underline decoration-primary/30 underline-offset-2 group-hover:decoration-primary">د. محمد بهنسي</span>
					</span>
				</a>
			</div>
		</div>

		<!-- Accordion Form Sections -->
		<div class="flex-1 overflow-y-auto p-4 space-y-2">
			<!-- 1. Personal Info -->
			<Collapsible.Root open={true} class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<UserRound class="size-4 text-primary" />
						البيانات الشخصية
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<PersonalInfoForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 2. Profile Summary -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<FileText class="size-4 text-primary" />
						الملف الشخصي / نبذة
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<ProfileForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 3. Work Experience -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<Briefcase class="size-4 text-primary" />
						الخبرات العملية
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<ExperienceForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 4. Education -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<GraduationCap class="size-4 text-primary" />
						التعليم والمؤهلات
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<EducationForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 5. Skills -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<Wrench class="size-4 text-primary" />
						المهارات
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<SkillsForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 6. Languages -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<Languages class="size-4 text-primary" />
						اللغات
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<LanguagesForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 7. Awards -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<Trophy class="size-4 text-primary" />
						الجوائز والتكريمات
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<AwardsForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 8. Certificates -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<Award class="size-4 text-primary" />
						الشهادات المهنية
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<CertificatesForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 9. Publications -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<BookOpen class="size-4 text-primary" />
						الأبحاث والمنشورات
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<PublicationsForm />
				</Collapsible.Content>
			</Collapsible.Root>

			<!-- 10. Social Media -->
			<Collapsible.Root class="border border-border rounded-lg bg-card overflow-hidden">
				<Collapsible.Trigger class="flex items-center justify-between w-full p-3 font-semibold text-sm hover:bg-muted/50 transition-colors text-right">
					<span class="flex items-center gap-2">
						<Share2 class="size-4 text-primary" />
						التواصل الاجتماعي
					</span>
					<ChevronDown class="size-4 text-muted-foreground transition-transform" />
				</Collapsible.Trigger>
				<Collapsible.Content class="px-3 pb-3">
					<SocialMediaForm />
				</Collapsible.Content>
			</Collapsible.Root>
		</div>

		<!-- Footer -->
		<div class="p-3 px-4 border-t border-border flex justify-start">
			<Button variant="destructive" size="sm" onclick={handleReset}>
				<RotateCcw class="size-4" />
				مسح الكل
			</Button>
		</div>
	</aside>

	<!-- Left side: Preview panel -->
	<main class="flex flex-col h-full min-h-0 min-w-0 bg-neutral-100 overflow-hidden print:bg-transparent print:overflow-visible relative {mobileTab === 'form' ? 'max-md:hidden' : 'max-md:flex'}">
		<!-- Toolbar with 3D Switcher & Color Palette Swatches -->
		<div class="flex flex-wrap items-center justify-between gap-3 px-5 py-2.5 bg-background border-b border-border print:hidden shrink-0" dir="rtl">
			<div class="flex items-center gap-3 flex-wrap">
				<!-- 3D Template Picker Button -->
				<button
					type="button"
					class="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
					onclick={() => (show3DPicker = true)}
				>
					<Sparkles class="size-3.5 text-yellow-300 animate-pulse" />
					<span>معرض القوالب</span>
				</button>

				<!-- Fast Template Tabs Switcher -->
				<div class="flex items-center bg-muted p-1 rounded-lg text-xs font-semibold">
					<button
						type="button"
						class="px-2.5 py-1 rounded-md transition-all flex items-center gap-1 {activeTemplate === 'template1' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
						onclick={() => (activeTemplate = "template1")}
					>
						<span>عصري</span>
					</button>
					<button
						type="button"
						class="px-2.5 py-1 rounded-md transition-all flex items-center gap-1 {activeTemplate === 'template2' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
						onclick={() => (activeTemplate = "template2")}
					>
						<span>أنيق</span>
					</button>
					<button
						type="button"
						class="px-2.5 py-1 rounded-md transition-all flex items-center gap-1 {activeTemplate === 'template3' ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'}"
						onclick={() => (activeTemplate = "template3")}
					>
						<span>الأكاديمي</span>
					</button>
				</div>

				<!-- Color Palette Swatches Picker -->
				<div class="flex items-center gap-2 border-r border-border pr-3">
					<span class="text-xs font-semibold text-muted-foreground flex items-center gap-1">
						<PaletteIcon class="size-3.5" />
						الألوان:
					</span>

					{#if activeTemplate === 'template1'}
						<!-- Template 1 Split Color Swatches -->
						<div class="flex items-center gap-1.5">
							{#each TEMPLATE1_PALETTES as pal}
								<button
									type="button"
									title={pal.name}
									class="relative w-5 h-5 rounded-md overflow-hidden border transition-all cursor-pointer hover:scale-110 {activePalette1Id === pal.id ? 'ring-2 ring-primary border-transparent scale-110 shadow-xs' : 'border-neutral-300 opacity-80 hover:opacity-100'}"
									onclick={() => (activePalette1Id = pal.id)}
								>
									<div class="absolute inset-0" style="background: linear-gradient(135deg, {pal.c1} 50%, {pal.c2} 50%);"></div>
								</button>
							{/each}
						</div>
					{:else if activeTemplate === 'template2'}
						<!-- Template 2 Solid Color Swatches -->
						<div class="flex items-center gap-1.5">
							{#each TEMPLATE2_PALETTES as pal}
								<button
									type="button"
									title={pal.name}
									class="w-5 h-5 rounded-md border transition-all cursor-pointer hover:scale-110 {activePalette2Id === pal.id ? 'ring-2 ring-primary border-transparent scale-110 shadow-xs' : 'border-neutral-300 opacity-80 hover:opacity-100'}"
									style="background-color: {pal.primary};"
									onclick={() => (activePalette2Id = pal.id)}
								></button>
							{/each}
						</div>
					{:else}
						<!-- Template 3 Dual Color Swatches -->
						<div class="flex items-center gap-1.5">
							{#each TEMPLATE3_PALETTES as pal}
								<button
									type="button"
									title={pal.name}
									class="relative w-5 h-5 rounded-md overflow-hidden border transition-all cursor-pointer hover:scale-110 {activePalette3Id === pal.id ? 'ring-2 ring-primary border-transparent scale-110 shadow-xs' : 'border-neutral-300 opacity-80 hover:opacity-100'}"
									onclick={() => (activePalette3Id = pal.id)}
								>
									<div class="absolute inset-0" style="background: linear-gradient(135deg, {pal.sidebarBg} 50%, {pal.accent} 50%);"></div>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Action Buttons & Zoom Controls -->
			<div class="flex items-center gap-2">
				<!-- Zoom Controls Widget -->
				<div class="flex items-center bg-muted/80 backdrop-blur px-1.5 py-1 rounded-lg text-xs font-semibold border border-border">
					<button
						type="button"
						title="تصغير المعاينة"
						class="p-1 hover:bg-background rounded transition-colors disabled:opacity-40 cursor-pointer"
						disabled={zoomLevel <= 40}
						onclick={zoomOut}
					>
						<ZoomOut class="size-3.5" />
					</button>

					<button
						type="button"
						title="إعادة ضبط 100%"
						class="px-2 py-0.5 text-[11px] font-mono hover:bg-background rounded transition-colors cursor-pointer"
						onclick={resetZoom}
					>
						{zoomLevel}%
					</button>

					<button
						type="button"
						title="تكبير المعاينة"
						class="p-1 hover:bg-background rounded transition-colors disabled:opacity-40 cursor-pointer"
						disabled={zoomLevel >= 160}
						onclick={zoomIn}
					>
						<ZoomIn class="size-3.5" />
					</button>
				</div>

				<Button onclick={handlePrint} size="sm">
					<Printer class="size-4" />
					طباعة / حفظ PDF
				</Button>
			</div>
		</div>

		<!-- Live Preview Scroll Area -->
		<div class="flex-1 overflow-auto p-8 max-md:p-3 flex justify-center items-start print:p-0 print:overflow-visible">
			<div
				class="print-area shadow-[0_4px_24px_rgba(0,0,0,0.12)] rounded overflow-hidden print:shadow-none print:rounded-none transition-transform duration-200 origin-top shrink-0"
				style="transform: scale({zoomLevel / 100});"
			>
				{#if activeTemplate === 'template1'}
					<Template1 data={$resume} palette={activePalette1} />
				{:else if activeTemplate === 'template2'}
					<Template2 data={$resume} palette={activePalette2} />
				{:else}
					<Template3 data={$resume} palette={activePalette3} />
				{/if}
			</div>
		</div>

		<!-- Standalone 3D Template Picker Modal Component -->
		<TemplatePickerModal
			bind:open={show3DPicker}
			{activeTemplate}
			onSelect={(t) => (activeTemplate = t)}
			onClose={() => (show3DPicker = false)}
		/>
	</main>
</div>
