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

  if (location.pathname === "/checkout") return null;

  const hasItems = mounted && count > 0;
  const visible = scrolled || hasItems;

  return (
    <Link
      to={hasItems ? "/checkout" : "/menu"}
      className={`md:hidden fixed bottom-4 left-4 right-4 z-50 bg-gradient-meat text-primary-foreground font-display tracking-widest text-lg py-4 rounded-xl shadow-meat flex items-center justify-center gap-3 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {hasItems ? (
        <>
          <ShoppingBag className="h-5 w-5" />
          <span>VEZI COȘUL · {subtotal} LEI</span>
        </>
      ) : (
        <span>COMANDĂ ACUM →</span>
      )}
    </Link>
  );
}
