import type { Dictionary } from './en';

export const ca: Dictionary = {
  meta: {
    title: 'Ginuh Games — Estudi independent de videojocs de Barcelona',
    description:
      "Ginuh Games és un estudi independent de videojocs de Barcelona. Creem els nostres propis jocs, com Unlighted, i desenvolupem jocs, microjocs, activitats interactives i gamificacions a mida.",
  },
  common: {
    newTab: "(s'obre en una pestanya nova)",
    getOnSteam: 'Aconsegueix Unlighted a Steam',
    playDemo: 'Juga la demo gratis',
    startProject: 'Comença un projecte',
    skip: 'Salta al contingut',
  },
  nav: {
    sections: {
      unlighted: 'Unlighted',
      studio: 'Estudi',
      team: 'Equip',
      services: 'Serveis',
      contact: 'Contacte',
    },
    cta: 'Aconsegueix Unlighted',
    home: 'Ginuh Games, torna a dalt',
    main: 'Principal',
    mobile: 'Mòbil',
    open: 'Obre el menú',
    close: 'Tanca el menú',
    language: 'Idioma',
  },
  hero: {
    lead: 'Un estudi independent de videojocs de Barcelona. Creem els nostres propis jocs i desenvolupem jocs, microjocs i experiències interactives a mida.',
    status: 'Ja disponible a Steam',
    opensSteam: "(obre Steam en una pestanya nova)",
  },
  game: {
    summary:
      "Un joc de trencaclosques en primera persona ambientat en un món distòpic que reflecteix el llindar entre el record i l'oblit. Encarnes un subjecte de proves d'Umbral Alchemy, una empresa que investiga pedres amb propietats misterioses: materials estranys que només prenen forma quan els toca un raig de llum.",
    facts: [
      { term: 'Gènere', detail: 'Trencaclosques en primera persona' },
      { term: 'Llançament', detail: '6 de juny de 2025' },
      { term: 'Plataforma', detail: 'Windows · Steam' },
      { term: 'Idiomes', detail: 'Anglès, castellà, català' },
    ],
    soundtrack: 'Escolta la banda sonora a Spotify',
    artLink: "Unlighted a Steam (s'obre en una pestanya nova)",
    artAlt:
      "Art principal d'Unlighted: un escriptori il·luminat per un llum, ple d'informes de recerca d'Umbral Alchemy, al costat d'un cristall fosc.",
    awardsLabel: 'Reconeixements',
    awards: [
      { result: 'Guanyador', title: 'Millor Joc', event: 'PIXEL Awards 2024' },
      { result: 'Finalista', title: 'Premi del Públic al Millor Joc Català', event: 'SAGA Awards 2025' },
      { result: 'Finançat', title: 'Gràcies a la nostra comunitat', event: 'Kickstarter' },
    ],
  },
  light: {
    title: 'Només la llum ho fa real.',
    body: "Fes servir la llum i tots els dispositius que Umbral Alchemy posa a la teva disposició per superar les proves i descobrir la veritat. Escaneja la Umbralita per localitzar-la i il·lumina-la perquè es materialitzi.",
    hintPointer: 'Mou el cursor per la sala per il·luminar-la',
    hintTouch: "Desplaça't o toca la sala per il·luminar-la",
    alt: "Vista del joc de la sala de proves d'Umbral Alchemy: un cristall d'Umbralita sobre un pedestal entre dos focus.",
  },
  memo: {
    title: 'Seràs el subjecte de proves definitiu?',
    text: 'Si decideixes emprendre aquest llarg i dur viatge amb nosaltres, descobriràs un gran secret amagat a la humanitat. Tot el que vegis aquí és totalment confidencial, així que et demanem la màxima discreció. Si és que aconsegueixes sortir, és clar.',
    confidential: 'Confidencial',
    alt: "Un cristall violeta fosc d'Umbralita en un passadís de les instal·lacions d'Umbral Alchemy.",
  },
  studio: {
    title: 'Un petit estudi on la imaginació es converteix en joc.',
    paragraphs: [
      'Som tres amics als quals ens encanta fer jocs junts, sempre mirant més enllà i intentant emocionar el jugador amb una gran narrativa.',
      "Amants del disseny de jocs i de la narrativa, combinats amb un bon art d'entorns perquè cada joc se senti únic. Creiem que un bon disseny és la clau d'un bon videojoc, i sempre intentem estar a l'altura.",
    ],
    nameLabel: "D'on ve el nostre nom",
    foxAlt: 'Logotip de la guineu de Ginuh Games',
    meaning: 'nom femení · en anglès, fox',
    story:
      "Durant el primer any d'universitat havíem de formar un grup i triar un nom. La guineu, un animal aventurer i àgil, ens va fascinar des del principi, així que vam batejar el grup amb el seu nom. Des d'aleshores, som Ginuh Games.",
  },
  team: {
    title: "L'equip",
    photoAlt:
      "En Juan de Dios, l'Erik i en David, l'equip de Ginuh Games, somrient en un terrat amb la Sagrada Família al darrere.",
    roles: {
      juande: "Artista d'entorns · Artista 3D de props",
      erik: "Dissenyador de nivells i d'àudio · Programador · CTO",
      david: 'Dissenyador narratiu i de nivells · Programador · Project Manager',
    },
    socialLabel: (name: string, network: string) => `${name} a ${network}`,
  },
  services: {
    title: 'El teu projecte, convertit en joc.',
    intro:
      "A més dels nostres propis jocs, dissenyem i desenvolupem projectes a mida. Des d'un joc complet fins a un microjoc per a una campanya, una activitat interactiva o una experiència gamificada: ens encarreguem de tot, del concepte i el disseny a l'art, la programació i el so.",
    items: {
      games: {
        title: 'Jocs a mida',
        body: 'Videojocs complets dissenyats a partir de la teva idea, la teva marca o la teva història, del primer prototip al llançament.',
      },
      microgames: {
        title: 'Microjocs',
        body: "Jocs curts i jugables a l'instant per a campanyes, esdeveniments, webs i xarxes socials.",
      },
      interactive: {
        title: 'Activitats interactives',
        body: "Experiències lúdiques per a museus, aules, fires i exposicions, on s'aprèn jugant.",
      },
      gamification: {
        title: 'Gamificació',
        body: "Mecàniques de joc aplicades a la formació, l'onboarding o la fidelització, perquè la gent vulgui participar.",
      },
    },
    pick: 'Sol·licita',
  },
  contact: {
    title: 'Parlem',
    intro: 'Tens un projecte al cap, una pregunta sobre Unlighted o simplement ens vols saludar? Escriu-nos.',
    form: {
      title: "Explica'ns el teu projecte",
      name: 'Nom',
      email: 'Correu electrònic',
      company: 'Empresa o organització',
      optional: 'opcional',
      type: 'Què necessites?',
      other: 'Una altra cosa',
      message: "Parla'ns de la idea, els terminis i el pressupost",
      submit: 'Envia la sol·licitud',
      note: "En enviar, s'obrirà la teva aplicació de correu amb la sol·licitud a punt.",
      required: 'Omple aquest camp.',
      invalidEmail: 'Introdueix un correu electrònic vàlid.',
      sentTitle: 'Gairebé hi som',
      sentBody: "La teva aplicació de correu s'hauria d'haver obert amb la sol·licitud. Si no ha estat així, escriu-nos a",
      again: 'Edita la sol·licitud',
      subject: 'Sol·licitud de projecte',
      bodyIntro: 'Hola, Ginuh Games:',
      fieldsLabel: {
        name: 'Nom',
        email: 'Correu',
        company: 'Empresa',
        type: 'Tipus de projecte',
        message: 'Missatge',
      },
    },
    email: 'Correu',
    copy: 'Copia el correu',
    copied: 'Copiat',
    copiedStatus: 'Correu copiat al porta-retalls',
    community: 'Comunitat',
    communityText: "Uneix-te al nostre servidor de Discord per seguir l'estudi i jugar amb nosaltres.",
    joinDiscord: 'Uneix-te al nostre Discord',
    studio: 'Estudi',
    location: 'Barcelona',
    follow: 'Segueix-nos',
  },
  footer: {
    nav: 'Peu de pàgina',
    rights: 'Tots els drets reservats.',
    made: 'Fet amb estima a Barcelona.',
    top: 'Torna a dalt',
  },
};
