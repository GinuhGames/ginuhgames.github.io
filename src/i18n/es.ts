import type { Dictionary } from './en';

export const es: Dictionary = {
  meta: {
    title: 'Ginuh Games — Estudio independiente de videojuegos de Barcelona',
    description:
      'Ginuh Games es un estudio independiente de videojuegos de Barcelona. Creamos nuestros propios juegos, como Unlighted, y desarrollamos juegos, microjuegos, actividades interactivas y gamificaciones a medida.',
  },
  common: {
    newTab: '(se abre en una pestaña nueva)',
    getOnSteam: 'Consigue Unlighted en Steam',
    playDemo: 'Juega la demo gratis',
    startProject: 'Empieza un proyecto',
    skip: 'Saltar al contenido',
  },
  nav: {
    sections: {
      unlighted: 'Unlighted',
      studio: 'Estudio',
      team: 'Equipo',
      services: 'Servicios',
      contact: 'Contacto',
    },
    cta: 'Consigue Unlighted',
    home: 'Ginuh Games, volver arriba',
    main: 'Principal',
    mobile: 'Móvil',
    open: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Idioma',
  },
  hero: {
    lead: 'Un estudio independiente de videojuegos de Barcelona. Creamos nuestros propios juegos y desarrollamos juegos, microjuegos y experiencias interactivas a medida.',
    status: 'Ya disponible en Steam',
    opensSteam: '(abre Steam en una pestaña nueva)',
  },
  game: {
    summary:
      'Un juego de puzles en primera persona ambientado en un mundo distópico que refleja el umbral entre el recuerdo y el olvido. Encarnas a un sujeto de pruebas de Umbral Alchemy, una empresa que investiga piedras con propiedades misteriosas: materiales extraños que solo toman forma cuando les alcanza un rayo de luz.',
    facts: [
      { term: 'Género', detail: 'Puzles en primera persona' },
      { term: 'Lanzamiento', detail: '6 de junio de 2025' },
      { term: 'Plataforma', detail: 'Windows · Steam' },
      { term: 'Idiomas', detail: 'Inglés, castellano, catalán' },
    ],
    soundtrack: 'Escucha la banda sonora en Spotify',
    artLink: 'Unlighted en Steam (se abre en una pestaña nueva)',
    artAlt:
      'Arte principal de Unlighted: un escritorio iluminado por una lámpara, lleno de informes de investigación de Umbral Alchemy, junto a un cristal oscuro.',
    awardsLabel: 'Reconocimientos',
    awards: [
      { result: 'Ganador', title: 'Mejor Juego', event: 'PIXEL Awards 2024' },
      { result: 'Finalista', title: 'Premio del Público al Mejor Juego Catalán', event: 'SAGA Awards 2025' },
      { result: 'Financiado', title: 'Gracias a nuestra comunidad', event: 'Kickstarter' },
    ],
  },
  light: {
    title: 'Solo la luz lo hace real.',
    body: 'Usa la luz y todos los dispositivos que Umbral Alchemy pone a tu disposición para superar las pruebas y descubrir la verdad. Escanea la Umbralita para localizarla e ilumínala para que se materialice.',
    hintPointer: 'Mueve el cursor por la sala para iluminarla',
    hintTouch: 'Desplázate o toca la sala para iluminarla',
    alt: 'Vista del juego de la sala de pruebas de Umbral Alchemy: un cristal de Umbralita sobre un pedestal entre dos focos.',
  },
  memo: {
    title: '¿Serás el sujeto de pruebas definitivo?',
    text: 'Si decides emprender este largo y duro viaje con nosotros, descubrirás un gran secreto oculto a la humanidad. Todo lo que veas aquí es totalmente confidencial, así que te pedimos la máxima discreción. Si es que consigues salir, claro.',
    confidential: 'Confidencial',
    alt: 'Un cristal violeta oscuro de Umbralita en un pasillo de las instalaciones de Umbral Alchemy.',
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
  services: {
    title: 'Tu proyecto, convertido en juego.',
    intro:
      'Además de nuestros propios juegos, diseñamos y desarrollamos proyectos a medida. Desde un juego completo hasta un microjuego para una campaña, una actividad interactiva o una experiencia gamificada: nos encargamos de todo, del concepto y el diseño al arte, la programación y el sonido.',
    items: {
      games: {
        title: 'Juegos a medida',
        body: 'Videojuegos completos diseñados a partir de tu idea, tu marca o tu historia, del primer prototipo al lanzamiento.',
      },
      microgames: {
        title: 'Microjuegos',
        body: 'Juegos cortos y jugables al instante para campañas, eventos, webs y redes sociales.',
      },
      interactive: {
        title: 'Actividades interactivas',
        body: 'Experiencias lúdicas para museos, aulas, ferias y exposiciones, en las que se aprende jugando.',
      },
      gamification: {
        title: 'Gamificación',
        body: 'Mecánicas de juego aplicadas a la formación, el onboarding o la fidelización, para que la gente quiera participar.',
      },
    },
    pick: 'Solicitar',
  },
  contact: {
    title: 'Hablemos',
    intro: '¿Tienes un proyecto en mente, una pregunta sobre Unlighted o simplemente quieres saludarnos? Escríbenos.',
    form: {
      title: 'Cuéntanos tu proyecto',
      name: 'Nombre',
      email: 'Correo electrónico',
      company: 'Empresa u organización',
      optional: 'opcional',
      type: '¿Qué necesitas?',
      other: 'Otra cosa',
      message: 'Háblanos de la idea, los plazos y el presupuesto',
      submit: 'Enviar solicitud',
      note: 'Al enviar se abrirá tu aplicación de correo con la solicitud lista.',
      required: 'Rellena este campo.',
      invalidEmail: 'Introduce un correo electrónico válido.',
      sentTitle: 'Ya casi está',
      sentBody: 'Tu aplicación de correo debería haberse abierto con la solicitud. Si no ha sido así, escríbenos a',
      again: 'Editar la solicitud',
      subject: 'Solicitud de proyecto',
      bodyIntro: 'Hola, Ginuh Games:',
      fieldsLabel: {
        name: 'Nombre',
        email: 'Correo',
        company: 'Empresa',
        type: 'Tipo de proyecto',
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
    rights: 'Todos los derechos reservados.',
    made: 'Hecho con cariño en Barcelona.',
    top: 'Volver arriba',
  },
};
