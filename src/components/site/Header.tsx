import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-wider">
          <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-meat" />
          IN HOUSE <span className="text-primary">PASTRAMI</span> &amp; MORE
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a href="/#menu" className="hover:text-primary transition-colors">Menu</a>
          <a href="/#story" className="hover:text-primary transition-colors">Our Pastrami</a>
          <a href="/#visit" className="hover:text-primary transition-colors">Visit</a>
        </nav>
        <Button asChild variant="default" size="sm" className="bg-gradient-meat shadow-meat hover:opacity-95">
          <a href="#order">Order Now</a>
        </Button>
      </div>
    </header>
  );
}
