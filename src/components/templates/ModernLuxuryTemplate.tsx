import React from 'react';
import { TemplateProps } from './types';
import { translations } from './translations';

export const ModernLuxuryTemplate: React.FC<TemplateProps> = ({
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
    message,
    language,
    inviteeName
}) => {
    const t = translations[language as keyof typeof translations];
    const locale = language === 'si' ? 'si-LK' : language === 'ta' ? 'ta-IN' : 'en-US';
    const formattedDate = new Date(date).toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="w-full max-w-2xl bg-[#0a0a0a] text-white p-12 md:p-24 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] relative flex flex-col items-center text-center space-y-12 font-sans border-t-[20px] border-[#D4AF37] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] before:opacity-20 before:pointer-events-none">

            <div className="space-y-4 relative z-10">
                {inviteeName && (
                    <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <span className="text-[#D4AF37]/80 font-serif italic text-lg">{t.dear} {inviteeName},</span>
                        <p className="text-white/40 text-xs tracking-widest uppercase">{t.warmlyInvited}</p>
                    </div>
                )}
                {!inviteeName && (
                    <p className="text-[#D4AF37] tracking-[0.4em] uppercase text-[10px] font-semibold">
                        {t.togetherWithFamilies}
                    </p>
                )}
                <div className="text-white/60 space-y-1 text-xs uppercase tracking-widest leading-relaxed font-light">
                    <p>{brideFather} & {brideMother}</p>
                    <p>{t.and}</p>
                    <p>{groomFather} & {groomMother}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6">
                <h1 className="text-6xl md:text-8xl font-serif text-[#D4AF37] font-light leading-none">
                    {brideName}
                </h1>
                <span className="text-3xl font-serif italic text-white/40">{t.and}</span>
                <h1 className="text-6xl md:text-8xl font-serif text-[#D4AF37] font-light leading-none">
                    {groomName}
                </h1>
            </div>

            <div className="space-y-8">
                <p className="text-lg text-white/80 lowercase italic max-w-md">
                    {message}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-y border-white/10 py-10">
                    <div className="space-y-1">
                        <p className="text-[#D4AF37] uppercase text-[10px] tracking-widest">{t.when}</p>
                        <p className="text-sm font-medium">{formattedDate}</p>
                    </div>
                    <div className="space-y-1 border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0">
                        <p className="text-[#D4AF37] uppercase text-[10px] tracking-widest">{t.time}</p>
                        <p className="text-sm font-medium">{time}</p>
                        {poruwaTime && (
                            <p className="text-[10px] opacity-40 uppercase">{t.poruwa} {poruwaTime}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <p className="text-[#D4AF37] uppercase text-[10px] tracking-widest">{t.where}</p>
                        <p className="text-sm font-medium">{venue}</p>
                    </div>
                </div>
            </div>

            <div className="pt-8 w-full border-t border-white/5 no-print">
                <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em]">
                    {t.reply} {rsvpDate}
                </p>
            </div>

            {/* Background Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#D4AF37_0%,_transparent_50%)] opacity-[0.05]" />
        </div>
    );
};
