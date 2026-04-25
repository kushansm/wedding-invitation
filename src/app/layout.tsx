import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Bodoni_Moda, Great_Vibes, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedding Invitation Generator",
  description: "Create beautiful, personalized wedding invitations in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} ${bodoni.variable} ${greatVibes.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className="font-sans min-h-screen bg-[#fdfcf0] text-[#2d2d2d] flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
