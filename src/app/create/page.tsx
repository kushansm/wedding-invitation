"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        brideName: "",
        groomName: "",
        date: "",
        time: "",
        venue: "",
        rsvpEmail: "",
        message: "We're getting married!",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(formData);
        router.push(`/preview?${params.toString()}`);
    };

    return (
        <main className="flex min-h-screen flex-col items-center p-6 sm:p-12">
            <div className="w-full max-w-lg bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-serif text-foreground">Invitation Details</h1>
                    <p className="text-foreground/60">Fill in the details for your special day.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Bride's Name</label>
                            <input
                                required
                                type="text"
                                name="brideName"
                                value={formData.brideName}
                                onChange={handleChange}
                                placeholder="e.g. Sarah"
                                className="w-full bg-[#fdfcf0] border-b-2 border-primary/20 focus:border-primary outline-none py-2 px-1 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Groom's Name</label>
                            <input
                                required
                                type="text"
                                name="groomName"
                                value={formData.groomName}
                                onChange={handleChange}
                                placeholder="e.g. Thomas"
                                className="w-full bg-[#fdfcf0] border-b-2 border-primary/20 focus:border-primary outline-none py-2 px-1 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Date</label>
                            <input
                                required
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full bg-[#fdfcf0] border-b-2 border-primary/20 focus:border-primary outline-none py-2 px-1 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Time</label>
                            <input
                                required
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full bg-[#fdfcf0] border-b-2 border-primary/20 focus:border-primary outline-none py-2 px-1 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Venue</label>
                        <input
                            required
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            placeholder="e.g. The Grand Ballroom"
                            className="w-full bg-[#fdfcf0] border-b-2 border-primary/20 focus:border-primary outline-none py-2 px-1 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wider text-foreground/70">RSVP Email</label>
                        <input
                            required
                            type="email"
                            name="rsvpEmail"
                            value={formData.rsvpEmail}
                            onChange={handleChange}
                            placeholder="rsvp@wedding.com"
                            className="w-full bg-[#fdfcf0] border-b-2 border-primary/20 focus:border-primary outline-none py-2 px-1 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold uppercase tracking-wider text-foreground/70">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-[#fdfcf0] border-b-2 border-primary/20 focus:border-primary outline-none py-2 px-1 transition-colors resize-none"
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-primary text-background py-4 rounded-xl font-bold text-lg hover:bg-primary/95 transition-all transform active:scale-95 shadow-md"
                        >
                            Generate Invitation
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
