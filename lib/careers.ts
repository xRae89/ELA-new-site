export type Opening = {
  slug: string;
  title: string;
  location: string;
  type: string;
  compensation: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
};

export const openings: Opening[] = [
  {
    slug: "employment-law-attorney",
    title: "Employment Law Attorney",
    location: "Woodland Hills, in office",
    type: "Full time",
    compensation: "$100,000 to $200,000 plus monthly incentive bonuses",
    summary:
      "Own employee-side cases from intake to resolution, lead negotiations and discovery, and help scale a practice that's growing faster than it can hire.",
    responsibilities: [
      "Represent employees in discrimination, harassment, retaliation, wrongful termination, and wage and hour matters.",
      "Run cases end to end: pre-litigation negotiation, mediation, discovery, and law and motion.",
      "Take and defend depositions; draft and argue motions.",
      "Lead pre-litigation staff and keep paralegal workflows on track.",
      "Communicate clearly with clients, opposing counsel, and experts.",
    ],
    requirements: [
      "Three to five years practicing employment law, plaintiff or defense side.",
      "Track record of managing cases independently through settlement.",
      "Hands-on discovery experience, including depositions.",
      "Strong negotiation, writing, and delegation skills.",
      "Active California Bar license in good standing.",
    ],
    perks: [
      "A monthly bonus plan with real upside.",
      "Room to shape your role as the practice grows.",
      "A partner-style environment with a clear growth path.",
    ],
  },
  {
    slug: "litigation-paralegal",
    title: "Litigation Paralegal",
    location: "Woodland Hills",
    type: "Full time",
    compensation: "Competitive salary plus monthly bonuses",
    summary:
      "Keep complex employment cases moving, from intake through trial prep, alongside attorneys who rely on you as a partner.",
    responsibilities: [
      "Draft discovery, subpoenas, pleadings, and correspondence.",
      "Manage case files, deadlines, and calendars across courts.",
      "Prepare for trial: exhibits, witness coordination, and binders.",
      "Coordinate with clients, opposing counsel, courts, and vendors.",
      "Support depositions, hearings, and mediations.",
    ],
    requirements: [
      "Three or more years as a litigation paralegal, ideally in employment or civil litigation.",
      "Working knowledge of California civil procedure.",
      "Sharp writing and organization under deadline pressure.",
      "Comfort with litigation software and Microsoft Office.",
    ],
    perks: [
      "Leadership that invests in your training and development.",
      "A fast-growing team with room to advance.",
      "A collaborative, partner-style environment.",
    ],
  },
];

export const culture = [
  {
    title: "People first",
    body: "Kasim built the firm as an employer of more than 100 people. The same standard we hold other employers to applies here.",
  },
  {
    title: "Training that's real",
    body: "Personalized development plans and hands-on mentorship from senior attorneys, from your first week on.",
  },
  {
    title: "Promotion on merit",
    body: "Growth tracks results, not tenure. Strong performers take on bigger cases and lead teams quickly.",
  },
  {
    title: "Mamba mentality",
    body: "We hold a high bar and push to get a little better every day, for clients who are counting on us.",
  },
  {
    title: "Work that matters",
    body: "Every file is someone's livelihood. You'll see the difference your work makes when a case resolves.",
  },
  {
    title: "Balance and inclusion",
    body: "A fast-paced team that still respects life outside the office, built by people from many backgrounds.",
  },
];
