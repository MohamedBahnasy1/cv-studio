<script lang="ts">
	import { resume, createId, addArrayItem, removeArrayItem, updateArrayItem } from '$lib/store';
	import type { CertificateItem } from '$lib/types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';
	import FormCollapsibleItem from './FormCollapsibleItem.svelte';
	import FormSectionHeader from './FormSectionHeader.svelte';

	function addCertificate() {
		addArrayItem('certificates', {
			id: createId(),
			name: '',
			authority: '',
			url: '',
			date: '',
			description: ''
		});
	}
</script>

<div class="space-y-3">
	<FormSectionHeader
		buttonText="إضافة شهادة"
		emptyText='لم تتم إضافة شهادات بعد. اضغط "إضافة شهادة" للبدء.'
		isEmpty={!($resume.certificates && $resume.certificates.length > 0)}
		onadd={addCertificate}
	/>

	{#each $resume.certificates || [] as item, i (item.id)}
		<FormCollapsibleItem
			title={item.name}
			fallbackTitle="شهادة"
			index={i}
			onremove={() => removeArrayItem('certificates', item.id)}
		>
			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>اسم الشهادة المهنية</Label>
					<Input
						placeholder="مثال: AWS Certified Solutions Architect"
						value={item.name}
						oninput={(e: Event) => updateArrayItem('certificates', item.id, 'name', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>الجهة المصدّرة</Label>
					<Input
						placeholder="مثال: Amazon Web Services / Coursera"
						value={item.authority}
						oninput={(e: Event) => updateArrayItem('certificates', item.id, 'authority', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="grid grid-cols-2 gap-3">
				<div class="space-y-1">
					<Label>رابط / كود التوثيق</Label>
					<Input
						placeholder="https://..."
						value={item.url}
						oninput={(e: Event) => updateArrayItem('certificates', item.id, 'url', (e.target as HTMLInputElement).value)}
					/>
				</div>
				<div class="space-y-1">
					<Label>تاريخ الإصدار</Label>
					<Input
						placeholder="MM/YYYY"
						value={item.date}
						oninput={(e: Event) => updateArrayItem('certificates', item.id, 'date', (e.target as HTMLInputElement).value)}
					/>
				</div>
			</div>

			<div class="space-y-1">
				<Label class="mb-1 block">الوصف والتفاصيل</Label>
				<RichTextEditor
					placeholder="تفاصيل المهارات والمواضيع المشمولة في الشهادة..."
					value={item.description}
					onchange={(val: string) => updateArrayItem('certificates', item.id, 'description', val)}
				/>
			</div>
		</FormCollapsibleItem>
	{/each}
</div>
