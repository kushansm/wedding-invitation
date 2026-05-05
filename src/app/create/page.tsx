"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { TraditionalSinhalaTemplate } from "@/components/templates/TraditionalSinhalaTemplate";
import { TraditionalKandyanTemplate } from "@/components/templates/TraditionalKandyanTemplate";
import { ModernLuxuryTemplate } from "@/components/templates/ModernLuxuryTemplate";
import { TemplateProps } from "@/components/templates/types";
import { translations } from "@/components/templates/translations";
import dynamic from "next/dynamic";
import type { LocationDetails } from "@/components/LocationPicker";

const LocationPicker = dynamic(() => import('@/components/LocationPicker').then(mod => mod.LocationPicker), { 
    ssr: false,
    loading: () => <div className="w-full h-[250px] rounded-xl border border-black/5 bg-gray-50 animate-pulse flex items-center justify-center text-xs text-primary/40 font-medium tracking-widest uppercase">Loading map...</div>
});

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
        setSavedId(null); // Reset saved state if form changes
    };

    const [isSaving, setIsSaving] = useState(false);
    const [savedId, setSavedId] = useState<string | null>(null);
    const [guests, setGuests] = useState<{name: string, phone: string}[]>([]);
    const [newGuestName, setNewGuestName] = useState("");
    const [newGuestPhone, setNewGuestPhone] = useState("");

    // Load guests from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('wedding_guests');
        if (stored) {
            try {
                setGuests(JSON.parse(stored));
            } catch(e) {}
        }
    }, []);

    // Save guests to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wedding_guests', JSON.stringify(guests));
    }, [guests]);

    const handleSaveInvitation = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setSavedId("active"); // Use a simple flag since data is in the URL now
        setIsSaving(false);
    };

    const handleAddGuest = () => {
        if (!newGuestName.trim() || !newGuestPhone.trim()) return;
        setGuests(prev => [...prev, { name: newGuestName.trim(), phone: newGuestPhone.trim() }]);
        setNewGuestName("");
        setNewGuestPhone("");
    };

    const handleRemoveGuest = (index: number) => {
        setGuests(prev => prev.filter((_, i) => i !== index));
    };

    const sendWhatsAppToGuest = (guest: {name: string, phone: string}) => {
        const baseUrl = window.location.origin;
        
        // Build robust query params
        const queryParams = new URLSearchParams();
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'locationDetails' && typeof value === 'string') {
                queryParams.append(key, value);
            }
        });
        
        // Add invitee name explicitly
        queryParams.set("inviteeName", guest.name);

        // Add location details if they exist
        if (formData.locationDetails) {
            queryParams.append("lat", formData.locationDetails.latitude.toString());
            queryParams.append("lng", formData.locationDetails.longitude.toString());
            queryParams.append("placeName", formData.locationDetails.placeName);
            queryParams.append("address", formData.locationDetails.address);
            if (formData.locationDetails.placeId) {
                queryParams.append("placeId", formData.locationDetails.placeId);
            }
        }

        const link = `${baseUrl}/invite?${queryParams.toString()}`;
        const message = `Hi ${guest.name}, you are invited to our wedding. View here: ${link}`;
        const phone = guest.phone.replace(/[^0-9]/g, '');
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleLanguageChange = (lang: 'en' | 'si' | 'ta') => {
        setFormData((prev) => ({ ...prev, language: lang }));
    };

    const handleTemplateChange = (template: string) => {
        setFormData((prev) => ({ ...prev, template: template as any }));
    };

    const handleLocationChange = (location: LocationDetails) => {
        setFormData((prev) => ({
            ...prev,
            locationDetails: location,
            venue: location.placeName || prev.venue
        }));
    };

    const goToPreview = () => {
        const params = new URLSearchParams(formData as any);
        router.push(`/preview?${params.toString()}`);
    };

    const renderPreview = () => {
        switch (formData.template) {
            case "sinhala":
                return <TraditionalSinhalaTemplate {...formData} />;
            case "kandyan":
                return <TraditionalKandyanTemplate {...formData} />;
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
                                <option value="kandyan">Traditional Kandyan (New)</option>
                                <option value="sinhala">Traditional Sinhala (Red)</option>
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
                        <LocationPicker 
                            value={formData.locationDetails} 
                            onChange={handleLocationChange} 
                        />
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

                <div className="flex flex-col gap-3 pt-6 border-t border-black/10">
                    <button
                        onClick={goToPreview}
                        className="w-full bg-white text-primary border-2 border-primary/20 py-4 rounded-2xl font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                    >
                        <span>Preview Full Screen</span>
                    </button>

                    <button
                        onClick={handleSaveInvitation}
                        disabled={isSaving}
                        className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${savedId ? 'bg-green-600 text-white shadow-green-600/20' : 'bg-primary text-background hover:bg-primary/95 shadow-primary/20'}`}
                    >
                        {isSaving ? 'Saving...' : savedId ? `Invitation Saved! ✨` : 'Save Invitation'}
                    </button>

                    {savedId && (
                        <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-2xl border border-black/5">
                            <h3 className="font-serif text-lg text-foreground">Guest List & Share</h3>
                            <p className="text-xs text-foreground/50">Add your guests below to generate personalized WhatsApp links.</p>
                            
                            <div className="space-y-2">
                                <input type="text" placeholder="Guest Name" value={newGuestName} onChange={e => setNewGuestName(e.target.value)} className="w-full p-3 rounded-xl border border-black/10 bg-white focus:border-primary outline-none text-sm" />
                                <input type="text" placeholder="Phone Number (e.g. 9477...)" value={newGuestPhone} onChange={e => setNewGuestPhone(e.target.value)} className="w-full p-3 rounded-xl border border-black/10 bg-white focus:border-primary outline-none text-sm" />
                                <button onClick={handleAddGuest} className="w-full bg-foreground text-background py-3 rounded-xl font-bold text-sm hover:bg-foreground/90 transition-all">
                                    Add Guest
                                </button>
                            </div>

                            <div className="space-y-2 mt-4 max-h-60 overflow-y-auto">
                                {guests.map((guest, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 p-3 bg-white border border-black/5 rounded-xl">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-sm font-bold text-foreground">{guest.name}</p>
                                                <p className="text-xs text-foreground/50">{guest.phone}</p>
                                            </div>
                                            <button onClick={() => handleRemoveGuest(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => sendWhatsAppToGuest(guest)}
                                            className="w-full bg-[#25D366] text-white py-2 rounded-lg font-bold text-xs hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2"
                                        >
                                            Send via WhatsApp
                                        </button>
                                    </div>
                                ))}
                                {guests.length === 0 && (
                                    <p className="text-xs text-center text-foreground/40 italic py-4">No guests added yet.</p>
                                )}
                            </div>
                        </div>
                    )}
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
