import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/site/CartButton";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg md:text-xl tracking-wider">
          <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-meat" />
          <span className="hidden sm:inline">IN HOUSE</span> <span className="text-primary">PASTRAMI</span>
          <span className="hidden sm:inline">&amp; MORE</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/menu" activeProps={{ className: "text-primary" }} className="hover:text-primary transition-colors">Menu</Link>
          <a href="/#story" className="hover:text-primary transition-colors">Our Pastrami</a>
          <a href="/#visit" className="hover:text-primary transition-colors">Visit</a>
        </nav>
        <div className="flex items-center gap-2">
          <CartButton />
          <Button asChild variant="default" size="sm" className="bg-gradient-meat shadow-meat hover:opacity-95">
            <Link to="/menu">Order Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
