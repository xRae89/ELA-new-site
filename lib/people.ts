export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
  group: "Leadership" | "Attorneys" | "Case team";
};

export const team: TeamMember[] = [
  { name: "Kasim Idrees", role: "Founder and CEO", photo: "/images/team/kasim-idrees.webp", group: "Leadership" },
  { name: "Hamid Kohan", role: "COO", photo: "/images/team/hamid-kohan.webp", group: "Leadership" },
  { name: "George Rasalan", role: "CFO", photo: "/images/team/george-rasalan.webp", group: "Leadership" },
  { name: "Daniel Torres", role: "Business Manager", photo: "/images/team/daniel-torres.webp", group: "Leadership" },
  { name: "Derek Kraus", role: "Litigation Attorney", photo: "/images/team/derek-kraus.webp", group: "Attorneys" },
  { name: "Laura Devoian", role: "Associate Attorney", group: "Attorneys" },
  { name: "George Goulian", role: "Associate Attorney", photo: "/images/team/george-goulian.webp", group: "Attorneys" },
  { name: "Dominick Osborne", role: "Senior Paralegal", photo: "/images/team/dominick-osborne.webp", group: "Case team" },
  { name: "Julio Caimares", role: "Intake Manager", photo: "/images/team/julio-caimares.webp", group: "Case team" },
  { name: "Leslie Espeleta", role: "Administrator", photo: "/images/team/leslie-espeleta.webp", group: "Case team" },
  { name: "Kerri Lynch", role: "Paralegal", photo: "/images/team/kerri-lynch.webp", group: "Case team" },
  { name: "Maria Romo", role: "Paralegal", photo: "/images/team/maria-romo.webp", group: "Case team" },
  { name: "Paulina Pola", role: "Paralegal", photo: "/images/team/paulina-pola.webp", group: "Case team" },
  { name: "Rober Hernandez", role: "Paralegal", photo: "/images/team/rober-hernandez.webp", group: "Case team" },
  { name: "Aaron Miller", role: "Case Manager", photo: "/images/team/aaron-miller.webp", group: "Case team" },
  { name: "Arianna Malo", role: "Case Manager", photo: "/images/team/arianna-malo.webp", group: "Case team" },
  { name: "Priscila Olivas", role: "Case Manager", photo: "/images/team/priscila-olivas.webp", group: "Case team" },
];

export type Review = { quote: string; name: string };

/** Short excerpts from client reviews published on the firm's current site. */
export const reviews: Review[] = [
  { name: "Nicholas Buchanan", quote: "Kasim's diligence and steadfast professionalism won my case decisively." },
  { name: "Teresa Delgado", quote: "He spent the time to listen to me and really understand what I went through." },
  { name: "Emma Paige", quote: "They helped me settle my case with a bigger settlement than I was expecting." },
  { name: "Joshua Cornish", quote: "I was nervous suing a large company. They have the resources to fight any size company." },
  { name: "Rose Baker", quote: "They genuinely cared about the situation I was in and stayed in constant communication with me." },
  { name: "Domonic Grisson", quote: "They took the time to educate me on the case every step of the way." },
  { name: "Boris Mills", quote: "It's so rare to find an attorney so knowledgeable, professional, courteous, and easy to talk to." },
  { name: "Sonia Clark", quote: "Their number one priority was making sure I was informed and comfortable with the entire process." },
  { name: "Micky Hoffa", quote: "Kasim is great and made the experience much more comfortable than the typical lawyer." },
  { name: "Penelope Knox", quote: "Very respectful and compassionate about what their clients are going through." },
  { name: "Jack Gillenhel", quote: "They guided me through the initial process and got my claim rolling quickly." },
  { name: "Blake Parr", quote: "The other party was a pain, but they stayed on them through all the back and forth." },
  { name: "Mary Nash", quote: "I can sleep easy at night knowing I have Employment Law Assist as my attorney." },
  { name: "Adrik Abnousi", quote: "I would highly recommend Attorney Idrees to my friends and family." },
];
