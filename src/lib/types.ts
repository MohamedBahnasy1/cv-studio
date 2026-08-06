/**
 * Personal contact & baseline demographic details
 */
export interface PersonalInfo {
	fullName: string;
	title: string;
	dob: string;
	nationality: string;
	address: string;
	phone: string;
	email: string;
	photo?: string;
}

/**
 * Professional work experience entry
 */
export interface ExperienceItem {
	id: string;
	jobTitle: string;
	company: string;
	city: string;
	country: string;
	from: string;
	to: string;
	current: boolean;
	description: string;
}

/**
 * Academic education and qualifications record
 */
export interface EducationItem {
	id: string;
	degree: string;
	institution: string;
	fieldOfStudy: string;
	city: string;
	country: string;
	from: string;
	to: string;
	current: boolean;
	description: string;
}

/**
 * Individual skill with proficiency level percentage (10-100)
 */
export interface SkillItem {
	name: string;
	level: number;
}

/**
 * Skill categorization group
 */
export interface SkillCategory {
	id: string;
	category: string;
	items: (string | SkillItem)[];
}

/**
 * Language proficiency item
 */
export interface LanguageItem {
	name: string;
	level: string;
}

/**
 * Award or honor recognition record
 */
export interface AwardItem {
	id: string;
	title: string;
	issuer: string;
	url: string;
	date: string;
	description: string;
}

/**
 * Professional certification record
 */
export interface CertificateItem {
	id: string;
	name: string;
	authority: string;
	url: string;
	date: string;
	description: string;
}

/**
 * Academic paper, journal, or book publication record
 */
export interface PublicationItem {
	id: string;
	title: string;
	publisher: string;
	url: string;
	date: string;
	description: string;
}

/**
 * External social media / portfolio handle
 */
export interface SocialItem {
	id: string;
	platform: string;
	url: string;
	username: string;
}

/**
 * Root data structure encapsulating complete resume payload
 */
export interface ResumeData {
	personal: PersonalInfo;
	profile: string;
	experience: ExperienceItem[];
	education: EducationItem[];
	skills: SkillCategory[];
	languages: LanguageItem[];
	awards: AwardItem[];
	certificates: CertificateItem[];
	publications: PublicationItem[];
	social: SocialItem[];
}