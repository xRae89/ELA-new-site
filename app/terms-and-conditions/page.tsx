import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      updated="October 2026"
      sections={[
        {
          heading: "Attorney advertising",
          body: [
            `This website is attorney advertising by ${site.legalName}. It provides general information about California employment law. It is not legal advice about your situation, and prior results do not guarantee a similar outcome.`,
          ],
        },
        {
          heading: "No attorney-client relationship",
          body: [
            "Reading this site, submitting a form, emailing us, or using the chat assistant does not create an attorney-client relationship. That relationship begins only when you and the firm sign a written agreement.",
            "Until then, please don't send confidential information you aren't comfortable sharing.",
          ],
        },
        {
          heading: "AI chat assistant",
          body: [
            "The chat assistant is an automated tool that answers general questions. It can make mistakes, it is not a lawyer, and its answers are not legal advice. Always confirm important information with an attorney.",
          ],
        },
        {
          heading: "Use of this site",
          body: [
            "You agree not to misuse this website, interfere with its operation, or use automated tools to overload it, including the chat assistant.",
            "Content on this site belongs to the firm and may not be republished without permission.",
          ],
        },
        {
          heading: "Contact",
          body: [`${site.legalName}, ${site.address.oneLine}. ${site.phone.display}. ${site.email}.`],
        },
      ]}
    />
  );
}
