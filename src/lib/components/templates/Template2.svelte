<script lang="ts">
import type { ResumeData } from "$lib/types";
	import { TEMPLATE2_PALETTES, type Palette2 } from "$lib/themes";
	import {
		getSkillName,
		levelToPercent,
		levelToPercentStr,
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
	import Calendar from "@lucide/svelte/icons/calendar";
	import MapPin from "@lucide/svelte/icons/map-pin";
	import Phone from "@lucide/svelte/icons/phone";
	import Mail from "@lucide/svelte/icons/mail";
	import Zap from "@lucide/svelte/icons/zap";

	let {
		data,
		palette = TEMPLATE2_PALETTES[1],
	}: { data: ResumeData; palette?: Palette2 } = $props();

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

<!-- A4 Resume Container Template 2 (Ribbon Executive) -->
<article
	class="relative w-[210mm] min-h-[297mm] bg-white text-slate-900 px-8 py-6 font-sans leading-relaxed box-border overflow-hidden print:w-[210mm] print:h-[297mm] print:max-h-[297mm] print:px-7 print:py-6 print:m-0 print:overflow-hidden"
>
	<!-- Ribbon Header Area -->
	<header class="relative mb-4">
		<!-- 1. Avatar Photo Centered Above Ribbon (Never Collides with Text) -->
		{#if p.photo}
			<div class="flex justify-center mb-2 relative z-20">
				<img
					src={p.photo}
					alt={p.fullName}
					class="w-22 h-22 rounded-full object-cover border-4 border-white shadow-md"
				/>
			</div>
		{/if}

		<!-- 2. Authentic 3D Folded Ribbon Banner -->
		<div class="relative max-w-[90%] mx-auto z-10">
			<!-- Left Folded Ribbon Tail Triangle Shadow -->
			<div
				class="absolute -left-3 top-2.5 w-4 h-full pointer-events-none z-0"
				style="background-color: {palette.secondary}; clip-path: polygon(100% 0, 0 50%, 100% 100%);"
			></div>

			<!-- Main Ribbon Core -->
			<div
				class="relative z-10 py-2.5 px-6 shadow-sm text-center flex flex-col items-center justify-center rounded-xs"
				style="background-color: {palette.primary}; color: {palette.textOnPrimary};"
			>
				<!-- Candidate Name in Bold Uppercase -->
				<h1 class="text-2xl font-extrabold tracking-wide uppercase leading-tight">
					{p.fullName || "Your Full Name"}
				</h1>
			</div>

			<!-- Right Folded Ribbon Tail Triangle Shadow -->
			<div
				class="absolute -right-3 top-2.5 w-4 h-full pointer-events-none z-0"
				style="background-color: {palette.secondary}; clip-path: polygon(0 0, 100% 50%, 0 100%);"
			></div>
		</div>

		<!-- 3. Subtitle & Horizontal Contact Bar -->
		<div class="mt-2 text-center space-y-1">
			{#if p.title}
				<p
					class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
				>
					{p.title}
				</p>
			{/if}

			<!-- Contact Info Icons Horizontal Line -->
			<div
				class="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px] text-slate-700 font-medium"
			>
				{#if p.dob}
					<span class="flex items-center gap-1">
						<Calendar
							class="w-3.5 h-3.5"
							style="color: {palette.primary};"
						/>
						{p.dob}
					</span>
				{/if}

				{#if p.address}
					<span class="flex items-center gap-1">
						<MapPin
							class="w-3.5 h-3.5"
							style="color: {palette.primary};"
						/>
						{p.address}
					</span>
				{/if}

				{#if p.phone}
					<span class="flex items-center gap-1">
						<Phone
							class="w-3.5 h-3.5"
							style="color: {palette.primary};"
						/>
						{p.phone}
					</span>
				{/if}

				{#if p.email}
					<span class="flex items-center gap-1">
						<Mail
							class="w-3.5 h-3.5"
							style="color: {palette.primary};"
						/>
						{p.email}
					</span>
				{/if}
			</div>
		</div>
	</header>

	<!-- Main 2-Column Grid -->
	<div class="grid grid-cols-12 gap-6">
		<!-- Left Column: Profile, Work Experience, Education -->
		<div class="col-span-7 space-y-4">
			<!-- Profile Section -->
			{#if hasProfile}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<User class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Profile
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>
					<div
						class="text-[11px] text-slate-700 leading-relaxed [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
					>
						{@html data.profile}
					</div>
				</section>
			{/if}

			<!-- Work Experience Section -->
			{#if hasExperience}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<Briefcase class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Work experience
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>

					<div class="space-y-3">
						{#each data.experience as exp}
							{#if exp.jobTitle || exp.company}
								<div class="grid grid-cols-12 gap-2 text-[11px]">
									<!-- Left date sidebar -->
									<div class="col-span-4 text-[10px] text-slate-500 font-semibold leading-tight">
										<p>{formatDateRange(exp.from, exp.to, exp.current)}</p>
										{#if exp.city || exp.country}
											<p class="text-slate-400 font-normal">{formatLocation(exp.city, exp.country)}</p>
										{/if}
									</div>

									<!-- Right content -->
									<div class="col-span-8">
										<h3 class="font-extrabold text-slate-900 leading-tight">
											{exp.jobTitle}
										</h3>
										{#if exp.company}
											<p class="font-semibold text-slate-700 text-[10.5px]">
												{exp.company}
											</p>
										{/if}
										{#if exp.description}
											<div
												class="text-[10.5px] text-slate-600 leading-normal mt-1 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
											>
												{@html exp.description}
											</div>
										{/if}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Education Section -->
			{#if hasEducation}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<GraduationCap class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Education
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>

					<div class="space-y-3">
						{#each data.education as edu}
							{#if edu.degree || edu.institution || edu.fieldOfStudy}
								<div class="grid grid-cols-12 gap-2 text-[11px]">
									<!-- Left date sidebar -->
									<div class="col-span-4 text-[10px] text-slate-500 font-semibold leading-tight">
										<p>{formatDateRange(edu.from, edu.to, edu.current)}</p>
										{#if edu.city || edu.country}
											<p class="text-slate-400 font-normal">{formatLocation(edu.city, edu.country)}</p>
										{/if}
									</div>

									<!-- Right content -->
									<div class="col-span-8">
										<h3 class="font-extrabold text-slate-900 leading-tight">
											{formatTitleWithSub(edu.degree, edu.fieldOfStudy)}
										</h3>
										{#if edu.institution}
											<p class="font-semibold text-slate-700 text-[10.5px]">
												{edu.institution}
											</p>
										{/if}
										{#if edu.description}
											<div
												class="text-[10.5px] text-slate-600 leading-normal mt-1 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
											>
												{@html edu.description}
											</div>
										{/if}
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}
		</div>

		<!-- Right Column: Languages, Skills Badges, Awards, Certifications, Publications, Social Links -->
		<div class="col-span-5 space-y-4">
			<!-- Languages Section (Circular Percent Badge Rings) -->
			{#if hasLanguages}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<Languages class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Languages
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>

					<div class="space-y-2.5 pt-1">
						{#each data.languages as lang}
							{#if lang.name}
								<div>
									<div class="flex items-center justify-between gap-2 mb-1">
										<span class="text-[11px] font-bold text-slate-800 truncate">{lang.name}</span>
										{#if lang.level}
											<span class="text-[9.5px] font-bold text-slate-700 px-2 py-0.5 rounded-md shrink-0" style="background-color: {palette.accent};">
												{lang.level}
											</span>
										{/if}
									</div>
									<div class="w-full h-[4px] rounded-full overflow-hidden" style="background-color: {palette.primary}25;">
										<div
											class="h-full rounded-full transition-all"
											style="width: {levelToPercent(lang.level)}%; background-color: {palette.primary};"
										></div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Skills / Strengths Pill Badges Section -->
			{#if activeSkillCategories.length > 0}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<Zap class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Skills
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>

					<div class="flex flex-wrap gap-1.5 pt-1">
						{#each activeSkillCategories as cat}
							{#each cat.items as item}
								{#if getSkillName(item)}
									<span
										class="text-[10px] font-semibold px-2.5 py-1 rounded-sm shadow-xs"
										style="background-color: {palette.primary}; color: {palette.textOnPrimary};"
									>
										{getSkillName(item)}
									</span>
								{/if}
							{/each}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Awards Section -->
			{#if hasAwards}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<Trophy class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Awards
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>

					<div class="space-y-2">
						{#each data.awards as award}
							{#if award.title || award.issuer}
								<div>
									<h3 class="text-[11.5px] font-extrabold text-slate-900 leading-tight">
										{award.title}{award.issuer ? ` – ${award.issuer}` : ""}
									</h3>
									<p class="text-[9.5px] text-slate-500 mb-0.5">
										{award.date}
									</p>
									{#if award.description}
										<div class="text-[10px] text-slate-600 leading-normal">
											{@html award.description}
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Certifications Section -->
			{#if hasCertificates}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<Award class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Certifications
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>

					<div class="space-y-2">
						{#each data.certificates as cert}
							{#if cert.name || cert.authority}
								<div>
									<h3 class="text-[11.5px] font-extrabold text-slate-900 leading-tight">
										{cert.name}{cert.authority ? ` | ${cert.authority}` : ""}
									</h3>
									<p class="text-[9.5px] text-slate-500 mb-0.5">
										{cert.date}
									</p>
									{#if cert.description}
										<div class="text-[10px] text-slate-600 leading-normal">
											{@html cert.description}
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Publications Section -->
			{#if hasPublications}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<BookOpen class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Publications
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>

					<div class="space-y-2">
						{#each data.publications as pub}
							{#if pub.title || pub.publisher}
								<div>
									<h3 class="text-[11.5px] font-extrabold text-slate-900 leading-tight">
										{pub.title}{pub.publisher ? ` | ${pub.publisher}` : ""}
									</h3>
									<p class="text-[9.5px] text-slate-500 mb-0.5">
										{pub.date}
									</p>
									{#if pub.description}
										<div class="text-[10px] text-slate-600 leading-normal">
											{@html pub.description}
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Social Links Section -->
			{#if hasSocial}
				<section>
					<div class="flex items-center gap-2 mb-2 pb-1 border-b" style="border-color: {palette.primary}40;">
						<div
							class="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
							style="background-color: {palette.primary};"
						>
							<Share2 class="w-3.5 h-3.5" />
						</div>
						<h2
							class="text-xs font-extrabold uppercase tracking-wider text-slate-800"
						>
							Social Links
						</h2>
						<div
							class="flex-1 h-[1.5px] rounded"
							style="background-color: {palette.primary};"
						></div>
					</div>

					<div class="space-y-1.5">
						{#each data.social as soc}
							{#if soc.url || soc.username}
								<div class="flex items-center gap-1.5 text-[10px] text-slate-700 max-w-full overflow-hidden">
									<SocialIcon platform={soc.platform} class="w-3.5 h-3.5 shrink-0" />
									<a
										href={soc.url || '#'}
										target="_blank"
										class="hover:underline font-medium text-slate-900 truncate tracking-tight text-[9.5px]"
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
</article>
