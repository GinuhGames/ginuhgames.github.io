/**
 * Privacy policy and legal notice, in each language.
 * A paragraph is a string; a list is an array of strings. In the text,
 * ginuhgames@gmail.com and www.aepd.es become links, and [[privacy]] links the
 * privacy policy using its title.
 *
 * Review these texts with the studio's adviser before relying on them.
 */
import { company, links } from '../../content/site';
import type { LegalDoc } from '../../content/legal';
import type { Locale } from '../../i18n/I18nProvider';

export type Block = string | string[];
export type LegalSection = { heading: string; body: Block[] };
export type LegalPage = { title: string; sections: LegalSection[] };
export type LegalCopy = Record<LegalDoc, LegalPage> & { updated: string; label: string };

const address = (locale: Locale) => `${company.street}, ${company.city}, ${company.country[locale]}`;

const es: LegalCopy = {
  label: 'Información legal',
  updated: 'Última actualización: 7 de noviembre de 2026',
  privacy: {
    title: 'Política de privacidad',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        body: [
          [
            `Titular: ${company.name}`,
            `NIF: ${company.nif}`,
            `Domicilio: ${address('es')}`,
            `Correo electrónico: ${links.email}`,
          ],
        ],
      },
      {
        heading: 'Qué datos tratamos',
        body: [
          'Cuando nos escribes a través del formulario de contacto tratamos los datos que nos facilitas: nombre, correo electrónico, empresa u organización (si la indicas), presupuesto aproximado y el contenido de tu mensaje, además del idioma en el que navegas por la web.',
          'Si nos escribes directamente por correo electrónico o nos llamas, tratamos los datos que incluyas en esa comunicación.',
        ],
      },
      {
        heading: 'Para qué los usamos',
        body: [
          'Para atender y responder tu solicitud o consulta y, si nos pides un presupuesto, para preparar y comentar contigo la propuesta. No elaboramos perfiles ni tomamos decisiones automatizadas, y no te enviaremos comunicaciones comerciales sin tu permiso.',
        ],
      },
      {
        heading: 'Base legal',
        body: [
          'Tu consentimiento, que nos das al marcar la casilla y enviar el formulario (artículo 6.1.a del Reglamento General de Protección de Datos) y, cuando nos pides un presupuesto, la aplicación de medidas precontractuales a petición tuya (artículo 6.1.b). Puedes retirar tu consentimiento en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior.',
        ],
      },
      {
        heading: 'Cuánto tiempo los conservamos',
        body: [
          'Mientras dure la conversación contigo y, después, como máximo un año desde el último contacto. Si llegamos a trabajar juntos, los conservaremos durante la relación y durante los plazos que exija la ley, como los de la normativa fiscal.',
        ],
      },
      {
        heading: 'Quién más accede a tus datos',
        body: [
          'No cedemos tus datos a terceros, salvo obligación legal. Para que la web y el formulario funcionen utilizamos proveedores que los tratan por cuenta nuestra y siguiendo nuestras instrucciones:',
          [
            'Vercel Inc., alojamiento de la web y del formulario (Estados Unidos).',
            'Resend, envío del correo que genera el formulario (Estados Unidos).',
            'Google, Gmail, el buzón en el que recibimos y respondemos las solicitudes.',
          ],
          'Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En esos casos, las transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión Europea.',
        ],
      },
      {
        heading: 'Tus derechos',
        body: [
          'Puedes pedirnos el acceso a tus datos, su rectificación o supresión, oponerte a su tratamiento o solicitar su limitación y su portabilidad, así como retirar tu consentimiento. Escríbenos a ginuhgames@gmail.com indicando qué derecho quieres ejercer.',
          'Si consideras que no hemos atendido bien tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
        ],
      },
      {
        heading: 'Cookies y datos técnicos',
        body: [
          'Esta web no utiliza cookies de análisis ni de publicidad. Solo guarda en tu navegador (localStorage) el idioma que eliges, para mostrártelo la próxima vez; ese dato no sale de tu dispositivo.',
          'Nuestro proveedor de alojamiento puede registrar datos técnicos de las visitas, como la dirección IP, para garantizar la seguridad y el funcionamiento del servicio.',
        ],
      },
      {
        heading: 'Seguridad',
        body: [
          'Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: la web funciona con conexión cifrada (HTTPS) y solo los miembros del estudio acceden a las solicitudes.',
        ],
      },
      {
        heading: 'Cambios en esta política',
        body: ['Si cambiamos esta política, publicaremos aquí la nueva versión con su fecha.'],
      },
    ],
  },
  legal: {
    title: 'Aviso legal',
    sections: [
      {
        heading: 'Titular del sitio web',
        body: [
          'En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), te informamos de que ginuhgames.com pertenece a:',
          [
            `Titular: ${company.name}`,
            `NIF: ${company.nif}`,
            `Domicilio: ${address('es')}`,
            `Correo electrónico: ${links.email}`,
          ],
        ],
      },
      {
        heading: 'Objeto',
        body: [
          'Esta web presenta el estudio Ginuh Games, sus videojuegos y los servicios de desarrollo de juegos y experiencias interactivas a medida que ofrece, y permite ponerse en contacto con el estudio.',
        ],
      },
      {
        heading: 'Condiciones de uso',
        body: [
          'El acceso a la web es gratuito y no requiere registro. Al usarla te comprometes a hacerlo de forma lícita, sin dañar la web ni a terceros, y a no enviar en el formulario información falsa ni datos de otras personas sin su permiso.',
        ],
      },
      {
        heading: 'Propiedad intelectual e industrial',
        body: [
          'Los textos, imágenes, logotipos, diseños y demás contenidos de esta web, incluidos los juegos Unlighted y Witch You! y sus materiales, son propiedad de Ginuh Games o de sus legítimos titulares. No se permite reproducirlos, distribuirlos ni transformarlos sin autorización expresa, salvo para uso personal y privado.',
          'Las marcas de terceros que aparecen en la web, como Steam, Spotify o Discord, pertenecen a sus respectivos titulares.',
        ],
      },
      {
        heading: 'Enlaces a otras webs',
        body: [
          'La web incluye enlaces a sitios de terceros, como Steam, Spotify, Discord o redes sociales. Ginuh Games no controla esos sitios y no se hace responsable de sus contenidos ni de sus políticas de privacidad.',
        ],
      },
      {
        heading: 'Responsabilidad',
        body: [
          'Trabajamos para que la información de la web sea correcta y esté actualizada, pero no podemos garantizar que esté libre de errores ni que la web funcione sin interrupciones. Ginuh Games no responde de los daños derivados de un uso indebido de la web.',
        ],
      },
      {
        heading: 'Protección de datos',
        body: ['Cómo tratamos los datos personales que nos facilitas se explica en la [[privacy]].'],
      },
      {
        heading: 'Legislación aplicable',
        body: [
          'Este aviso legal se rige por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales que correspondan según la normativa aplicable.',
        ],
      },
    ],
  },
};

