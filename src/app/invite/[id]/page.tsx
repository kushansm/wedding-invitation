"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { TraditionalSinhalaTemplate } from "@/components/templates/TraditionalSinhalaTemplate";
import { TraditionalKandyanTemplate } from "@/components/templates/TraditionalKandyanTemplate";
import { ModernLuxuryTemplate } from "@/components/templates/ModernLuxuryTemplate";
import { TemplateProps } from "@/components/templates/types";

export default function InvitePage() {
    const params = useParams();
    const [data, setData] = useState<TemplateProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!params.id || typeof params.id !== 'string') return;

        try {
            // Decode the data directly from the ID string
            const decodedData = JSON.parse(decodeURIComponent(escape(atob(params.id))));
            setData(decodedData);
        } catch (err) {
            console.error("Decoding error:", err);
            setError("The invitation link is invalid or corrupted.");
        } finally {
            setLoading(false);
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fdfcf0]">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfcf0] text-foreground p-6 text-center">
                <h1 className="text-2xl font-serif mb-4">Invitation Not Found</h1>
                <p className="text-foreground/60">{error || "The link you followed may be invalid or expired."}</p>
            </div>
        );
    }

    const renderTemplate = () => {
        switch (data.template) {
            case "sinhala":
                return <TraditionalSinhalaTemplate {...data} />;
            case "kandyan":
                return <TraditionalKandyanTemplate {...data} />;
            case "luxury":
                return <ModernLuxuryTemplate {...data} />;
            case "classic":
            default:
                return <ClassicTemplate {...data} />;
        }
    };

    return (
        <main className="min-h-screen bg-[#fdfcf0] flex flex-col items-center">
            {/* 
              Render at full width/height similar to the preview page, 
              allowing the template to dictate its own max-width if needed. 
              The templates themselves are designed to be max-w-2xl and centered.
            */}
            {renderTemplate()}
        </main>
    );
}
