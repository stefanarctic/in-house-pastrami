import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { ALLERGENS_PDF, ANPC, LEGAL, LEGAL_PATHS } from "@/data/legal";
import { LOCATIONS } from "@/data/locations";
import { PAGES, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/termeni-si-conditii")({
  head: () =>
    pageHead({
      title: PAGES.terms.title,
      description: PAGES.terms.description,
      path: LEGAL_PATHS.terms,
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout title="Termeni și condiții">
      <section>
        <h2>1. Informații despre comerciant</h2>
        <p>
          Site-ul {LEGAL.brand} este operat de <strong>{LEGAL.companyName}</strong>, persoană juridică română,
          cu sediul social în {LEGAL.registeredOffice}, CUI {LEGAL.cuiDisplay}, număr de înregistrare la
          Registrul Comerțului {LEGAL.tradeRegister}, EUID {LEGAL.euid}.
        </p>
        <p>
          Date de contact: e-mail{" "}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
          {LOCATIONS.map((loc) => (
            <span key={loc.id}>
              ; {loc.shortName}:{" "}
              <a href={`tel:${loc.phone}`}>{loc.phoneDisplay}</a>
            </span>
          ))}
          .
        </p>
        <p>
          Puncte de lucru (restaurante):{" "}
          {LOCATIONS.map((loc) => `${loc.name}, ${loc.address}`).join("; ")}.
        </p>
      </section>

      <section>
        <h2>2. Obiectul contractului</h2>
        <p>
          Acești termeni reglementează comenzile de produse alimentare și băuturi plasate pe site, cu
          ridicare din locațiile noastre din București. Livrarea la domiciliu nu este oferită de noi pe
          acest site; dacă comanzi prin Glovo, Bolt Food sau Wolt, se aplică termenii acelor platforme.
        </p>
        <p>
          Prin plasarea unei comenzi și efectuarea plății, închei un contract de vânzare la distanță cu{" "}
          {LEGAL.companyName}, în condițiile OUG nr. 34/2014 și ale legislației române aplicabile.
        </p>
      </section>

      <section>
        <h2>3. Comandă și încheierea contractului</h2>
        <ol>
          <li>Alegi produsele din meniu și locația de ridicare.</li>
          <li>Completezi numele, telefonul și intervalul de ridicare.</li>
          <li>Accepți acești termeni și politica de confidențialitate.</li>
          <li>Ești redirecționat către Stripe pentru plata cu cardul.</li>
        </ol>
        <p>
          Contractul se consideră încheiat în momentul confirmării plății reușite. Până atunci, comanda
          este o solicitare. După plată, comanda este trimisă în bucătăria locației alese.
        </p>
        <p>
          Timpul estimat de pregătire (~15 minute) este orientativ. În ore de vârf sau în cazul
          indisponibilității unor produse, te putem contacta telefonic pentru ajustarea comenzii sau
          rambursarea diferenței.
        </p>
      </section>

      <section>
        <h2>4. Prețuri, TVA și SGR</h2>
        <p>
          Toate prețurile afișate pe site sunt în lei (RON) și <strong>includ TVA</strong>. Prețul
          aplicabil este cel afișat la momentul plății.
        </p>
        <p>
          Pentru băuturile în ambalaj cu garanție se adaugă <strong>0,50 lei SGR / ambalaj</strong>,
          conform sistemului național de garanție-returnare. SGR nu este un adaos comercial: este o
          garanție recuperabilă la punctele de returnare autorizate, nu la casa restaurantului.
        </p>
        <p>
          Ne rezervăm dreptul de a corecta erori evidente de preț. Dacă prețul real diferă, te anunțăm
          înainte de a pregăti comanda și poți accepta diferența sau solicita rambursarea.
        </p>
      </section>

      <section>
        <h2>5. Plată</h2>
        <p>
          Plata se face online, cu cardul, prin procesatorul Stripe. Nu stocăm datele complete ale
          cardului. Plata trebuie finalizată pentru ca comanda să fie trimisă în bucătărie.
        </p>
        <p>
          Factura fiscală se eliberează la cerere, la locație sau pe e-mail, conform legislației
          fiscale. Pentru factură pe persoană juridică, scrie CUI-ul în observații sau contactează-ne
          imediat după comandă.
        </p>
      </section>

      <section>
        <h2>6. Ridicare</h2>
        <p>
          Comenzile de pe site sunt exclusiv cu ridicare (click &amp; collect) din locația aleasă.
          Ești responsabil să ridici comanda în intervalul indicat. Dacă nu te poți prezenta,
          anunță locația telefonic cât mai curând.
        </p>
        <p>
          Produsele nepreluate într-un termen rezonabil după pregătire (de regulă 45 de minute, în
          funcție de produs) pot fi eliminate din motive de siguranță alimentară, fără rambursare,
          dacă neprezentarea îți este imputabilă.
        </p>
      </section>

      <section>
        <h2>7. Dreptul de retragere</h2>
        <p>
          Produsele pe care le vindem sunt alimente și băuturi perisabile, preparate la comandă.
          Conform <strong>art. 16 lit. d) din OUG nr. 34/2014</strong>, dreptul de retragere de 14
          zile <strong>nu se aplică</strong> bunurilor care se pot deteriora sau expira rapid.
        </p>
        <p>
          Poți anula comanda și solicita rambursarea integrală doar dacă ne anunți <strong>înainte</strong>{" "}
          ca prepararea să fi început. După ce bucătăria a început prepararea, rambursarea nu este
          posibilă, cu excepția cazurilor de neconformitate imputabile nouă.
        </p>
      </section>

      <section>
        <h2>8. Alergeni și informații alimentare</h2>
        <p>
          Informațiile despre ingrediente, alergeni și valori nutriționale sunt disponibile pe fiecare
          produs și în documentul{" "}
          <a href={ALLERGENS_PDF} target="_blank" rel="noreferrer">
            Valori nutriționale și alergeni
          </a>
          , conform Regulamentului (UE) nr. 1169/2011.
        </p>
        <p>
          Bucătăria noastră prepară o gamă variată de produse. Există <strong>risc de contaminare
          încrucișată</strong> (gluten, lactate, ou, muștar, susan, soia, țelină, sulfiți etc.). Dacă
          ai o alergie sau intoleranță severă, menționează-o în observații și vorbește cu personalul
          la ridicare. Nu putem garanta un mediu 100% fără alergeni.
        </p>
        <p>
          Valorile calorice, acolo unde sunt afișate, sunt orientative. Gramajele sunt aproximative.
        </p>
      </section>

      <section>
        <h2>9. Băuturi alcoolice</h2>
        <p>
          Băuturile alcoolice se vând doar persoanelor care au împlinit <strong>18 ani</strong>. La
          ridicare putem solicita un act de identitate. Refuzăm predarea alcoolului minorilor, cu
          rambursarea valorii acelor produse.
        </p>
      </section>

      <section>
        <h2>10. Neconformități și reclamații</h2>
        <p>
          Dacă produsul nu corespunde comenzii sau prezintă defecte, anunță-ne imediat, de preferință
          la ridicare. Remediem prin înlocuire sau rambursare, după caz, conform Legii nr. 449/2003
          și OUG nr. 140/2021, în măsura aplicabilă produselor alimentare.
        </p>
        <p>
          Reclamații: {LEGAL.email} sau telefoanele locațiilor. Poți sesiza și Autoritatea Națională
          pentru Protecția Consumatorilor —{" "}
          <a href={ANPC.home} target="_blank" rel="noreferrer">
            anpc.ro
          </a>
          , SAL{" "}
          <a href={ANPC.sal} target="_blank" rel="noreferrer">
            anpc.ro/ce-este-sal
          </a>
          , sau{" "}
          <a href={ANPC.complaints} target="_blank" rel="noreferrer">
            reclamatii.anpc.ro
          </a>
          .
        </p>
      </section>

      <section>
        <h2>11. Răspundere</h2>
        <p>
          Pregătim produsele cu grijă, după rețetele noastre. Nu răspundem pentru: (a) întârzieri
          cauzate de forță majoră sau aglomerație rezonabilă; (b) gusturi subiective; (c) reacții
          alergice dacă alergenii au fost declarați și ți-au fost puse la dispoziție informațiile;
          (d) utilizarea abuzivă a site-ului; (e) indisponibilitatea temporară a site-ului.
        </p>
        <p>
          Mențiunile de marketing („probabil cea mai bună pastramă”, notele de pe platformele de
          livrare) sunt opinii și aprecieri, nu garanții contractuale.
        </p>
      </section>

      <section>
        <h2>12. Proprietate intelectuală</h2>
        <p>
          Conținutul site-ului (texte, fotografii, logo, rețete prezentate ca marcă) aparține{" "}
          {LEGAL.companyName} sau partenerilor și nu poate fi copiat fără acord scris, cu excepția
          uzului personal, necomercial.
        </p>
      </section>

      <section>
        <h2>13. Date personale</h2>
        <p>
          Prelucrarea datelor (nume, telefon, comandă, observații) este descrisă în{" "}
          <Link to={LEGAL_PATHS.privacy}>Politica de confidențialitate</Link>. Stocarea tehnică
          esențială este descrisă în <Link to={LEGAL_PATHS.cookies}>Politica de cookies</Link>.
        </p>
      </section>

      <section>
        <h2>14. Lege aplicabilă</h2>
        <p>
          Contractul este guvernat de legea română. Litigiile se soluționează amiabil, apoi de
          instanțele competente din România, fără a aduce atingere dreptului tău de a apela la ANPC
          sau la o entitate SAL.
        </p>
      </section>
    </LegalLayout>
  );
}