const en: LegalCopy = {
  label: 'Legal',
  updated: 'Last updated: 7 November 2026',
  privacy: {
    title: 'Privacy policy',
    sections: [
      {
        heading: 'Data controller',
        body: [
          [
            `Owner: ${company.name}`,
            `Tax ID (NIF): ${company.nif}`,
            `Address: ${address('en')}`,
            `Email: ${links.email}`,
          ],
        ],
      },
      {
        heading: 'What data we process',
        body: [
          'When you write to us through the contact form, we process the details you give us: your name, email address, company or organization (if you add it), approximate budget and the content of your message, as well as the language you browse the site in.',
          'If you email or call us directly, we process the details you include in that message.',
        ],
      },
      {
        heading: 'What we use it for',
        body: [
          'To handle and answer your request or question and, if you ask for a quote, to prepare and discuss the proposal with you. We do not build profiles or make automated decisions, and we will not send you marketing without your permission.',
        ],
      },
      {
        heading: 'Legal basis',
        body: [
          'Your consent, which you give by ticking the box and sending the form (Article 6(1)(a) of the General Data Protection Regulation) and, when you ask for a quote, steps taken at your request before entering into a contract (Article 6(1)(b)). You can withdraw your consent at any time, without affecting the lawfulness of earlier processing.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'For as long as our conversation lasts and, after that, for at most one year from the last contact. If we end up working together, we keep it for the duration of the relationship and for the periods the law requires, such as tax rules.',
        ],
      },
      {
        heading: 'Who else can access your data',
        body: [
          'We do not share your data with third parties unless the law requires it. To run the site and the form we use providers that process it on our behalf and under our instructions:',
          [
            'Vercel Inc., hosting for the site and the form (United States).',
            'Resend, delivery of the email the form generates (United States).',
            'Google, Gmail, the inbox where we receive and answer requests.',
          ],
          'Some of these providers may process data outside the European Economic Area. In those cases, transfers rely on the EU-US Data Privacy Framework or on the standard contractual clauses approved by the European Commission.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can ask us for access to your data, to correct or delete it, to object to its processing or to restrict it, and for its portability, and you can withdraw your consent. Write to ginuhgames@gmail.com saying which right you want to exercise.',
          'If you feel we have not handled your request properly, you can complain to the Spanish Data Protection Agency (www.aepd.es).',
        ],
      },
      {
        heading: 'Cookies and technical data',
        body: [
          'This site uses no analytics or advertising cookies. It only stores the language you choose in your browser (localStorage), to show it to you next time; that value never leaves your device.',
          'Our hosting provider may log technical data about visits, such as the IP address, to keep the service secure and working.',
        ],
      },
      {
        heading: 'Security',
        body: [
          'We apply reasonable technical and organizational measures to protect your data: the site runs over an encrypted connection (HTTPS) and only members of the studio can see requests.',
        ],
      },
      {
        heading: 'Changes to this policy',
        body: ['If we change this policy, we will publish the new version here with its date.'],
      },
    ],
  },
  legal: {
    title: 'Legal notice',
    sections: [
      {
        heading: 'Website owner',
        body: [
          'In accordance with Article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE), ginuhgames.com belongs to:',
          [
            `Owner: ${company.name}`,
            `Tax ID (NIF): ${company.nif}`,
            `Address: ${address('en')}`,
            `Email: ${links.email}`,
          ],
        ],
      },
      {
        heading: 'Purpose',
        body: [
          'This site presents the Ginuh Games studio, its video games and the custom game and interactive experience development it offers, and lets you get in touch with the studio.',
        ],
      },
      {
        heading: 'Terms of use',
        body: [
          'Access to the site is free and needs no registration. By using it you agree to do so lawfully, without harming the site or anyone else, and not to send false information or other people’s details without their permission through the form.',
        ],
      },
      {
        heading: 'Intellectual and industrial property',
        body: [
          'The texts, images, logos, designs and other content on this site, including the games Unlighted and Witch You! and their materials, belong to Ginuh Games or to their rightful owners. They may not be reproduced, distributed or transformed without express permission, except for personal and private use.',
          'Third-party trademarks shown on the site, such as Steam, Spotify or Discord, belong to their respective owners.',
        ],
      },
      {
        heading: 'Links to other sites',
        body: [
          'The site links to third-party sites such as Steam, Spotify, Discord and social networks. Ginuh Games does not control those sites and is not responsible for their content or their privacy policies.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'We work to keep the information on this site accurate and up to date, but we cannot guarantee that it is free of errors or that the site will run without interruptions. Ginuh Games is not liable for damage caused by misuse of the site.',
        ],
      },
      {
        heading: 'Data protection',
        body: ['How we handle the personal data you give us is explained in the [[privacy]].'],
      },
      {
        heading: 'Governing law',
        body: [
          'This legal notice is governed by Spanish law. Any dispute will be submitted to the courts that have jurisdiction under the applicable rules.',
        ],
      },
    ],
  },
};

