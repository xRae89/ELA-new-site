import type { Section } from "./practice-areas";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  related: string;
  sections: Section[];
};

export const posts: Post[] = [
  {
    slug: "race-discrimination-in-the-workplace",
    title: "Race discrimination at work: what it looks like and what to do",
    date: "2022-07-11",
    excerpt:
      "Race discrimination is rarely announced. Here's how it shows up in pay, promotions, and discipline, and how California law protects you.",
    related: "discrimination",
    sections: [
      {
        heading: "It's usually a pattern, not a slur",
        body: [
          "Most race discrimination today is quiet. It's the promotion that keeps going to someone else, the discipline that only seems to land on certain people, or the pay gap no one can explain.",
          "California's Fair Employment and Housing Act prohibits discrimination based on race, color, ancestry, and national origin, and it protects hair texture and protective hairstyles like braids, locs, and twists.",
        ],
      },
      {
        heading: "Warning signs",
        list: [
          "You're passed over for roles you're qualified for, again and again.",
          "You're paid less than coworkers doing the same job.",
          "Rules are enforced strictly for you and loosely for others.",
          "Comments about your accent, name, hair, or neighborhood.",
          "You're steered toward lower-visibility assignments.",
        ],
      },
      {
        heading: "Building your case",
        body: [
          "Keep notes with dates and names. Compare how others in similar roles were treated. Save performance reviews and emails. Those comparisons are often the strongest evidence in a discrimination case.",
          "You generally have three years to file a complaint with the California Civil Rights Department. A lawyer can file it for you and handle the case from there.",
        ],
      },
    ],
  },
  {
    slug: "what-causes-discrimination-in-the-workplace",
    title: "Why workplace discrimination happens, and why it's still illegal",
    date: "2022-07-11",
    excerpt:
      "Bias, culture, and cost-cutting all drive discrimination at work. Understanding the cause can help you spot it and prove it.",
    related: "discrimination",
    sections: [
      {
        heading: "Common causes",
        list: [
          "Stereotypes about who can lead, who is \"a culture fit,\" or who will be committed after having kids.",
          "Cost-cutting that targets older, higher-paid workers.",
          "Managers who hire and promote people who look like them.",
          "Discomfort with disability or medical accommodation requests.",
          "A culture where offensive jokes go unchecked.",
        ],
      },
      {
        heading: "Intent isn't required to prove every claim",
        body: [
          "Some claims turn on whether bias motivated a decision. Others, called disparate impact claims, look at whether a neutral-seeming policy hurts a protected group without a valid business reason.",
          "Either way, the law looks at results and evidence, not just what the employer says it meant.",
        ],
      },
      {
        heading: "What employers are supposed to do",
        body: [
          "California requires employers to take reasonable steps to prevent discrimination and harassment, including training and a working complaint process. When they don't, that failure can be its own claim.",
        ],
      },
    ],
  },
  {
    slug: "california-wrongful-termination-case-on-your-hands",
    title: "Do you have a California wrongful termination case?",
    date: "2022-05-07",
    excerpt:
      "At-will doesn't mean anything goes. Five questions to ask yourself after you've been fired.",
    related: "wrongful-termination",
    sections: [
      {
        heading: "Five questions to ask",
        list: [
          "Did the firing come soon after you complained, reported something, or asked for leave?",
          "Could your age, race, gender, disability, pregnancy, or another protected trait have played a role?",
          "Did the stated reason change, or not match your record?",
          "Were coworkers treated differently for the same conduct?",
          "Did you have a contract or a promise that you'd only be fired for cause?",
        ],
        body: [
          "A yes to any of these is worth a conversation with a lawyer.",
        ],
      },
      {
        heading: "What not to do",
        list: [
          "Don't sign a severance agreement before having it reviewed.",
          "Don't post about your employer on social media.",
          "Don't take confidential documents you aren't entitled to.",
          "Don't wait. Some deadlines are shorter than people expect.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
