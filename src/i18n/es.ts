import type { ProjectCopy, ProjectId } from '../content/projects';
import type { BudgetId } from '../content/site';
import type { Dictionary } from './en';

const projectItems: Record<ProjectId, ProjectCopy> = {
  unlighted: {
    tag: 'Mejor Juego · PIXEL Awards 2024',
    summary:
      'Un juego de puzles en primera persona ambientado en un mundo distópico que refleja el umbral entre el recuerdo y el olvido. Encarnas a un sujeto de pruebas de Umbral Alchemy, una empresa que investiga piedras con propiedades misteriosas: materiales extraños que solo toman forma cuando les alcanza un rayo de luz.',
    facts: [
      { term: 'Género', detail: 'Puzles en primera persona' },
      { term: 'Lanzamiento', detail: '6 de junio de 2025' },
      { term: 'Plataforma', detail: 'Windows · Steam' },
      { term: 'Idiomas', detail: 'Inglés, castellano, catalán' },
    ],
    artAlt:
      'Arte principal de Unlighted: un escritorio iluminado por una lámpara, lleno de informes de investigación de Umbral Alchemy, junto a un cristal oscuro.',
    primary: 'Consigue Unlighted en Steam',
    secondary: 'Juega la demo gratis',
    soundtrack: 'Escucha la banda sonora en Spotify',
    awards: [
      { result: 'Ganador', title: 'Mejor Juego', event: 'PIXEL Awards 2024' },
      { result: 'Finalista', title: 'Premio del Público al Mejor Juego Catalán', event: 'SAGA Awards 2025' },
      { result: 'Financiado', title: 'Gracias a nuestra comunidad', event: 'Kickstarter' },
    ],
  },
  'witch-you': {
    tag: 'Próximamente en Steam',
    summary:
      'Un juego cooperativo en primera persona en el que tú y tu compañero sois dos brujas al frente de vuestra propia botica. Restauradla, mejoradla y mantenedla abierta tantos días como podáis, viajando al Infierno de Dante en busca de los ingredientes de vuestras pociones.',
    facts: [
      { term: 'Género', detail: 'Gestión roguelike' },
      { term: 'Jugadores', detail: 'Cooperativo online' },
      { term: 'Lanzamiento', detail: 'Por anunciar' },
      { term: 'Plataforma', detail: 'Windows · Steam' },
    ],
    artAlt:
      'Captura de Witch You! en el Infierno de Dante: un árbol pálido y retorcido bajo un cielo de formas blancas y carmesí, rodeado de siluetas de almas.',
    primary: 'Añadir a mi lista de deseados',
  },
};

const budget: Record<BudgetId, string> = {
  under5: 'Menos de 5.000 €',
  '5to10': 'De 5.000 a 10.000 €',
  '10to20': 'De 10.000 a 20.000 €',
  '20to50': 'De 20.000 a 50.000 €',
  over50: 'Más de 50.000 €',
  unsure: 'No lo sé todavía',
};

