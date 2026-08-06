<script lang="ts">
	import { resume, createId, addArrayItem, removeArrayItem, updateArrayItem } from '$lib/store';
	import type { EducationItem } from '$lib/types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';
	import FormCollapsibleItem from './FormCollapsibleItem.svelte';
	import FormSectionHeader from './FormSectionHeader.svelte';

	function addEducation() {
		addArrayItem('education', {
			id: createId(),
			degree: '',
			institution: '',
			fieldOfStudy: '',
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
		buttonText="إضافة تعليم"
		emptyText='لم تتم إضافة تعليم بعد. اضغط "إضافة تعليم" للبدء.'
		isEmpty={$resume.education.length === 0}
		onadd={addEducation}
	/>

	{#each $resume.education as item, i (item.id)}
		<FormCollapsibleItem
			title={item.institution}
			fallbackTitle="تعليم"
			index={i}
			onremove={() => removeArrayItem('education', item.id)}
		>
			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>اسم المؤسسة التعليمية</Label>
					<Input
						placeholder="Damanhour University"
						value={item.institution}
						oninput={(e: Event) => updateArrayItem('education', item.id, 'institution', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>التخصص الدراسي</Label>
					<Input
						placeholder="Nursing"
						value={item.fieldOfStudy}
						oninput={(e: Event) => updateArrayItem('education', item.id, 'fieldOfStudy', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>الدرجة العلمية</Label>
					<Input
						placeholder="B.Sc in Nursing"
						value={item.degree}
						oninput={(e: Event) => updateArrayItem('education', item.id, 'degree', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>المدينة</Label>
					<Input
						placeholder="Dammanhour"
						value={item.city}
						oninput={(e: Event) => updateArrayItem('education', item.id, 'city', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="space-y-1">
				<Label>الدولة</Label>
				<Input
					placeholder="Egypt"
					value={item.country}
					oninput={(e: Event) => updateArrayItem('education', item.id, 'country', (e.target as HTMLInputElement).value)}
				/>
			</div>

			<div class="grid grid-cols-2 gap-3 items-end">
				<div class="space-y-1">
					<Label>من</Label>
					<Input
						placeholder="09/2023"
						value={item.from}
						oninput={(e: Event) => updateArrayItem('education', item.id, 'from', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>إلى</Label>
					{#if item.current}
						<Input value="مستمر / Present" disabled />
					{:else}
						<Input
							placeholder="02/2025"
							value={item.to}
							oninput={(e: Event) => updateArrayItem('education', item.id, 'to', (e.target as HTMLInputElement).value)}
						/>
					{/if}
				</div>
			</div>

			<label class="flex items-center gap-2 text-sm cursor-pointer select-none">
				<input
					type="checkbox"
					checked={item.current}
					onchange={(e: Event) => updateArrayItem('education', item.id, 'current', (e.target as HTMLInputElement).checked)}
					class="rounded border-input"
				/>
				أدرس هنا حالياً
			</label>

			<div class="space-y-1">
				<Label class="mb-1 block">ملاحظات وإنجازات أكاديمية</Label>
				<RichTextEditor
					placeholder="Graduated with a GPA of 3.72, ranking 15th in the class of 2025..."
					value={item.description}
					onchange={(val: string) => updateArrayItem('education', item.id, 'description', val)}
				/>
			</div>
		</FormCollapsibleItem>
	{/each}
</div>
