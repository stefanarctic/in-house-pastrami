import { Link } from "@tanstack/react-router";
import { LEGAL, LEGAL_PATHS } from "@/data/legal";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
      <p className="text-accent uppercase tracking-[0.3em] text-xs mb-3">Informații legale</p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-none mb-3">{title}</h1>
      <p className="text-xs text-muted-foreground mb-8">
        Ultima actualizare: {LEGAL.lastUpdated}
      </p>

      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 sm:p-5 text-sm mb-10 space-y-1">
        <p className="font-display text-lg text-foreground">{LEGAL.companyName}</p>
        <p className="text-muted-foreground">
          CUI {LEGAL.cuiDisplay} · Nr. Reg. Com. {LEGAL.tradeRegister}
        </p>
        <p className="text-muted-foreground">Sediu social: {LEGAL.registeredOffice}</p>
        <p className="text-muted-foreground">
          E-mail:{" "}
          <a href={`mailto:${LEGAL.email}`} className="text-foreground hover:text-primary">
            {LEGAL.email}
          </a>
        </p>
      </div>

      <article className="legal-prose space-y-8 text-[15px] text-muted-foreground leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mb-3 [&_h2]:tracking-wide [&_h3]:text-foreground [&_h3]:font-semibold [&_h3]:text-base [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_a]:text-primary [&_strong]:text-foreground">
        {children}
      </article>

      <nav className="mt-14 pt-6 border-t border-border/50 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <Link to={LEGAL_PATHS.terms} className="hover:text-primary">
          Termeni și condiții
        </Link>
        <Link to={LEGAL_PATHS.privacy} className="hover:text-primary">
          Confidențialitate
        </Link>
        <Link to={LEGAL_PATHS.cookies} className="hover:text-primary">
          Cookies
        </Link>
      </nav>
    </main>
  );
}
