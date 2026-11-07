/**
 * Language-independent data: links, networks and the team.
 * Every visible sentence lives in src/i18n/{en,es,ca}.ts.
 */

export const links = {
  steam: 'https://store.steampowered.com/app/3051520/Unlighted/',
  steamDemo: 'https://store.steampowered.com/app/3051540/Unlighted_Demo/',
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
  { id: 'steam', label: 'Steam', href: links.steam },
  { id: 'discord', label: 'Discord', href: links.discord },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@ginuhgames?sub_confirmation=1' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@ginuhgames' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/ginuhgames' },
  { id: 'x', label: 'X', href: 'https://x.com/GinuhGames' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/ginuhgames/' },
  { id: 'kickstarter', label: 'Kickstarter', href: links.kickstarter },
];

export const sectionIds = ['unlighted', 'studio', 'team', 'services', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];

export const serviceIds = ['games', 'microgames', 'interactive', 'gamification'] as const;
export type ServiceId = (typeof serviceIds)[number];

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
