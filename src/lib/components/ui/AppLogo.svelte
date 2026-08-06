<script lang="ts">
	let { class: className = 'size-9 shrink-0' }: { class?: string } = $props();
</script>

<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" class={className}>
	<title>CV Studio Icon</title>
	<defs>
		<linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="#F7F9FC" />
			<stop offset="100%" stop-color="#E9EDF5" />
		</linearGradient>
		<linearGradient id="fold2" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="#D7DEEC" />
			<stop offset="100%" stop-color="#C3CCE0" />
		</linearGradient>
		<linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0%" stop-color="#FF6B6B" />
			<stop offset="100%" stop-color="#EE4E6E" />
		</linearGradient>
		<linearGradient id="avatar" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="#6C7CF5" />
			<stop offset="100%" stop-color="#4A56D6" />
		</linearGradient>
	</defs>

	<rect x="20" y="20" width="140" height="12" rx="6" fill="#2E3350" opacity="0.06" />

	<path d="M32 18 H126 L168 60 V178 A8 8 0 0 1 160 186 H32 A8 8 0 0 1 24 178 V26 A8 8 0 0 1 32 18 Z" fill="url(#paper)" stroke="#D3D9E8" stroke-width="1.5" />
	<path d="M126 18 L168 60 H134 A8 8 0 0 1 126 52 Z" fill="url(#fold2)" />

	<circle cx="52" cy="60" r="16" fill="url(#avatar)" />
	<path d="M52 78 c-11 0 -18 6 -18 14 h36 c0 -8 -7 -14 -18 -14 Z" fill="url(#avatar)" />

	<rect x="80" y="52" width="60" height="8" rx="4" fill="#2E3350" opacity="0.85" />
	<rect x="80" y="66" width="42" height="6" rx="3" fill="#8A93B3" />

	<rect x="36" y="106" width="124" height="4" rx="2" fill="#DDE2EE" />
	<rect x="36" y="120" width="124" height="6" rx="3" fill="#5A6180" opacity="0.75" />
	<rect x="36" y="132" width="100" height="6" rx="3" fill="#8A93B3" />
	<rect x="36" y="144" width="112" height="6" rx="3" fill="#8A93B3" />
	<rect x="36" y="156" width="80" height="6" rx="3" fill="#8A93B3" />

	<path d="M12 138 L12 170 L28 178 L44 170 L44 138 Z" fill="url(#ribbon)" />
	<path d="M12 170 L28 162 L44 170 L28 178 Z" fill="#C43B58" />
	<text x="28" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF">CV</text>
</svg>
