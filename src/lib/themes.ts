export interface Palette1 {
	id: string;
	name: string;
	c1: string; // Primary circle / Icon background
	c2: string; // Secondary circle / Title pill background
	c3: string; // Dot accent circle
	c4: string; // Soft overlapping circle
}

export interface Palette2 {
	id: string;
	name: string;
	primary: string; // Ribbon header & Section headers
	secondary: string; // Ribbon folded tails shadow
	accent: string; // Badge / Pill light background
	textOnPrimary: string; // Text color on primary ribbon
}

export interface Palette3 {
	id: string;
	name: string;
	sidebarBg: string; // Dark left sidebar background
	accent: string; // Gold/Amber accent color
	textOnSidebar: string; // Text color in sidebar
	textMain: string; // Main text color on right
	lightBg: string; // Light right side background
}

export const TEMPLATE1_PALETTES: Palette1[] = [
	{
		id: "original",
		name: "تركواز وذهب",
		c1: "#34B7C9",
		c2: "#F5C542",
		c3: "#EE4326",
		c4: "#76E3EA",
	},
	{
		id: "dusty_coral",
		name: "أزرق ومرجاني",
		c1: "#6E98AB",
		c2: "#EA8B83",
		c3: "#D95D55",
		c4: "#A5C7D5",
	},
	{
		id: "amber_silver",
		name: "كهرمان وفضي",
		c1: "#E8A338",
		c2: "#CCCCCC",
		c3: "#D97E25",
		c4: "#E5E5E5",
	},
	{
		id: "emerald_mint",
		name: "زمرّدي ونعناع",
		c1: "#328173",
		c2: "#C0E2CF",
		c3: "#225B51",
		c4: "#D6EFE2",
	},
	{
		id: "monochrome",
		name: "رمادي وفحمي",
		c1: "#4A4E51",
		c2: "#D1D1D1",
		c3: "#2D3033",
		c4: "#E2E2E2",
	},
	{
		id: "pastel_peach",
		name: "سماوي وخوخي",
		c1: "#60C0B9",
		c2: "#F7D6B8",
		c3: "#3DAFA5",
		c4: "#B9EAE7",
	},
	{
		id: "blush_taupe",
		name: "وردي وبني بيج",
		c1: "#BCA893",
		c2: "#F2C4C0",
		c3: "#99836E",
		c4: "#F9E5E3",
	},
];

export const TEMPLATE2_PALETTES: Palette2[] = [
	{
		id: "slate_teal",
		name: "أزرق زيتي",
		primary: "#435558",
		secondary: "#2C3B3D",
		accent: "#EBF1F2",
		textOnPrimary: "#FFFFFF",
	},
	{
		id: "sage_green",
		name: "أخضر زيتوني",
		primary: "#516B61",
		secondary: "#364942",
		accent: "#EDF4F1",
		textOnPrimary: "#FFFFFF",
	},
	{
		id: "steel_blue",
		name: "أزرق كلاسيك",
		primary: "#4A6B82",
		secondary: "#304859",
		accent: "#EEF4F8",
		textOnPrimary: "#FFFFFF",
	},
	{
		id: "terracotta",
		name: "أحمر طوبي",
		primary: "#AA5C59",
		secondary: "#753D3B",
		accent: "#FAF0EF",
		textOnPrimary: "#FFFFFF",
	},
	{
		id: "taupe_khaki",
		name: "بني بيج",
		primary: "#A18E78",
		secondary: "#6E6050",
		accent: "#F7F4F0",
		textOnPrimary: "#FFFFFF",
	},
	{
		id: "classic_grey",
		name: "رمادي فاخر",
		primary: "#73787E",
		secondary: "#4D5155",
		accent: "#F2F4F5",
		textOnPrimary: "#FFFFFF",
	},
];

export const TEMPLATE3_PALETTES: Palette3[] = [
	{
		id: "navy_gold",
		name: "كحلي وذهبي",
		sidebarBg: "#0A192F",
		accent: "#F5A623",
		textOnSidebar: "#FFFFFF",
		textMain: "#0A192F",
		lightBg: "#FAFAFA",
	},
	{
		id: "teal_gold",
		name: "زيتي وذهبي",
		sidebarBg: "#0B3C3E",
		accent: "#D8A236",
		textOnSidebar: "#FFFFFF",
		textMain: "#0B3C3E",
		lightBg: "#F8FAF9",
	},
	{
		id: "maroon_gold",
		name: "عنابي وذهبي",
		sidebarBg: "#3D1217",
		accent: "#E5A93C",
		textOnSidebar: "#FFFFFF",
		textMain: "#3D1217",
		lightBg: "#FCF9F7",
	},
	{
		id: "charcoal_bronze",
		name: "فحمي وبرونزي",
		sidebarBg: "#22252A",
		accent: "#D49B4B",
		textOnSidebar: "#FFFFFF",
		textMain: "#22252A",
		lightBg: "#FAFAFA",
	},
	{
		id: "emerald_gold",
		name: "زمردي وذهبي",
		sidebarBg: "#113627",
		accent: "#D4A237",
		textOnSidebar: "#FFFFFF",
		textMain: "#113627",
		lightBg: "#F8FAF8",
	},
	{
		id: "royal_silver",
		name: "أزرق ملكي وفضي",
		sidebarBg: "#1B2B4C",
		accent: "#C0C5CE",
		textOnSidebar: "#FFFFFF",
		textMain: "#1B2B4C",
		lightBg: "#F5F7FA",
	},
	{
		id: "purple_gold",
		name: "بنفسجي وذهبي",
		sidebarBg: "#2E1B4D",
		accent: "#D4AF37",
		textOnSidebar: "#FFFFFF",
		textMain: "#2E1B4D",
		lightBg: "#FAF8FC",
	},
	{
		id: "espresso_cream",
		name: "إسبريسو وكريمي",
		sidebarBg: "#3B2B23",
		accent: "#D9BCA3",
		textOnSidebar: "#FFFFFF",
		textMain: "#3B2B23",
		lightBg: "#FCFBF9",
	},
	{
		id: "slate_coral",
		name: "رصاصي مزرق ومرجاني",
		sidebarBg: "#2A3F54",
		accent: "#E76F51",
		textOnSidebar: "#FFFFFF",
		textMain: "#2A3F54",
		lightBg: "#F8F9FA",
	}
];
