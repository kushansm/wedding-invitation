'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TemplateProps } from './types';
import { translations } from './translations';

const useReveal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
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
                    <div className="bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full w-14 h-14 flex items-center justify-center mb-1">
                        <span className="text-xl font-light text-[#D4AF37]">{String(item.value).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[7px] uppercase tracking-widest text-white/40 font-medium">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export const ModernLuxuryTemplate: React.FC<TemplateProps> = ({
    brideName, groomName, brideFather, brideMother, groomFather, groomMother,
    date, time, venue, poruwaTime, rsvpDate, message, language, inviteeName
}) => {
    const t = translations[language];
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpPhone, setRsvpPhone] = useState('');
    const [rsvpAttendance, setRsvpAttendance] = useState('joyfully');

    const handleWhatsAppConfirm = () => {
        const text = `Hi ${brideName} & ${groomName}, we're confirming our attendance!\n👤 Name: ${rsvpName}\n📞 Status: ${rsvpAttendance === 'joyfully' ? 'Attending' : 'Regretfully declining'}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="w-full max-w-2xl bg-[#0a0a0a] text-white min-h-screen flex flex-col items-center overflow-hidden font-sans relative shadow-2xl border-t-[12px] border-[#D4AF37] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] before:opacity-20 before:pointer-events-none">
            {/* Emerald Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#064e3b]/20 via-transparent to-[#D4AF37]/5 pointer-events-none" />

            {/* Section 1: Hero */}
            <Section className="w-full pt-24 pb-16 px-8 flex flex-col items-center text-center space-y-12 relative z-10">
                <div className="space-y-4">
                    {inviteeName && (
                        <div className="space-y-1">
                            <span className="text-[#D4AF37] font-serif italic text-xl">{t.dear} {inviteeName},</span>
                            <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase">{t.warmlyInvited}</p>
                        </div>
                    )}
                    {!inviteeName && (
                        <p className="text-[#D4AF37] tracking-[0.5em] uppercase text-[10px] font-bold">{t.togetherWithFamilies}</p>
                    )}
                </div>

                <div className="flex flex-col items-center gap-8 py-12">
                    <h1 className="text-7xl md:text-9xl font-serif text-[#D4AF37] font-light tracking-tighter leading-none animate-pulse">
                        {brideName}
                    </h1>
                    <div className="flex items-center gap-6 w-full">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/30" />
                        <span className="text-2xl font-serif italic text-white/20">{t.and}</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/30" />
                    </div>
                    <h1 className="text-7xl md:text-9xl font-serif text-[#D4AF37] font-light tracking-tighter leading-none">
                        {groomName}
                    </h1>
                </div>

                <div className="text-white/40 space-y-2 text-[10px] uppercase tracking-[0.3em] font-light">
                    <p>{brideFather} & {brideMother}</p>
                    <p>{t.and}</p>
                    <p>{groomFather} & {groomMother}</p>
                </div>
            </Section>

            {/* Section 2: Countdown */}
            <Section className="w-full py-16 bg-white/5 border-y border-white/5 flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-[0.5em] mb-4 text-[#D4AF37]">The Celebration Begins In</span>
                <CountdownTimer targetDate={date} />
            </Section>

            {/* Section 3: Celebration */}
            <Section className="w-full py-24 px-8 flex flex-col items-center text-center space-y-12">
                <div className="space-y-6">
                    <p className="text-2xl md:text-3xl font-serif tracking-widest text-[#D4AF37]">
                        {new Date(date).toLocaleDateString(language === 'si' ? 'si-LK' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div className="flex justify-center gap-16 text-[10px] uppercase tracking-[0.4em] text-white/50 pt-8">
                        <div className="space-y-1">
                            <p className="opacity-40">Time</p>
                            <p className="text-lg text-white font-medium">{time}</p>
                        </div>
                        {poruwaTime && (
                            <div className="space-y-1">
                                <p className="opacity-40">Poruwa</p>
                                <p className="text-lg text-white font-medium">{poruwaTime}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-12 space-y-2">
                    <div className="w-12 h-px bg-[#D4AF37] mx-auto mb-4" />
                    <p className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37]">{t.venue}</p>
                    <p className="text-3xl font-serif font-light tracking-wide">{venue}</p>
                </div>
            </Section>

            {/* Section 4: Map */}
            <Section className="w-full h-80 relative overflow-hidden border-y border-white/5 grayscale saturate-50 contrast-125">
                <iframe src={`https://maps.google.com/maps?q=${encodeURIComponent(venue)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} className="w-full h-full border-none opacity-30 hover:opacity-80 transition-opacity duration-1000" allowFullScreen />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_100%)]" />
            </Section>

            {/* Section 5: Story */}
            <Section className="w-full py-24 px-12 text-center bg-white/5">
                <p className="text-2xl font-serif italic text-white/60 leading-loose max-w-lg mx-auto">
                    {message}
                </p>
            </Section>

            {/* Section 6: RSVP */}
            <Section className="w-full py-24 px-8 flex flex-col items-center bg-black/40">
                <div className="w-full max-w-sm space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-serif text-[#D4AF37] font-light tracking-widest">RSVP</h2>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto" />
                        <p className="text-[10px] text-white/30 tracking-[0.4em] uppercase">Respond by {rsvpDate || '20 April 2026'}</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <button onClick={() => setRsvpAttendance('joyfully')} className={`flex-1 py-4 border border-white/10 text-[9px] tracking-[0.4em] transition-all ${rsvpAttendance === 'joyfully' ? 'bg-[#D4AF37] text-black font-bold' : 'text-white/40'}`}>ACCEPT</button>
                            <button onClick={() => setRsvpAttendance('regretfully')} className={`flex-1 py-4 border border-white/10 text-[9px] tracking-[0.4em] transition-all ${rsvpAttendance === 'regretfully' ? 'bg-[#D4AF37] text-black font-bold' : 'text-white/40'}`}>DECLINE</button>
                        </div>
                        <input value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} type="text" placeholder="GUEST NAME" className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-[#D4AF37] outline-none transition-all placeholder:text-white/10" />
                        <input value={rsvpPhone} onChange={(e) => setRsvpPhone(e.target.value)} type="text" placeholder="CONTACT NUMBER" className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-[#D4AF37] outline-none transition-all placeholder:text-white/10" />
                    </div>

                    <button onClick={handleWhatsAppConfirm} className="w-full py-5 bg-[#D4AF37] text-black font-black text-[9px] tracking-[0.5em] shadow-[0_20px_40px_-10px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase">
                        Confirm on WhatsApp
                    </button>
                </div>
            </Section>

            {/* Footer */}
            <footer className="w-full py-24 px-8 text-center bg-black">
                <div className="flex justify-center items-center gap-6 mb-12">
                    <div className="h-px w-12 bg-white/5" />
                    <div className="w-2 h-2 rotate-45 border border-[#D4AF37]" />
                    <div className="h-px w-12 bg-white/5" />
                </div>
                <p className="text-[8px] uppercase tracking-[0.6em] text-white/20 font-bold mb-4 italic">Elegance in Every Detail</p>
                <p className="text-[9px] uppercase tracking-[0.5em] text-[#D4AF37]/40">Brought to you by Kodex</p>
            </footer>
        </div>
    );
};
