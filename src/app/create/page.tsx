"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { TraditionalSinhalaTemplate } from "@/components/templates/TraditionalSinhalaTemplate";
import { ModernLuxuryTemplate } from "@/components/templates/ModernLuxuryTemplate";
import { TemplateProps } from "@/components/templates/types";

export default function CreatePage() {
    const router = useRouter();
    const [formData, setFormData] = useState<TemplateProps>({
        brideName: "Sarah",
        groomName: "Thomas",
        brideFather: "Michael Perera",
        brideMother: "Jennifer Perera",
        groomFather: "Nihal Fernando",
        groomMother: "Sunethra Fernando",
        date: "2024-12-25",
        time: "18:00",
        venue: "Grand Hotel, Nuwara Eliya",
        poruwaTime: "10:30",
        rsvpDate: "2024-12-01",
        rsvpEmail: "wedding@example.com",
        message: "We're getting married!",
        template: "classic",
        language: "en",
        inviteeName: "Honored Guest",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLanguageChange = (lang: 'en' | 'si' | 'ta') => {
        setFormData((prev) => ({ ...prev, language: lang }));
    };

    const handleTemplateChange = (template: string) => {
        setFormData((prev) => ({ ...prev, template: template as any }));
    };

    const goToPreview = () => {
        const params = new URLSearchParams(formData as any);
        router.push(`/preview?${params.toString()}`);
    };

    const renderPreview = () => {
        switch (formData.template) {
            case "sinhala":
                return <TraditionalSinhalaTemplate {...formData} />;
            case "luxury":
                return <ModernLuxuryTemplate {...formData} />;
            case "classic":
            default:
                return <ClassicTemplate {...formData} />;
        }
    };

    return (
        <main className="flex flex-col lg:flex-row min-h-screen bg-[#fdfcf0]">
            {/* Editor Sidebar */}
            <div className="w-full lg:w-[450px] bg-white border-r border-primary/10 overflow-y-auto h-screen p-8 space-y-8 no-print shrink-0 shadow-2xl z-10">
                <div className="space-y-2">
                    <h1 className="text-3xl font-serif text-foreground">Live Editor</h1>
                    <p className="text-foreground/50 text-sm">See your changes instantly on the right.</p>
                </div>

                <div className="space-y-6">
                    {/* Style & Lang */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Template</label>
                            <select
                                name="template"
                                value={formData.template}
                                onChange={(e) => handleTemplateChange(e.target.value)}
                                className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm transition-all shadow-sm"
                            >
                                <option value="classic">Classic</option>
                                <option value="sinhala">Traditional Sinhala</option>
                                <option value="luxury">Modern Luxury</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Language</label>
                            <div className="flex gap-1 bg-gray-50 p-1 rounded-xl border border-black/5">
                                {['en', 'si', 'ta'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => handleLanguageChange(lang as 'en' | 'si' | 'ta')}
                                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${formData.language === lang
                                            ? 'bg-white shadow-sm text-primary scale-105'
                                            : 'text-foreground/40 hover:text-foreground/60'
                                            }`}
                                    >
                                        {lang === 'en' ? 'EN' : lang === 'si' ? 'සිංහල' : 'தமிழ்'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-px bg-primary/10 flex-1" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Bride & Groom</span>
                            <div className="h-px bg-primary/10 flex-1" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="brideName" value={formData.brideName} onChange={handleChange} placeholder="Bride's Name" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                            <input type="text" name="groomName" value={formData.groomName} onChange={handleChange} placeholder="Groom's Name" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-px bg-primary/10 flex-1" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Parents</span>
                            <div className="h-px bg-primary/10 flex-1" />
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="brideFather" value={formData.brideFather} onChange={handleChange} placeholder="Bride's Father" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                                <input type="text" name="brideMother" value={formData.brideMother} onChange={handleChange} placeholder="Bride's Mother" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="groomFather" value={formData.groomFather} onChange={handleChange} placeholder="Groom's Father" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                                <input type="text" name="groomMother" value={formData.groomMother} onChange={handleChange} placeholder="Groom's Mother" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-px bg-primary/10 flex-1" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Ceremony</span>
                            <div className="h-px bg-primary/10 flex-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                            <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                        </div>
                        <input type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="The Venue" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-px bg-primary/10 flex-1" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Personalization</span>
                        <div className="h-px bg-primary/10 flex-1" />
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[9px] text-foreground/40 px-2 uppercase tracking-widest">Invitee name</label>
                            <input type="text" name="inviteeName" value={formData.inviteeName} onChange={handleChange} placeholder="Dear [Name]" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-px bg-primary/10 flex-1" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40">Details</span>
                            <div className="h-px bg-primary/10 flex-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[9px] text-foreground/40 px-2">Poruwa Time</label>
                                <input type="time" name="poruwaTime" value={formData.poruwaTime} onChange={handleChange} className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] text-foreground/40 px-2">RSVP Date</label>
                                <input type="date" name="rsvpDate" value={formData.rsvpDate} onChange={handleChange} className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                            </div>
                        </div>
                        <input type="email" name="rsvpEmail" value={formData.rsvpEmail} onChange={handleChange} placeholder="RSVP Email" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm" />
                        <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder="Personal Message" className="w-full p-3 rounded-xl border border-black/5 bg-gray-50 focus:border-primary outline-none text-sm resize-none" />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={goToPreview}
                        className="w-full bg-primary text-background py-4 rounded-2xl font-bold hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                    >
                        <span>Preview Full Screen</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>

                    <button
                        onClick={() => {
                            const params = new URLSearchParams(formData as any);
                            window.open(`/api/og?${params.toString()}`, '_blank');
                        }}
                        className="w-full bg-white text-primary border-2 border-primary/20 py-4 rounded-2xl font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                    >
                        <span>Download as Image</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                    </button>
                </div>
            </div>

            {/* Live Preview Area */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 h-screen overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
                <div className="transform scale-[0.6] sm:scale-[0.8] md:scale-95 lg:scale-100 transition-all duration-500 hover:scale-[1.02]">
                    <div className="shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden group">
                        {renderPreview()}

                        {/* Realistic Overlay Effects */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-black/5 opacity-40 group-hover:opacity-20 transition-opacity" />
                        <div className="absolute inset-x-0 top-0 h-4 bg-white/10 pointer-events-none" />
                    </div>
                </div>
            </div>
        </main>
    );
}
