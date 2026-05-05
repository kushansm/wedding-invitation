'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { TemplateProps } from './types';
import { translations } from './translations';

const useReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return { ref, className: `animate-reveal ${isVisible ? 'active' : ''}` };
};

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const { ref, className: revealClass } = useReveal();
    return (
        <div ref={ref} className={`${revealClass} ${className}`}>
            {children}
        </div>
    );
};

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const parseDate = (dateStr: string) => {
            if (!dateStr) return null;
            // Try to parse standard formats
            let d = new Date(dateStr);
            if (!isNaN(d.getTime())) return d;

            // Try DD/MM/YYYY
            const parts = dateStr.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/);
            if (parts) {
                d = new Date(Number(parts[3]), Number(parts[2]) - 1, Number(parts[1]));
                if (!isNaN(d.getTime())) return d;
            }
            return null;
        };

        const calculateTimeLeft = () => {
            const target = parseDate(targetDate);
            if (!target) {
                // If invalid, set to 0 and don't log error every second
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const difference = target.getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4 md:gap-8 justify-center items-center py-8">
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Sec', value: timeLeft.seconds }
            ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-xl w-16 h-20 flex items-center justify-center mb-2 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-3xl font-bold font-serif text-accent">{String(item.value).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/60 font-medium">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export const TraditionalKandyanTemplate: React.FC<TemplateProps> = ({
    brideName,
    groomName,
    date,
    time,
    venue,
    poruwaTime,
    message,
    language,
    inviteeName,
    rsvpDate,
    rsvpEmail
}) => {
    const t = translations[language];
    const [isOpened, setIsOpened] = useState(false);
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpPhone, setRsvpPhone] = useState('');
    const [rsvpAttendance, setRsvpAttendance] = useState('joyfully');
    const [rsvpMessage, setRsvpMessage] = useState('');

    const handleWhatsAppConfirm = () => {
        const text = `Hi ${brideName} & ${groomName}, I'm confirming my attendance for your wedding!
        
👤 Name: ${rsvpName}
📞 Phone: ${rsvpPhone}
✅ Attending: ${rsvpAttendance === 'joyfully' ? 'Able to Attend' : 'Not Able to Attend'}
✉️ Message: ${rsvpMessage || 'No additional message'}

Looking forward to the big day!`;

        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto overflow-hidden bg-canvas min-h-screen">
            {/* Elegant Couple Intro Overlay */}
            <div
                className={`fixed inset-0 z-[100] flex flex-col items-center justify-between bg-canvas px-8 py-20 transition-all duration-[1200ms] cubic-bezier(0.77, 0, 0.175, 1) ${isOpened ? '-translate-y-full' : 'translate-y-0'}`}
                onClick={() => setIsOpened(true)}
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none" />

                <div className="relative z-10 text-center space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Save the Dates</span>
                    <p className="text-xl font-serif text-primary italic">for our special day</p>
                </div>

                <div className="relative w-full aspect-[4/5] max-w-sm mx-auto z-10 transform transition-transform duration-1000 group-hover:scale-105">
                    <Image
                        src="/kandyan-couple-intro.png"
                        alt="Wedding Couple"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <div className="relative z-10 text-center space-y-6">
                    <div className="flex flex-col items-center">
                        <h2 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tighter">{brideName}</h2>
                        <span className="font-script text-4xl text-accent my-2">&</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tighter">{groomName}</h2>
                    </div>

                    <div className="pt-8 flex flex-col items-center animate-bounce">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-4">Tap to reveal</p>
                        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
                    </div>
                </div>
            </div>

            <div className={`w-full bg-canvas min-h-screen flex flex-col items-center overflow-hidden font-sans text-stone-800 relative transition-all duration-1000 ${isOpened ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20'}`}>
                {/* Enhanced Background Decorations */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                    {/* Sesatha Watermarks */}
                    <div className="absolute top-40 -left-20 w-80 h-[600px] opacity-[0.03] rotate-12">
                        <Image src="/sesatha-motif.png" alt="Sesatha" fill className="object-contain" />
                    </div>
                    <div className="absolute bottom-40 -right-20 w-80 h-[600px] opacity-[0.03] -rotate-12">
                        <Image src="/sesatha-motif.png" alt="Sesatha" fill className="object-contain" />
                    </div>

                    {/* Large Lotus Watermark Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02] text-accent">
                        <svg viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0 C 60 40, 90 40, 100 50 C 90 60, 60 60, 50 100 C 40 60, 10 60, 0 50 C 10 40, 40 40, 50 0" />
                        </svg>
                    </div>

                    {/* Liyawel Side Motifs */}
                    <div className="absolute top-0 right-0 w-32 h-screen opacity-[0.05] text-primary">
                        <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none" fill="currentColor">
                            <path d="M0 0 Q 50 50 0 100 T 0 200 T 0 300 T 0 400 T 0 500 T 0 600 T 0 700 T 0 800 T 0 900 T 0 1000" stroke="currentColor" strokeWidth="2" fill="none" />
                            <circle cx="20" cy="50" r="2" /><circle cx="20" cy="150" r="2" /><circle cx="20" cy="250" r="2" />
                        </svg>
                    </div>
                </div>

                {/* Nav Overlay */}
                <div className="w-full p-6 flex justify-between items-center absolute top-0 z-10">
                    <span className="font-script text-2xl text-primary">{brideName} & {groomName}</span>
                    <div className="w-12 h-px bg-accent/30" />
                </div>

                {/* Section 1: Hero */}
                <Section className="w-full pt-32 pb-16 px-8 flex flex-col items-center text-center relative">
                    <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                    <span className="text-[10px] uppercase tracking-[0.5em] mb-10 text-primary font-bold">{t.weddingOf || 'The Wedding Of'}</span>
                    <h1 className="text-6xl md:text-8xl font-serif mb-2 text-stone-900 tracking-tighter animate-pulse shadow-accent/10">
                        {brideName}
                    </h1>
                    <span className="font-script text-4xl my-4 text-accent">&</span>
                    <h1 className="text-6xl md:text-8xl font-serif mb-16 text-stone-900 tracking-tighter">
                        {groomName}
                    </h1>

                    <div className="bg-white border-2 border-accent/20 rounded-3xl p-8 mb-16 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-2xl font-serif text-primary italic">
                            {new Date(date).toLocaleDateString(language === 'si' ? 'si-LK' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <div className="mt-6 flex gap-4 justify-center">
                            <button className="px-8 py-3 bg-primary text-white rounded-full text-[10px] uppercase tracking-widest hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20">
                                Save the Date
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white p-2 bg-white group hover:scale-[1.02] transition-transform duration-700">
                        <Image
                            src="/kandyan-couple.png"
                            alt="Traditional Kandyan Couple"
                            fill
                            className="object-contain"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/5 opacity-40" />
                    </div>
                </Section>

                {/* Section 2: Countdown */}
                <Section className="w-full py-24 px-8 bg-primary text-white flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                    <span className="text-[10px] uppercase tracking-[0.4em] mb-10 opacity-70 font-bold whitespace-nowrap z-10">Counting down to the big day</span>
                    <div className="relative z-10 scale-110">
                        <CountdownTimer targetDate={date} />
                    </div>
                    <div className="h-px w-24 bg-accent/30 mt-8 z-10" />
                </Section>

                {/* Section 3: Celebration */}
                <Section className="w-full py-24 px-8 flex flex-col items-center text-center relative">
                    <div className="absolute -left-20 top-1/2 w-40 h-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
                    <h2 className="text-4xl font-serif text-stone-900 mb-2">The Celebration</h2>
                    <p className="font-script text-2xl text-accent mb-16">Lovely moments together</p>

                    <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-12 border-4 border-accent/10 shadow-2xl relative overflow-hidden group hover:border-accent/30 transition-all">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.1] group-hover:opacity-20 transition-opacity">
                            <svg className="w-16 h-16 text-primary" viewBox="0 0 100 100" fill="currentColor">
                                <path d="M50 10c22 0 40 18 40 40s-18 40-40 40-40-18-40-40 18-40 40-40m0-10C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0z" />
                                <path d="M50 30c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 20-20" opacity="0.3" />
                            </svg>
                        </div>
                        <div className="space-y-2 mb-10">
                            <h3 className="font-script text-3xl text-primary">Poruwa Ceremony</h3>
                            <div className="h-0.5 w-12 bg-accent/40 mx-auto" />
                            <p className="text-xs font-bold text-accent tracking-[0.3em] uppercase pt-2">{poruwaTime || '10:00 AM'}</p>
                        </div>
                        <p className="text-2xl font-serif text-stone-800 mb-10 leading-snug">{venue}</p>
                        <button className="px-8 py-3 rounded-full border-2 border-accent/20 text-[10px] uppercase tracking-widest hover:bg-accent/5 transition-all font-bold text-accent">
                            View On Map
                        </button>
                        <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
                    </div>
                </Section>

                {/* Section 4: Map */}
                <Section className="w-full h-96 relative overflow-hidden border-y-8 border-white shadow-xl">
                    <iframe
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(venue)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        className="w-full h-full grayscale-[0.5] contrast-[1.1] border-none scale-105"
                        allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-primary/10 via-transparent to-accent/5" />
                </Section>

                {/* Section 5: Story */}
                <Section className="w-full py-32 px-8 flex flex-col items-center text-center bg-white relative">
                    <div className="absolute inset-0 bg-stone-50/50 opacity-50" />
                    <div className="relative z-10 max-w-lg">
                        <h2 className="text-5xl font-script mb-12 text-accent">Our Love Story</h2>
                        <div className="relative">
                            <span className="absolute -top-12 -left-4 text-8xl font-serif text-accent/10 pointer-events-none select-none">“</span>
                            <p className="text-xl font-serif italic text-stone-700 leading-relaxed px-4">
                                {message || "With a simple conversation that quickly turned into hours of endless talking and shared laughter. It didn't take long for us to realize that what we had found in each other was something truly rare and incredibly special."}
                            </p>
                            <span className="absolute -bottom-16 -right-4 text-8xl font-serif text-accent/10 pointer-events-none select-none">”</span>
                        </div>
                    </div>
                    <div className="mt-20 flex gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-2 h-2 rounded-full bg-accent/20" />
                        ))}
                    </div>
                </Section>

                {/* Section 6: RSVP */}
                <Section className="w-full py-24 px-8 flex flex-col items-center relative overflow-hidden bg-primary/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="w-full max-w-md bg-white rounded-[3rem] p-12 border-2 border-accent/20 shadow-[0_50px_100px_-20px_rgba(128,0,0,0.15)] space-y-12 relative z-10 transition-transform duration-500 hover:scale-[1.01]">
                        <div className="text-center space-y-3">
                            <h2 className="text-4xl font-serif text-primary tracking-tight">Please Confirm</h2>
                            <div className="h-0.5 w-16 bg-accent/40 mx-auto" />
                            <p className="text-[10px] text-accent font-bold tracking-[0.3em] uppercase">Kindly respond by {rsvpDate || '20 May 2026'}</p>
                        </div>

                        <div className="space-y-5">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-400 text-center">Will you be attending? *</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setRsvpAttendance('joyfully')}
                                    className={`flex-1 py-4 rounded-2xl text-xs font-bold tracking-widest transition-all border-2 ${rsvpAttendance === 'joyfully' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-stone-400 border-stone-100 hover:border-accent/20'}`}
                                >
                                    I AM ABLE TO ATTEND
                                </button>
                                <button
                                    onClick={() => setRsvpAttendance('regretfully')}
                                    className={`flex-1 py-4 rounded-2xl text-xs font-bold tracking-widest transition-all border-2 ${rsvpAttendance === 'regretfully' ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-stone-400 border-stone-100 hover:border-accent/20'}`}
                                >
                                    NOT ABLE TO ATTEND
                                </button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-300 ml-4">Full Name</label>
                                <input
                                    type="text"
                                    value={rsvpName}
                                    onChange={(e) => setRsvpName(e.target.value)}
                                    placeholder="e.g. Kasun Perera"
                                    className="w-full px-8 py-5 rounded-3xl bg-stone-50 border-2 border-stone-50 text-base focus:bg-white focus:border-accent/20 focus:outline-none transition-all font-script text-2xl text-primary placeholder:text-stone-300"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-300 ml-4">Phone Number</label>
                                <input
                                    type="text"
                                    value={rsvpPhone}
                                    onChange={(e) => setRsvpPhone(e.target.value)}
                                    placeholder="07XXXXXXXX"
                                    className="w-full px-8 py-5 rounded-3xl bg-stone-50 border-2 border-stone-50 text-sm focus:bg-white focus:border-accent/20 focus:outline-none transition-all font-mono"
                                />
                            </div>



                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-300 ml-4">Message for the Couple</label>
                                <textarea
                                    value={rsvpMessage}
                                    onChange={(e) => setRsvpMessage(e.target.value)}
                                    placeholder="Write your wishes here..."
                                    className="w-full px-8 py-6 rounded-[2rem] bg-stone-50 border-2 border-stone-50 text-xl focus:bg-white focus:border-accent/20 focus:outline-none transition-all h-40 resize-none font-script text-primary placeholder:text-stone-300"
                                ></textarea>
                            </div>
                        </div>

                        <button
                            onClick={handleWhatsAppConfirm}
                            disabled={!rsvpName || !rsvpPhone}
                            className="w-full py-6 rounded-[2rem] bg-gradient-to-r from-primary to-primary text-white text-xs uppercase tracking-[0.4em] font-black shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
                        >
                            Confirm via WhatsApp
                        </button>
                    </div>
                </Section>

                {/* Footer */}
                <Section className="w-full py-24 px-8 text-center bg-stone-900 border-t-8 border-accent relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-accent via-white to-accent opacity-30" />
                    <h3 className="text-4xl font-script text-accent mb-4">{brideName} & {groomName}</h3>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-stone-500 font-bold mb-16">UNTIL WE MEET SOON</p>
                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-16 h-16 mx-auto text-white/10 group-hover:text-accent/30 transition-all duration-1000 rotate-12 group-hover:rotate-0" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
                            <path d="M50 20c16.5 0 30 13.5 30 30s-13.5 30-30 30-30-13.5-30-30 13.5-30 30-30" opacity="0.2" />
                        </svg>
                    </div>
                    <div className="mt-20 space-y-2">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-stone-600 font-bold">Wedding Invitation by Digital Hub</p>
                        <div className="h-0.5 w-8 bg-accent/20 mx-auto" />
                    </div>
                </Section>
            </div>
        </div>
    );
};
