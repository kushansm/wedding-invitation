import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { translations } from "@/components/templates/translations";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Get parameters
        const template = searchParams.get("template") || "classic";
        const language = (searchParams.get("language") as "en" | "si" | "ta") || "en";
        const brideName = searchParams.get("brideName") || "Sarah";
        const groomName = searchParams.get("groomName") || "Thomas";
        const date = searchParams.get("date") || "2024-12-25";
        const time = searchParams.get("time") || "18:00";
        const venue = searchParams.get("venue") || "Grand Hotel, Nuwara Eliya";
        const inviteeName = searchParams.get("inviteeName") || "";
        const brideFather = searchParams.get("brideFather") || "";
        const brideMother = searchParams.get("brideMother") || "";
        const groomFather = searchParams.get("groomFather") || "";
        const groomMother = searchParams.get("groomMother") || "";

        const t = translations[language];
        const locale = language === "si" ? "si-LK" : language === "ta" ? "ta-LK" : "en-US";
        const formattedDate = new Date(date).toLocaleDateString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        // Template specific styles
        const colors = {
            classic: {
                bg: "#ffffff",
                text: "#2d2d2d",
                accent: "#b8860b",
                border: "rgba(184, 134, 11, 0.2)",
            },
            sinhala: {
                bg: "#8B0000",
                text: "#D4AF37",
                accent: "#D4AF37",
                border: "rgba(212, 175, 55, 0.5)",
            },
            luxury: {
                bg: "#0a0a0a",
                text: "#ffffff",
                accent: "#D4AF37",
                border: "#D4AF37",
            },
        }[template as "classic" | "sinhala" | "luxury"];

        return new ImageResponse(
            (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.bg,
                        color: colors.text,
                        padding: "40px",
                        fontFamily: "serif",
                        position: "relative",
                        borderTop: template === "luxury" ? "10px solid #D4AF37" : "none",
                    }}
                >
                    {/* Background Texture Placeholder */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0.05,
                            backgroundImage: "url(https://www.transparenttextures.com/patterns/natural-paper.png)",
                        }}
                    />

                    {/* Border */}
                    <div
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            right: "20px",
                            bottom: "20px",
                            border: `2px double ${colors.border}`,
                            display: "flex",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "20px",
                            zIndex: 10,
                        }}
                    >
                        {inviteeName ? (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                                <div style={{ color: colors.accent, fontSize: "24px", fontStyle: "italic" }}>
                                    {t.dear} {inviteeName},
                                </div>
                                <div style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px", opacity: 0.6 }}>
                                    {t.warmlyInvited}
                                </div>
                            </div>
                        ) : (
                            <div style={{ fontSize: "16px", textTransform: "uppercase", letterSpacing: "4px", color: colors.accent }}>
                                {t.weddingOf}
                            </div>
                        )}

                        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                            <div style={{ fontSize: "60px", fontWeight: "bold" }}>{brideName}</div>
                            <div style={{ fontSize: "40px", color: colors.accent, opacity: 0.5 }}>{t.and}</div>
                            <div style={{ fontSize: "60px", fontWeight: "bold" }}>{groomName}</div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", fontSize: "16px", opacity: 0.8 }}>
                            <div>{brideFather} & {brideMother}</div>
                            <div style={{ color: colors.accent }}>{t.and}</div>
                            <div>{groomFather} & {groomMother}</div>
                        </div>

                        <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "20px" }}>{formattedDate}</div>
                        <div style={{ fontSize: "18px" }}>{time}</div>
                        <div style={{ fontSize: "18px", color: colors.accent }}>{venue}</div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        return new Response(`Failed to generate image`, { status: 500 });
    }
}
