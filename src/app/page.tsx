import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-4">
          <h2 className="text-primary text-xl font-medium tracking-[0.2em] uppercase">
            Create Your Moment
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight">
            Wedding Invitation <br /> Generator
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-lg mx-auto font-sans leading-relaxed">
            Design elegant, personalized digital invitations for your special day.
            Simple, beautiful, and ready in minutes.
          </p>
        </div>

        <div className="pt-8">
          <Link
            href="/create"
            className="inline-block bg-primary text-background px-10 py-4 rounded-full text-lg font-semibold hover:bg-primary/95 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Designing
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          <div className="space-y-2">
            <h3 className="text-xl font-serif">Elegant Fonts</h3>
            <p className="text-sm text-foreground/60">Selected typography for a premium feel.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-serif">Mobile First</h3>
            <p className="text-sm text-foreground/60">Optimized for sharing on all devices.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-serif">Instant Preview</h3>
            <p className="text-sm text-foreground/60">See your design exactly as guests will.</p>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-50" />
    </main>
  );
}
