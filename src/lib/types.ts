export interface ResumeData {
    personal: {
        fullName: string;
        title: string;
        dob: string;
        nationality: string;
        address: string;
        phone: string;
        email: string;
        photo?: string;
    };
    profile: string;
    experience: {
        id: string;
        jobTitle: string;
        company: string;
        location: string;
        from: string;
        to: string;
        current: boolean;
        description: string;
    }[];
    education: {
        id: string;
        degree: string;
        institution: string;
        location: string;
        from: string;
        to: string;
        grade?: string;
    }[];
    skills: {
        category: string;
        items: { name: string; level: number }[];
    }[];
    languages: { name: string; level: string }[];
}