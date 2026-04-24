import React from 'react';
import { TemplateProps } from './types';
import { translations } from './translations';

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
    const locale = language === 'si' ? 'si-LK' : (language === 'ta' ? 'ta-LK' : 'en-US');
    const formattedDate = new Date(date).toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="w-full max-w-2xl bg-[#8B0000] text-[#D4AF37] p-8 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.4)] relative overflow-hidden border-[12px] border-double border-[#D4AF37]/50 flex flex-col items-center text-center space-y-8 font-serif before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] before:opacity-10 before:pointer-events-none">
            {/* Golden Grain Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />

            {/* Cultural Motifs (SVG Overlay) */}
            <div className="absolute top-4 left-4 opacity-20 transform -rotate-12">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
                    <circle cx="50" cy="50" r="20" />
                </svg>
            </div>
            <div className="absolute bottom-4 right-4 opacity-20 transform rotate-12">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
                    <circle cx="50" cy="50" r="20" />
                </svg>
            </div>

            <div className="space-y-2">
                <p className="tracking-widest uppercase text-sm font-sans mb-4">{t.ayubowan}</p>
                <div className="space-y-4">
                    <div className="text-sm italic opacity-80">
                        <p>{brideFather} & {brideMother}</p>
                        <p className="text-[10px] mt-1 font-sans uppercase tracking-[0.2em]">{t.daughterOf}</p>
                    </div>
                    <p className="text-sm">{t.and}</p>
                    <div className="text-sm italic opacity-80">
                        <p>{groomFather} & {groomMother}</p>
                        <p className="text-[10px] mt-1 font-sans uppercase tracking-[0.2em]">{t.sonOf}</p>
                    </div>
                </div>
                <p className="mt-8 text-lg">{t.inviteToWedding}</p>
            </div>

            <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter shadow-sm">
                    {brideName}
                </h1>
                <span className="text-4xl italic">{t.and}</span>
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter shadow-sm">
                    {groomName}
                </h1>
            </div>

            <div className="w-1/2 h-px bg-[#D4AF37]/50" />

            <div className="space-y-4">
                {inviteeName && (
                    <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <span className="text-[#D4AF37]/80 font-serif italic text-lg">{t.dear} {inviteeName},</span>
                        <p className="text-[#D4AF37]/40 text-xs tracking-widest uppercase">{t.warmlyInvited}</p>
                    </div>
                )}
                {!inviteeName && (
                    <h3 className="text-[#D4AF37] font-medium tracking-[0.3em] uppercase text-xs">
                        {t.weddingOf}
                    </h3>
                )}
            </div>

            <div className="space-y-6">
                <p className="text-xl md:text-2xl lowercase italic">
                    {message}
                </p>

                <div className="space-y-3">
                    <p className="text-2xl font-bold border-y-2 border-[#D4AF37]/30 py-2 inline-block px-8">
                        {formattedDate}
                    </p>
                    <div className="flex justify-center gap-12 text-sm uppercase tracking-widest font-sans">
                        <div>
                            <p className="opacity-60">{t.time}</p>
                            <p className="text-lg font-bold">{time}</p>
                        </div>
                        {poruwaTime && (
                            <div>
                                <p className="opacity-60">{t.poruwa}</p>
                                <p className="text-lg font-bold">{poruwaTime}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="opacity-60 uppercase tracking-widest text-xs font-sans">{t.venue}</p>
                    <p className="text-2xl">{venue}</p>
                </div>
            </div>

            <div className="pt-6 border-t border-[#D4AF37]/20 w-full no-print">
                <p className="text-xs uppercase tracking-widest opacity-60">{t.reply} {rsvpDate}</p>
            </div>
        </div>
    );
};
