import type { IconType } from 'react-icons';
import { LuArrowRight, LuGamepad2, LuMousePointerClick, LuTimer, LuTrophy } from 'react-icons/lu';
import { useLenis } from 'lenis/react';
import { Button } from '../../components/Button/Button';
import { serviceIds, type ServiceId } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { selectProjectType } from '../Contact/projectType';
import './Services.css';

const icons: Record<ServiceId, IconType> = {
  games: LuGamepad2,
  microgames: LuTimer,
  interactive: LuMousePointerClick,
  gamification: LuTrophy,
};

export function Services() {
  const { t } = useI18n();
  const lenis = useLenis();

  // Each service opens the request form with that project type already ticked.
  const pick = (id: ServiceId) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Keep Lenis' own anchor handling from overriding this scroll target.
    event.stopPropagation();
    selectProjectType(id);
    const target = document.getElementById('project-form');
    // The form's scroll-margin-top keeps it clear of the navigation bar.
    if (lenis && target) lenis.scrollTo(target, { duration: 1.4 });
    else target?.scrollIntoView({ block: 'start' });
    history.replaceState(history.state, '', '#contact');
  };

  // The row is lit from where the pointer is.
  const light = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="services__head">
          <h2 id="services-title" className="services__title">
            {t.services.title}
          </h2>
          <div className="services__intro">
            <p className="prose">{t.services.intro}</p>
            <Button href="#contact">{t.common.startProject}</Button>
          </div>
        </div>

        <ul role="list" className="services__list">
          {serviceIds.map((id) => {
            const Icon = icons[id];
            const item = t.services.items[id];
            return (
              <li key={id}>
                <a className="service" href="#contact" onClick={pick(id)} onPointerMove={light}>
                  <span className="service__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="service__title">{item.title}</span>
                  <span className="service__body">{item.body}</span>
                  <span className="service__go mono" aria-hidden="true">
                    {t.services.pick}
                    <LuArrowRight />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
