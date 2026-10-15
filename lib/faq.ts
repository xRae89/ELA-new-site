import type { QA } from "./practice-areas";

export type FaqGroup = { id: string; title: string; items: QA[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "general",
    title: "Getting started",
    items: [
      {
        q: "How much does it cost to hire you?",
        a: "Nothing up front. We work on contingency: our fee comes out of what we recover, and we cover case costs along the way. If we don't win or settle your case, you owe us nothing.",
      },
      {
        q: "What does at-will employment mean for me?",
        a: "It means your employer can end your job without a reason, but not for an illegal one. Firing someone for discrimination, for complaining, for taking protected leave, or for reporting a violation is still against the law.",
      },
      {
        q: "Can I sue my employer?",
        a: "If your employer broke employment law and it cost you something, usually yes. Some claims go first to the Civil Rights Department or the Labor Commissioner, and some employers require arbitration. We'll tell you which path fits your case.",
      },
      {
        q: "What should I do if I think my rights were violated?",
        a: "Write down what happened while it's fresh, keep copies of documents you're entitled to have, avoid signing anything new, and talk to a lawyer before the deadlines start to bite.",
      },
      {
        q: "Can my employer make me sign a non-compete?",
        a: "In nearly every case, no. California voids non-compete agreements for employees, with narrow exceptions such as the sale of a business. Employers can't enforce one against you even if you signed it in another state.",
      },
      {
        q: "Do you speak Spanish?",
        a: "Sí. Hablamos español. You can call, write, or use the chat on this site in Spanish.",
      },
    ],
  },
  {
    id: "wage-hour",
    title: "Wages, overtime, and breaks",
    items: [
      {
        q: "Am I owed overtime?",
        a: "If you're non-exempt, California requires time-and-a-half after 8 hours in a day or 40 in a week, and double time after 12 hours in a day. The seventh straight workday in a week has its own overtime rules.",
      },
      {
        q: "Am I entitled to breaks?",
        a: "Non-exempt employees get a 30-minute meal break before the end of the fifth hour of work, and a paid 10-minute rest break for every four hours. Each day a break is missed or cut short, your employer owes you an extra hour of pay.",
      },
      {
        q: "What if I'm misclassified as exempt or salaried?",
        a: "A salary alone doesn't make you exempt. Exempt employees must earn at least twice the state minimum wage for full-time work and mainly do executive, administrative, or professional duties. Misclassified workers can recover unpaid overtime and missed-break pay.",
      },
      {
        q: "Can my employer take money out of my paycheck?",
        a: "Only in limited cases, like taxes or deductions you authorized in writing. Employers generally can't deduct for cash shortages, broken equipment, or required uniforms unless the loss came from dishonesty or gross negligence.",
      },
      {
        q: "My final paycheck is late. What can I do?",
        a: "If you were fired, final pay is due immediately. If you quit with 72 hours' notice, it's due on your last day; without notice, within 72 hours. Late final pay can earn you up to 30 days of wages in waiting-time penalties.",
      },
      {
        q: "Can I be fired for pursuing a wage claim while I still work there?",
        a: "No. Retaliating against an employee for claiming unpaid wages is illegal, and a firing soon after a complaint is presumed to be retaliatory.",
      },
      {
        q: "How long do I have to file an overtime claim?",
        a: "Generally three years from when the wages were earned, and up to four when combined with an unfair competition claim. Older pay periods drop off over time, so it pays to act quickly.",
      },
    ],
  },
  {
    id: "discrimination-harassment-retaliation",
    title: "Discrimination, harassment, and retaliation",
    items: [
      {
        q: "How do I know if I was discriminated against?",
        a: "Ask whether you were treated worse than coworkers, and whether the difference lines up with a protected trait like age, race, disability, pregnancy, or gender. Comments, timing, and who replaced you are all evidence.",
      },
      {
        q: "What is a hostile work environment?",
        a: "Unwelcome conduct tied to a protected trait that makes the workplace intimidating, offensive, or abusive. In California, a single severe incident can be enough.",
      },
      {
        q: "What should I do if I'm being harassed?",
        a: "Document every incident, save messages, report it under company policy if you can safely do so, and talk to a lawyer before you quit.",
      },
      {
        q: "Can I be fired for taking medical leave?",
        a: "Eligible employees of companies with five or more workers can take up to 12 weeks of job-protected leave under the California Family Rights Act. Employers must also accommodate disabilities and pregnancy. Firing you for using those rights is illegal.",
      },
      {
        q: "What protections do whistleblowers have?",
        a: "California protects employees who report what they reasonably believe is a violation of law, to a manager or to a government agency. Retaliation for that report can lead to damages and civil penalties.",
      },
      {
        q: "Can my employer retaliate for a workers' comp claim?",
        a: "No. Firing, demoting, or threatening an employee for filing a workers' compensation claim or getting hurt on the job is illegal.",
      },
    ],
  },
];

export const featuredFaqs: QA[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[1].items[1],
  faqGroups[2].items[1],
  faqGroups[2].items[3],
  faqGroups[0].items[5],
];
