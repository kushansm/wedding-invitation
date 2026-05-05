'use client';

import React, { useState, useEffect, useRef } from 'react';
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
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };
        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4 justify-center items-center py-6">
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Sec', value: timeLeft.seconds }
            ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                    <div className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 shadow-lg rounded-lg w-14 h-16 flex items-center justify-center mb-1">
                        <span className="text-2xl font-bold font-serif text-[#D4AF37]">{String(item.value).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-[#D4AF37]/60 font-medium">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export const TraditionalSinhalaTemplate: React.FC<TemplateProps> = ({
    brideName,
    groomName,
    brideFather,
    brideMother,
    groomFather,
    groomMother,
    date,
    time,
    venue,
    poruwaTime,
    rsvpDate,
    language,
    inviteeName,
    message,
    rsvpEmail
}) => {
    const t = translations[language];
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpPhone, setRsvpPhone] = useState('');
    const [rsvpAttendance, setRsvpAttendance] = useState('joyfully');

    const handleWhatsAppConfirm = () => {
        const text = `Hi ${brideName} & ${groomName}, I'm confirming my attendance!
👤 Name: ${rsvpName}
📞 Phone: ${rsvpPhone}
✅ Status: ${rsvpAttendance === 'joyfully' ? 'Able to Attend' : 'Not Able to Attend'}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };



    return (
        <div className="w-full max-w-2xl bg-[#8B0000] text-[#D4AF37] min-h-screen flex flex-col items-center overflow-hidden font-serif relative shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-[12px] border-double border-[#D4AF37]/30 before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] before:opacity-10 before:pointer-events-none">
            {/* Cultural Motifs Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
                {/* Moonstone inspired motif top left */}
                <div className="absolute -top-20 -left-20 w-80 h-80 text-[#D4AF37]">
                    <svg viewBox="0 0 200 100" fill="currentColor">
                        <path d="M0 100 A 100 100 0 0 1 200 100 Z" opacity="0.4" />
                        <path d="M20 100 A 80 80 0 0 1 180 100 Z" opacity="0.4" />
                        <path d="M40 100 A 60 60 0 0 1 160 100 Z" opacity="0.4" />
                        <path d="M60 100 A 40 40 0 0 1 140 100 Z" opacity="0.4" />
                        <circle cx="100" cy="90" r="5" />
                    </svg>
                </div>
                {/* Liyawel motif bottom right */}
                <div className="absolute -bottom-20 -right-20 w-96 h-96 rotate-180 text-[#D4AF37]">
                    <svg viewBox="0 0 200 200" fill="currentColor">
                        <path d="M200 200 C 200 100, 100 0, 0 0 L 0 20 L 80 20 C 120 20, 180 80, 180 180 Z" opacity="0.3" />
                        <path d="M180 200 C 180 120, 120 60, 40 60 L 40 80 C 100 80, 160 140, 160 200 Z" opacity="0.2" />
                    </svg>
                </div>
                {/* Center Lotus */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-[0.1]">
                    <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 text-[#D4AF37]" fill="currentColor">
                        <path d="M50 0 C 60 20, 80 30, 100 50 C 80 70, 60 80, 50 100 C 40 80, 20 70, 0 50 C 20 30, 40 20, 50 0" />
                    </svg>
                </div>
            </div>

            {/* Section 1: Hero */}
            <Section className="w-full pt-20 pb-16 px-8 flex flex-col items-center text-center space-y-6">
                <p className="tracking-[0.4em] uppercase text-xs opacity-60 mb-4">{t.ayubowan}</p>

                <div className="space-y-6 text-sm italic opacity-80">
                    <div>
                        <p className="text-lg">{brideFather} & {brideMother}</p>
                        <p className="text-[10px] mt-1 uppercase tracking-widest">{t.daughterOf}</p>
                    </div>
                    <p className="text-xl">&</p>
                    <div>
                        <p className="text-lg">{groomFather} & {groomMother}</p>
                        <p className="text-[10px] mt-1 uppercase tracking-widest">{t.sonOf}</p>
                    </div>
                </div>

                <p className="py-8 text-lg border-y border-[#D4AF37]/20 w-full">{t.inviteToWedding}</p>

                <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter drop-shadow-xl py-8">
                    {brideName}
                </h1>
                <span className="text-4xl italic font-script mb-8">{t.and}</span>
                <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter drop-shadow-xl">
                    {groomName}
                </h1>
            </Section>

            {/* Section 2: Countdown */}
            <Section className="w-full py-16 px-8 bg-black/20 border-y border-[#D4AF37]/20 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />
                <span className="text-[10px] uppercase tracking-[0.3em] mb-4 text-[#D4AF37] font-bold">Counting down to the big day</span>
                <CountdownTimer targetDate={date} />
            </Section>

            {/* Section 3: Celebration */}
            <Section className="w-full py-20 px-8 flex flex-col items-center text-center space-y-8">
                <div>
                    <h3 className="text-[#D4AF37] font-medium tracking-[0.4em] uppercase text-xs mb-4">{t.weddingOf}</h3>
                    <p className="text-3xl font-bold border-y-2 border-[#D4AF37]/30 py-4 inline-block px-12">
                        {new Date(date).toLocaleDateString(language === 'si' ? 'si-LK' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-12 w-full max-w-md pt-8">
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-widest opacity-60">{t.time}</p>
                        <p className="text-2xl font-bold">{time}</p>
                    </div>
                    {poruwaTime && (
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-widest opacity-60">{t.poruwa}</p>
                            <p className="text-2xl font-bold">{poruwaTime}</p>
                        </div>
                    )}
                </div>

                <div className="pt-8 space-y-3">
                    <p className="opacity-60 uppercase tracking-widest text-[10px]">{t.venue}</p>
                    <p className="text-3xl italic">{venue}</p>
                </div>
            </Section>

            {/* Section 4: Map */}
            <Section className="w-full h-80 relative overflow-hidden border-y border-[#D4AF37]/20 grayscale hover:grayscale-0 transition-all duration-1000">
                <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(venue)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-none opacity-40 hover:opacity-100 transition-opacity"
                    allowFullScreen
                ></iframe>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
            </Section>

            {/* Section 5: Story */}
            <Section className="w-full py-24 px-12 flex flex-col items-center text-center">
                <p className="text-2xl md:text-3xl font-serif leading-relaxed italic opacity-90 max-w-lg">
                    {message}
                </p>
            </Section>

            {/* Section 6: RSVP */}
            <Section className="w-full py-20 px-8 flex flex-col items-center bg-black/30 border-y border-[#D4AF37]/20">
                <div className="w-full max-w-sm space-y-8 bg-[#8B0000]/50 p-8 rounded-3xl border border-[#D4AF37]/10 backdrop-blur-sm shadow-2xl">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold uppercase tracking-widest text-[#D4AF37]">Please Confirm</h2>
                        <p className="text-[10px] text-[#D4AF37]/60 tracking-[0.2em]">Kindly respond by {rsvpDate || '20 April 2026'}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <button onClick={() => setRsvpAttendance('joyfully')} className={`flex-1 py-4 border-2 rounded-xl text-xs font-bold tracking-widest transition-all ${rsvpAttendance === 'joyfully' ? 'bg-[#D4AF37] text-[#8B0000] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20' : 'border-[#D4AF37]/20 text-[#D4AF37]/60 hover:border-[#D4AF37]/40'}`}>I AM ABLE TO ATTEND</button>
                            <button onClick={() => setRsvpAttendance('regretfully')} className={`flex-1 py-4 border-2 rounded-xl text-xs font-bold tracking-widest transition-all ${rsvpAttendance === 'regretfully' ? 'bg-[#660000] text-[#D4AF37] border-[#660000]' : 'border-[#D4AF37]/20 text-[#D4AF37]/60 hover:border-[#D4AF37]/40'}`}>NOT ABLE TO ATTEND</button>
                        </div>
                        <input value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} type="text" placeholder="Full Name" className="w-full bg-black/20 border-2 border-[#D4AF37]/10 rounded-xl px-4 py-4 text-sm focus:border-[#D4AF37]/40 outline-none transition-all placeholder:text-[#D4AF37]/20" />
                        <input value={rsvpPhone} onChange={(e) => setRsvpPhone(e.target.value)} type="text" placeholder="Phone Number" className="w-full bg-black/20 border-2 border-[#D4AF37]/10 rounded-xl px-4 py-4 text-sm focus:border-[#D4AF37]/40 outline-none transition-all placeholder:text-[#D4AF37]/20" />


                    </div>

                    <button onClick={handleWhatsAppConfirm} className="w-full bg-[#D4AF37] text-[#8B0000] py-5 rounded-xl font-black text-xs tracking-[0.4em] shadow-xl shadow-black/40 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase">
                        Confirm on WhatsApp
                    </button>
                </div>
            </Section>

            {/* Footer */}
            <footer className="w-full py-16 px-8 text-center border-t border-[#D4AF37]/20 mt-12 bg-black/10">
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-40 mb-2">Wedding Invitation by Kodex</p>
                <div className="flex justify-center gap-4 opacity-20">
                    <div className="w-8 h-px bg-[#D4AF37]" /><div className="w-2 h-2 rounded-full border border-[#D4AF37]" /><div className="w-8 h-px bg-[#D4AF37]" />
                </div>
            </footer>
        </div>
    );
};
