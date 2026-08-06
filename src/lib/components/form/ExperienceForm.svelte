<script lang="ts">
	import { resume, createId, addArrayItem, removeArrayItem, updateArrayItem } from '$lib/store';
	import type { ExperienceItem } from '$lib/types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';
	import FormCollapsibleItem from './FormCollapsibleItem.svelte';
	import FormSectionHeader from './FormSectionHeader.svelte';

	function addExperience() {
		addArrayItem('experience', {
			id: createId(),
			jobTitle: '',
			company: '',
			city: '',
			country: '',
			from: '',
			to: '',
			current: false,
			description: ''
		});
	}
</script>

<div class="space-y-3">
	<FormSectionHeader
		buttonText="إضافة خبرة"
		emptyText='لم تتم إضافة خبرات بعد. اضغط "إضافة خبرة" للبدء.'
		isEmpty={$resume.experience.length === 0}
		onadd={addExperience}
	/>

	{#each $resume.experience as item, i (item.id)}
		<FormCollapsibleItem
			title={item.jobTitle}
			fallbackTitle="خبرة"
			index={i}
			onremove={() => removeArrayItem('experience', item.id)}
		>
			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>المسمى الوظيفي</Label>
					<Input
						placeholder="Nursing professional"
						value={item.jobTitle}
						oninput={(e: Event) => updateArrayItem('experience', item.id, 'jobTitle', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>اسم الشركة / الجهة</Label>
					<Input
						placeholder="Dammanhour University"
						value={item.company}
						oninput={(e: Event) => updateArrayItem('experience', item.id, 'company', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>المدينة</Label>
					<Input
						placeholder="Dammanhour"
						value={item.city}
						oninput={(e: Event) => updateArrayItem('experience', item.id, 'city', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>الدولة</Label>
					<Input
						placeholder="Egypt"
						value={item.country}
						oninput={(e: Event) => updateArrayItem('experience', item.id, 'country', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3 items-end">
				<div class="space-y-1">
					<Label>من</Label>
					<Input
						placeholder="09/2023"
						value={item.from}
						oninput={(e: Event) => updateArrayItem('experience', item.id, 'from', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>إلى</Label>
					{#if item.current}
						<Input value="الآن / Present" disabled />
					{:else}
						<Input
							placeholder="02/2025"
							value={item.to}
							oninput={(e: Event) => updateArrayItem('experience', item.id, 'to', (e.target as HTMLInputElement).value)}
						/>
					{/if}
				</div>
			</div>

			<label class="flex items-center gap-2 text-sm cursor-pointer select-none">
				<input
					type="checkbox"
					checked={item.current}
					onchange={(e: Event) => updateArrayItem('experience', item.id, 'current', (e.target as HTMLInputElement).checked)}
					class="rounded border-input"
				/>
				أعمل هنا حالياً
			</label>

			<div class="space-y-1">
				<Label class="mb-1 block">الوصف والإنجازات</Label>
				<RichTextEditor
					placeholder="Clinical internship at the Dammanhour National Medical Institute..."
					value={item.description}
					onchange={(val: string) => updateArrayItem('experience', item.id, 'description', val)}
				/>
			</div>
		</FormCollapsibleItem>
	{/each}
</div>
