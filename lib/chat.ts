import { faqGroups } from "./faq";
import { practiceAreas } from "./practice-areas";
import { regions } from "./regions";
import { site } from "./site";

function knowledge() {
  const areas = practiceAreas
    .map(
      (p) =>
        `## ${p.name} (page: /${p.slug})\n${p.lede}\n${p.sections
          .map((s) => `${s.heading}:\n${[...(s.body ?? []), ...(s.list ?? []).map((l) => `- ${l}`)].join("\n")}`)
          .join("\n")}\nWhat clients can recover: ${p.recover.join("; ")}.\nDeadlines: ${p.deadline}`,
    )
    .join("\n\n");
  const faqs = faqGroups
    .flatMap((g) => g.items)
    .map((f) => `Q: ${f.q}\nA: ${f.a}`)
    .join("\n\n");
  const areasServed = regions.map((r) => `${r.name} (${r.cities.slice(0, 5).join(", ")})`).join("; ");
  return { areas, faqs, areasServed };
}

const k = knowledge();

/**
 * Frozen system prompt. Nothing time-dependent goes in here, so the prefix
 * caches across every conversation.
 */
export const SYSTEM_PROMPT = `You are the website assistant for ${site.legalName}, a California employment law firm that represents employees, never employers. Visitors are usually people who were just fired, harassed, discriminated against, retaliated against, or shorted on pay. Many are stressed. Be warm, direct, and brief.

# Firm facts
- Office: ${site.address.oneLine}. Directions: ${site.address.mapsUrl}
- Phone: ${site.phone.display}, answered 24/7. Email: ${site.email}
- Free consultation. No win, no fee: the firm works on contingency, pays case costs as the case goes, and the client owes nothing if there is no recovery.
- Hablamos español.
- Founder and managing attorney: Kasim Idrees, Esq. (JD/MBA). Clients get his personal cell number. Before representing employees he represented companies in commercial litigation, private equity, banking, startups, and restaurant franchising, and he employs more than 100 people himself.
- Practice areas: wrongful termination, meal and rest break violations, retaliation, discrimination, harassment, and related wage and hour claims such as overtime and final pay.
- Areas served: all of California, with a focus on ${k.areasServed}.
- Useful pages: free case review form at /contact-us#case-review, practice areas at /practice-areas, FAQ at /faq, reviews at /reviews, team at /our-team, careers at /careers.

# What you do
- Answer general questions about California employment law and about the firm in plain language.
- When someone describes their situation, reflect back what matters legally (timing, a complaint they made, leave they took, a protected trait), name the practice area it fits, and invite them to a free case review.
- Reply in the visitor's language. If they write in Spanish, answer in Spanish.

# Boundaries
- You are an AI assistant, not a lawyer, and chatting does not create an attorney-client relationship. Say so when someone asks for advice on their specific case.
- Never tell a visitor they definitely do or don't have a case, never put a dollar value on their claim, and never promise an outcome. Say an attorney can evaluate it for free.
- Deadlines exist and some are short. Don't calculate a specific deadline for someone; urge them to call.
- Don't ask for or accept sensitive data such as Social Security numbers, birth dates, bank details, passwords, or medical records. If someone wants to share case details, point them to the phone line or the case review form.
- If someone mentions immediate danger or violence, tell them to call 911. If they mention thoughts of self-harm, give them 988 (Suicide and Crisis Lifeline).
- The firm represents employees only. If an employer asks for representation, say so politely.
- For anything unrelated to employment or the firm, briefly say what you can help with.

# Style
- Plain text. Two to five short sentences, or a short "- " list when listing things. No headings, no tables. Use **bold** sparingly.
- End with one concrete next step when it helps: call ${site.phone.display} (24/7) or start a free case review at /contact-us#case-review.

# Reference: practice areas
${k.areas}

# Reference: frequently asked questions
${k.faqs}`;

const cta = `Call ${site.phone.display} any time, day or night, or start a free case review at /contact-us#case-review.`;

const offlineAnswers: { test: RegExp; answer: string }[] = [
  {
    test: /espa[nñ]ol|spanish|habla|hablan|ayuda/i,
    answer: `Sí, hablamos español. Puede llamarnos al ${site.phone.display} las 24 horas, o llenar el formulario gratuito en /contact-us#case-review. La consulta es gratis y no paga nada a menos que ganemos.`,
  },
  {
    test: /cost|fee|charge|price|afford|pay you|cu[aá]nto|contingen/i,
    answer: `Nothing up front. We work on contingency: you pay $0 unless we win or settle your case, and we cover case costs along the way. ${cta}`,
  },
  {
    test: /break|lunch|meal|rest period|descanso/i,
    answer: `California requires a 30-minute meal break before the end of your fifth hour and a paid 10-minute rest break for every four hours worked. Each day a break is missed or cut short, your employer owes you an extra hour of pay. ${cta}`,
  },
  {
    test: /overtime|over time|horas extra|exempt|salar/i,
    answer: `Non-exempt workers in California earn time-and-a-half after 8 hours in a day or 40 in a week, and double time after 12 hours in a day. Being paid a salary doesn't automatically make you exempt. ${cta}`,
  },
  {
    test: /harass|hostile|sexual|touch|acoso/i,
    answer: `Harassment tied to your sex, race, religion, age, disability, or another protected trait is illegal, and in California a single serious incident can be enough. Document each incident and save messages. ${cta}`,
  },
  {
    test: /retaliat|complain|whistle|report|workers.? comp/i,
    answer: `If you were punished after complaining, reporting something illegal, filing a workers' comp claim, or taking leave, that can be retaliation, a claim of its own. Timing matters a lot here. ${cta}`,
  },
  {
    test: /discriminat|age|race|pregnan|disab|gender|religio|national origin/i,
    answer: `California protects you from being treated worse because of race, age (40+), disability, pregnancy, gender, sexual orientation, religion, national origin, and more. ${cta}`,
  },
  {
    test: /fired|terminat|let go|laid off|layoff|despid|wrongful/i,
    answer: `California is at-will, but you can't be fired for an illegal reason, such as discrimination, complaining, taking protected leave, or reporting a violation. Don't sign a severance agreement before a lawyer reviews it. ${cta}`,
  },
  {
    test: /where|office|address|located|directions|ubicad|oficina/i,
    answer: `Our office is at ${site.address.oneLine}. Directions: ${site.address.mapsUrl}. Call ahead at ${site.phone.display} and we'll set up a time.`,
  },
];

export function offlineReply(question: string) {
  const hit = offlineAnswers.find((a) => a.test.test(question));
  return (
    hit?.answer ??
    `I can answer general questions about California employment law and about our firm, from firings and harassment to missed breaks and unpaid overtime. For a real look at your situation, an attorney can review it for free. ${cta}`
  );
}
