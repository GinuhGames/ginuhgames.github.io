import type { ProjectCopy, ProjectId } from '../content/projects';
import type { BudgetId } from '../content/site';

const projectItems: Record<ProjectId, ProjectCopy> = {
  unlighted: {
    tag: 'Best Game · PIXEL Awards 2024',
    summary:
      'A first-person puzzle game set in a dystopian world that reflects the threshold between memory and oblivion. You work as a test subject for Umbral Alchemy, a company researching stones with mysterious properties: strange materials that only take shape when a ray of light hits them.',
    facts: [
      { term: 'Genre', detail: 'First-person puzzle' },
      { term: 'Released', detail: '6 June 2025' },
      { term: 'Platform', detail: 'Windows · Steam' },
      { term: 'Languages', detail: 'English, Spanish, Catalan' },
    ],
    artAlt:
      'Unlighted key art: a desk lit by a lamp, covered in Umbral Alchemy research files, next to a dark crystal.',
    primary: 'Get Unlighted on Steam',
    secondary: 'Play the free demo',
    soundtrack: 'Listen to the soundtrack on Spotify',
    awards: [
      { result: 'Winner', title: 'Best Game', event: 'PIXEL Awards 2024' },
      { result: 'Finalist', title: 'Audience Award for Best Catalan Game', event: 'SAGA Awards 2025' },
      { result: 'Funded', title: 'Backed by our community', event: 'Kickstarter' },
    ],
  },
  'witch-you': {
    tag: 'Coming soon to Steam',
    summary:
      "A first-person co-op game where you and a partner are two witches running your own apothecary. Restore the shop, upgrade it and keep it open for as many days as you can, travelling to Dante's Inferno for the ingredients your potions need.",
    facts: [
      { term: 'Genre', detail: 'Roguelike management' },
      { term: 'Players', detail: 'Online co-op' },
      { term: 'Release', detail: 'To be announced' },
      { term: 'Platform', detail: 'Windows · Steam' },
    ],
    artAlt:
      "Witch You! in-game capture of Dante's Inferno: a pale, twisted tree under a sky of white and crimson shapes, surrounded by silhouetted souls.",
    primary: 'Add to your Steam wishlist',
  },
};

const budget: Record<BudgetId, string> = {
  under5: 'Under €5,000',
  '5to10': '€5,000 to €10,000',
  '10to20': '€10,000 to €20,000',
  '20to50': '€20,000 to €50,000',
  over50: 'Over €50,000',
  unsure: "I don't know yet",
};

