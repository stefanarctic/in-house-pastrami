import { useEffect, useMemo, type ComponentType, type ComponentProps } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { getCartUpsell } from "@/lib/upsell";
import { resolveMenuImageFrame, type MenuItem } from "@/data/menu";
import { useCart } from "@/store/cart";
import { useUpsell } from "@/store/upsell";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatLei, SGR_AMOUNT_RON } from "@/lib/sgr";
import { toast } from "sonner";
import { useRouterState } from "@tanstack/react-router";

type HeadingProps = ComponentProps<"h2">;

export function CartUpsellDialog() {
  const { data: menu = [] } = useMenuItems({ availableOnly: true });
  const lines = useCart((s) => s.lines);
  const add = useCart((s) => s.add);
  const open = useUpsell((s) => s.open);
  const skipped = useUpsell((s) => s.skipped);
  const skip = useUpsell((s) => s.skip);
  const close = useUpsell((s) => s.close);
  const isMobile = useIsMobile();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const cartIds = useMemo(() => new Set(lines.map((line) => line.id)), [lines]);
  const offer = useMemo(
    () => getCartUpsell(menu, cartIds, new Set(skipped)),
    [menu, cartIds, skipped],
  );

  useEffect(() => {
    if (pathname.startsWith("/checkout")) close();
  }, [pathname, close]);

  useEffect(() => {
    if (open && !offer) close();
  }, [open, offer, close]);

  const onAdd = (item: MenuItem) => {
    add(item, 1);
    toast.success(`${item.name} adăugat`, {
      description: `${formatLei(item.price + (item.sgr ? SGR_AMOUNT_RON : 0))} lei`,
    });
  };

  const visible = open && !!offer;
  const onOpenChange = (next: boolean) => {
    if (!next) close();
  };

  if (!offer) return null;

  const body = (
    <UpsellBody
      offer={offer}
      onAdd={onAdd}
      onSkip={() => skip(offer.kind)}
      Title={isMobile ? DrawerTitle : DialogTitle}
      Description={isMobile ? DrawerDescription : DialogDescription}
    />
  );

  if (isMobile) {
    return (
      <Drawer open={visible} onOpenChange={onOpenChange} shouldScaleBackground={false}>
        <DrawerContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="bg-card border-border/60 max-h-[90dvh] overflow-hidden flex flex-col mt-0"
        >
          {body}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex flex-col gap-0 p-0 overflow-hidden bg-card border-border/60 shadow-deep w-[min(42rem,calc(100%-2rem))] max-w-2xl max-h-[min(36rem,85vh)] rounded-2xl"
      >
        {body}
      </DialogContent>
    </Dialog>
  );
}

function UpsellBody({
  offer,
  onAdd,
  onSkip,
  Title,
  Description,
}: {
  offer: NonNullable<ReturnType<typeof getCartUpsell>>;
  onAdd: (item: MenuItem) => void;
  onSkip: () => void;
  Title: ComponentType<HeadingProps>;
  Description: ComponentType<ComponentProps<"p">>;
}) {
  return (
    <>
      <div className="px-4 pt-1 pb-2 pr-12 sm:px-5 sm:pt-5">
        <p className="font-hand text-accent text-base sm:text-lg leading-none">{offer.kicker}</p>
        <Title className="font-display text-[1.75rem] sm:text-3xl mt-1 leading-none font-normal">
          {offer.title}
        </Title>
        <Description className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-snug">
          {offer.subtitle}
        </Description>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 px-4 sm:px-5 overflow-x-hidden overflow-y-auto overscroll-contain min-h-0 flex-1 scrollbar-dark">
        {offer.items.map((item) => (
          <UpsellCard key={item.id} item={item} onAdd={() => onAdd(item)} />
        ))}
      </ul>

      <div className="shrink-0 px-4 sm:px-5 pt-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-4">
        <button
          type="button"
          onClick={onSkip}
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2.5"
        >
          Nu, mulțumesc
        </button>
      </div>
    </>
  );
}

function UpsellCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const frame = resolveMenuImageFrame(item.imageKey, item.id);
  const price = formatLei(item.price + (item.sgr ? SGR_AMOUNT_RON : 0));

  return (
    <li className="min-w-0">
      <button
        type="button"
        onClick={onAdd}
        aria-label={`Adaugă ${item.name}`}
        className="group w-full rounded-xl border border-border/60 bg-background/40 overflow-hidden h-full flex flex-col text-left hover:border-primary/60 transition-colors"
      >
        <div className="relative aspect-4/3 sm:aspect-square bg-muted overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              loading="lazy"
              className={`absolute inset-0 size-full ${
                frame.fit === "contain" ? "object-contain bg-white p-1.5 sm:p-2" : "object-cover group-hover:scale-105"
              } transition-transform duration-500`}
              style={{ objectPosition: frame.position }}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-[10px] uppercase tracking-widest text-muted-foreground">
              Foto
            </div>
          )}
        </div>
        <div className="p-2 sm:p-2.5 flex flex-col flex-1 gap-1.5">
          <h3 className="font-display text-sm sm:text-base leading-tight line-clamp-2">{item.name}</h3>
          <div className="mt-auto flex items-center justify-between gap-1.5">
            <span className="font-display text-accent text-base sm:text-lg leading-none">
              {price} lei
            </span>
            <span
              className="h-9 w-9 sm:h-8 sm:w-8 grid place-items-center rounded-full bg-gradient-meat text-primary-foreground shadow-meat shrink-0 pointer-events-none"
              aria-hidden
            >
              <Plus className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
    </li>
  );
}
