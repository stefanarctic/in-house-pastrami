import { Link, useLocation } from "@tanstack/react-router";
import { useCart } from "@/store/cart";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

export function StickyOrder() {
  const count = useCart((s) => s.totalItems());
  const subtotal = useCart((s) => s.subtotal());
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (location.pathname === "/checkout" || location.pathname.startsWith("/checkout/")) {
    return null;
  }

  const hasItems = mounted && count > 0;
  const visible = scrolled || hasItems;

  return (
    <Link
      to={hasItems ? "/checkout" : "/menu"}
      className={`md:hidden fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 right-3 z-50 bg-gradient-meat text-primary-foreground font-display tracking-widest text-base sm:text-lg py-3.5 sm:py-4 rounded-xl shadow-meat flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {hasItems ? (
        <>
          <ShoppingBag className="h-5 w-5 shrink-0" />
          <span className="truncate">VEZI COȘUL · {subtotal} LEI</span>
        </>
      ) : (
        <span>COMANDĂ ACUM →</span>
      )}
    </Link>
  );
}
