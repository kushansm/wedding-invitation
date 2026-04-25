'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TemplateProps } from './types';
import { translations } from './translations';

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
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
        <div className="flex gap-4 md:gap-8 justify-center items-center py-8">
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Sec', value: timeLeft.seconds }
            ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                    <div className="bg-white border-2 border-stone-200 shadow-sm rounded-lg w-16 h-20 flex items-center justify-center mb-2">
                        <span className="text-3xl font-bold font-bodoni text-stone-800">{String(item.value).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">{item.label}</span>
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
    const [rsvpName, setRsvpName] = useState('');
    const [rsvpPhone, setRsvpPhone] = useState('');
    const [rsvpAttendance, setRsvpAttendance] = useState('joyfully');
    const [rsvpDietary, setRsvpDietary] = useState<string[]>([]);
    const [rsvpMessage, setRsvpMessage] = useState('');

    const toggleDietary = (diet: string) => {
        setRsvpDietary(prev =>
            prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
        );
    };

    const handleWhatsAppConfirm = () => {
        const text = `Hi ${brideName} & ${groomName}, I'm confirming my attendance for your wedding!
        
👤 Name: ${rsvpName}
📞 Phone: ${rsvpPhone}
✅ Attending: ${rsvpAttendance === 'joyfully' ? 'Joyfully' : 'Regretfully'}
🍽️ Dietary: ${rsvpDietary.length > 0 ? rsvpDietary.join(', ') : 'None'}
✉️ Message: ${rsvpMessage || 'No additional message'}

Looking forward to the big day!`;

        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    };

    return (
        <div className="w-full max-w-2xl bg-[#fffd] min-h-screen flex flex-col items-center overflow-hidden font-inter text-stone-800 relative shadow-2xl">
            {/* Nav Overlay */}
            <div className="w-full p-6 flex justify-between items-center absolute top-0 z-10">
                <span className="font-great-vibes text-xl opacity-60">{brideName} & {groomName}</span>
                <div className="w-8 h-px bg-stone-300" />
            </div>

            {/* Section 1: Hero */}
            <section className="w-full pt-24 pb-12 px-8 flex flex-col items-center text-center bg-gradient-to-b from-stone-50 to-white">
                <span className="text-[10px] uppercase tracking-[0.4em] mb-8 text-stone-400 font-semibold">{t.weddingOf || 'The Wedding Of'}</span>
                <h1 className="text-5xl md:text-7xl font-bodoni mb-2 text-stone-900 tracking-tight">{brideName}</h1>
                <span className="font-great-vibes text-3xl my-2 text-stone-500">&</span>
                <h1 className="text-5xl md:text-7xl font-bodoni mb-12 text-stone-900 tracking-tight">{groomName}</h1>

                <div className="bg-stone-50 rounded-2xl p-6 mb-12 border border-stone-100 shadow-sm inline-block">
                    <p className="text-xl font-bodoni text-stone-700">{new Date(date).toLocaleDateString(language === 'si' ? 'si-LK' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    <button className="mt-4 px-6 py-2 border border-stone-200 rounded-full text-[10px] uppercase tracking-widest hover:bg-stone-100 transition-colors">
                        Save the Date
                    </button>
                </div>

                <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-inner bg-white p-4 border border-stone-100">
                    <Image
                        src="/kandyan-couple.png"
                        alt="Traditional Kandyan Couple"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </section>

            {/* Section 2: Countdown */}
            <section className="w-full py-16 px-8 bg-stone-900 text-white flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] mb-8 opacity-60 font-medium whitespace-nowrap">Counting down to the big day</span>
                <CountdownTimer targetDate={date} />
            </section>

            {/* Section 3: Celebration */}
            <section className="w-full py-20 px-8 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bodoni mb-2">The Celebration</h2>
                <p className="font-great-vibes text-xl text-stone-400 mb-12">Lovely moments together</p>

                <div className="w-full max-w-sm bg-white rounded-3xl p-10 border border-stone-100 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-12 h-12" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
                        </svg>
                    </div>
                    <h3 className="font-great-vibes text-2xl mb-2">Poruwa Ceremony</h3>
                    <p className="text-sm font-medium text-stone-400 mb-6 tracking-widest">{poruwaTime || '10:00 AM'}</p>
                    <p className="text-xl font-bodoni mb-8">{venue}</p>
                    <button className="text-[10px] uppercase tracking-[0.2em] border-b border-stone-200 pb-1 hover:border-stone-400 transition-all font-semibold">View On Map</button>
                </div>
            </section>

            {/* Section 4: Map */}
            <section className="w-full h-80 relative overflow-hidden">
                <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(venue)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full grayscale border-none"
                    allowFullScreen
                ></iframe>
                {/* Overlay for aesthetic */}
                <div className="absolute inset-0 pointer-events-none bg-stone-900/5" />
            </section>

            {/* Section 5: Story */}
            <section className="w-full py-20 px-8 flex flex-col items-center text-center bg-stone-50">
                <h2 className="text-4xl font-great-vibes mb-8 text-stone-400">Our Love Story</h2>
                <p className="text-lg font-bodoni italic text-stone-600 max-w-md leading-relaxed px-4">
                    {message || "With a simple conversation that quickly turned into hours of endless talking and shared laughter. It didn't take long for us to realize that what we had found in each other was something truly rare and incredibly special."}
                </p>
            </section>

            {/* Section 6: RSVP */}
            <section className="w-full py-20 px-8 flex flex-col items-center">
                <div className="w-full max-w-sm bg-white rounded-3xl p-10 border border-stone-100 shadow-2xl space-y-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bodoni mb-2">Please Confirm</h2>
                        <p className="text-[10px] text-stone-400 font-medium tracking-widest lowercase">Kindly respond by {rsvpDate || '20 April 2026'}</p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 text-center">Will you be attending? *</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setRsvpAttendance('joyfully')}
                                className={`flex-1 py-3 rounded-full text-xs font-medium transition-all border ${rsvpAttendance === 'joyfully' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200'}`}
                            >
                                Joyfully
                            </button>
                            <button
                                onClick={() => setRsvpAttendance('regretfully')}
                                className={`flex-1 py-3 rounded-full text-xs font-medium transition-all border ${rsvpAttendance === 'regretfully' ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200'}`}
                            >
                                Regretfully
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-4">Full Name</label>
                            <input
                                type="text"
                                value={rsvpName}
                                onChange={(e) => setRsvpName(e.target.value)}
                                placeholder="e.g. Kasun Perera"
                                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-stone-200 transition-all font-great-vibes text-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-4">Phone Number</label>
                            <input
                                type="text"
                                value={rsvpPhone}
                                onChange={(e) => setRsvpPhone(e.target.value)}
                                placeholder="07XXXXXXXX"
                                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-stone-200 transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-4">Dietary Requirements & Allergies</p>
                            <div className="grid grid-cols-2 gap-3 px-2">
                                {['Vegetarian', 'Vegan', 'Gluten-Free', 'No Pork/Beef'].map(diet => (
                                    <label key={diet} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={rsvpDietary.includes(diet)}
                                                onChange={() => toggleDietary(diet)}
                                                className="peer appearance-none w-5 h-5 rounded border border-stone-200 checked:bg-stone-800 checked:border-stone-800 transition-all"
                                            />
                                            <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-medium text-stone-500 group-hover:text-stone-800 transition-colors">{diet}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-4">Message for the Couple (Optional)</label>
                            <textarea
                                value={rsvpMessage}
                                onChange={(e) => setRsvpMessage(e.target.value)}
                                placeholder="Write your wishes here..."
                                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-stone-200 transition-all h-32 resize-none font-great-vibes text-lg"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        onClick={handleWhatsAppConfirm}
                        disabled={!rsvpName || !rsvpPhone}
                        className="w-full py-4 rounded-2xl bg-[#D67C7C] hover:bg-[#c06b6b] text-white text-[10px] uppercase tracking-[0.3em] font-bold shadow-lg shadow-pink-200/50 transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                        Confirm via WhatsApp
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-20 px-8 text-center bg-stone-900 border-t border-stone-800">
                <h3 className="text-3xl font-great-vibes text-stone-100 mb-2">{brideName} & {groomName}</h3>
                <p className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-medium">Until we meet soon</p>
                <div className="mt-12 opacity-20 transform scale-75">
                    <svg className="w-12 h-12 mx-auto text-white" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
                    </svg>
                </div>
                <p className="mt-12 text-[8px] uppercase tracking-widest text-stone-700">Wedding Invitation by Kodex</p>
            </footer>
        </div>
    );
};
