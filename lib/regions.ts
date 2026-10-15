import { getPracticeArea, type PracticeArea } from "./practice-areas";

export type Region = {
  id: string;
  name: string;
  county: string;
  court: string;
  cities: string[];
  note: string;
};

export const regions: Region[] = [
  {
    id: "los-angeles",
    name: "Los Angeles",
    county: "Los Angeles County",
    court: "Los Angeles County Superior Court",
    cities: ["Los Angeles", "Woodland Hills", "Van Nuys", "Burbank", "Glendale", "Pasadena", "Santa Monica", "Long Beach", "Torrance"],
    note: "Our office is in Woodland Hills, so Los Angeles County is home ground. We know its courts and the employers that dominate its job market, from entertainment and healthcare to logistics and retail.",
  },
  {
    id: "orange-county",
    name: "Orange County",
    county: "Orange County",
    court: "Orange County Superior Court",
    cities: ["Anaheim", "Santa Ana", "Irvine", "Huntington Beach", "Costa Mesa", "Fullerton", "Orange", "Garden Grove"],
    note: "Orange County's hospitality, healthcare, and tech employers are some of the largest in the state. We represent their employees in Orange County Superior Court and in arbitration.",
  },
  {
    id: "inland-empire",
    name: "Inland Empire",
    county: "Riverside and San Bernardino Counties",
    court: "Riverside and San Bernardino County Superior Courts",
    cities: ["Riverside", "San Bernardino", "Ontario", "Rancho Cucamonga", "Fontana", "Corona", "Moreno Valley", "Temecula"],
    note: "Warehouses and distribution centers employ a huge share of Inland Empire workers, and missed breaks, unpaid overtime, and injury-related firings come up constantly. We handle these cases across both counties.",
  },
  {
    id: "ventura",
    name: "Ventura",
    county: "Ventura County",
    court: "Ventura County Superior Court",
    cities: ["Ventura", "Oxnard", "Thousand Oaks", "Simi Valley", "Camarillo", "Moorpark"],
    note: "Ventura County sits just past our Woodland Hills office. We represent workers in agriculture, healthcare, biotech, and retail throughout the county.",
  },
  {
    id: "santa-clarita",
    name: "Santa Clarita",
    county: "Los Angeles County",
    court: "Los Angeles County Superior Court",
    cities: ["Valencia", "Newhall", "Saugus", "Canyon Country", "Stevenson Ranch", "Castaic"],
    note: "Santa Clarita is a short drive up the 5 from the San Fernando Valley. Its manufacturing, aerospace, healthcare, and studio employers are part of our everyday caseload.",
  },
  {
    id: "san-diego",
    name: "San Diego",
    county: "San Diego County",
    court: "San Diego County Superior Court",
    cities: ["San Diego", "Chula Vista", "Oceanside", "Escondido", "Carlsbad", "El Cajon"],
    note: "From biotech and defense contractors to hotels and restaurants, San Diego employers are bound by the same California protections. Distance from our office doesn't change your rights, and most cases start with a phone call.",
  },
];

/**
 * Location pages keep the exact URLs the old WordPress site used, so search
 * rankings carry over. Two Los Angeles pages are new.
 */
const locationSlugs: Record<string, Record<string, string>> = {
  "los-angeles": {
    "wrongful-termination": "los-angeles-wrongful-termination-attorney",
    retaliation: "los-angeles-retaliation-attorney",
    discrimination: "los-angeles-workplace-discrimination-attorney",
  },
  "orange-county": {
    "wrongful-termination": "orange-county-wrongful-termination-attorney",
    retaliation: "orange-county-retaliation-attorney",
    discrimination: "orange-county-discrimination-attorney",
  },
  "inland-empire": {
    "wrongful-termination": "inland-empire-wrongful-termination-attorney",
    retaliation: "inland-empire-retaliation-attorney",
    discrimination: "inland-empire-workplace-discrimination-attorney",
  },
  ventura: {
    "wrongful-termination": "ventura-wrongful-termination-attorney",
    retaliation: "ventura-retaliation-attorney",
    discrimination: "ventura-workplace-discrimination-attorney",
  },
  "santa-clarita": {
    "wrongful-termination": "santa-clarita-wrongful-termination-attorney",
    retaliation: "santa-clarita-retaliation-attorney",
    discrimination: "santa-clarita-workplace-discrimination-attorney",
  },
  "san-diego": {
    "wrongful-termination": "san-diego-wrongful-termination-attorney",
    retaliation: "san-diego-retaliation-attorney",
    discrimination: "san-diego-workplace-discrimination-attorney",
  },
};

export const regionalTopics = ["wrongful-termination", "retaliation", "discrimination"] as const;

export type LocationPage = {
  slug: string;
  region: Region;
  area: PracticeArea;
};

export const locationPages: LocationPage[] = regions.flatMap((region) =>
  regionalTopics.map((topic) => ({
    slug: locationSlugs[region.id][topic],
    region,
    area: getPracticeArea(topic)!,
  })),
);

export function locationHref(regionId: string, topic: (typeof regionalTopics)[number]) {
  return `/${locationSlugs[regionId][topic]}`;
}
