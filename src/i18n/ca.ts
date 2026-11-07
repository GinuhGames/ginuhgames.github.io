import type { ProjectCopy, ProjectId } from '../content/projects';
import type { BudgetId } from '../content/site';
import type { Dictionary } from './en';

const projectItems: Record<ProjectId, ProjectCopy> = {
  unlighted: {
    tag: 'Millor Joc · PIXEL Awards 2024',
    summary:
      "Un joc de trencaclosques en primera persona ambientat en un món distòpic que reflecteix el llindar entre el record i l'oblit. Encarnes un subjecte de proves d'Umbral Alchemy, una empresa que investiga pedres amb propietats misterioses: materials estranys que només prenen forma quan els toca un raig de llum.",
    facts: [
      { term: 'Gènere', detail: 'Trencaclosques en primera persona' },
      { term: 'Llançament', detail: '6 de juny de 2025' },
      { term: 'Plataforma', detail: 'Windows · Steam' },
      { term: 'Idiomes', detail: 'Anglès, castellà, català' },
    ],
    artAlt:
      "Art principal d'Unlighted: un escriptori il·luminat per un llum, ple d'informes de recerca d'Umbral Alchemy, al costat d'un cristall fosc.",
    primary: 'Aconsegueix Unlighted a Steam',
    secondary: 'Juga la demo gratis',
    soundtrack: 'Escolta la banda sonora a Spotify',
    awards: [
      { result: 'Guanyador', title: 'Millor Joc', event: 'PIXEL Awards 2024' },
      { result: 'Finalista', title: 'Premi del Públic al Millor Joc Català', event: 'SAGA Awards 2025' },
      { result: 'Finançat', title: 'Gràcies a la nostra comunitat', event: 'Kickstarter' },
    ],
  },
  'witch-you': {
    tag: 'Aviat a Steam',
    summary:
      "Un joc cooperatiu en primera persona en què tu i el teu company sou dues bruixes al capdavant de la vostra pròpia apotecaria. Restaureu-la, milloreu-la i mantingueu-la oberta tants dies com pugueu, viatjant a l'Infern de Dant a buscar els ingredients de les vostres pocions.",
    facts: [
      { term: 'Gènere', detail: 'Gestió roguelike' },
      { term: 'Jugadors', detail: 'Cooperatiu en línia' },
      { term: 'Llançament', detail: 'Per anunciar' },
      { term: 'Plataforma', detail: 'Windows · Steam' },
    ],
    artAlt:
      "Captura de Witch You! a l'Infern de Dant: un arbre pàl·lid i retorçat sota un cel de formes blanques i carmesí, envoltat de siluetes d'ànimes.",
    primary: 'Afegeix-lo a la llista de desitjos',
  },
};

const budget: Record<BudgetId, string> = {
  under5: 'Menys de 5.000 €',
  '5to10': 'De 5.000 a 10.000 €',
  '10to20': 'De 10.000 a 20.000 €',
  '20to50': 'De 20.000 a 50.000 €',
  over50: 'Més de 50.000 €',
  unsure: 'Encara no ho sé',
};

