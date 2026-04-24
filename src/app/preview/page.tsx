"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function InvitationContent() {
    const searchParams = useSearchParams();
    const brideName = searchParams.get("brideName") || "Sarah";
    const groomName = searchParams.get("groomName") || "Thomas";
    const date = searchParams.get("date") || "2024-12-25";
    const time = searchParams.get("time") || "18:00";
    const venue = searchParams.get("venue") || "The Grand Ballroom";
    const message = searchParams.get("message") || "We're getting married!";
    const rsvpEmail = searchParams.get("rsvpEmail") || "rsvp@wedding.com";

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="w-full max-w-2xl bg-white p-12 md:p-20 shadow-2xl relative overflow-hidden border-[16px] border-double border-primary/20 flex flex-col items-center text-center space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-primary/30 rounded-tl-3xl -translate-x-4 -translate-y-4" />
            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-primary/30 rounded-tr-3xl translate-x-4 -translate-y-4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-primary/30 rounded-bl-3xl -translate-x-4 translate-y-4" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-primary/30 rounded-br-3xl translate-x-4 translate-y-4" />

            <div className="space-y-4">
                <h3 className="text-primary font-medium tracking-[0.3em] uppercase text-sm">
                    Join us for the wedding of
                </h3>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-5xl md:text-7xl font-serif text-foreground break-words w-full">
                        {brideName}
                    </h1>
                    <span className="text-3xl font-serif text-primary italic">&</span>
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
                        at {time}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-primary font-semibold uppercase tracking-widest text-xs">The Venue</p>
                    <p className="text-xl font-serif text-foreground">{venue}</p>
                </div>
            </div>

            <div className="pt-6 space-y-4">
                <div className="inline-block border border-primary/20 px-8 py-3 rounded-full">
                    <p className="text-sm text-foreground/60">
                        Please RSVP to <span className="text-primary font-semibold">{rsvpEmail}</span>
                    </p>
                </div>

                <div className="flex gap-4 justify-center no-print">
                    <Link
                        href="/create"
                        className="text-sm text-foreground/40 hover:text-primary transition-colors hover:underline"
                    >
                        Edit Details
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="text-sm text-foreground/40 hover:text-primary transition-colors hover:underline"
                    >
                        Print Invitation
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function PreviewPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#fdfcf0]">
            <Suspense fallback={<div className="font-serif text-2xl animate-pulse">Designing your invitation...</div>}>
                <InvitationContent />
            </Suspense>

            {/* Background patterns */}
            <div className="fixed inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-50" />
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_70%)] opacity-[0.03]" />
        </main>
    );
}
