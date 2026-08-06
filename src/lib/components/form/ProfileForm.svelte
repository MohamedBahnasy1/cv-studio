<script lang="ts">
	import { resume } from '$lib/store';
	import { Label } from '$lib/components/ui/label/index.js';
	import RichTextEditor from '$lib/components/ui/RichTextEditor.svelte';

	let profileText = $state($resume.profile);

	$effect(() => {
		if (profileText !== $resume.profile) {
			resume.update((state) => ({ ...state, profile: profileText }));
		}
	});
</script>

<div class="space-y-1">
	<Label class="mb-2 block">نبذة تعريفية / Profile Summary</Label>
	<RichTextEditor
		placeholder="Dedicated nursing professional with a Bachelor of Science in Nursing from Damanhour University..."
		bind:value={profileText}
	/>
</div>
