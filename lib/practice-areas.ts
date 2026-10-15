export type Section = {
  heading: string;
  body?: string[];
  list?: string[];
};

export type QA = { q: string; a: string };

export type PracticeArea = {
  slug: string;
  name: string;
  /** Short noun used in location page titles, e.g. "Wrongful Termination". */
  topic: string;
  short: string;
  metaDescription: string;
  lede: string;
  sections: Section[];
  recover: string[];
  deadline: string;
  faqs: QA[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "wrongful-termination",
    name: "Wrongful termination",
    topic: "Wrongful Termination",
    short: "Fired for a reason the law doesn't allow.",
    metaDescription:
      "Fired for complaining, taking leave, or because of who you are? Our California wrongful termination lawyers work on contingency. Free consultation.",
    lede:
      "California is an at-will state, but at-will has limits. An employer can let you go for almost any reason, just not an illegal one. When the real reason is discrimination, retaliation, or punishment for using a legal right, the firing is wrongful and you may be owed money.",
    sections: [
      {
        heading: "Reasons a firing becomes illegal",
        list: [
          "Your race, age (40+), sex, pregnancy, disability, religion, sexual orientation, or another protected trait played a part.",
          "You complained about harassment, discrimination, unpaid wages, or unsafe conditions.",
          "You reported something you believed was illegal, inside the company or to a government agency.",
          "You took or asked for medical, family, or pregnancy leave.",
          "You filed a workers' compensation claim or got hurt on the job.",
          "You refused to do something that would have broken the law.",
          "You served on a jury, voted, or left for military duty.",
          "The firing broke a written contract or a clear promise of job security.",
        ],
      },
      {
        heading: "Signs worth a closer look",
        body: [
          "Employers rarely admit an illegal motive, so these cases are built from patterns. Timing matters most: a firing that follows a complaint, a leave request, or a diagnosis within weeks is a red flag.",
        ],
        list: [
          "Years of good reviews, then sudden write-ups after you spoke up.",
          "The explanation for your firing keeps changing.",
          "You were replaced by someone younger or outside your protected group.",
          "Coworkers who did the same thing weren't disciplined.",
          "A manager made comments about your age, accent, pregnancy, or health.",
        ],
      },
      {
        heading: "What to do this week",
        list: [
          "Write a timeline while it's fresh: dates, names, what was said.",
          "Keep copies of your termination letter, pay stubs, reviews, and texts you're entitled to keep.",
          "Don't sign a severance agreement until a lawyer has read it. It usually waives your claims.",
          "Apply for unemployment with the EDD. Doing so doesn't hurt your case.",
        ],
      },
    ],
    recover: [
      "Lost wages and benefits from the firing to today",
      "Future lost earnings while you find comparable work",
      "Compensation for emotional distress",
      "Punitive damages when the conduct was malicious",
      "Attorney's fees and costs under California law",
    ],
    deadline:
      "Most discrimination and retaliation claims must be filed with the California Civil Rights Department within three years. A claim for termination in violation of public policy generally has a two-year limit. Some deadlines are much shorter, so call early.",
    faqs: [
      {
        q: "My employer said it was a layoff. Can it still be wrongful termination?",
        a: "Yes. A layoff or restructuring can be cover for an illegal reason, especially if you were the only one cut, or the role was refilled soon after.",
      },
      {
        q: "I was pressured to resign. Do I have a case?",
        a: "Possibly. If conditions were made so intolerable that a reasonable person would quit, California treats it as a constructive discharge, which is handled like a firing.",
      },
      {
        q: "They offered me severance. Should I take it?",
        a: "Have it reviewed first. Severance agreements almost always include a release of claims, and the amount offered is often far below what a claim is worth.",
      },
    ],
  },
  {
    slug: "meal-and-rest-break-violation",
    name: "Meal and rest break violations",
    topic: "Meal and Rest Break",
    short: "Missed, shortened, or interrupted breaks.",
    metaDescription:
      "California employers owe one hour of pay for each day you miss a required meal or rest break. Find out what you're owed. Free case review.",
    lede:
      "California gives hourly workers some of the strongest break protections in the country. When your employer skips them, cuts them short, or keeps you working through them, the law requires an extra hour of pay for each day it happens, and those hours add up fast.",
    sections: [
      {
        heading: "The breaks you're owed",
        list: [
          "A 30-minute unpaid meal break, starting before the end of your fifth hour, on any shift over five hours.",
          "A second 30-minute meal break, starting before the end of your tenth hour, on shifts over ten hours.",
          "A paid 10-minute rest break for every four hours worked, or major fraction of four hours.",
          "Breaks must be duty-free. If you're on call, answering the radio, or watching the register, it isn't a break.",
        ],
        body: [
          "A meal break can be waived only by mutual agreement on shorter shifts (six hours or less for the first, twelve or less for the second).",
        ],
      },
      {
        heading: "Common violations",
        list: [
          "Being told there's no one to cover, so breaks get skipped.",
          "Meal breaks that start in hour six, seven, or later.",
          "Breaks cut to 15 or 20 minutes to keep the line moving.",
          "Being expected to keep a phone or radio on during breaks.",
          "Timekeeping that auto-deducts 30 minutes whether or not you took lunch.",
          "Pay stubs that never show a premium for the breaks you missed.",
        ],
      },
      {
        heading: "How the math works",
        body: [
          "Under Labor Code section 226.7, your employer owes one hour of pay at your regular rate for each workday with a meal break violation, and another hour for each workday with a rest break violation. That is up to two extra hours a day.",
          "Missing breaks three days a week at $25 an hour comes to roughly $3,900 a year, before penalties and interest. Claims usually reach back three years, and often four.",
        ],
      },
    ],
    recover: [
      "One hour of pay per day for missed meal breaks",
      "One hour of pay per day for missed rest breaks",
      "Penalties for inaccurate wage statements",
      "Waiting-time penalties if premiums weren't paid when you left",
      "Interest, attorney's fees, and costs",
    ],
    deadline:
      "Break premium claims generally reach back three years, and up to four years when paired with an unfair competition claim. Every month you wait, the oldest month drops off.",
    faqs: [
      {
        q: "I'm salaried. Do break rules apply to me?",
        a: "They apply to non-exempt employees. Many salaried workers are misclassified as exempt. If you mostly do hands-on or routine work, you may be owed breaks and overtime too.",
      },
      {
        q: "My manager says I chose to skip my breaks.",
        a: "Your employer must actually relieve you of duty and not discourage breaks. Heavy workloads, understaffing, or pressure to keep working can all still make it a violation.",
      },
      {
        q: "Can I bring a claim while I still work there?",
        a: "Yes. Retaliating against an employee for making a wage claim is illegal in California, and it creates a separate claim of its own.",
      },
    ],
  },
  {
    slug: "retaliation",
    name: "Retaliation",
    topic: "Retaliation",
    short: "Punished for speaking up or using your rights.",
    metaDescription:
      "Demoted, cut, or fired after you complained or reported something illegal? California retaliation lawyers. No fee unless we win.",
    lede:
      "California law protects you when you speak up. If your employer punished you for complaining, reporting a violation, or using a legal right, that punishment is its own claim, separate from whatever you complained about. Retaliation is one of the most common claims we see.",
    sections: [
      {
        heading: "Protected activity",
        list: [
          "Complaining about discrimination or harassment, for yourself or a coworker.",
          "Reporting suspected fraud, safety problems, or other legal violations (whistleblowing).",
          "Raising unpaid wages, overtime, or missed breaks.",
          "Filing a workers' compensation claim.",
          "Asking for a disability or religious accommodation, or for medical or family leave.",
          "Taking part in an internal investigation or a government inquiry.",
          "Refusing to take part in something illegal.",
        ],
      },
      {
        heading: "What retaliation looks like",
        body: [
          "It isn't always a firing. Any action that would discourage a reasonable worker from speaking up can count.",
        ],
        list: [
          "Termination, demotion, or a sudden pay cut.",
          "Hours or shifts cut, or schedules changed to punish you.",
          "A first-ever bad review or a stack of write-ups.",
          "Being frozen out of meetings, clients, or promotions.",
          "Threats involving your immigration status.",
        ],
      },
      {
        heading: "Timing is evidence",
        body: [
          "Under California law, if you're fired or disciplined within 90 days of certain wage or whistleblower complaints, the law presumes retaliation and your employer has to rebut it. Outside that window, timing still matters: the closer the punishment follows the complaint, the stronger the inference.",
          "For whistleblower claims, once you show your report contributed to what happened, your employer must prove by clear and convincing evidence that it would have made the same decision anyway.",
        ],
      },
    ],
    recover: [
      "Back pay and lost benefits",
      "Reinstatement or future lost earnings",
      "Emotional distress damages",
      "Civil penalties under the whistleblower statute",
      "Punitive damages and attorney's fees",
    ],
    deadline:
      "Retaliation claims tied to discrimination or harassment complaints must be filed with the Civil Rights Department within three years. Whistleblower claims generally have three years. Complaints to the Labor Commissioner can have a one-year limit.",
    faqs: [
      {
        q: "My original complaint turned out to be wrong. Am I still protected?",
        a: "Yes. You're protected if you reasonably believed there was a violation, even if it turns out there wasn't one.",
      },
      {
        q: "I only complained verbally to my manager.",
        a: "That still counts. A complaint doesn't need to be in writing or go to HR to be protected, although written records help.",
      },
    ],
  },
  {
    slug: "discrimination",
    name: "Discrimination",
    topic: "Workplace Discrimination",
    short: "Treated worse because of who you are.",
    metaDescription:
      "Discriminated against for your age, race, disability, pregnancy, gender, or another protected trait? California discrimination lawyers. Free case review.",
    lede:
      "California's Fair Employment and Housing Act covers more people and more traits than federal law. If your employer treated you worse in hiring, pay, promotion, discipline, or firing because of who you are, you may have a claim worth real money.",
    sections: [
      {
        heading: "Traits California protects",
        list: [
          "Race and color, including hair texture and protective hairstyles",
          "National origin, ancestry, and language",
          "Religion, including religious dress and grooming",
          "Age, for workers 40 and over",
          "Physical or mental disability, and medical conditions",
          "Sex and gender, including pregnancy, childbirth, and breastfeeding",
          "Gender identity, gender expression, and sexual orientation",
          "Marital status, and military or veteran status",
          "Genetic information and reproductive health decisions",
        ],
      },
      {
        heading: "Where it shows up",
        list: [
          "Hiring, promotion, or pay decisions that skip qualified people.",
          "Harsher discipline than coworkers get for the same thing.",
          "Refusing a reasonable accommodation for a disability, pregnancy, or religion.",
          "Failing to talk with you in good faith about accommodations (the interactive process).",
          "Pushing older workers out in a reorganization.",
          "Firing someone soon after they disclose a diagnosis or pregnancy.",
        ],
      },
      {
        heading: "How a claim moves forward",
        body: [
          "FEHA applies to employers with five or more employees. Before filing a lawsuit, a complaint goes to the California Civil Rights Department, which issues a right-to-sue notice. From there, a lawsuit generally has to be filed within one year.",
          "We handle that process for you, from the agency filing through settlement or trial.",
        ],
      },
    ],
    recover: [
      "Lost wages, raises, and benefits",
      "Future lost earnings",
      "Emotional distress damages",
      "Punitive damages",
      "Attorney's fees and costs",
    ],
    deadline:
      "You generally have three years from the discriminatory act to file with the Civil Rights Department, then one year after the right-to-sue notice to file in court.",
    faqs: [
      {
        q: "Nobody said anything outright discriminatory. Can I still prove it?",
        a: "Most cases are proven without a smoking gun, using comparisons to coworkers, timing, shifting explanations, and statistics.",
      },
      {
        q: "Does it matter how big my employer is?",
        a: "Discrimination protections under FEHA apply to employers with five or more employees. Harassment protections apply to every employer, regardless of size.",
      },
    ],
  },
  {
    slug: "workplace-harassment",
    name: "Harassment",
    topic: "Workplace Harassment",
    short: "Hostile, abusive, or sexual conduct at work.",
    metaDescription:
      "Sexual harassment or a hostile work environment in California? Harassers and employers can both be liable. Talk to our harassment lawyers for free.",
    lede:
      "No one should have to put up with harassment to keep a paycheck. California harassment law covers every employer, regardless of size, and in some cases holds the harasser personally responsible.",
    sections: [
      {
        heading: "What counts as harassment",
        body: [
          "Harassment is unwelcome conduct tied to a protected trait (sex, race, religion, age, disability, sexual orientation, and others) that makes the workplace hostile, intimidating, or offensive. California law says a single serious incident can be enough.",
        ],
        list: [
          "Sexual comments, jokes, touching, or requests for dates or sex.",
          "Job benefits offered or threatened in exchange for sexual favors.",
          "Slurs, mocking accents, or \"jokes\" about race, religion, or age.",
          "Graphic images, messages, or gestures.",
          "Repeated hostility aimed at someone because of a protected trait.",
        ],
      },
      {
        heading: "Who is responsible",
        list: [
          "Employers are strictly liable when a supervisor harasses an employee.",
          "Employers are liable for coworker or customer harassment they knew or should have known about and didn't stop.",
          "Individual harassers can be personally liable.",
          "Protection extends to interns, volunteers, and contractors.",
        ],
      },
      {
        heading: "If it's happening now",
        list: [
          "Write down each incident: date, time, what happened, who saw it.",
          "Save messages, emails, and photos somewhere personal and secure.",
          "Report it under the company's policy if you safely can, and keep a copy.",
          "Talk to a lawyer before you quit. How you leave can affect your claim.",
        ],
      },
    ],
    recover: [
      "Emotional distress damages",
      "Lost wages if you were fired or forced out",
      "Punitive damages against the employer",
      "Damages from the individual harasser",
      "Attorney's fees and costs",
    ],
    deadline:
      "Harassment claims generally must be filed with the Civil Rights Department within three years of the last incident, then in court within one year of the right-to-sue notice.",
    faqs: [
      {
        q: "I never reported it. Can I still bring a claim?",
        a: "Often, yes. Not reporting doesn't erase the harassment, especially when the harasser was a supervisor or you feared retaliation.",
      },
      {
        q: "It happened by text and on social media, not at the office.",
        a: "Harassment from a coworker or supervisor through texts, DMs, or social media can still be workplace harassment.",
      },
    ],
  },
];

export function getPracticeArea(slug: string) {
  return practiceAreas.find((p) => p.slug === slug);
}
