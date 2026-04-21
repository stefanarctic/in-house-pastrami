import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { useEffect, useState } from "react";

export function CartButton({ className = "" }: { className?: string }) {
  const count = useCart((s) => s.totalItems());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Link
      to="/checkout"
      aria-label="Vezi coșul"
      className={`relative inline-flex items-center justify-center h-9 w-9 rounded-md border border-border/60 hover:bg-muted transition-colors ${className}`}
    >
      <ShoppingBag className="h-4 w-4" />
      {mounted && count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
          {count}
        </span>
      )}
    </Link>
  );
}
