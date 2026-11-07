/**
 * The studio's projects. Images and links live here; every sentence about a
 * project lives under `projects.items` in src/i18n/{en,es,ca}.ts.
 *
 * To add a project: import its images, add it to `ownProjects` or
 * `clientProjects`, add its id to `ProjectId` and write its copy in the three
 * languages. TypeScript points at every place still missing.
 */
import { links } from './site';
import unlightedLogo from '../assets/images/unlighted-logo.webp';
import unlightedArt900 from '../assets/images/unlighted-art-900.webp';
import unlightedArt1600 from '../assets/images/unlighted-art-1600.webp';
import witchYouLogo from '../assets/images/witch-you-logo.webp';
import witchYouArt900 from '../assets/images/witch-you-inferno-900.webp';
import witchYouArt1600 from '../assets/images/witch-you-inferno-1600.webp';

export type ProjectId = 'unlighted' | 'witch-you';

export type Project = {
  id: ProjectId;
  name: string;
  logo: { src: string; width: number; height: number };
  /** 16:9 picture: a 900px file and a large one whose width is `width`. */
  art: { small: string; large: string; width: number; height: number };
  /**
   * The picture starts dark and the visitor's pointer lights it (Unlighted's own
   * mechanic). Positions are fractions of the frame: where the light first flickers
   * on, and where it rests when the pointer leaves.
   */
  flashlight?: { start: [number, number]; rest: [number, number] };
  primary: { href: string; steam?: boolean };
  secondary?: { href: string };
  soundtrack?: string;
};

/** Words that belong to one project, in one language. */
export type ProjectCopy = {
  /** One line under the name on its card: an award, a status. */
  tag: string;
  summary: string;
  facts: { term: string; detail: string }[];
  artAlt: string;
  primary: string;
  secondary?: string;
  soundtrack?: string;
  awards?: { result: string; title: string; event: string }[];
};

/** Games the studio makes and publishes itself. */
export const ownProjects: Project[] = [
  {
    id: 'unlighted',
    name: 'Unlighted',
    logo: { src: unlightedLogo, width: 752, height: 154 },
    art: { small: unlightedArt900, large: unlightedArt1600, width: 1591, height: 892 },
    flashlight: { start: [0.14, 0.24], rest: [0.63, 0.47] },
    primary: { href: links.unlighted, steam: true },
    secondary: { href: links.unlightedDemo },
    soundtrack: links.soundtrack,
  },
  {
    id: 'witch-you',
    name: 'Witch You!',
    logo: { src: witchYouLogo, width: 800, height: 514 },
    art: { small: witchYouArt900, large: witchYouArt1600, width: 1560, height: 878 },
    primary: { href: links.witchYou, steam: true },
  },
];

/** Work made for clients. Empty until the first one is ready to show. */
export const clientProjects: Project[] = [];

export const allProjects = [...ownProjects, ...clientProjects];