const ca: LegalCopy = {
  label: 'Informació legal',
  updated: 'Darrera actualització: 7 de novembre de 2026',
  privacy: {
    title: 'Política de privadesa',
    sections: [
      {
        heading: 'Responsable del tractament',
        body: [
          [
            `Titular: ${company.name}`,
            `NIF: ${company.nif}`,
            `Domicili: ${address('ca')}`,
            `Correu electrònic: ${links.email}`,
          ],
        ],
      },
      {
        heading: 'Quines dades tractem',
        body: [
          "Quan ens escrius a través del formulari de contacte tractem les dades que ens facilites: nom, correu electrònic, empresa o organització (si la indiques), pressupost aproximat i el contingut del teu missatge, a més de l'idioma en què navegues pel web.",
          'Si ens escrius directament per correu electrònic o ens truques, tractem les dades que incloguis en aquesta comunicació.',
        ],
      },
      {
        heading: 'Per a què les fem servir',
        body: [
          "Per atendre i respondre la teva sol·licitud o consulta i, si ens demanes un pressupost, per preparar i comentar amb tu la proposta. No elaborem perfils ni prenem decisions automatitzades, i no t'enviarem comunicacions comercials sense el teu permís.",
        ],
      },
      {
        heading: 'Base legal',
        body: [
          "El teu consentiment, que ens dones en marcar la casella i enviar el formulari (article 6.1.a del Reglament General de Protecció de Dades) i, quan ens demanes un pressupost, l'aplicació de mesures precontractuals a petició teva (article 6.1.b). Pots retirar el teu consentiment en qualsevol moment, sense que això afecti la licitud del tractament anterior.",
        ],
      },
      {
        heading: 'Quant de temps les conservem',
        body: [
          "Mentre duri la conversa amb tu i, després, com a màxim un any des de l'últim contacte. Si acabem treballant junts, les conservarem durant la relació i durant els terminis que exigeixi la llei, com els de la normativa fiscal.",
        ],
      },
      {
        heading: 'Qui més accedeix a les teves dades',
        body: [
          'No cedim les teves dades a tercers, llevat que la llei ho exigeixi. Perquè el web i el formulari funcionin fem servir proveïdors que les tracten per compte nostre i seguint les nostres instruccions:',
          [
            'Vercel Inc., allotjament del web i del formulari (Estats Units).',
            'Resend, enviament del correu que genera el formulari (Estats Units).',
            'Google, Gmail, la bústia on rebem i responem les sol·licituds.',
          ],
          "Alguns d'aquests proveïdors poden tractar dades fora de l'Espai Econòmic Europeu. En aquests casos, les transferències s'emparen en el Marc de Privadesa de Dades UE-EUA o en les clàusules contractuals tipus aprovades per la Comissió Europea.",
        ],
      },
      {
        heading: 'Els teus drets',
        body: [
          "Pots demanar-nos l'accés a les teves dades, la rectificació o la supressió, oposar-te al tractament o sol·licitar-ne la limitació i la portabilitat, així com retirar el teu consentiment. Escriu-nos a ginuhgames@gmail.com indicant quin dret vols exercir.",
          "Si consideres que no hem atès bé la teva sol·licitud, pots presentar una reclamació davant l'Agència Espanyola de Protecció de Dades (www.aepd.es).",
        ],
      },
      {
        heading: 'Galetes i dades tècniques',
        body: [
          "Aquest web no fa servir galetes d'anàlisi ni de publicitat. Només desa al teu navegador (localStorage) l'idioma que tries, per mostrar-te'l la propera vegada; aquesta dada no surt del teu dispositiu.",
          "El nostre proveïdor d'allotjament pot registrar dades tècniques de les visites, com l'adreça IP, per garantir la seguretat i el funcionament del servei.",
        ],
      },
      {
        heading: 'Seguretat',
        body: [
          "Apliquem mesures tècniques i organitzatives raonables per protegir les teves dades: el web funciona amb connexió xifrada (HTTPS) i només els membres de l'estudi accedeixen a les sol·licituds.",
        ],
      },
      {
        heading: 'Canvis en aquesta política',
        body: ['Si canviem aquesta política, publicarem aquí la nova versió amb la seva data.'],
      },
    ],
  },
  legal: {
    title: 'Avís legal',
    sections: [
      {
        heading: 'Titular del lloc web',
        body: [
          "En compliment de l'article 10 de la Llei 34/2002, de serveis de la societat de la informació i de comerç electrònic (LSSI-CE), t'informem que ginuhgames.com pertany a:",
          [
            `Titular: ${company.name}`,
            `NIF: ${company.nif}`,
            `Domicili: ${address('ca')}`,
            `Correu electrònic: ${links.email}`,
          ],
        ],
      },
      {
        heading: 'Objecte',
        body: [
          "Aquest web presenta l'estudi Ginuh Games, els seus videojocs i els serveis de desenvolupament de jocs i experiències interactives a mida que ofereix, i permet posar-se en contacte amb l'estudi.",
        ],
      },
      {
        heading: "Condicions d'ús",
        body: [
          "L'accés al web és gratuït i no requereix registre. En fer-lo servir et comprometes a fer-ho de manera lícita, sense perjudicar el web ni tercers, i a no enviar pel formulari informació falsa ni dades d'altres persones sense el seu permís.",
        ],
      },
      {
        heading: 'Propietat intel·lectual i industrial',
        body: [
          "Els textos, imatges, logotips, dissenys i altres continguts d'aquest web, inclosos els jocs Unlighted i Witch You! i els seus materials, són propietat de Ginuh Games o dels seus legítims titulars. No es permet reproduir-los, distribuir-los ni transformar-los sense autorització expressa, excepte per a ús personal i privat.",
          'Les marques de tercers que apareixen al web, com Steam, Spotify o Discord, pertanyen als seus respectius titulars.',
        ],
      },
      {
        heading: 'Enllaços a altres webs',
        body: [
          "El web inclou enllaços a llocs de tercers, com Steam, Spotify, Discord o xarxes socials. Ginuh Games no controla aquests llocs i no es fa responsable dels seus continguts ni de les seves polítiques de privadesa.",
        ],
      },
      {
        heading: 'Responsabilitat',
        body: [
          "Treballem perquè la informació del web sigui correcta i estigui actualitzada, però no podem garantir que estigui lliure d'errors ni que el web funcioni sense interrupcions. Ginuh Games no respon dels danys derivats d'un ús indegut del web.",
        ],
      },
      {
        heading: 'Protecció de dades',
        body: ['Com tractem les dades personals que ens facilites s’explica a la [[privacy]].'],
      },
      {
        heading: 'Legislació aplicable',
        body: [
          "Aquest avís legal es regeix per la legislació espanyola. Qualsevol controvèrsia se sotmetrà als jutjats i tribunals que corresponguin d'acord amb la normativa aplicable.",
        ],
      },
    ],
  },
};

export const legalCopy: Record<Locale, LegalCopy> = { en, es, ca };
