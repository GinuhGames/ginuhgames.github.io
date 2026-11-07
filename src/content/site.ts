/**
 * Language-independent data: links, networks, the team and the company.
 * Every visible sentence lives in src/i18n/{en,es,ca}.ts.
 */

export const links = {
  /** Every Ginuh Games release on Steam. Swap for the Steam developer page once it exists. */
  steamStudio: 'https://store.steampowered.com/search/?developer=Ginuh%20Games',
  unlighted: 'https://store.steampowered.com/app/3051520/Unlighted/',
  unlightedDemo: 'https://store.steampowered.com/app/3051540/Unlighted_Demo/',
  witchYou: 'https://store.steampowered.com/app/4657830/Witch_You/',
  soundtrack: 'https://open.spotify.com/album/2Ke1FSp1KWR8q8WFX9wmQR',
  kickstarter: 'https://www.kickstarter.com/projects/ginuhgames/unlighted',
  discord: 'https://discord.gg/gKbK4HBPng',
  email: 'ginuhgames@gmail.com',
  phone: '+34 672 13 98 16',
} as const;

export type SocialId =
  | 'steam'
  | 'discord'
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'x'
  | 'linkedin'
  | 'kickstarter';

export const socials: { id: SocialId; label: string; href: string }[] = [
  { id: 'steam', label: 'Steam', href: links.steamStudio },
  { id: 'discord', label: 'Discord', href: links.discord },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@ginuhgames?sub_confirmation=1' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@ginuhgames' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/ginuhgames' },
  { id: 'x', label: 'X', href: 'https://x.com/GinuhGames' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/ginuhgames/' },
  { id: 'kickstarter', label: 'Kickstarter', href: links.kickstarter },
];

export const sectionIds = ['projects', 'studio', 'team', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];

/** What the studio makes on demand, listed in the on-demand projects block. */
export const serviceIds = ['games', 'microgames', 'interactive', 'gamification'] as const;
export type ServiceId = (typeof serviceIds)[number];

/** Budget ranges in the request form, lowest first. `unsure` sits apart from the scale. */
export const budgetTiers = [
  { id: 'under5', short: '< 5k' },
  { id: '5to10', short: '5–10k' },
  { id: '10to20', short: '10–20k' },
  { id: '20to50', short: '20–50k' },
  { id: 'over50', short: '50k +' },
] as const;
export type BudgetId = (typeof budgetTiers)[number]['id'] | 'unsure';

/** The company behind the site, as the legal notice and privacy policy name it. */
export const company = {
  name: 'Ginuh Games, S.C.P.',
  nif: 'J55407621',
  street: 'Calle Valencia, 19, planta 1, puerta 1',
  city: '08242 Manresa (Barcelona)',
  country: { en: 'Spain', es: 'España', ca: 'Espanya' },
} as const;

export type MemberId = 'juande' | 'erik' | 'david';

export type Member = {
  id: MemberId;
  name: string;
  /** Face position inside the team photo, in percent of its width / height. */
  spot: { x: number; y: number };
  socials: { id: 'x' | 'instagram' | 'linkedin'; href: string }[];
};

export const team: Member[] = [
  {
    id: 'juande',
    name: 'Juan de Dios García',
    spot: { x: 21, y: 55 },
    socials: [
      { id: 'x', href: 'https://x.com/jedtraa' },
      { id: 'instagram', href: 'https://www.instagram.com/juandediosgasa' },
      { id: 'linkedin', href: 'https://www.linkedin.com/in/juan-de-dios-garc%C3%ADa-salguero-689087225' },
    ],
  },
  {
    id: 'erik',
    name: 'Erik Martín',
    spot: { x: 51, y: 42 },
    socials: [
      { id: 'instagram', href: 'https://www.instagram.com/eriik1212' },
      { id: 'linkedin', href: 'https://www.linkedin.com/in/erikmartingarzon' },
    ],
  },
  {
    id: 'david',
    name: 'David Boces',
    spot: { x: 81, y: 31 },
    socials: [
      { id: 'x', href: 'https://x.com/__vozes__' },
      { id: 'instagram', href: 'https://www.instagram.com/boces16' },
      { id: 'linkedin', href: 'https://www.linkedin.com/in/david-boces-obis-474196238' },
    ],
  },
];
