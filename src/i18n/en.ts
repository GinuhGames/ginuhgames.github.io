/** English — the source dictionary. es.ts and ca.ts must match its shape. */
export const en = {
  meta: {
    title: 'Ginuh Games — Independent game studio from Barcelona',
    description:
      'Ginuh Games is an independent video game studio from Barcelona. We make our own games, like Unlighted, and create custom games, microgames, interactive activities and gamification on demand.',
  },
  common: {
    newTab: '(opens in a new tab)',
    getOnSteam: 'Get Unlighted on Steam',
    playDemo: 'Play the free demo',
    startProject: 'Start a project',
    skip: 'Skip to content',
  },
  nav: {
    sections: {
      unlighted: 'Unlighted',
      studio: 'Studio',
      team: 'Team',
      services: 'Services',
      contact: 'Contact',
    },
    cta: 'Get Unlighted',
    home: 'Ginuh Games, back to top',
    main: 'Main',
    mobile: 'Mobile',
    open: 'Open menu',
    close: 'Close menu',
    language: 'Language',
  },
  hero: {
    lead: 'An independent video game studio from Barcelona. We make our own games, and custom games, microgames and interactive experiences on demand.',
    status: 'Out now on Steam',
    opensSteam: '(opens Steam in a new tab)',
  },
  game: {
    summary:
      'A first-person puzzle game set in a dystopian world that reflects the threshold between memory and oblivion. You work as a test subject for Umbral Alchemy, a company researching stones with mysterious properties: strange materials that only take shape when a ray of light hits them.',
    facts: [
      { term: 'Genre', detail: 'First-person puzzle' },
      { term: 'Released', detail: '6 June 2025' },
      { term: 'Platform', detail: 'Windows · Steam' },
      { term: 'Languages', detail: 'English, Spanish, Catalan' },
    ],
    soundtrack: 'Listen to the soundtrack on Spotify',
    artLink: 'Unlighted on Steam (opens in a new tab)',
    artAlt:
      'Unlighted key art: a desk lit by a lamp, covered in Umbral Alchemy research files, next to a dark crystal.',
    awardsLabel: 'Recognition',
    awards: [
      { result: 'Winner', title: 'Best Game', event: 'PIXEL Awards 2024' },
      { result: 'Finalist', title: 'Audience Award for Best Catalan Game', event: 'SAGA Awards 2025' },
      { result: 'Funded', title: 'Backed by our community', event: 'Kickstarter' },
    ],
  },
  light: {
    title: 'Only light makes it real.',
    body: 'Use the light and every device Umbral Alchemy puts at your disposal to pass the tests and learn the truth. Scan the Umbralita to find it, then light it up to make it materialize.',
    hintPointer: 'Move your cursor over the room to light it',
    hintTouch: 'Scroll or touch the room to light it',
    alt: 'In-game view of the Umbral Alchemy test hall: an Umbralita crystal on a pedestal between two spotlights.',
  },
  memo: {
    title: 'Will you be the ultimate test subject?',
    text: 'If you decide to undertake this long and hard trip with us, you will discover a great secret hidden from humanity. Everything you see here is totally confidential, so we ask for complete discretion. If you manage to get out, of course.',
    confidential: 'Confidential',
    alt: 'A dark violet Umbralita crystal standing in a corridor of the Umbral Alchemy facility.',
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
  services: {
    title: 'Your project, made playable.',
    intro:
      'Beyond our own games, we design and develop projects on demand. From a full game to a microgame for a campaign, an interactive activity or a gamified experience, we take care of everything: concept, design, art, programming and sound.',
    items: {
      games: {
        title: 'Custom games',
        body: 'Complete video games designed around your idea, brand or story, from the first prototype to release.',
      },
      microgames: {
        title: 'Microgames',
        body: 'Short, instantly playable games for campaigns, events, websites and social media.',
      },
      interactive: {
        title: 'Interactive activities',
        body: 'Playful experiences for museums, classrooms, fairs and exhibitions, where people learn by playing.',
      },
      gamification: {
        title: 'Gamification',
        body: 'Game mechanics applied to training, onboarding or loyalty, so people actually want to take part.',
      },
    },
    pick: 'Request',
  },
  contact: {
    title: 'Get in touch',
    intro: 'Have a project in mind, a question about Unlighted or just want to say hi? Write to us.',
    form: {
      title: 'Tell us about your project',
      name: 'Name',
      email: 'Email',
      company: 'Company or organization',
      optional: 'optional',
      type: 'What do you need?',
      other: 'Something else',
      message: 'Tell us about the idea, timing and budget',
      submit: 'Send request',
      note: 'Sending opens your email app with the request ready to go.',
      required: 'Please fill in this field.',
      invalidEmail: 'Enter a valid email address.',
      sentTitle: 'Almost there',
      sentBody: "Your email app should have opened with your request. If it didn't, write to us at",
      again: 'Edit the request',
      subject: 'Project request',
      bodyIntro: 'Hi Ginuh Games,',
      fieldsLabel: {
        name: 'Name',
        email: 'Email',
        company: 'Company',
        type: 'Project type',
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
    rights: 'All rights reserved.',
    made: 'Made with care in Barcelona.',
    top: 'Back to top',
  },
};

export type Dictionary = typeof en;
