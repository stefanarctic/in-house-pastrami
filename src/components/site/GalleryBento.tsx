import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export function GalleryBento({ images }: { images: GalleryImage[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Bento: 6 cols × 4 rows desktop = 24 cells, fully filled.
  // 0:6, 1:6, 2:2, 3:2, 4:2, 5:2, 6:2, 7:2 = 24
  // Mobile: 4 cols × 6 rows = 24 cells. 0:8, 1:4, 2:2, 3:2, 4:4, 5:2, 6:2 — adjust below.
  const layout = [
    "col-span-4 row-span-2 md:col-span-3 md:row-span-2", // 0 big hero
    "col-span-2 row-span-2 md:col-span-3 md:row-span-2", // 1
    "col-span-2 row-span-1 md:col-span-2 md:row-span-1", // 2
    "col-span-2 row-span-1 md:col-span-2 md:row-span-1", // 3
    "col-span-2 row-span-1 md:col-span-2 md:row-span-1", // 4
    "col-span-2 row-span-1 md:col-span-2 md:row-span-1", // 5
    "col-span-2 row-span-1 md:col-span-2 md:row-span-1", // 6
    "col-span-2 row-span-1 md:col-span-2 md:row-span-1", // 7
  ];

  const current = openIdx !== null ? images[openIdx] : null;

  return (
    <>
      <div className="grid grid-cols-4 md:grid-cols-6 auto-rows-[110px] sm:auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px] gap-2 md:gap-3">
        {images.slice(0, 8).map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIdx(i)}
            className={`group relative overflow-hidden rounded-xl md:rounded-2xl border border-border/60 bg-card cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60 ${layout[i]}`}
            aria-label={`Deschide imaginea: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <p className="font-display text-sm md:text-base text-foreground text-left">
                  {img.caption}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-w-4xl w-[calc(100%-2rem)] p-0 overflow-hidden bg-card border-border/60 rounded-2xl"
        >
          {current && (
            <>
              <DialogTitle className="sr-only">{current.alt}</DialogTitle>
              <div className="relative bg-black">
                <img
                  src={current.src}
                  alt={current.alt}
                  className="w-full max-h-[80vh] object-contain"
                />
              </div>
              {current.caption && (
                <div className="p-4 md:p-5 border-t border-border/40">
                  <p className="font-display text-lg md:text-xl">{current.caption}</p>
                  <p className="text-sm text-muted-foreground mt-1">{current.alt}</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
