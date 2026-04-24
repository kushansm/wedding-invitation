"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        brideName: "",
        groomName: "",
        brideParents: "",
        groomParents: "",
        date: "",
        time: "",
        venue: "",
        poruwaTime: "",
        rsvpDate: "",
        rsvpEmail: "",
        message: "We're getting married!",
        template: "classic",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(formData);
        router.push(`/preview?${params.toString()}`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-6 sm:p-12 bg-[#fdfcf0]">
            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl space-y-8 animate-in fade-in zoom-in duration-700 border border-primary/10">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-serif text-foreground">Invitation Details</h1>
                    <p className="text-foreground/60">Customize your special announcement.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Template Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold uppercase tracking-widest text-primary">Choose Template</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'classic', name: 'Classic' },
                                { id: 'sinhala', name: 'Traditional Sinhala' },
                                { id: 'luxury', name: 'Modern Luxury' }
                            ].map((tpl) => (
                                <button
                                    key={tpl.id}
                                    type="button"
                                    onClick={() => setFormData(p => ({ ...p, template: tpl.id }))}
                                    className={`p-4 rounded-xl border-2 transition-all text-sm font-medium ${formData.template === tpl.id
                                            ? 'border-primary bg-primary/5 text-primary shadow-inner'
                                            : 'border-black/5 hover:border-primary/20 bg-white'
                                        }`}
                                >
                                    {tpl.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Bride Side */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-tighter text-black/30 border-b pb-1">Bride's Details</h3>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Bride's Name</label>
                                <input required type="text" name="brideName" value={formData.brideName} onChange={handleChange} placeholder="Sarah" className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Parents</label>
                                <input required type="text" name="brideParents" value={formData.brideParents} onChange={handleChange} placeholder="Mr. & Mrs. Perera" className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                            </div>
                        </div>

                        {/* Groom Side */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-tighter text-black/30 border-b pb-1">Groom's Details</h3>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Groom's Name</label>
                                <input required type="text" name="groomName" value={formData.groomName} onChange={handleChange} placeholder="Thomas" className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Parents</label>
                                <input required type="text" name="groomParents" value={formData.groomParents} onChange={handleChange} placeholder="Mr. & Mrs. Fernando" className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Wedding Date</label>
                            <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Ceremony Time</label>
                            <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Poruwa Ceremony Time</label>
                            <input required type="time" name="poruwaTime" value={formData.poruwaTime} onChange={handleChange} className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">RSVP Deadline Date</label>
                            <input required type="date" name="rsvpDate" value={formData.rsvpDate} onChange={handleChange} className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Venue</label>
                        <input required type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="Grand Hotel, Nuwara Eliya" className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">RSVP Email</label>
                        <input required type="email" name="rsvpEmail" value={formData.rsvpEmail} onChange={handleChange} placeholder="wedding@example.com" className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/70">Personal Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows={2} className="w-full border-b border-primary/20 focus:border-primary outline-none py-1 bg-transparent transition-colors resize-none" />
                    </div>

                    <div className="pt-6">
                        <button type="submit" className="w-full bg-primary text-background py-5 rounded-2xl font-bold text-xl hover:bg-primary/95 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20">
                            Generate Invitation
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