export const ca: Dictionary = {
  meta: {
    title: 'Ginuh Games — Estudi independent de videojocs de Barcelona',
    description:
      'Ginuh Games és un estudi independent de videojocs de Barcelona. Creem els nostres propis jocs, com Unlighted i Witch You!, i desenvolupem jocs, microjocs, activitats interactives i gamificacions a mida.',
  },
  common: {
    newTab: "(s'obre en una pestanya nova)",
    seeProjects: 'Mira els nostres projectes',
    steamGames: 'Els nostres jocs a Steam',
    startProject: 'Comença un projecte',
    skip: 'Salta al contingut',
  },
  nav: {
    sections: {
      projects: 'Projectes',
      studio: 'Estudi',
      team: 'Equip',
      contact: 'Contacte',
    },
    home: 'Ginuh Games, torna a dalt',
    main: 'Principal',
    mobile: 'Mòbil',
    open: 'Obre el menú',
    close: 'Tanca el menú',
    language: 'Idioma',
  },
  hero: {
    lead: 'Un estudi independent de videojocs de Barcelona. Creem els nostres propis jocs i desenvolupem jocs, microjocs i experiències interactives a mida.',
  },
  projects: {
    ownTitle: 'Els nostres projectes',
    steamAll: 'Tots els nostres jocs a Steam',
    onDemandTitle: 'Projectes per encàrrec',
    onDemandIntro:
      "A més dels nostres propis jocs, dissenyem i desenvolupem projectes a mida. Des d'un joc complet fins a un microjoc per a una campanya, una activitat interactiva o una experiència gamificada: ens encarreguem de tot, del concepte i el disseny a l'art, la programació i el so.",
    servicesLabel: 'Què fem',
    services: {
      games: 'Jocs a mida',
      microgames: 'Microjocs',
      interactive: 'Activitats interactives',
      gamification: 'Gamificació',
    },
    hintPointer: 'Mou el cursor per la imatge per il·luminar-la',
    hintTouch: "Desplaça't o toca la imatge per il·luminar-la",
    awardsLabel: 'Reconeixements',
    items: projectItems,
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
  contact: {
    title: 'Parlem',
    intro: 'Tens un projecte al cap, una pregunta sobre els nostres jocs o simplement ens vols saludar? Escriu-nos.',
    form: {
      title: "Explica'ns el teu projecte",
      name: 'Nom',
      email: 'Correu electrònic',
      company: 'Empresa o organització',
      optional: 'opcional',
      budgetLegend: 'Pressupost disponible',
      budget,
      budgetRequired: 'Tria un rang de pressupost.',
      message: "Parla'ns de la idea i dels terminis",
      consentBefore: 'He llegit i accepto la',
      consentLink: 'política de privadesa',
      consentAfter: '.',
      consentRequired: 'Accepta la política de privadesa per enviar la sol·licitud.',
      privacy:
        "Ginuh Games, S.C.P. farà servir les teves dades només per respondre la teva sol·licitud, amb el teu consentiment. Només hi accedeixen els nostres proveïdors d'allotjament i de correu. Pots consultar-les, rectificar-les o suprimir-les quan vulguis escrivint a ginuhgames@gmail.com.",
      submit: 'Envia la sol·licitud',
      sending: 'Enviant…',
      required: 'Omple aquest camp.',
      invalidEmail: 'Introdueix un correu electrònic vàlid.',
      sentTitle: 'Sol·licitud enviada',
      sentBody: (name: string, email: string) =>
        `Gràcies, ${name}. Et respondrem a ${email} tan aviat com puguem.`,
      again: 'Envia una altra sol·licitud',
      errorBody: "No hem pogut enviar la teva sol·licitud. Torna-ho a provar d'aquí a una estona o envia-la des del teu correu:",
      errorLink: 'Obre-la a la meva aplicació de correu',
      subject: 'Sol·licitud de projecte',
      bodyIntro: 'Hola, Ginuh Games:',
      fieldsLabel: {
        name: 'Nom',
        email: 'Correu',
        company: 'Empresa',
        budget: 'Pressupost',
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
    legal: 'Informació legal',
    rights: 'Tots els drets reservats.',
    made: 'Fet amb estima a Barcelona.',
    top: 'Torna a dalt',
    privacyLink: 'Política de privadesa',
    legalLink: 'Avís legal',
  },
  notFound: {
    metaTitle: 'Pàgina no trobada — Ginuh Games',
    title: 'Aquesta sala és buida.',
    body: "La pàgina que busques no existeix o s'ha mogut. Ni amb el llum encès no hi ha res a trobar aquí.",
    home: "Torna a l'inici",
    hintPointer: 'Mou el cursor per il·luminar la sala',
    hintTouch: 'Toca la pantalla per il·luminar la sala',
  },
};
