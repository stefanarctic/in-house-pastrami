import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/site/CartButton";
import { useLanguage } from "@/i18n/LanguageProvider";
import logo from "@/assets/logo.png";

export function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 gap-2 sm:gap-4 min-w-0">
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-2.5 font-display text-base sm:text-lg md:text-xl tracking-wider min-w-0 shrink"
        >
          <img
            src={logo}
            alt="In House Pastrami & More"
            width={44}
            height={44}
            className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full shrink-0"
          />
          <span className="hidden sm:inline">IN HOUSE</span>{" "}
          <span className="text-primary truncate">PASTRAMI</span>
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
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <CartButton />
          <Button
            asChild
            variant="default"
            size="sm"
            className="bg-gradient-meat shadow-meat hover:opacity-95 px-2.5 sm:px-3 h-9 text-xs sm:text-sm"
          >
            <Link to="/menu">
              <span className="sm:hidden">Comandă</span>
              <span className="hidden sm:inline">{t("cta.orderNow")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
