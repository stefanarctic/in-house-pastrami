export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="font-display tracking-widest text-foreground">
          IN HOUSE PASTRAMI &amp; MORE
        </div>
        <div>Strada Speranței 1, București · 4.8★ pe platformele de livrare</div>
        <div>© {new Date().getFullYear()} — Afumat cu răbdare.</div>
      </div>
    </footer>
  );
}
