import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/site/CartButton";
import { useLanguage } from "@/i18n/LanguageProvider";
import logo from "@/assets/logo.png";

export function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display text-lg md:text-xl tracking-wider"
        >
          <img
            src={logo}
            alt="In House Pastrami & More"
            width={44}
            height={44}
            className="h-10 w-10 md:h-11 md:w-11 rounded-full shrink-0"
          />
          <span className="hidden sm:inline">IN HOUSE</span>{" "}
          <span className="text-primary">PASTRAMI</span>
          <span className="hidden sm:inline">&amp; MORE</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            to="/menu"
            activeProps={{ className: "text-primary" }}
            className="hover:text-primary transition-colors"
          >
            {t("nav.menu")}
          </Link>
          <a href="/#story" className="hover:text-primary transition-colors">
            {t("nav.pastrami")}
          </a>
          <a href="/#visit" className="hover:text-primary transition-colors">
            {t("nav.visit")}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <CartButton />
          <Button
            asChild
            variant="default"
            size="sm"
            className="bg-gradient-meat shadow-meat hover:opacity-95"
          >
            <Link to="/menu">{t("cta.orderNow")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
