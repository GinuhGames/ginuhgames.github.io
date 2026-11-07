import { FaSpotify, FaSteam } from 'react-icons/fa6';
import { LuArrowUpRight } from 'react-icons/lu';
import { Button } from '../../components/Button/Button';
import { links } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import logo from '../../assets/images/unlighted-logo.webp';
import art900 from '../../assets/images/unlighted-art-900.webp';
import art1600 from '../../assets/images/unlighted-art-1600.webp';
import './Unlighted.css';

export function Unlighted() {
  const { t } = useI18n();

  return (
    <section id="unlighted" className="section unlighted" aria-labelledby="unlighted-title">
      <div className="wrap unlighted__grid">
        <div className="unlighted__copy">
          <h2 id="unlighted-title" className="unlighted__logo">
            <img src={logo} alt="Unlighted" width={752} height={154} />
          </h2>
          <p className="lead unlighted__summary">{t.game.summary}</p>

          <dl className="facts">
            {t.game.facts.map((fact) => (
              <div key={fact.term} className="facts__item">
                <dt className="mono">{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="actions">
            <Button href={links.steam} icon={<FaSteam />}>
              {t.common.getOnSteam}
            </Button>
            <Button href={links.steamDemo} variant="secondary">
              {t.common.playDemo}
            </Button>
          </div>

          <a className="text-link unlighted__ost" href={links.soundtrack} target="_blank" rel="noopener noreferrer">
            <FaSpotify aria-hidden="true" />
            {t.game.soundtrack}
            <LuArrowUpRight aria-hidden="true" />
            <span className="sr-only"> {t.common.newTab}</span>
          </a>
        </div>

        <a className="unlighted__art" href={links.steam} target="_blank" rel="noopener noreferrer" aria-label={t.game.artLink}>
          <img
            src={art1600}
            srcSet={`${art900} 900w, ${art1600} 1591w`}
            sizes="(max-width: 960px) 100vw, 58vw"
            alt={t.game.artAlt}
            width={1591}
            height={892}
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>

      <div className="wrap">
        <ul role="list" className="awards" aria-label={t.game.awardsLabel}>
          {t.game.awards.map((award) => (
            <li key={award.event} className="awards__item">
              <span className="awards__result mono">{award.result}</span>
              <span className="awards__title">{award.title}</span>
              <span className="awards__event">{award.event}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
