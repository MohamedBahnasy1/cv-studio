<script lang="ts">
import type { ResumeData } from "$lib/types";
	import { TEMPLATE1_PALETTES, type Palette1 } from "$lib/themes";
	import {
		getSkillName,
		getSkillPercent,
		levelToPercent,
		formatDateRange,
		formatLocation,
		formatTitleWithSub,
		formatSocialUrl,
		hasContactInfo as checkContactInfo,
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
	import FlaskConical from "@lucide/svelte/icons/flask-conical";
	import Briefcase from "@lucide/svelte/icons/briefcase";
	import GraduationCap from "@lucide/svelte/icons/graduation-cap";
	import Languages from "@lucide/svelte/icons/languages";
	import Trophy from "@lucide/svelte/icons/trophy";
	import Award from "@lucide/svelte/icons/award";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import Share2 from "@lucide/svelte/icons/share-2";
	import Globe from "@lucide/svelte/icons/globe";

	let {
		data,
		palette = TEMPLATE1_PALETTES[0],
	}: { data: ResumeData; palette?: Palette1 } = $props();

	const p = $derived(data.personal);

	const hasContactInfo = $derived(checkContactInfo(p));
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

<!-- A4 Resume Container -->
<article
	class="relative w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 font-sans leading-relaxed box-border overflow-hidden print:w-[210mm] print:h-[297mm] print:max-h-[297mm] print:p-7 print:m-0 print:overflow-hidden"
>
	<!-- Decorative Circles Banner (Edge Accent Slices) -->

	<!-- 1. Top-Left Yellow Circle -->
	<div
		class="absolute -top-14 left-[16%] w-24 h-24 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c2};"
	></div>

	<!-- 2. Mid-Left Red Circle -->
	<div
		class="absolute top-8 -left-28 w-36 h-36 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c3};"
	></div>

	<!-- 3. Top-Center Teal Circle -->
	<div
		class="absolute -top-16 left-[46%] w-28 h-28 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c1};"
	></div>

	<!-- 4. Floating Red Circle Dot -->
	<div
		class="absolute top-5 left-[63%] w-8 h-8 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c3};"
	></div>

	<!-- 5. Top-Right Overlapping Cluster -->
	<div
		class="absolute -top-12 right-28 w-24 h-24 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c2};"
	></div>
	<div
		class="absolute -top-10 -right-8 w-28 h-28 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c4};"
	></div>
	<div
		class="absolute -top-16 -right-6 w-60 h-60 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c1};"
	></div>
	<div
		class="absolute -top-10 -right-24 w-52 h-52 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c3};"
	></div>

	<!-- Bottom Decorative Circles -->
	<div
		class="absolute bottom-16 right-56 w-6 h-6 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c3};"
	></div>
	<div
		class="absolute -bottom-12 -right-6 w-28 h-28 rounded-full pointer-events-none z-0"
		style="background-color: {palette.c1};"
	></div>

	<!-- Header Area: Contact Info (Left) & Avatar Photo (Right) -->
	<header class="relative z-10 flex justify-between items-start mb-4 pt-2">
		<!-- Left: Name & Detailed Contact List -->
		<div class="flex-1 pr-4">
			<h1
				class="text-3xl font-extrabold text-slate-900 tracking-tight mb-2"
			>
				{p.fullName}
			</h1>
			{#if p.title}
				<p class="text-sm font-semibold text-slate-700 mb-2">
					{p.title}
				</p>
			{/if}

			{#if hasContactInfo}
				<ul class="text-[12px] space-y-0.5 text-slate-800 font-normal">
					{#if p.dob}
						<li>
							<strong class="font-bold text-slate-900"
								>Date of birth:</strong
							>
							{p.dob}
						</li>
					{/if}
					{#if p.nationality}
						<li>
							<strong class="font-bold text-slate-900"
								>Nationality:</strong
							>
							{p.nationality}
						</li>
					{/if}
					{#if p.address}
						<li>
							<strong class="font-bold text-slate-900"
								>Address:</strong
							>
							{p.address}
						</li>
					{/if}
					{#if p.phone}
						<li>
							<strong class="font-bold text-slate-900"
								>Phone number:</strong
							>
							{p.phone}
						</li>
					{/if}
					{#if p.email}
						<li>
							<strong class="font-bold text-slate-900"
								>Email address:</strong
							>
							{p.email}
						</li>
					{/if}
				</ul>
			{/if}
		</div>

		<!-- Right: Avatar Photo placed over the Teal Circle artwork -->
		{#if p.photo}
			<div class="relative z-20 shrink-0 mt-4 mr-10">
				<img
					src={p.photo}
					alt={p.fullName}
					class="w-28 h-28 rounded-full object-cover border-2 border-white shadow-md"
				/>
			</div>
		{/if}
	</header>

	<!-- Main 2-Column Content Grid -->
	<div class="relative z-10 grid grid-cols-12 gap-6">
		<!-- Left Column: Primary Career Timeline (Profile, Work Experience, Education) -->
		<div class="col-span-7 space-y-3.5">
			<!-- Profile Section -->
			{#if hasProfile}
				<section>
					<div class="flex items-center mb-2">
						<div
							class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
							style="background-color: {palette.c1};"
						>
							<User class="w-4 h-4" />
						</div>
						<span
							class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
							style="background-color: {palette.c2};"
						>
							Profile
						</span>
					</div>
					<div
						class="text-[11.5px] text-slate-700 leading-relaxed px-1 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
					>
						{@html data.profile}
					</div>
				</section>
			{/if}

			<!-- Work Experience Section -->
			{#if hasExperience}
				<section>
					<div class="flex items-center mb-3">
						<div
							class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
							style="background-color: {palette.c1};"
						>
							<Briefcase class="w-4 h-4" />
						</div>
						<span
							class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
							style="background-color: {palette.c2};"
						>
							Work experience
						</span>
					</div>

					<div class="space-y-3 px-1">
						{#each data.experience as exp}
							{#if exp.jobTitle || exp.company}
								<div>
									<h3
										class="text-[13px] font-extrabold text-slate-900 leading-tight"
									>
										{exp.jobTitle}
									</h3>
									{#if exp.company}
										<p
											class="text-[12px] font-bold text-slate-800"
										>
											{exp.company}
										</p>
									{/if}
									<p class="text-[10.5px] text-slate-500 mb-1">
										{formatDateRange(exp.from, exp.to, exp.current)}
										{#if exp.city || exp.country}
											<span> {formatLocation(exp.city, exp.country)}</span>
										{/if}
									</p>
									{#if exp.description}
										<div
											class="text-[11px] text-slate-600 leading-normal mt-1 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
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

			<!-- Education Section -->
			{#if hasEducation}
				<section>
					<div class="flex items-center mb-3">
						<div
							class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
							style="background-color: {palette.c1};"
						>
							<GraduationCap class="w-4 h-4" />
						</div>
						<span
							class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
							style="background-color: {palette.c2};"
						>
							Education
						</span>
					</div>

					<div class="space-y-3 px-1">
						{#each data.education as edu}
							{#if edu.degree || edu.institution || edu.fieldOfStudy}
								<div>
									<h3
										class="text-[13px] font-extrabold text-slate-900 leading-tight"
									>
										{formatTitleWithSub(edu.degree, edu.fieldOfStudy)}
									</h3>
									{#if edu.institution}
										<p
											class="text-[12px] font-bold text-slate-800"
										>
											{edu.institution}
										</p>
									{/if}
									<p class="text-[10.5px] text-slate-500 mb-1">
										{formatDateRange(edu.from, edu.to, edu.current)}
										{#if edu.city || edu.country}
											<span> {formatLocation(edu.city, edu.country)}</span>
										{/if}
									</p>
									{#if edu.description}
										<div
											class="text-[11px] text-slate-600 leading-normal mt-1 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
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
		</div>

		<!-- Right Column: Skills, Languages, Awards, Certifications, Publications, Social Links -->
		<div class="col-span-5 space-y-3.5">
			<!-- Skills Categories -->
			{#if activeSkillCategories.length > 0}
				{#each activeSkillCategories as cat}
					{#if cat.items.length > 0}
						<section>
							<div class="flex items-center mb-2">
								<div
									class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
									style="background-color: {palette.c1};"
								>
									<FlaskConical class="w-4 h-4" />
								</div>
								<span
									class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
									style="background-color: {palette.c2};"
								>
									Skills
								</span>
							</div>

							<div class="px-1">
								{#if cat.category}
									<h4
										class="text-[10px] font-extrabold text-slate-800 uppercase tracking-wider mb-2"
									>
										– {cat.category}
									</h4>
								{/if}

								<div class="space-y-2.5">
									{#each cat.items as item}
										{#if getSkillName(item)}
											<div>
												<span
													class="text-[11px] font-medium text-slate-800 block mb-0.5 truncate"
												>
													{getSkillName(item)}
												</span>
												<div
													class="relative w-full h-[3px] rounded-full overflow-visible"
													style="background-color: {palette.c2};"
												>
													<div
														class="absolute top-0 left-0 h-full rounded-l-full"
														style="width: {getSkillPercent(
															item,
														)}%; background-color: {palette.c1};"
													></div>
													<div
														class="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-slate-900 rounded-full z-10"
														style="left: {getSkillPercent(
															item,
														)}%;"
													></div>
												</div>
											</div>
										{/if}
									{/each}
								</div>
							</div>
						</section>
					{/if}
				{/each}
			{/if}

			<!-- Languages Section -->
			{#if hasLanguages}
				<section>
					<div class="flex items-center mb-2">
						<div
							class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
							style="background-color: {palette.c1};"
						>
							<Languages class="w-4 h-4" />
						</div>
						<span
							class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
							style="background-color: {palette.c2};"
						>
							Languages
						</span>
					</div>

					<div class="space-y-3 px-1">
						{#each data.languages as lang}
							{#if lang.name}
								<div>
									<div class="flex items-center justify-between gap-2 mb-1">
										<span class="text-[11px] font-bold text-slate-800 truncate">{lang.name}</span>
										{#if lang.level}
											<span class="text-[9.5px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
												{lang.level}
											</span>
										{/if}
									</div>
									<div class="relative w-full h-[4px] rounded-full overflow-hidden" style="background-color: {palette.c2};">
										<div
											class="h-full rounded-full transition-all"
											style="width: {levelToPercent(lang.level)}%; background-color: {palette.c1};"
										></div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Awards Section -->
			{#if hasAwards}
				<section>
					<div class="flex items-center mb-2">
						<div
							class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
							style="background-color: {palette.c1};"
						>
							<Trophy class="w-4 h-4" />
						</div>
						<span
							class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
							style="background-color: {palette.c2};"
						>
							Awards
						</span>
					</div>

					<div class="space-y-2 px-1">
						{#each data.awards as award}
							{#if award.title || award.issuer}
								<div>
									<h3
										class="text-[12px] font-extrabold text-slate-900 leading-tight"
									>
										{award.title}{award.issuer ? ` – ${award.issuer}` : ""}
									</h3>
									<p class="text-[10px] text-slate-500 mb-0.5">
										{award.date}
										{#if award.url}
											<a href={award.url} target="_blank" class="text-blue-600 underline ml-2">{award.url}</a>
										{/if}
									</p>
									{#if award.description}
										<div
											class="text-[10.5px] text-slate-600 leading-normal [&>p]:mb-0.5 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
										>
											{@html award.description}
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Certificates Section -->
			{#if hasCertificates}
				<section>
					<div class="flex items-center mb-2">
						<div
							class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
							style="background-color: {palette.c1};"
						>
							<Award class="w-4 h-4" />
						</div>
						<span
							class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
							style="background-color: {palette.c2};"
						>
							Certifications
						</span>
					</div>

					<div class="space-y-2 px-1">
						{#each data.certificates as cert}
							{#if cert.name || cert.authority}
								<div>
									<h3
										class="text-[12px] font-extrabold text-slate-900 leading-tight"
									>
										{cert.name}{cert.authority ? ` | ${cert.authority}` : ""}
									</h3>
									<p class="text-[10px] text-slate-500 mb-0.5">
										{cert.date}
										{#if cert.url}
											<span class="ml-2 font-mono text-[9.5px] text-slate-600">{cert.url}</span>
										{/if}
									</p>
									{#if cert.description}
										<div
											class="text-[10.5px] text-slate-600 leading-normal [&>p]:mb-0.5 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
										>
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
					<div class="flex items-center mb-2">
						<div
							class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
							style="background-color: {palette.c1};"
						>
							<BookOpen class="w-4 h-4" />
						</div>
						<span
							class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
							style="background-color: {palette.c2};"
						>
							Publications
						</span>
					</div>

					<div class="space-y-2 px-1">
						{#each data.publications as pub}
							{#if pub.title || pub.publisher}
								<div>
									<h3
										class="text-[12px] font-extrabold text-slate-900 leading-tight"
									>
										{pub.title}{pub.publisher ? ` | ${pub.publisher}` : ""}
									</h3>
									<p class="text-[10px] text-slate-500 mb-0.5">
										{pub.date}
										{#if pub.url}
											<span class="ml-2 font-mono text-[9.5px] text-slate-600">{pub.url}</span>
										{/if}
									</p>
									{#if pub.description}
										<div
											class="text-[10.5px] text-slate-600 leading-normal [&>p]:mb-0.5 [&>ul]:list-disc [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:ml-4 [&_a]:text-blue-600 [&_a]:underline"
										>
											{@html pub.description}
										</div>
									{/if}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Social Media Links Section -->
			{#if hasSocial}
				<section>
					<div class="flex items-center mb-2">
						<div
							class="w-7 h-7 rounded-full flex items-center justify-center text-white z-10 shrink-0 shadow-sm"
							style="background-color: {palette.c1};"
						>
							<Share2 class="w-4 h-4" />
						</div>
						<span
							class="text-slate-900 font-extrabold text-xs px-4 py-1 rounded-full -ml-2 pl-4 z-0"
							style="background-color: {palette.c2};"
						>
							Social Links
						</span>
					</div>

					<div class="space-y-1.5 px-1">
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
