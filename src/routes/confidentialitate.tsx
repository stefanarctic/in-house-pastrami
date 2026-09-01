import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { ANPC, ANSPDCP, LEGAL, LEGAL_PATHS } from "@/data/legal";
import { LOCATIONS } from "@/data/locations";
import { PAGES, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/confidentialitate")({
  head: () =>
    pageHead({
      title: PAGES.privacy.title,
      description: PAGES.privacy.description,
      path: LEGAL_PATHS.privacy,
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalLayout title="Politica de confidențialitate">
      <section>
        <h2>1. Operatorul de date</h2>
        <p>
          Operatorul datelor tale personale este <strong>{LEGAL.companyName}</strong>, CUI{" "}
          {LEGAL.cuiDisplay}, sediu {LEGAL.registeredOffice}, e-mail{" "}
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
          {LOCATIONS.map((loc) => (
            <span key={loc.id}>
              , {loc.shortName} <a href={`tel:${loc.phone}`}>{loc.phoneDisplay}</a>
            </span>
          ))}
          .
        </p>
        <p>
          Această politică respectă Regulamentul (UE) 2016/679 (GDPR) și Legea nr. 190/2018. Nu am
          desemnat un DPO; cererile GDPR se trimit la adresa de e-mail de mai sus.
        </p>
      </section>

      <section>
        <h2>2. Ce date prelucrăm</h2>
        <ul>
          <li>
            <strong>Date de comandă:</strong> nume, număr de telefon, locație de ridicare, interval
            orar, conținutul coșului, observații.
          </li>
          <li>
            <strong>Date de plată:</strong> statusul plății, identificatori Stripe (session / order
            id). Datele cardului sunt prelucrate de Stripe; noi nu le vedem și nu le stocăm.
          </li>
          <li>
            <strong>Date tehnice minime:</strong> coșul salvat local în browser; jurnale de server
            uzuale (IP, dată, pagină) pentru securitate și depanare.
          </li>
          <li>
            <strong>Alergii / preferințe</strong> — doar dacă le scrii tu în observații. Acestea pot
            fi date privind sănătatea (art. 9 GDPR).
          </li>
        </ul>
        <p>Nu creăm conturi de client pe site. Nu colectăm e-mail la checkout.</p>
      </section>

      <section>
        <h2>3. Scopuri și temeiuri legale</h2>
        <ul>
          <li>
            <strong>Executarea contractului</strong> (art. 6 alin. (1) lit. b GDPR): preluarea,
            prepararea, predarea comenzii și contactul telefonic.
          </li>
          <li>
            <strong>Obligație legală</strong> (art. 6 alin. (1) lit. c): evidențe fiscale și
            contabile, inclusiv documente de plată.
          </li>
          <li>
            <strong>Interes legitim</strong> (art. 6 alin. (1) lit. f): prevenirea fraudelor,
            securitatea site-ului, soluționarea reclamațiilor.
          </li>
          <li>
            <strong>Consimțământ</strong> (art. 6 alin. (1) lit. a și, pentru alergii, art. 9 alin.
            (2) lit. a): prelucrarea observațiilor care pot include date de sănătate, ca să putem
            ține cont de ele la preparare. Poți omite aceste informații; fără ele nu putem adapta
            comanda.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Cui transmitem datele</h2>
        <ul>
          <li>
            <strong>Stripe</strong> — procesarea plății cu cardul.{" "}
            <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer">
              Politica Stripe
            </a>
            .
          </li>
          <li>
            <strong>DineHub</strong> — sistemul de comenzi al restaurantului (bucătărie / casă).
          </li>
          <li>
            <strong>Google Firebase</strong> — găzduirea meniului și, pentru administratori,
            autentificare.{" "}
            <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noreferrer">
              Politica Firebase
            </a>
            .
          </li>
          <li>
            Personalul locației alese, strict pentru onorarea comenzii.
          </li>
        </ul>
        <p>
          Stripe și Google pot prelucra date pe servere din afara SEE, pe baza clauzelor
          contractuale standard și a altor garanții GDPR. Nu vindem datele tale.
        </p>
        <p>
          Hărțile din pagina de contact sunt furnizate de Google Maps. Dacă accesezi acea secțiune,
          Google poate prelucra adresa IP conform{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            politicii Google
          </a>
          .
        </p>
      </section>

      <section>
        <h2>5. Durata stocării</h2>
        <ul>
          <li>Coșul din browser: până îl golești sau ștergi datele site-ului.</li>
          <li>Datele comenzii la restaurant: pe durata onorării și a eventualelor reclamații.</li>
          <li>
            Documentele fiscale / de plată: termenul legal de arhivare (de regulă 10 ani, conform
            reglementărilor contabile).
          </li>
          <li>Jurnale tehnice: perioada minimă necesară securității (de obicei până la 90 de zile).</li>
        </ul>
      </section>

      <section>
        <h2>6. Drepturile tale</h2>
        <p>Ai dreptul la acces, rectificare, ștergere, restricționare, opoziție și portabilitate, în condițiile GDPR. Pentru datele bazate pe consimțământ, îl poți retrage oricând, fără a afecta prelucrarea anterioară.</p>
        <p>
          Scrie-ne la <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>. Răspundem în cel mult 30
          de zile. Poți depune plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor
          cu Caracter Personal (ANSPDCP) —{" "}
          <a href={ANSPDCP.home} target="_blank" rel="noreferrer">
            dataprotection.ro
          </a>
          .
        </p>
        <p>
          Pentru protecția consumatorilor:{" "}
          <a href={ANPC.home} target="_blank" rel="noreferrer">
            ANPC
          </a>
          .
        </p>
      </section>

      <section>
        <h2>7. Minori</h2>
        <p>
          Site-ul nu este destinat copiilor sub 16 ani. Băuturile alcoolice sunt rezervate
          persoanelor de 18+. Nu colectăm intenționat date de la minori.
        </p>
      </section>

      <section>
        <h2>8. Decizii automatizate</h2>
        <p>
          Nu luăm decizii bazate exclusiv pe prelucrare automată care să producă efecte juridice
          asupra ta. Nu facem profilare de marketing.
        </p>
      </section>

      <section>
        <h2>9. Cookies și stocare locală</h2>
        <p>
          Detaliile tehnice sunt în <Link to={LEGAL_PATHS.cookies}>Politica de cookies</Link>. Nu
          folosim cookie-uri de publicitate sau analiză.
        </p>
      </section>
    </LegalLayout>
  );
}
