import React from 'react';
import { TemplateProps } from './types';
import { translations } from './translations';

export const ClassicTemplate: React.FC<TemplateProps> = ({
    brideName,
    groomName,
    brideFather,
    brideMother,
    groomFather,
    groomMother,
    date,
    time,
    venue,
    message,
    rsvpEmail,
    poruwaTime,
    rsvpDate,
    language,
    inviteeName
}) => {
    const t = translations[language];
    const formattedDate = new Date(date).toLocaleDateString(language === 'si' ? 'si-LK' : 'en-US', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="w-full max-w-2xl bg-white p-12 md:p-20 shadow-[0_20px_50px_rgba(0,0,0,0.1),0_10px_30px_rgba(0,0,0,0.05)] relative overflow-hidden border-[16px] border-double border-primary/20 flex flex-col items-center text-center space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000 before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] before:opacity-30 before:pointer-events-none">
            {/* Decorative Corners */}
            <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-primary/20 pointer-events-none" />
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-primary/20 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-primary/20 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-primary/20 pointer-events-none" />

            <div className="space-y-4">
                {inviteeName && (
                    <div className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <span className="text-primary/60 font-serif italic text-lg">{t.dear} {inviteeName},</span>
                        <p className="text-foreground/40 text-xs tracking-widest uppercase">{t.warmlyInvited}</p>
                    </div>
                )}
                {!inviteeName && (
                    <h3 className="text-primary font-medium tracking-[0.3em] uppercase text-xs">
                        {t.weddingOf}
                    </h3>
                )}

                <div className="text-sm font-sans text-foreground/60 space-y-1 lowercase italic">
                    <p>{brideFather} & {brideMother}</p>
                    <p>{t.and}</p>
                    <p>{groomFather} & {groomMother}</p>
                </div>

                <div className="flex flex-col items-center gap-2 pt-4">
                    <h1 className="text-5xl md:text-7xl font-serif text-foreground break-words w-full">
                        {brideName}
                    </h1>
                    <span className="text-3xl font-serif text-primary italic">{t.and}</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-foreground break-words w-full">
                        {groomName}
                    </h1>
                </div>
            </div>

            <div className="w-24 h-px bg-primary/30" />

            <div className="space-y-6">
                <p className="text-xl md:text-2xl font-serif text-foreground/80 lowercase italic">
                    {message}
                </p>

                <div className="space-y-2">
                    <p className="text-lg md:text-xl font-medium tracking-wide">
                        {formattedDate}
                    </p>
                    <p className="text-lg text-foreground/70 uppercase tracking-widest">
                        {t.time} {time}
                    </p>
                    {poruwaTime && (
                        <p className="text-sm text-foreground/50 uppercase tracking-widest">
                            {t.poruwa} {poruwaTime}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <p className="text-primary font-semibold uppercase tracking-widest text-xs">{t.venue}</p>
                    <p className="text-xl font-serif text-foreground">{venue}</p>
                </div>
            </div>

            <div className="pt-6 space-y-4 border-t border-primary/10 w-full">
                <p className="text-sm text-foreground/60 italic">
                    {t.rsvp} <span className="text-primary font-semibold">{rsvpEmail}</span> {t.when} {rsvpDate}
                </p>
            </div>
        </div>
    );
};
