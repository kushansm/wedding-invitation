"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { TraditionalSinhalaTemplate } from "@/components/templates/TraditionalSinhalaTemplate";
import { ModernLuxuryTemplate } from "@/components/templates/ModernLuxuryTemplate";
import { TemplateProps } from "@/components/templates/types";

function InvitationContent() {
    const searchParams = useSearchParams();

    const props: TemplateProps = {
        brideName: searchParams.get("brideName") || "Sarah",
        groomName: searchParams.get("groomName") || "Thomas",
        brideFather: searchParams.get("brideFather") || "Mr. Perera",
        brideMother: searchParams.get("brideMother") || "Mrs. Perera",
        groomFather: searchParams.get("groomFather") || "Mr. Fernando",
        groomMother: searchParams.get("groomMother") || "Mrs. Fernando",
        date: searchParams.get("date") || "2024-12-25",
        time: searchParams.get("time") || "18:00",
        venue: searchParams.get("venue") || "Grand Hotel, Nuwara Eliya",
        poruwaTime: searchParams.get("poruwaTime") || "10:30",
        rsvpDate: searchParams.get("rsvpDate") || "2024-12-01",
        message: searchParams.get("message") || "We're getting married!",
        rsvpEmail: searchParams.get("rsvpEmail") || "wedding@example.com",
        language: (searchParams.get("language") as 'en' | 'si') || "en",
        template: (searchParams.get("template") as any) || "classic",
    };

    const template = searchParams.get("template") || "classic";

    const renderTemplate = () => {
        switch (template) {
            case "sinhala":
                return <TraditionalSinhalaTemplate {...props} />;
            case "luxury":
                return <ModernLuxuryTemplate {...props} />;
            case "classic":
            default:
                return <ClassicTemplate {...props} />;
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            {renderTemplate()}

            <div className="flex gap-6 no-print items-center bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/10 shadow-sm">
                <Link
                    href="/create"
                    className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                >
                    <span>←</span> Edit Details
                </Link>
                <div className="w-px h-4 bg-primary/20" />
                <button
                    onClick={() => window.print()}
                    className="text-sm font-medium text-foreground/60 hover:text-primary transition-colors flex items-center gap-2"
                >
                    <span>⎙</span> Print Invitation
                </button>
            </div>
        </div>
    );
}

export default function PreviewPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#fdfcf0]">
            <Suspense fallback={
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="font-serif text-xl text-primary animate-pulse">Preparing your invitation...</p>
                </div>
            }>
                <InvitationContent />
            </Suspense>

            {/* Background patterns */}
            <div className="fixed inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-50" />
        </main>
    );
}
