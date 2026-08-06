<script lang="ts">
	import type { ResumeData } from "$lib/types";
	import { TEMPLATE3_PALETTES, type Palette3 } from "$lib/themes";
	import {
		getSkillName,
		levelToPercent,
		formatDateRange,
		formatLocation,
		formatTitleWithSub,
		formatSocialUrl,
		hasProfile as checkProfile,
		hasExperience as checkExperience,
		hasEducation as checkEducation,
		hasAwards as checkAwards,
		hasCertificates as checkCertificates,
		hasPublications as checkPublications,
		hasSocial as checkSocial,
		hasLanguages as checkLanguages,
		getActiveSkillCategories
	} from "$lib/template-utils";
	import SocialIcon from "$lib/components/ui/SocialIcon.svelte";
	import User from "@lucide/svelte/icons/user";
	import Briefcase from "@lucide/svelte/icons/briefcase";
	import GraduationCap from "@lucide/svelte/icons/graduation-cap";
	import Languages from "@lucide/svelte/icons/languages";
	import Trophy from "@lucide/svelte/icons/trophy";
	import Award from "@lucide/svelte/icons/award";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import Share2 from "@lucide/svelte/icons/share-2";
	import Globe from "@lucide/svelte/icons/globe";
	import MapPin from "@lucide/svelte/icons/map-pin";
	import Phone from "@lucide/svelte/icons/phone";
	import Mail from "@lucide/svelte/icons/mail";
	import Star from "@lucide/svelte/icons/star";
	import Wrench from "@lucide/svelte/icons/wrench";
	import Activity from "@lucide/svelte/icons/activity";
	import Stethoscope from "@lucide/svelte/icons/stethoscope";

	let {
		data,
		palette = TEMPLATE3_PALETTES[0],
	}: { data: ResumeData; palette?: Palette3 } = $props();

	const p = $derived(data.personal);

	const hasProfile = $derived(checkProfile(data.profile));
	const hasExperience = $derived(checkExperience(data.experience));
	const hasEducation = $derived(checkEducation(data.education));
	const hasAwards = $derived(checkAwards(data.awards));
	const hasCertificates = $derived(checkCertificates(data.certificates));
	const hasPublications = $derived(checkPublications(data.publications));
	const hasSocial = $derived(checkSocial(data.social));
	const hasLanguages = $derived(checkLanguages(data.languages));
	const activeSkillCategories = $derived(getActiveSkillCategories(data.skills));
</script>

<!-- A4 Resume Container Template 3 (Academic & Medical Executive Sidebar) -->
<article
	class="relative w-[210mm] min-h-[297mm] grid grid-cols-12 font-sans box-border overflow-hidden print:w-[210mm] print:h-[297mm] print:max-h-[297mm] print:m-0 print:overflow-hidden"
	style="background-color: {palette.lightBg};"
