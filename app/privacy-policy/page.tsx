import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="October 2026"
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you submit a case review, we collect your name, email, phone number, and whatever you choose to tell us about your situation. When you use the chat assistant, we process the messages you send so it can respond.",
            "Like most websites, we also receive basic technical information such as your browser type and pages visited.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your information to evaluate your potential claim, contact you about it, and improve this website. We do not sell your personal information.",
            "Chat messages are sent to our AI provider to generate replies and are not used to train its models. Please don't share sensitive details such as Social Security or bank numbers in the chat.",
          ],
        },
        {
          heading: "Calls and text messages",
          body: [
            "If you agree on our forms, we may call or text you about your case, including with automated technology. Message and data rates may apply. Reply STOP to opt out of texts at any time.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "California residents can ask what personal information we hold about them, ask us to correct or delete it, and opt out of any sharing. We won't treat you differently for making a request.",
          ],
        },
        {
          heading: "Contact",
          body: [`Questions about privacy? Email ${site.email} or call ${site.phone.display}.`],
        },
      ]}
    />
  );
}
