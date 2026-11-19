import type { Metadata } from "next";
import {
  ArrowLeft,
  Building2,
  CalendarCheck,
  FileText,
  HeartHandshake,
  Lock,
  Mail,
  Scale,
  Server,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { localizedAlternates } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Legal.privacy");
  return {
    title: t("title"),
    description: t("description"),
    alternates: localizedAlternates(locale, "/datenschutz"),
  };
}

export default async function DatenschutzPage() {
  const locale = await getLocale();
  const isGerman = locale === "de";

  return (
    <section aria-labelledby="privacy-title" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Back button */}
      <Button asChild variant="outline" size="sm" className="mb-8">
        <Link href="/">
          <ArrowLeft aria-hidden className="mr-1.5 size-4" />
          {isGerman ? "Zurück zur Startseite" : "Back to homepage"}
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-3">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-accent-green/15 px-3 py-1 text-xs font-semibold tracking-wider text-accent-green-strong uppercase">
          <ShieldCheck aria-hidden className="size-3.5" />
          {isGerman ? "Datenschutz & DSGVO" : "Privacy & GDPR"}
        </p>
        <h1 id="privacy-title" className="text-3xl font-bold tracking-tight text-heading sm:text-4xl lg:text-5xl">
          {isGerman ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          {isGerman
            ? "Informationen über die Verarbeitung Ihrer personenbezogenen Daten gemäß Art. 12, 13 und 14 DSGVO"
            : "Information regarding the processing of personal data in accordance with Articles 12, 13 and 14 GDPR"}
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {/* 1. Controller */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <Building2 aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman ? "1. Verantwortliche Stelle" : "1. Data Controller"}
          </h2>
          <div className="mt-4 space-y-2 text-base text-foreground sm:text-lg">
            <p className="font-semibold text-heading">{siteConfig.legalName}</p>
            <p>
              <span className="text-muted-foreground">{isGerman ? "Inhaber:" : "Owner:"}</span>{" "}
              <strong className="font-medium text-heading">{siteConfig.owner}</strong>
            </p>
            <p className="text-muted-foreground">
              {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}, Deutschland
            </p>
            <p>
              <span className="text-muted-foreground">{isGerman ? "Telefon:" : "Phone:"}</span>{" "}
              <a
                href={`tel:${siteConfig.phone}`}
                className="font-medium text-heading underline decoration-accent-green underline-offset-4 hover:decoration-2"
              >
                {siteConfig.phoneFormatted}
              </a>
            </p>
            <p>
              <span className="text-muted-foreground">E-Mail:</span>{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-heading underline decoration-accent-green underline-offset-4 hover:decoration-2"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        {/* 2. General principles & legal basis */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <Scale aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman ? "2. Allgemeine Hinweise & Rechtsgrundlagen" : "2. General Information & Legal Bases"}
          </h2>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              {isGerman
                ? "Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften (insbesondere der EU-Datenschutz-Grundverordnung DSGVO und dem Bundesdatenschutzgesetz BDSG) sowie dieser Datenschutzerklärung."
                : "We treat your personal data confidentially and in accordance with statutory data protection regulations (specifically the EU General Data Protection Regulation GDPR and the Federal Data Protection Act BDSG) as well as this Privacy Policy."}
            </p>
            <p>
              {isGerman
                ? "Die Verarbeitung Ihrer Daten erfolgt auf Basis der folgenden Rechtsgrundlagen:"
                : "Your data is processed on the basis of the following legal grounds:"}
            </p>
            <ul className="list-disc space-y-1.5 pl-6">
              <li>
                <strong className="text-heading">Art. 6 Abs. 1 lit. a DSGVO:</strong>{" "}
                {isGerman
                  ? "Ihre Einwilligung (z. B. bei freiwilligen Angaben oder optionalen Cookies/Tags)."
                  : "Your consent (e.g., for voluntary information or optional cookies/tags)."}
              </li>
              <li>
                <strong className="text-heading">Art. 6 Abs. 1 lit. b DSGVO:</strong>{" "}
                {isGerman
                  ? "Erfüllung eines Vertrages oder Durchführung vorvertraglicher Maßnahmen (z. B. Beratungsgespräche, Terminvereinbarungen, Erbringung von Alltagshilfe und Betreuungsleistungen)."
                  : "Performance of a contract or implementation of pre-contractual steps (e.g., consultations, appointment bookings, provision of everyday assistance)."}
              </li>
              <li>
                <strong className="text-heading">Art. 6 Abs. 1 lit. c DSGVO:</strong>{" "}
                {isGerman
                  ? "Erfüllung einer rechtlichen Verpflichtung (z. B. steuerliche und sozialrechtliche Aufbewahrungspflichten)."
                  : "Compliance with a legal obligation (e.g., statutory tax and social security retention periods)."}
              </li>
              <li>
                <strong className="text-heading">Art. 6 Abs. 1 lit. f DSGVO:</strong>{" "}
                {isGerman
                  ? "Wahrung unserer berechtigten Interessen (z. B. an der sicheren und fehlerfreien Bereitstellung unserer Website)."
                  : "Legitimate interests pursued by us (e.g., safe and reliable website delivery)."}
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Care & Assistance special health data */}
        <div className="rounded-2xl border border-accent-green/40 bg-accent-green/5 p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <HeartHandshake aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman
              ? "3. Besonderer Schutz von Gesundheitsdaten bei Pflege & Betreuung (§ 45a SGB XI)"
              : "3. Special Protection of Health Data in Care & Assistance (Section 45a SGB XI)"}
          </h2>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-foreground leading-relaxed">
            <p>
              {isGerman
                ? "Im Rahmen unserer Alltagshilfe und Betreuung (anerkanntes Angebot nach § 45a SGB XI) können Sie uns Angaben zu Ihrem Unterstützungsbedarf, Mobilitätseinschränkungen oder einem Pflegegrad anvertrauen. Hierbei handelt es sich um besondere Kategorien personenbezogener Daten (Gesundheitsdaten im Sinne von Art. 9 Abs. 1 DSGVO)."
                : "In the course of our everyday assistance and care services (recognised under Section 45a SGB XI), you may provide us with information regarding care requirements, mobility limitations, or a care degree (Pflegegrad). These constitute special categories of personal data (health data under Art. 9 (1) GDPR)."}
            </p>
            <p>
              {isGerman
                ? "Diese Daten verarbeiten wir ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung (Art. 9 Abs. 2 lit. a DSGVO) sowie zur Durchführung der vertraglichen Betreuungsleistungen und der Abrechnung mit den Pflegekassen (Art. 9 Abs. 2 lit. h DSGVO i. V. m. § 22 Abs. 1 Nr. 1 lit. b BDSG und dem SGB XI). Ihre Angaben werden streng vertraulich behandelt und niemals zu Werbezwecken weitergegeben."
                : "We process this data solely on the basis of your explicit consent (Art. 9 (2) lit. a GDPR) and to deliver contractual care assistance and direct billing with long-term care insurance funds (Art. 9 (2) lit. h GDPR in conjunction with Section 22 (1) No. 1 lit. b BDSG and SGB XI). Your data is treated with the highest degree of confidentiality and never shared for promotional purposes."}
            </p>
          </div>
        </div>

        {/* 4. Website Data Collection */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <Server aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman ? "4. Datenerfassung auf dieser Website" : "4. Data Collection on This Website"}
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold text-heading text-lg">
                {isGerman ? "Hosting (Netlify)" : "Hosting (Netlify)"}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isGerman
                  ? "Diese Website wird bei Netlify (Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA) gehostet. Wenn Sie unsere Website besuchen, erfasst Netlify Server-Logfiles (z. B. IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp, aufgerufene Seite). Dies erfolgt zur Sicherstellung der Stabilität und Sicherheit der Systeme auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO). Die Datenübertragung in die USA stützt sich auf die EU-Standardvertragsklauseln (SCC)."
                  : "This website is hosted by Netlify (Netlify, Inc., 512 2nd Street, Suite 200, San Francisco, CA 94107, USA). When visiting our website, Netlify collects server log files (e.g. IP address, timestamp, browser type, pages requested). This is done to ensure the stability and security of the system on the basis of our legitimate interest (Art. 6 (1) lit. f GDPR). Transfers to the USA are safeguarded by EU Standard Contractual Clauses (SCC)."}
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="flex items-center gap-2 font-semibold text-heading text-lg">
                <Lock aria-hidden className="size-4 text-accent-green-strong" />
                {isGerman ? "SSL- bzw. TLS-Verschlüsselung" : "SSL/TLS Encryption"}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isGerman
                  ? "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile."
                  : "For security reasons and to protect the transmission of confidential content, this site uses SSL/TLS encryption. You can recognise an encrypted connection by the address line switching from 'http://' to 'https://' and by the lock symbol in your browser bar."}
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="flex items-center gap-2 font-semibold text-heading text-lg">
                <Mail aria-hidden className="size-4 text-accent-green-strong" />
                {isGerman ? "Kontaktaufnahme per E-Mail oder Telefon" : "Contact via Email or Phone"}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isGerman
                  ? "Wenn Sie uns per E-Mail oder telefonisch kontaktieren, werden Ihre übermittelten Angaben (Name, E-Mail-Adresse, Telefonnummer, Inhalt der Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten verarbeiten wir zur Durchführung vorvertraglicher Maßnahmen oder zur Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO)."
                  : "If you contact us via email or phone, your transmitted details (name, email address, phone number, enquiry message) are stored to process your request and handle any follow-up questions. We process this data for pre-contractual measures or to fulfill a contract (Art. 6 (1) lit. b GDPR)."}
              </p>
            </div>
          </div>
        </div>

        {/* 5. External Services */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <CalendarCheck aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman ? "5. Eingebundene Dienste & Drittanbieter" : "5. Integrated Services & Third Parties"}
          </h2>

          <div className="mt-6 space-y-6">
            {/* Cal.com */}
            <div>
              <h3 className="font-semibold text-heading text-lg">
                {isGerman ? "Online-Terminbuchung (Cal.com)" : "Online Appointment Booking (Cal.com)"}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isGerman
                  ? "Für die bequeme Online-Vereinbarung von Erstgesprächen zum Kennenlernen nutzen wir Cal.com (Cal.com, Inc., 2261 Market Street #4088, San Francisco, CA 94114, USA). Der Buchungskalender ist auf unserer Seite „Termin vereinbaren“ eingebettet und wird beim Aufruf dieser Seite von Cal.com geladen; dabei wird Ihre IP-Adresse an Cal.com übermittelt. Wenn Sie einen Termin buchen, werden die von Ihnen eingegebenen Daten (Name, E-Mail-Adresse, gewünschter Termin, optionale Anmerkungen) an Cal.com übertragen, um den Termin zu koordinieren und Bestätigungs-E-Mails zu versenden. Haben Sie der Kategorie „Marketing“ zugestimmt, übergeben wir Cal.com zusätzlich die Meta-Kennungen Ihres Browsers (siehe „Meta-Pixel“). Rechtsgrundlage ist die Anbahnung und Durchführung unseres Betreuungsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO)."
                  : "For online appointment scheduling of initial consultations, we use Cal.com (Cal.com, Inc., 2261 Market Street #4088, San Francisco, CA 94114, USA). The booking calendar is embedded on our “Book an appointment” page and is loaded from Cal.com when you open that page, which transmits your IP address to Cal.com. When you book, the information you enter (name, email address, chosen slot, optional notes) is transmitted to Cal.com to schedule the meeting and issue confirmation emails. If you consented to the “Marketing” category, we also pass your browser’s Meta identifiers to Cal.com (see “Meta Pixel”). Legal basis is the initiation and performance of services (Art. 6 (1) lit. b GDPR)."}
              </p>
            </div>

            {/* Google Tag Manager */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-heading text-lg">
                {isGerman ? "Google Tag Manager / Webanalyse" : "Google Tag Manager / Analytics"}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isGerman
                  ? "Diese Website setzt den Google Tag Manager ein (Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Der Tag Manager dient der Einbindung und Verwaltung von Mess- und Analysecodes (z. B. Google Analytics). Er wird erst geladen, nachdem Sie in den Datenschutz-Einstellungen der Kategorie „Statistik“ zugestimmt haben. Dabei können Ihre IP-Adresse und Nutzungsdaten an Google übermittelt werden, auch in die USA (Google ist unter dem EU-US Data Privacy Framework zertifiziert). Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG), die Sie jederzeit widerrufen können."
                  : "This website uses Google Tag Manager (Provider: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland) to deploy and manage measurement and analytics tags (e.g., Google Analytics). It only loads after you consent to the “Statistics” category in the privacy settings. Your IP address and usage data may be transferred to Google, including to the USA (Google is certified under the EU-US Data Privacy Framework). Legal basis is your consent (Art. 6 (1) lit. a GDPR, Section 25 (1) TDDDG), which you can withdraw at any time."}
              </p>
            </div>

            {/* Meta Pixel & Conversions API */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-heading text-lg">
                {isGerman ? "Meta-Pixel und Meta Conversions API" : "Meta Pixel and Meta Conversions API"}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isGerman
                  ? "Nur wenn Sie der Kategorie „Marketing“ zustimmen, nutzen wir das Meta-Pixel und die Meta Conversions API (Anbieter: Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland). Damit messen wir, ob Besucherinnen und Besucher, die über unsere Anzeigen auf Facebook oder Instagram kommen, die Website aufrufen, uns kontaktieren oder einen Termin buchen, und können unsere Anzeigen entsprechend aussteuern. Das Pixel setzt dazu Cookies (_fbp, _fbc) in Ihrem Browser. Bei einer Terminbuchung übermitteln wir zusätzlich serverseitig die Buchungs-ID sowie Ihre E-Mail-Adresse, Telefonnummer und Ihren Namen in gehashter (verschlüsselter, nicht lesbarer) Form an Meta, damit Meta die Buchung einer Anzeige zuordnen kann. Angaben zu Ihrer Pflege- oder Gesundheitssituation übermitteln wir nie. Eine Übermittlung in die USA ist möglich; Meta ist unter dem EU-US Data Privacy Framework zertifiziert. Für die Erhebung und Übermittlung sind wir mit Meta gemeinsam verantwortlich (Art. 26 DSGVO); die Vereinbarung finden Sie unter facebook.com/legal/controller_addendum. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie können sie jederzeit über „Cookie-Einstellungen“ im Seitenfuß widerrufen."
                  : "Only if you consent to the “Marketing” category do we use the Meta Pixel and the Meta Conversions API (Provider: Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Ireland). This lets us measure whether visitors arriving from our Facebook or Instagram ads view the website, contact us or book an appointment, and optimise our ads accordingly. The pixel sets cookies (_fbp, _fbc) in your browser. When you book an appointment, we additionally send the booking ID and your email address, phone number and name to Meta server-side in hashed (encrypted, unreadable) form so Meta can attribute the booking to an ad. We never send information about your care or health situation. Data may be transferred to the USA; Meta is certified under the EU-US Data Privacy Framework. We are jointly responsible with Meta for the collection and transfer (Art. 26 GDPR); see facebook.com/legal/controller_addendum. Legal basis is your consent (Art. 6 (1) lit. a GDPR, Section 25 (1) TDDDG). You can withdraw it at any time via “Cookie settings” in the footer."}
              </p>
            </div>

            {/* Consent management */}
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-heading text-lg">
                {isGerman ? "Einwilligungsverwaltung (Datenschutz-Einstellungen)" : "Consent Management (Privacy Settings)"}
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {isGerman
                  ? "Ihre Auswahl im Banner „Datenschutz-Einstellungen“ speichern wir im lokalen Speicher Ihres Browsers (Schlüssel „tunes-consent“), damit wir Sie nicht bei jedem Besuch erneut fragen müssen. Diese Speicherung ist technisch erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG; Art. 6 Abs. 1 lit. c DSGVO). Es werden dabei keine Daten an uns oder Dritte übermittelt."
                  : "We store your choice from the “Privacy settings” banner in your browser’s local storage (key “tunes-consent”) so we do not have to ask again on every visit. This storage is technically necessary (Section 25 (2) no. 2 TDDDG; Art. 6 (1) lit. c GDPR). No data is sent to us or third parties in the process."}
              </p>
            </div>
          </div>
        </div>

        {/* 6. Your Rights */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <UserCheck aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman ? "6. Ihre Rechte als betroffene Person" : "6. Your Rights as a Data Subject"}
          </h2>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              {isGerman
                ? "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:"
                : "Under applicable data protection law, you have the right at any time to:"}
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-heading">{isGerman ? "Auskunft (Art. 15 DSGVO):" : "Access (Art. 15 GDPR):"}</strong>{" "}
                {isGerman
                  ? "Unentgeltliche Auskunft über Ihre von uns gespeicherten personenbezogenen Daten, deren Herkunft, Empfänger und Zweck der Verarbeitung."
                  : "Information about your personal data stored by us, its origin, recipients, and the purpose of processing."}
              </li>
              <li>
                <strong className="text-heading">{isGerman ? "Berichtigung (Art. 16 DSGVO):" : "Rectification (Art. 16 GDPR):"}</strong>{" "}
                {isGerman
                  ? "Korrektur unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten Daten."
                  : "Correction of incorrect data or completion of incomplete data."}
              </li>
              <li>
                <strong className="text-heading">{isGerman ? "Löschung (Art. 17 DSGVO):" : "Erasure (Art. 17 GDPR):"}</strong>{" "}
                {isGerman
                  ? "Löschung Ihrer personenbezogenen Daten („Recht auf Vergessenwerden“), sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen."
                  : "Erasure of your personal data ('Right to be forgotten'), provided no statutory retention duties apply."}
              </li>
              <li>
                <strong className="text-heading">{isGerman ? "Einschränkung der Verarbeitung (Art. 18 DSGVO):" : "Restriction (Art. 18 GDPR):"}</strong>{" "}
                {isGerman
                  ? "Einschränkung der Datenverarbeitung unter den gesetzlichen Voraussetzungen."
                  : "Restriction of data processing under statutory conditions."}
              </li>
              <li>
                <strong className="text-heading">{isGerman ? "Datenübertragbarkeit (Art. 20 DSGVO):" : "Data Portability (Art. 20 GDPR):"}</strong>{" "}
                {isGerman
                  ? "Erhalt Ihrer Daten in einem strukturierten, gängigen und maschinenlesbaren Format."
                  : "Receiving your data in a structured, commonly used and machine-readable format."}
              </li>
              <li>
                <strong className="text-heading">{isGerman ? "Widerspruch (Art. 21 DSGVO):" : "Right to Object (Art. 21 GDPR):"}</strong>{" "}
                {isGerman
                  ? "Jederzeitiger Widerspruch gegen die Verarbeitung, sofern diese auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO erfolgt."
                  : "Objecting at any time to data processing based on legitimate interests (Art. 6 (1) lit. f GDPR)."}
              </li>
              <li>
                <strong className="text-heading">{isGerman ? "Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO):" : "Withdrawal of Consent (Art. 7 (3) GDPR):"}</strong>{" "}
                {isGerman
                  ? "Bereits erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft formlos per E-Mail widerrufen."
                  : "You can revoke previously given consent at any time with effect for the future by informal email notification."}
              </li>
            </ul>
          </div>
        </div>

        {/* 7. Supervisory Authority */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-xl font-bold text-heading">
            <FileText aria-hidden className="size-5 text-accent-green-strong" />
            {isGerman
              ? "7. Beschwerderecht bei der zuständigen Aufsichtsbehörde"
              : "7. Right to Lodge a Complaint with a Supervisory Authority"}
          </h2>
          <div className="mt-4 space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              {isGerman
                ? "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Die für uns in Nordrhein-Westfalen zuständige Datenschutzbehörde ist:"
                : "In the event of GDPR breaches, data subjects have the right to lodge a complaint with a supervisory authority. The competent data protection authority for North Rhine-Westphalia is:"}
            </p>
            <div className="rounded-xl bg-background/60 p-4 border border-border/60 text-foreground">
              <p className="font-semibold text-heading">
                Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)
              </p>
              <p className="text-muted-foreground mt-1">Kavalleriestraße 2–4, 40213 Düsseldorf</p>
              <p className="text-muted-foreground">Telefon: +49 (0)211 38424-0</p>
              <p className="mt-2">
                <a
                  href="https://www.ldi.nrw.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-heading underline decoration-accent-green underline-offset-4 hover:decoration-2"
                >
                  www.ldi.nrw.de
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* 8. Status */}
        <div className="text-sm text-muted-foreground text-center">
          <p>
            {isGerman
              ? "Stand dieser Datenschutzerklärung: November 2026 · TUNES Alltagshilfe und Betreuung"
              : "Status of this Privacy Policy: November 2026 · TUNES Alltagshilfe und Betreuung"}
          </p>
        </div>
      </div>
    </section>
  );
}