>
	<!-- Left Dark Sidebar (Col Span 4) -->
	<div
		class="col-span-4 p-6 flex flex-col justify-between space-y-4 print:p-5"
		style="background-color: {palette.sidebarBg}; color: {palette.textOnSidebar};"
	>
		<div class="space-y-4">
			<!-- Candidate Avatar Photo -->
			{#if p.photo}
				<div class="flex flex-col items-center pt-2">
					<img
						src={p.photo}
						alt={p.fullName}
						class="w-28 h-28 rounded-full object-cover shadow-lg mb-3 border-4"
						style="border-color: {palette.accent};"
					/>
					<h3
						class="text-[11px] font-extrabold tracking-widest text-center uppercase leading-tight"
						style="color: {palette.accent};"
					>
						{p.title || "Academic Candidate"}
					</h3>
				</div>
			{/if}

			<div class="w-full h-[1px]" style="background-color: {palette.accent}40;"></div>

			<!-- Contact Info -->
			<section class="space-y-2">
				<div class="flex items-center gap-2">
					<User class="w-4 h-4 shrink-0" style="color: {palette.accent};" />
					<h4
						class="text-[11px] font-extrabold tracking-wider uppercase"
						style="color: {palette.accent};"
					>
						Contact
					</h4>
				</div>

				<ul class="text-[10px] space-y-1.5 opacity-95">
					{#if p.address}
						<li class="flex items-start gap-1.5">
							<MapPin class="w-3.5 h-3.5 mt-0.5 shrink-0" style="color: {palette.accent};" />
							<span>{p.address}</span>
						</li>
					{/if}
					{#if p.phone}
						<li class="flex items-center gap-1.5">
							<Phone class="w-3.5 h-3.5 shrink-0" style="color: {palette.accent};" />
							<span>{p.phone}</span>
						</li>
					{/if}
					{#if p.email}
						<li class="flex items-center gap-1.5 break-all">
							<Mail class="w-3.5 h-3.5 shrink-0" style="color: {palette.accent};" />
							<span>{p.email}</span>
						</li>
					{/if}
				</ul>
			</section>

			<div class="w-full h-[1px]" style="background-color: {palette.accent}40;"></div>

			<!-- Skills Section in Sidebar -->
			{#if activeSkillCategories.length > 0}
				<section class="space-y-2">
					<div class="flex items-center gap-2">
						<Wrench class="w-4 h-4 shrink-0" style="color: {palette.accent};" />
						<h4
							class="text-[11px] font-extrabold tracking-wider uppercase"
							style="color: {palette.accent};"
						>
							Skills
						</h4>
					</div>

					<div class="space-y-1 text-[10px]">
						{#each activeSkillCategories as cat}
							{#each cat.items as item}
								{#if getSkillName(item)}
									<div class="flex items-baseline gap-1.5">
										<span class="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style="background-color: {palette.accent};"></span>
										<span class="leading-tight">{getSkillName(item)}</span>
									</div>
								{/if}
							{/each}
						{/each}
					</div>
				</section>

				<div class="w-full h-[1px]" style="background-color: {palette.accent}40;"></div>
			{/if}

			<!-- Languages Section in Sidebar -->
			{#if hasLanguages}
				<section class="space-y-2">
					<div class="flex items-center gap-2">
						<Languages class="w-4 h-4 shrink-0" style="color: {palette.accent};" />
						<h4
							class="text-[11px] font-extrabold tracking-wider uppercase"
							style="color: {palette.accent};"
						>
							Languages
						</h4>
					</div>

					<div class="space-y-2 text-[10px]">
						{#each data.languages as lang}
							{#if lang.name}
								<div>
									<div class="flex justify-between font-bold mb-0.5">
										<span>{lang.name}</span>
										<span style="color: {palette.accent};">{levelToPercent(lang.level)}%</span>
									</div>
									<div class="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
										<div
											class="h-full rounded-full"
											style="width: {levelToPercent(lang.level)}%; background-color: {palette.accent};"
										></div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</section>

				<div class="w-full h-[1px]" style="background-color: {palette.accent}40;"></div>
			{/if}

			<!-- Social Links Section in Sidebar -->
			{#if hasSocial}
				<section class="space-y-2">
					<div class="flex items-center gap-2">
						<Star class="w-4 h-4 shrink-0" style="color: {palette.accent};" />
						<h4
							class="text-[11px] font-extrabold tracking-wider uppercase"
							style="color: {palette.accent};"
						>
							Social Links
						</h4>
					</div>

					<div class="space-y-1 text-[10px]">
						{#each data.social as soc}
							{#if soc.url || soc.username}
								<div class="flex items-center gap-1.5 max-w-full overflow-hidden">
									<SocialIcon platform={soc.platform} class="w-3 h-3 shrink-0" />
									<a
										href={soc.url || '#'}
										target="_blank"
										class="hover:underline truncate opacity-90 tracking-tight text-[9px]"
										dir="ltr"
									>
										{formatSocialUrl(soc.url) || soc.username || soc.url}
									</a>
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</div>

	<!-- Right Main Area (Col Span 8) -->
	<div class="col-span-8 p-7 flex flex-col justify-between relative print:p-6">
		<!-- Top Right Accent Bars -->
		<div class="absolute top-0 right-6 flex gap-1.5 pointer-events-none">
			<div class="w-3 h-10 rounded-b-md" style="background-color: {palette.accent};"></div>
			<div class="w-2.5 h-16 rounded-b-md" style="background-color: {palette.accent};"></div>
		</div>

		<!-- Candidate Name Header -->
		<header class="mb-5 pr-10">
			<h1
				class="text-3xl font-extrabold tracking-tight uppercase leading-none"
				style="color: {palette.textMain};"
			>
				{p.fullName || "Your Full Name"}
			</h1>
			{#if p.title}
				<p
					class="text-xs font-bold uppercase tracking-wider mt-1"
					style="color: {palette.accent};"
				>
					{p.title}
				</p>
			{/if}
		</header>

		<!-- Main Sections -->
		<div class="space-y-4 flex-1">
			<!-- Career Objective / Profile -->
			{#if hasProfile}
				<section>
					<div class="flex items-center gap-2 mb-1.5">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.textMain};"
						>
							<User class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider"
							style="color: {palette.textMain};"
						>
							Career Objective
						</h2>
						<div
							class="flex-1 h-[2px] rounded"
							style="background-color: {palette.accent};"
						></div>
					</div>

					<div
						class="text-[11px] text-slate-700 leading-relaxed px-1 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
					>
						{@html data.profile}
					</div>
				</section>
			{/if}

			<!-- Work Experience / Clinical Training -->
			{#if hasExperience}
				<section>
					<div class="flex items-center gap-2 mb-2">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.textMain};"
						>
							<Stethoscope class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider"
							style="color: {palette.textMain};"
						>
							Work Experience & Clinical Training
						</h2>
						<div
							class="flex-1 h-[2px] rounded"
							style="background-color: {palette.accent};"
						></div>
					</div>

					<div class="space-y-2.5 px-1">
						{#each data.experience as exp}
							{#if exp.jobTitle || exp.company}
								<div>
									<div class="flex justify-between items-baseline">
										<h3 class="text-[12.5px] font-extrabold text-slate-900 leading-tight">
											{exp.jobTitle}
										</h3>
										<span class="text-[10px] font-bold text-slate-500">
											{formatDateRange(exp.from, exp.to, exp.current)}
										</span>
									</div>
									{#if exp.company}
										<p class="text-[11px] font-bold" style="color: {palette.textMain};">
											{exp.company}{exp.city || exp.country ? ` (${formatLocation(exp.city, exp.country)})` : ""}
										</p>
									{/if}
									{#if exp.description}
										<div
											class="text-[10.5px] text-slate-600 leading-normal mt-0.5 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
										>
											{@html exp.description}
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Education -->
			{#if hasEducation}
				<section>
					<div class="flex items-center gap-2 mb-2">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.textMain};"
						>
							<GraduationCap class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider"
							style="color: {palette.textMain};"
						>
							Education & Qualifications
						</h2>
						<div
							class="flex-1 h-[2px] rounded"
							style="background-color: {palette.accent};"
						></div>
					</div>

					<div class="space-y-2.5 px-1">
						{#each data.education as edu}
							{#if edu.degree || edu.institution || edu.fieldOfStudy}
								<div>
									<div class="flex justify-between items-baseline">
										<h3 class="text-[12.5px] font-extrabold text-slate-900 leading-tight">
											{formatTitleWithSub(edu.degree, edu.fieldOfStudy, ' | ')}
										</h3>
										<span class="text-[10px] font-bold text-slate-500">
											{formatDateRange(edu.from, edu.to, edu.current)}
										</span>
									</div>
									{#if edu.institution}
										<p class="text-[11px] font-bold" style="color: {palette.textMain};">
											{edu.institution}
										</p>
									{/if}
									{#if edu.description}
										<div
											class="text-[10.5px] text-slate-600 leading-normal mt-0.5 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
										>
											{@html edu.description}
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Courses & Certifications -->
			{#if hasCertificates}
				<section>
					<div class="flex items-center gap-2 mb-2">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.textMain};"
						>
							<Award class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider"
							style="color: {palette.textMain};"
						>
							Courses & Certifications
						</h2>
						<div
							class="flex-1 h-[2px] rounded"
							style="background-color: {palette.accent};"
						></div>
					</div>

					<div class="space-y-1.5 px-1 text-[11px]">
						{#each data.certificates as cert}
							{#if cert.name || cert.authority}
								<div class="flex justify-between items-start">
									<div>
										<span class="font-bold text-slate-900">{cert.name}</span>
										{#if cert.authority}
											<span class="text-slate-600"> – {cert.authority}</span>
										{/if}
									</div>
									{#if cert.date}
										<span class="text-[9.5px] text-slate-500 font-medium shrink-0">{cert.date}</span>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Research Interests / Publications / Awards -->
			{#if hasPublications || hasAwards}
				<section>
					<div class="flex items-center gap-2 mb-2">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.textMain};"
						>
							<BookOpen class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider"
							style="color: {palette.textMain};"
						>
							Research & Publications
						</h2>
						<div
							class="flex-1 h-[2px] rounded"
							style="background-color: {palette.accent};"
						></div>
					</div>

					<div class="space-y-2 px-1 text-[11px]">
						{#each data.publications as pub}
							{#if pub.title || pub.publisher}
								<div>
									<h3 class="font-bold text-slate-900">{pub.title}</h3>
									{#if pub.publisher}
										<p class="text-[10px] text-slate-600">{pub.publisher} ({pub.date})</p>
									{/if}
								</div>
							{/if}
						{/each}
						{#each data.awards as award}
							{#if award.title || award.issuer}
								<div>
									<h3 class="font-bold text-slate-900">{award.title}</h3>
									{#if award.issuer}
										<p class="text-[10px] text-slate-600">{award.issuer} ({award.date})</p>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<!-- Closing Note -->
		<footer class="mt-6 pt-3 flex justify-between items-end">
			<div>
				<p class="text-sm font-serif italic" style="color: {palette.accent};">
					Thank you for your consideration.
				</p>
			</div>

			<!-- Bottom Right Accent Bars -->
			<div class="flex gap-1.5 items-end pointer-events-none">
				<div class="w-2.5 h-12 rounded-t-md" style="background-color: {palette.accent};"></div>
				<div class="w-3 h-8 rounded-t-md" style="background-color: {palette.accent};"></div>
			</div>
		</footer>
	</div>
</article>
