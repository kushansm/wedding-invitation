import React from 'react';
import { TemplateProps } from './types';

export const TraditionalSinhalaTemplate: React.FC<TemplateProps> = ({
    brideName,
    groomName,
    brideParents,
    groomParents,
    date,
    time,
    venue,
    poruwaTime,
    rsvpDate,
    message
}) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="w-full max-w-2xl bg-[#8B0000] text-[#D4AF37] p-8 md:p-16 shadow-2xl relative overflow-hidden border-[12px] border-double border-[#D4AF37]/50 flex flex-col items-center text-center space-y-8 font-serif">
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
                <p className="tracking-widest uppercase text-sm font-sans mb-4">Ayubowan</p>
                <div className="space-y-4">
                    <p className="text-sm italic opacity-80">{brideParents}</p>
                    <p className="text-sm">&</p>
                    <p className="text-sm italic opacity-80">{groomParents}</p>
                </div>
                <p className="mt-6 text-lg">cordially invite you to the wedding of their children</p>
            </div>

            <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter shadow-sm">
                    {brideName}
                </h1>
                <span className="text-4xl italic">&</span>
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter shadow-sm">
                    {groomName}
                </h1>
            </div>

            <div className="w-1/2 h-px bg-[#D4AF37]/50" />

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
                            <p className="opacity-60">Ceremony</p>
                            <p className="text-lg font-bold">{time}</p>
                        </div>
                        <div>
                            <p className="opacity-60">Poruwa</p>
                            <p className="text-lg font-bold">{poruwaTime}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="opacity-60 uppercase tracking-widest text-xs font-sans">The Venue</p>
                    <p className="text-2xl">{venue}</p>
                </div>
            </div>

            <div className="pt-6 border-t border-[#D4AF37]/20 w-full no-print">
                <p className="text-xs uppercase tracking-widest opacity-60">Please RSVP by {rsvpDate}</p>
            </div>
        </div>
    );
};
