import type { Metadata } from "next";
import { getRequestTenant } from "@/lib/tenants/server";
import {
  LegalPage,
  LegalSection,
  MissingLegalNotice,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 DSGVO: Hosting, Konto, Prüfungsverlauf und KI-Erklärungen.",
  alternates: { canonical: "/rechtliches/datenschutz" },
};

const UPDATED = "Juli 2026";

export default async function DatenschutzPage() {
  const tenant = await getRequestTenant();
  const legal = tenant.legal;
  const link =
    "text-brand-600 hover:underline dark:text-brand-400 break-words";

  return (
    <LegalPage title="Datenschutzerklärung" updated={UPDATED}>
      <LegalSection title="1. Datenschutz auf einen Blick">
        <p>
          Diese Website ist ein kostenloses Lernwerkzeug für
          Microsoft-Zertifizierungsprüfungen. Sie können alle Test-Examen{" "}
          <strong>ohne Registrierung und ohne Angabe personenbezogener Daten</strong>{" "}
          nutzen. Ein Konto benötigen Sie nur, wenn Sie Ihren Prüfungsverlauf
          speichern oder die KI-Erklärungen mit einem eigenen API-Schlüssel
          nutzen möchten.
        </p>
        <p>
          Wir setzen keine Tracking- oder Werbe-Cookies ein. Zur Reichweiten&shy;messung
          nutzen wir ein cookiefreies Verfahren, das keine Profile über einzelne
          Personen bildet (siehe Abschnitt 7).
        </p>
      </LegalSection>

      <LegalSection title="2. Verantwortliche Stelle">
        {legal ? (
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
            <br />
            E-Mail:{" "}
            <a href={`mailto:${legal.email}`} className={link}>
              {legal.email}
            </a>
          </p>
        ) : (
          <MissingLegalNotice tenantName={tenant.name} />
        )}
        <p>
          Verantwortliche Stelle ist die natürliche oder juristische Person, die
          allein oder gemeinsam mit anderen über die Zwecke und Mittel der
          Verarbeitung von personenbezogenen Daten entscheidet.
        </p>
      </LegalSection>

      <LegalSection title="3. Hosting (Vercel)">
        <p>
          Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut,
          CA 91789, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel
          technisch notwendige Verbindungsdaten (Server-Logfiles), insbesondere
          IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite,
          Referrer-URL sowie Browser- und Betriebssystemangaben.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an einer sicheren und stabilen Bereitstellung des Angebots). Mit Vercel
          besteht ein Auftragsverarbeitungsvertrag; die Übermittlung in die USA
          erfolgt auf Grundlage der EU-Standardvertragsklauseln bzw. des
          EU-US Data Privacy Framework.
        </p>
      </LegalSection>

      <LegalSection title="4. Datenbank und Authentifizierung (Supabase)">
        <p>
          Für die Speicherung der Prüfungsinhalte sowie – bei registrierten
          Nutzerinnen und Nutzern – der Kontodaten setzen wir Supabase ein
          (Supabase, Inc., 970 Toa Payoh North, Singapur). Supabase stellt die
          Datenbank (PostgreSQL) und den Authentifizierungsdienst bereit und
          verarbeitet die Daten ausschließlich in unserem Auftrag.
        </p>
        <p>Dabei werden folgende Daten gespeichert:</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            <strong>Kontodaten:</strong> E-Mail-Adresse, ein kryptografischer
            Hash Ihres Passworts (das Passwort selbst wird nicht gespeichert),
            Zeitpunkt der Registrierung und Bestätigung sowie eine Rolle zur
            Rechtevergabe.
          </li>
          <li>
            <strong>Prüfungsverlauf:</strong> abgeschlossene Test-Examen mit
            erreichter Punktzahl, Bestanden-Status und Ergebnis je Skill-Bereich.
          </li>
          <li>
            <strong>Laufende Prüfungen:</strong> die gezogenen Fragen, Ihre
            bisherigen Antworten und die aktuelle Position, damit Sie eine
            unterbrochene Prüfung fortsetzen können.
          </li>
          <li>
            <strong>KI-Einstellungen:</strong> gewählter Anbieter, gewähltes
            Modell und Ihr API-Schlüssel in verschlüsselter Form (siehe Abschnitt
            6).
          </li>
        </ul>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des
          Nutzungsverhältnisses) bzw. Art. 6 Abs. 1 lit. f DSGVO. Mit Supabase
          besteht ein Auftragsverarbeitungsvertrag. Für Datenübermittlungen in
          Drittländer gelten die EU-Standardvertragsklauseln.
        </p>
      </LegalSection>

      <LegalSection title="5. Registrierung, Anmeldung und Cookies">
        <p>
          Bei der Registrierung erheben wir Ihre E-Mail-Adresse und ein von Ihnen
          gewähltes Passwort. Zur Bestätigung Ihrer E-Mail-Adresse und zum
          Zurücksetzen des Passworts versendet Supabase in unserem Auftrag
          transaktionale E-Mails an die von Ihnen angegebene Adresse.
        </p>
        <p>
          Nach der Anmeldung setzen wir <strong>technisch notwendige Cookies</strong>{" "}
          (Session- und Refresh-Token), die Ihre Anmeldung aufrechterhalten. Diese
          Cookies sind für den Betrieb des Anmeldebereichs erforderlich und
          bedürfen keiner Einwilligung (§ 25 Abs. 2 Nr. 2 TDDDG). Ohne Anmeldung
          werden keine Cookies gesetzt.
        </p>
        <p>
          Ihre Auswahl zwischen hellem und dunklem Design speichern wir im
          lokalen Speicher Ihres Browsers (localStorage). Diese Information
          verlässt Ihr Gerät nicht und wird nicht an uns übertragen.
        </p>
      </LegalSection>

      <LegalSection title="6. KI-Erklärungen mit eigenem API-Schlüssel">
        <p>
          Angemeldete Nutzerinnen und Nutzer können sich Antworten durch einen
          KI-Dienst erklären lassen. Dieses Angebot funktioniert ausschließlich
          mit einem <strong>eigenen API-Schlüssel</strong>, den Sie in den
          KI-Einstellungen hinterlegen und dessen Anbieter (z. B. OpenAI,
          Anthropic oder Mistral) und Modell Sie selbst wählen.
        </p>
        <p>
          Ihr API-Schlüssel wird vor der Speicherung mit AES-256-GCM
          verschlüsselt. Er wird ausschließlich serverseitig entschlüsselt, um
          Ihre Anfrage an den von Ihnen gewählten Anbieter zu senden, und
          niemals im Klartext an den Browser zurückgegeben oder an Dritte
          weitergegeben.
        </p>
        <p>
          Wenn Sie eine Erklärung anfordern, werden die betreffende Prüfungsfrage,
          Ihre Antwort sowie passende Auszüge aus den Lerninhalten an den von
          Ihnen gewählten KI-Anbieter übermittelt. Für diese Verarbeitung gelten
          zusätzlich die Datenschutzbestimmungen des jeweiligen Anbieters, mit dem
          Sie in einem eigenen Vertragsverhältnis stehen. Personenbezogene Daten
          über Ihre Person hinaus (etwa Ihre E-Mail-Adresse) werden dabei nicht
          übertragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO; die Nutzung
          ist freiwillig.
        </p>
      </LegalSection>

      <LegalSection title="7. Reichweitenmessung (Vercel Web Analytics)">
        <p>
          Zur Auswertung der Nutzung unseres Angebots setzen wir Vercel Web
          Analytics ein, einen Dienst der Vercel Inc., 340 S Lemon Ave #4133,
          Walnut, CA 91789, USA. Erfasst werden aggregierte Kennzahlen wie
          aufgerufene Seiten, Referrer, ungefähre geografische Herkunft auf
          Länderebene sowie Angaben zu Gerätetyp, Betriebssystem und Browser.
        </p>
        <p>
          Vercel Web Analytics arbeitet <strong>ohne Cookies</strong> und ohne
          dauerhafte Kennung im Browser. Zur Unterscheidung von Besuchen wird ein
          nicht umkehrbarer Hash-Wert gebildet, der unter anderem aus der
          IP-Adresse abgeleitet und täglich verworfen wird. Die IP-Adresse selbst
          wird nicht gespeichert, es werden keine geräteübergreifenden Profile
          gebildet und die Daten werden nicht zu Werbezwecken genutzt.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an einer bedarfsgerechten Gestaltung und Verbesserung unseres
          Angebots). Da keine Informationen auf Ihrem Endgerät gespeichert oder
          ausgelesen werden, ist keine Einwilligung nach § 25 TDDDG erforderlich.
          Mit Vercel besteht ein Auftragsverarbeitungsvertrag; für die
          Übermittlung in die USA gelten die EU-Standardvertragsklauseln bzw. das
          EU-US Data Privacy Framework.
        </p>
      </LegalSection>

      <LegalSection title="8. Speicherdauer und Löschung">
        <p>
          Server-Logfiles werden vom Hosting-Anbieter nach kurzer Zeit
          automatisch gelöscht. Kontodaten, Prüfungsverlauf und KI-Einstellungen
          speichern wir, solange Ihr Konto besteht. Ihre KI-Einstellungen
          einschließlich des hinterlegten Schlüssels können Sie jederzeit selbst
          in den Einstellungen löschen.
        </p>
        <p>
          Auf Wunsch löschen wir Ihr Konto vollständig; damit werden auch der
          gespeicherte Prüfungsverlauf und die KI-Einstellungen entfernt. Eine
          formlose E-Mail an uns genügt.
        </p>
      </LegalSection>

      <LegalSection title="9. Ihre Rechte">
        <p>Sie haben jederzeit das Recht auf</p>
        <ul className="ml-5 list-disc space-y-1">
          <li>
            unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
            Daten, deren Herkunft und Empfänger sowie den Zweck der Verarbeitung
            (Art. 15 DSGVO),
          </li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO),</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
          <li>
            Widerspruch gegen Verarbeitungen, die auf einem berechtigten
            Interesse beruhen (Art. 21 DSGVO), sowie
          </li>
          <li>
            Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft.
          </li>
        </ul>
        <p>
          Wenden Sie sich dafür an die im Abschnitt „Verantwortliche Stelle“
          genannte Adresse. Unabhängig davon steht Ihnen ein Beschwerderecht bei
          einer Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat
          Ihres Aufenthaltsorts oder des Orts des mutmaßlichen Verstoßes.
        </p>
      </LegalSection>

      <LegalSection title="10. SSL- bzw. TLS-Verschlüsselung">
        <p>
          Diese Website nutzt aus Sicherheitsgründen und zum Schutz der
          Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.
          Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
          des Browsers von „http://“ auf „https://“ wechselt.
        </p>
      </LegalSection>

      <LegalSection title="11. Änderungen dieser Datenschutzerklärung">
        <p>
          Wir passen diese Datenschutzerklärung an, sobald Änderungen an unserem
          Angebot oder an der Rechtslage dies erforderlich machen. Es gilt jeweils
          die hier veröffentlichte Fassung.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
