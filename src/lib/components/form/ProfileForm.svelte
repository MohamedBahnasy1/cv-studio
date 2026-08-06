<script lang="ts">
	import { resume } from '$lib/store';
	import { Label } from '$lib/components/ui/label/index.js';
	import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';

	function handleProfileChange(html: string) {
		resume.update((state) => ({ ...state, profile: html }));
	}
</script>

<div class="space-y-1">
	<Label class="mb-2 block">نبذة تعريفية / Profile Summary</Label>
	<RichTextEditor
		placeholder="Dedicated nursing professional with a Bachelor of Science in Nursing from Damanhour University..."
		value={$resume.profile}
		onchange={handleProfileChange}
	/>
</div>
