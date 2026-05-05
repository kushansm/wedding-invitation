"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { TraditionalSinhalaTemplate } from "@/components/templates/TraditionalSinhalaTemplate";
import { TraditionalKandyanTemplate } from "@/components/templates/TraditionalKandyanTemplate";
import { ModernLuxuryTemplate } from "@/components/templates/ModernLuxuryTemplate";
import { TemplateProps } from "@/components/templates/types";

function InviteContent() {
    const searchParams = useSearchParams();

    // Map query parameters to props
    const props: TemplateProps = {
        brideName: searchParams.get("brideName") || "",
        groomName: searchParams.get("groomName") || "",
        brideFather: searchParams.get("brideFather") || "",
        brideMother: searchParams.get("brideMother") || "",
        groomFather: searchParams.get("groomFather") || "",
        groomMother: searchParams.get("groomMother") || "",
        date: searchParams.get("date") || "",
        time: searchParams.get("time") || "",
        venue: searchParams.get("venue") || "",
        poruwaTime: searchParams.get("poruwaTime") || "",
        rsvpDate: searchParams.get("rsvpDate") || "",
        message: searchParams.get("message") || "",
        rsvpEmail: searchParams.get("rsvpEmail") || "",
        language: (searchParams.get("language") as 'en' | 'si' | 'ta') || "en",
        template: (searchParams.get("template") as any) || "classic",
        inviteeName: searchParams.get("inviteeName") || "Honored Guest",
    };

    // Extract location details if present
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const placeName = searchParams.get("placeName");
    const address = searchParams.get("address");

    if (lat && lng) {
        props.locationDetails = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            placeName: placeName || "",
            address: address || "",
            placeId: searchParams.get("placeId") || ""
        };
    }

    const renderTemplate = () => {
        switch (props.template) {
            case "sinhala":
                return <TraditionalSinhalaTemplate {...props} />;
            case "kandyan":
                return <TraditionalKandyanTemplate {...props} />;
            case "luxury":
                return <ModernLuxuryTemplate {...props} />;
            case "classic":
            default:
                return <ClassicTemplate {...props} />;
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            {renderTemplate()}
        </div>
    );
}

export default function InvitePage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-0 bg-[#fdfcf0]">
            <Suspense fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
            }>
                <InviteContent />
            </Suspense>
        </main>
    );
}
