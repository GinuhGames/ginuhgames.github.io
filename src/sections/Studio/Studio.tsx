import { useI18n } from '../../i18n/I18nProvider';
import fox from '../../assets/images/ginuh-fox.webp';
import './Studio.css';

export function Studio() {
  const { t } = useI18n();
  const studio = t.studio;

  return (
    <section id="studio" className="section studio theme-paper" aria-labelledby="studio-title">
      <div className="wrap studio__grid">
        <div className="studio__copy">
          <h2 id="studio-title" className="studio__title">
            {studio.title}
          </h2>
          <div className="prose studio__prose">
            {studio.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <aside className="studio__name" aria-label={studio.nameLabel}>
          <img className="studio__fox" src={fox} alt={studio.foxAlt} width={640} height={613} loading="lazy" />
          <div className="studio__word">
            <p className="studio__guineu" lang="ca">
              Guineu
            </p>
            <p className="studio__define mono">
              <span>/ɡiˈnɛw/</span>
              <span>{studio.meaning}</span>
            </p>
          </div>
          <p className="studio__story">{studio.story}</p>
        </aside>
      </div>
    </section>
  );
}
