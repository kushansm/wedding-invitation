export interface TemplateProps {
    brideName: string;
    groomName: string;
    brideFather?: string;
    brideMother?: string;
    groomFather?: string;
    groomMother?: string;
    date: string;
    time: string;
    venue: string;
    poruwaTime?: string;
    rsvpDate?: string;
    language: 'en' | 'si' | 'ta';
    inviteeName?: string;
    message?: string;
    rsvpEmail?: string;
    // Keep older fields for backwards compatibility during refactor if needed
    brideParents?: string;
    template: 'classic' | 'sinhala' | 'luxury';
}
