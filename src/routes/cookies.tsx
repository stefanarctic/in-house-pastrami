import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { LEGAL, LEGAL_PATHS } from "@/data/legal";
import { PAGES, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  head: () =>
    pageHead({
      title: PAGES.cookies.title,
      description: PAGES.cookies.description,
      path: LEGAL_PATHS.cookies,
    }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalLayout title="Politica de cookies">
      <section>
        <h2>1. Ce folosim</h2>
        <p>
          Acest site nu setează cookie-uri de marketing, publicitate sau analiză (Google Analytics,
          Meta Pixel etc.). Folosim doar stocare strict necesară pentru funcționarea serviciului,
          conform Legii nr. 506/2004 și ePrivacy.
        </p>
      </section>

      <section>
        <h2>2. Stocare esențială (fără consimțământ de marketing)</h2>
        <ul>
          <li>
            <strong>Coșul de cumpărături</strong> (`ihp-cart`) — localStorage. Păstrează produsele
            alese între pagini. Fără aceasta, nu poți comanda.
          </li>
        </ul>
        <p>
          Acestea nu sunt cookie-uri HTTP de tracking. Pot fi șterse din setările browserului
          (datele site-ului / stocare locală).
        </p>
      </section>

      <section>
        <h2>3. Terți, la acțiunea ta</h2>
        <ul>
          <li>
            <strong>Stripe</strong> — când treci la plată, ești pe domeniul Stripe. Stripe poate
            seta cookie-uri necesare plății, potrivit{" "}
            <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer">
              politicii lor
            </a>
            .
          </li>
          <li>
            <strong>Google Maps</strong> — harta din pagina principală încarcă conținut de la Google.
            Google poate seta cookie-uri proprii. Dacă nu dorești acest transfer, nu derula la
            secțiunea de locații / evită harta.
          </li>
          <li>
            Linkurile către Instagram, Glovo, Bolt Food și Wolt duc pe site-urile acelor servicii,
            cu propriile politici.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Fonturi</h2>
        <p>
          Fonturile (Inter, Bebas Neue, Caveat) sunt găzduite pe același server cu site-ul.
          Nu se încarcă de la Google Fonts.
        </p>
      </section>

      <section>
        <h2>5. Administrare</h2>
        <p>
          Poți șterge localStorage din browser: setări → confidențialitate → date site / cookies.
          Dacă ștergi coșul, produsele alese dispar.
        </p>
        <p>
          Întrebări: <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Vezi și{" "}
          <Link to={LEGAL_PATHS.privacy}>Politica de confidențialitate</Link>.
        </p>
      </section>
    </LegalLayout>
  );
}