export const es: Dictionary = {
  meta: {
    title: 'Ginuh Games — Estudio independiente de videojuegos de Barcelona',
    description:
      'Ginuh Games es un estudio independiente de videojuegos de Barcelona. Creamos nuestros propios juegos, como Unlighted y Witch You!, y desarrollamos juegos, microjuegos, actividades interactivas y gamificaciones a medida.',
  },
  common: {
    newTab: '(se abre en una pestaña nueva)',
    seeProjects: 'Ver nuestros proyectos',
    steamGames: 'Nuestros juegos en Steam',
    startProject: 'Empieza un proyecto',
    skip: 'Saltar al contenido',
  },
  nav: {
    sections: {
      projects: 'Proyectos',
      studio: 'Estudio',
      team: 'Equipo',
      contact: 'Contacto',
    },
    home: 'Ginuh Games, volver arriba',
    main: 'Principal',
    mobile: 'Móvil',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Idioma',
  },
  hero: {
    lead: 'Un estudio independiente de videojuegos de Barcelona. Creamos nuestros propios juegos y desarrollamos juegos, microjuegos y experiencias interactivas a medida.',
  },
  projects: {
    ownTitle: 'Nuestros proyectos',
    steamAll: 'Todos nuestros juegos en Steam',
    onDemandTitle: 'Proyectos bajo demanda',
    onDemandIntro:
      'Además de nuestros propios juegos, diseñamos y desarrollamos proyectos a medida. Desde un juego completo hasta un microjuego para una campaña, una actividad interactiva o una experiencia gamificada: nos encargamos de todo, del concepto y el diseño al arte, la programación y el sonido.',
    servicesLabel: 'Qué hacemos',
    services: {
      games: 'Juegos a medida',
      microgames: 'Microjuegos',
      interactive: 'Actividades interactivas',
      gamification: 'Gamificación',
    },
    hintPointer: 'Mueve el cursor por la imagen para iluminarla',
    hintTouch: 'Desplázate o toca la imagen para iluminarla',
    awardsLabel: 'Reconocimientos',
    items: projectItems,
  },
  studio: {
    title: 'Un pequeño estudio donde la imaginación se convierte en juego.',
    paragraphs: [
      'Somos tres amigos a los que nos encanta hacer juegos juntos, siempre mirando más allá e intentando emocionar al jugador con una gran narrativa.',
      'Amantes del diseño de juegos y de la narrativa, combinados con un buen arte de entornos para que cada juego se sienta único. Creemos que un buen diseño es la clave de un buen videojuego, y siempre intentamos estar a la altura.',
    ],
    nameLabel: 'De dónde viene nuestro nombre',
    foxAlt: 'Logo del zorro de Ginuh Games',
    meaning: 'sustantivo, en catalán: zorro',
    story:
      'En nuestro primer año de universidad teníamos que formar un grupo y elegir un nombre. El zorro, un animal aventurero y ágil, nos fascinó desde el principio, así que bautizamos el grupo con su nombre en catalán. Desde entonces, somos Ginuh Games.',
  },
  team: {
    title: 'El equipo',
    photoAlt:
      'Juan de Dios, Erik y David, el equipo de Ginuh Games, sonriendo en una azotea con la Sagrada Família detrás.',
    roles: {
      juande: 'Artista de entornos · Artista 3D de props',
      erik: 'Diseñador de niveles y de audio · Programador · CTO',
      david: 'Diseñador narrativo y de niveles · Programador · Project Manager',
    },
    socialLabel: (name: string, network: string) => `${name} en ${network}`,
  },
  contact: {
    title: 'Hablemos',
    intro: '¿Tienes un proyecto en mente, una pregunta sobre nuestros juegos o simplemente quieres saludarnos? Escríbenos.',
    form: {
      title: 'Cuéntanos tu proyecto',
      name: 'Nombre',
      email: 'Correo electrónico',
      company: 'Empresa u organización',
      optional: 'opcional',
      budgetLegend: 'Presupuesto disponible',
      budget,
      budgetRequired: 'Elige un rango de presupuesto.',
      message: 'Háblanos de la idea y de los plazos',
      consentBefore: 'He leído y acepto la',
      consentLink: 'política de privacidad',
      consentAfter: '.',
      consentRequired: 'Acepta la política de privacidad para enviar tu solicitud.',
      privacy:
        'Ginuh Games, S.C.P. usará tus datos solo para responder a tu solicitud, con tu consentimiento. Solo acceden a ellos nuestros proveedores de alojamiento y de correo. Puedes consultarlos, rectificarlos o suprimirlos cuando quieras escribiendo a ginuhgames@gmail.com.',
      submit: 'Enviar solicitud',
      sending: 'Enviando…',
      required: 'Rellena este campo.',
      invalidEmail: 'Introduce un correo electrónico válido.',
      sentTitle: 'Solicitud enviada',
      sentBody: (name: string, email: string) =>
        `Gracias, ${name}. Te responderemos a ${email} lo antes posible.`,
      again: 'Enviar otra solicitud',
      errorBody: 'No hemos podido enviar tu solicitud. Vuelve a intentarlo en un momento o envíala desde tu correo:',
      errorLink: 'Abrirla en mi aplicación de correo',
      subject: 'Solicitud de proyecto',
      bodyIntro: 'Hola, Ginuh Games:',
      fieldsLabel: {
        name: 'Nombre',
        email: 'Correo',
        company: 'Empresa',
        budget: 'Presupuesto',
        message: 'Mensaje',
      },
    },
    email: 'Correo',
    copy: 'Copiar correo',
    copied: 'Copiado',
    copiedStatus: 'Correo copiado al portapapeles',
    community: 'Comunidad',
    communityText: 'Únete a nuestro servidor de Discord para seguir al estudio y jugar con nosotros.',
    joinDiscord: 'Únete a nuestro Discord',
    studio: 'Estudio',
    location: 'Barcelona, España',
    follow: 'Síguenos',
  },
  footer: {
    nav: 'Pie de página',
    legal: 'Información legal',
    rights: 'Todos los derechos reservados.',
    made: 'Hecho con cariño en Barcelona.',
    top: 'Volver arriba',
    privacyLink: 'Política de privacidad',
    legalLink: 'Aviso legal',
  },
  notFound: {
    metaTitle: 'Página no encontrada — Ginuh Games',
    title: 'Esta sala está vacía.',
    body: 'La página que buscas no existe o se ha movido. Ni con la luz encendida hay nada que encontrar aquí.',
    home: 'Volver al inicio',
    hintPointer: 'Mueve el cursor para iluminar la sala',
    hintTouch: 'Toca la pantalla para iluminar la sala',
  },
};
