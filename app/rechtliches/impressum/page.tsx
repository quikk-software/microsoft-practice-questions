import type { Metadata } from "next";
import { getRequestTenant } from "@/lib/tenants/server";
import {
  LegalPage,
  LegalSection,
  MissingLegalNotice,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung nach § 5 DDG und § 18 MStV.",
  alternates: { canonical: "/rechtliches/impressum" },
};

export default async function ImpressumPage() {
  const tenant = await getRequestTenant();
  const legal = tenant.legal;

  return (
    <LegalPage title="Impressum">
      {!legal ? (
        <MissingLegalNotice tenantName={tenant.name} />
      ) : (
        <>
          <LegalSection title="Angaben gemäß § 5 DDG">
            <p>
              {legal.company}
              <br />
              {legal.street}
              <br />
              {legal.zip} {legal.city}
              {legal.country ? (
                <>
                  <br />
                  {legal.country}
                </>
              ) : null}
            </p>
          </LegalSection>

          <LegalSection title="Vertreten durch">
            <p>{legal.representedBy}</p>
          </LegalSection>

          <LegalSection title="Kontakt">
            <p>
              E-Mail:{" "}
              <a
                href={`mailto:${legal.email}`}
                className="text-brand-600 hover:underline dark:text-brand-400"
              >
                {legal.email}
              </a>
              {legal.phone ? (
                <>
                  <br />
                  Telefon: {legal.phone}
                </>
              ) : null}
            </p>
          </LegalSection>

          {legal.register && (
            <LegalSection title="Registereintrag">
              <p>
                Registergericht: {legal.register.court}
                <br />
                Registernummer: {legal.register.number}
              </p>
            </LegalSection>
          )}

          {legal.vatId && (
            <LegalSection title="Umsatzsteuer-Identifikationsnummer">
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz: {legal.vatId}
              </p>
            </LegalSection>
          )}

          <LegalSection title="Verantwortlich nach § 18 Abs. 2 MStV">
            <p>
              {legal.contentResponsible ?? legal.representedBy}
              <br />
              {legal.street}
              <br />
              {legal.zip} {legal.city}
            </p>
          </LegalSection>

          <LegalSection title="EU-Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 hover:underline dark:text-brand-400"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </LegalSection>

          <LegalSection title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungs&shy;verfahren
              vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </LegalSection>

          <LegalSection title="Haftung für Inhalte">
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>
          </LegalSection>

          <LegalSection title="Haftung für Links">
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich. Die verlinkten Seiten wurden zum
              Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft;
              rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
              erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
              Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links
              umgehend entfernen.
            </p>
          </LegalSection>

          <LegalSection title="Urheberrecht">
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
              wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </LegalSection>

          <LegalSection title="Marken und Unabhängigkeit">
            <p>
              Microsoft, Microsoft 365, Microsoft Copilot, Microsoft Purview,
              Microsoft Entra und Microsoft Learn sind Marken der Microsoft
              Corporation. Dieses Angebot ist ein unabhängiges Lernwerkzeug und
              steht in keiner Verbindung zur Microsoft Corporation, wird von
              dieser weder unterstützt noch geprüft.
            </p>
            <p>
              Die auf dieser Website bereitgestellten Übungsfragen sind eigene
              Formulierungen und keine Original-Prüfungsfragen. Verweise auf
              Lerninhalte erfolgen ausschließlich als Verlinkung auf die
              jeweiligen Originalseiten von Microsoft Learn.
            </p>
          </LegalSection>
        </>
      )}
    </LegalPage>
  );
}
