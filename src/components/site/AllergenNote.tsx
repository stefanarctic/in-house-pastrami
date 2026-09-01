import { ALLERGENS_PDF } from "@/data/legal";

export function AllergenNote({ compact = false }: { compact?: boolean }) {
  return (
    <p className={compact ? "text-[11px] text-muted-foreground leading-relaxed" : "text-sm text-muted-foreground leading-relaxed"}>
      Alergenii sunt declarați conform Reg. (UE) 1169/2011. Există risc de contaminare încrucișată
      în bucătărie.{" "}
      <a
        href={ALLERGENS_PDF}
        target="_blank"
        rel="noreferrer"
        className="text-primary hover:underline underline-offset-2"
      >
        Valori nutriționale și alergeni (PDF)
      </a>
      . Prețurile includ TVA.
    </p>
  );
}