/** English — the source dictionary. es.ts and ca.ts must match its shape. */
export const en = {
  meta: {
    title: 'Ginuh Games — Independent game studio from Barcelona',
    description:
      'Ginuh Games is an independent video game studio from Barcelona. We make our own games, like Unlighted and Witch You!, and create custom games, microgames, interactive activities and gamification on demand.',
  },
  common: {
    newTab: '(opens in a new tab)',
    seeProjects: 'See our projects',
    steamGames: 'Our games on Steam',
    startProject: 'Start a project',
    skip: 'Skip to content',
  },
  nav: {
    sections: {
      projects: 'Projects',
      studio: 'Studio',
      team: 'Team',
      contact: 'Contact',
    },
    home: 'Ginuh Games, back to top',
    main: 'Main',
    mobile: 'Mobile',
    open: 'Open menu',
    close: 'Close menu',
    language: 'Language',
  },
  hero: {
    lead: 'An independent video game studio from Barcelona. We make our own games, and custom games, microgames and interactive experiences on demand.',
  },
  projects: {
    ownTitle: 'Our projects',
    steamAll: 'All our games on Steam',
    onDemandTitle: 'On-demand projects',
    onDemandIntro:
      'Beyond our own games, we design and develop projects on demand. From a full game to a microgame for a campaign, an interactive activity or a gamified experience, we take care of everything: concept, design, art, programming and sound.',
    servicesLabel: 'What we make',
    services: {
      games: 'Custom games',
      microgames: 'Microgames',
      interactive: 'Interactive activities',
      gamification: 'Gamification',
    },
    hintPointer: 'Move your cursor over the image to light it',
    hintTouch: 'Scroll or touch the image to light it',
    awardsLabel: 'Recognition',
    items: projectItems,
  },
  studio: {
    title: 'A little studio where imagination becomes play.',
    paragraphs: [
      'We are three friends who love making games together, always looking beyond and trying to move the player with great storytelling.',
      'Game design and narrative lovers, blended with some good environment art to make games feel unique. We believe good game design is the key to a good video game, and we always try to reach that standard.',
    ],
    nameLabel: 'Where our name comes from',
    foxAlt: 'Ginuh Games fox logo',
    meaning: 'noun, Catalan: fox',
    story:
      'In our first year of university we had to form a group and choose a name. The fox, an adventurous and agile animal, fascinated us from the beginning, so we named ourselves after it. Since then, we have been Ginuh Games.',
  },
  team: {
    title: 'The team',
    photoAlt:
      'Juan de Dios, Erik and David, the Ginuh Games team, smiling on a rooftop with the Sagrada Família behind them.',
    roles: {
      juande: 'Environment Artist · 3D Prop Artist',
      erik: 'Level & Audio Designer · Programmer · CTO',
      david: 'Narrative & Level Designer · Programmer · Project Manager',
    },
    socialLabel: (name: string, network: string) => `${name} on ${network}`,
  },
  contact: {
    title: 'Get in touch',
    intro: 'Have a project in mind, a question about our games or just want to say hi? Write to us.',
    form: {
      title: 'Tell us about your project',
      name: 'Name',
      email: 'Email',
      company: 'Company or organization',
      optional: 'optional',
      budgetLegend: 'Available budget',
      budget,
      budgetRequired: 'Choose a budget range.',
      message: 'Tell us about the idea and the timing',
      consentBefore: 'I have read and accept the',
      consentLink: 'privacy policy',
      consentAfter: '.',
      consentRequired: 'Accept the privacy policy to send your request.',
      privacy:
        'Ginuh Games, S.C.P. will use your details only to answer your request, with your consent. Only our hosting and email providers handle them. You can access, correct or delete them at any time by writing to ginuhgames@gmail.com.',
      submit: 'Send request',
      sending: 'Sending…',
      required: 'Please fill in this field.',
      invalidEmail: 'Enter a valid email address.',
      sentTitle: 'Request sent',
      sentBody: (name: string, email: string) =>
        `Thanks, ${name}. We'll get back to you at ${email} as soon as we can.`,
      again: 'Send another request',
      errorBody: "We couldn't send your request. Try again in a moment, or send it from your email app:",
      errorLink: 'Open it in my email app',
      subject: 'Project request',
      bodyIntro: 'Hi Ginuh Games,',
      fieldsLabel: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        budget: 'Budget',
        message: 'Message',
      },
    },
    email: 'Email',
    copy: 'Copy email',
    copied: 'Copied',
    copiedStatus: 'Email address copied to clipboard',
    community: 'Community',
    communityText: 'Join our Discord server to follow the studio and play with us.',
    joinDiscord: 'Join our Discord',
    studio: 'Studio',
    location: 'Barcelona, Spain',
    follow: 'Follow',
  },
  footer: {
    nav: 'Footer',
    legal: 'Legal',
    rights: 'All rights reserved.',
    made: 'Made with care in Barcelona.',
    top: 'Back to top',
    privacyLink: 'Privacy policy',
    legalLink: 'Legal notice',
  },
  notFound: {
    metaTitle: 'Page not found — Ginuh Games',
    title: 'This room is empty.',
    body: "The page you're looking for doesn't exist or has been moved. Even with the light on, there's nothing to find here.",
    home: 'Back to home',
    hintPointer: 'Move your cursor to light the room',
    hintTouch: 'Touch the screen to light the room',
  },
};

export type Dictionary = typeof en;
