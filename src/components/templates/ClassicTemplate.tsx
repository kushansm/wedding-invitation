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
                    <div className="bg-stone-50 border border-stone-200 shadow-sm rounded-lg w-14 h-16 flex items-center justify-center mb-1">
                        <span className="text-2xl font-bold font-serif text-stone-700">{String(item.value).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest text-stone-400 font-medium">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export const ClassicTemplate: React.FC<TemplateProps> = ({
    brideName, groomName, brideFather, brideMother, groomFather, groomMother,
    date, time, venue, message, rsvpEmail, poruwaTime, rsvpDate, language, inviteeName
}) => {
    const t = translations[language];
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpPhone, setRsvpPhone] = useState('');
    const [rsvpAttendance, setRsvpAttendance] = useState('joyfully');
    const [rsvpDietary, setRsvpDietary] = useState<string[]>([]);

    const handleWhatsAppConfirm = () => {
        const text = `Hi ${brideName} & ${groomName}, I'm confirming my attendance!\n👤 Name: ${rsvpName}\n📞 Phone: ${rsvpPhone}\n✅ Status: ${rsvpAttendance === 'joyfully' ? 'Joyfully Attending' : 'Regretfully Declining'}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="w-full max-w-2xl bg-white min-h-screen flex flex-col items-center overflow-hidden font-serif text-stone-800 relative shadow-2xl border-[16px] border-double border-stone-100 before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] before:opacity-30 before:pointer-events-none">
            {/* Lotus Motif Background */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
                </svg>
            </div>

            {/* Section 1: Hero */}
            <Section className="w-full pt-24 pb-16 px-8 flex flex-col items-center text-center space-y-8">
                <div className="space-y-4">
                    {inviteeName && (
                        <div className="space-y-1">
                            <span className="text-stone-400 italic text-xl">{t.dear} {inviteeName},</span>
                            <p className="text-stone-300 text-[10px] tracking-[0.3em] uppercase">{t.warmlyInvited}</p>
                        </div>
                    )}
                    {!inviteeName && (
                        <h3 className="text-stone-400 font-medium tracking-[0.4em] uppercase text-[10px]">{t.weddingOf}</h3>
                    )}
                </div>

                <div className="space-y-4 pt-12">
                    <h1 className="text-6xl md:text-8xl font-serif text-stone-900 tracking-tighter">
                        {brideName}
                    </h1>
                    <div className="flex items-center gap-4 py-4">
                        <div className="w-12 h-px bg-stone-200" />
                        <span className="text-2xl font-serif text-stone-300 italic">{t.and}</span>
                        <div className="w-12 h-px bg-stone-200" />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-stone-900 tracking-tighter">
                        {groomName}
                    </h1>
                </div>

                <div className="pt-12 text-sm text-stone-400 space-y-1 lowercase italic opacity-80">
                    <p>{brideFather} & {brideMother}</p>
                    <p>{t.and}</p>
                    <p>{groomFather} & {groomMother}</p>
                </div>
            </Section>

            {/* Section 2: Countdown */}
            <Section className="w-full py-16 bg-stone-50/50 flex flex-col items-center border-y border-stone-100">
                <span className="text-[10px] uppercase tracking-[0.4em] mb-4 text-stone-300">Days to our union</span>
                <CountdownTimer targetDate={date} />
            </Section>

            {/* Section 3: Celebration */}
            <Section className="w-full py-24 px-8 flex flex-col items-center text-center space-y-12">
                <div className="space-y-4">
                    <p className="text-2xl font-serif border-y-2 border-stone-100 py-4 inline-block px-12">
                        {new Date(date).toLocaleDateString(language === 'si' ? 'si-LK' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <div className="flex justify-center gap-16 text-sm uppercase tracking-[0.2em] font-sans text-stone-400 pt-8">
                        <div><p className="opacity-60 mb-1">Time</p><p className="text-xl text-stone-800 font-bold">{time}</p></div>
                        {poruwaTime && <div><p className="opacity-60 mb-1">Poruwa</p><p className="text-xl text-stone-800 font-bold">{poruwaTime}</p></div>}
                    </div>
                </div>

                <div className="pt-12 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-stone-300">{t.venue}</p>
                    <p className="text-3xl font-serif text-stone-800 italic">{venue}</p>
                </div>
            </Section>

            {/* Section 4: Map */}
            <Section className="w-full h-80 relative overflow-hidden border-y border-stone-100">
                <iframe src={`https://maps.google.com/maps?q=${encodeURIComponent(venue)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-1000 opacity-50 hover:opacity-100" allowFullScreen />
            </Section>

            {/* Section 5: Story */}
            <Section className="w-full py-24 px-12 text-center max-w-lg">
                <p className="text-2xl font-serif italic text-stone-500 leading-relaxed">
                    {message}
                </p>
            </Section>

            {/* Section 6: RSVP */}
            <Section className="w-full py-20 px-8 flex flex-col items-center bg-stone-50/30 border-y border-stone-100">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl uppercase tracking-widest font-serif text-stone-800">Reservation</h2>
                        <p className="text-[10px] text-stone-400 mt-2 uppercase tracking-widest">Kindly respond by {rsvpDate || '20 April 2026'}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <button onClick={() => setRsvpAttendance('joyfully')} className={`flex-1 py-3 border border-stone-200 rounded text-[10px] tracking-widest transition-all ${rsvpAttendance === 'joyfully' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}>JOYFULLY</button>
                            <button onClick={() => setRsvpAttendance('regretfully')} className={`flex-1 py-3 border border-stone-200 rounded text-[10px] tracking-widest transition-all ${rsvpAttendance === 'regretfully' ? 'bg-stone-800 text-white' : 'text-stone-400'}`}>REGRETFULLY</button>
                        </div>
                        <input value={rsvpName} onChange={(e) => setRsvpName(e.target.value)} type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-stone-200 py-3 text-sm focus:border-stone-800 outline-none transition-all" />
                        <input value={rsvpPhone} onChange={(e) => setRsvpPhone(e.target.value)} type="text" placeholder="Phone Number" className="w-full bg-transparent border-b border-stone-200 py-3 text-sm focus:border-stone-800 outline-none transition-all" />
                    </div>

                    <button onClick={handleWhatsAppConfirm} className="w-full bg-stone-800 text-white py-4 rounded-full font-bold text-[10px] tracking-[0.3em] shadow-xl hover:bg-stone-900 transition-all">
                        CONFIRM ATTENDANCE
                    </button>
                </div>
            </Section>

            {/* Footer */}
            <footer className="w-full py-20 px-8 text-center text-stone-300">
                <p className="text-[10px] uppercase tracking-[0.5em] mb-4">Sharing the joy together</p>
                <div className="flex justify-center gap-2">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-stone-200" />)}
                </div>
            </footer>
        </div>
    );
};
