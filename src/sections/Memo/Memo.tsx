import { FaSteam } from 'react-icons/fa6';
import DecryptedText from '../../components/reactbits/DecryptedText/DecryptedText';
import { Button } from '../../components/Button/Button';
import { links } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import umbralita from '../../assets/images/umbralita.webp';
import './Memo.css';

export function Memo() {
  const { t } = useI18n();

  return (
    <section className="section memo" aria-labelledby="memo-title">
      <div className="wrap memo__grid">
        <div className="memo__media">
          <img
            src={umbralita}
            alt={t.memo.alt}
            width={479}
            height={499}
            loading="lazy"
            decoding="async"
          />
        </div>

        <article className="memo__doc">
          <header className="memo__letterhead mono" aria-hidden="true">
            <span>Umbral Alchemy</span>
            <span className="memo__stamp">{t.memo.confidential}</span>
          </header>
          <h2 id="memo-title" className="memo__title">
            {t.memo.title}
          </h2>
          <p className="memo__text">
            <DecryptedText
              key={t.memo.text}
              text={t.memo.text}
              animateOn="view"
              sequential
              revealDirection="start"
              speed={14}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>"
              scrambleColor="#e67347"
            />
          </p>
          <div className="actions">
            <Button href={links.steamDemo}>{t.common.playDemo}</Button>
            <Button href={links.steam} variant="secondary" icon={<FaSteam />}>
              {t.common.getOnSteam}
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
