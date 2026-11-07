import { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaSteam } from 'react-icons/fa6';
import { LuArrowUpRight, LuGamepad2, LuMousePointerClick, LuTimer, LuTrophy } from 'react-icons/lu';
import { useLenis } from 'lenis/react';
import { Button } from '../../components/Button/Button';
import { allProjects, clientProjects, ownProjects, type ProjectId } from '../../content/projects';
import { links, serviceIds, type ServiceId } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { ScrollTrigger } from '../../lib/gsap';
import { useMediaQuery } from '../../lib/media';
import { ProjectGrid } from './ProjectGrid';
import './Projects.css';

const serviceIcons: Record<ServiceId, IconType> = {
  games: LuGamepad2,
  microgames: LuTimer,
  interactive: LuMousePointerClick,
  gamification: LuTrophy,
};

/** A link like ginuhgames.com/#witch-you opens that project. */
const projectFromHash = (): ProjectId | null => {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return allProjects.find((project) => project.id === id)?.id ?? null;
};

export function Projects() {
  const { t } = useI18n();
  const lenis = useLenis();
  const columns = useMediaQuery('(min-width: 760px)', true) ? 2 : 1;
  const [linked] = useState(projectFromHash);
  // The first game starts open, so its award and its light are seen without a click.
  const [open, setOpen] = useState<ProjectId | null>(linked ?? ownProjects[0]?.id ?? null);
  const reveal = useRef<ProjectId | null>(null);
  const landed = useRef(false);

  // Opening a link to a project: travel to its card once the smooth scroll is ready.
  useEffect(() => {
    if (!linked || !lenis || landed.current) return;
    landed.current = true;
    const card = document.getElementById(linked);
    if (card) lenis.scrollTo(card, { offset: -96, immediate: true });
  }, [linked, lenis]);

  // A project link followed inside the page (#witch-you) opens that project too.
  useEffect(() => {
    const onHash = () => {
      const id = projectFromHash();
      if (!id) return;
      reveal.current = id;
      setOpen(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // The page height changed: re-measure scroll-linked effects and bring new details into view.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const id = reveal.current;
      reveal.current = null;
      const detail = id ? document.getElementById(`${id}-detail`) : null;
      if (!detail) return;
      const top = detail.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.7) return;
      const offset = -Math.round(window.innerHeight * 0.25);
      if (lenis) lenis.scrollTo(detail, { offset, duration: 1.1 });
      else window.scrollBy({ top: top + offset });
    });
    return () => cancelAnimationFrame(frame);
  }, [open, columns, lenis]);

  const toggle = (id: ProjectId) => {
    const next = open === id ? null : id;
    reveal.current = next;
    setOpen(next);
    history.replaceState(history.state, '', `${window.location.pathname}#${next ?? 'projects'}`);
  };

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="projects__head">
          <h2 id="projects-title" className="projects__title">
            {t.projects.ownTitle}
          </h2>
          <a className="text-link projects__steam" href={links.steamStudio} target="_blank" rel="noopener noreferrer">
            <FaSteam aria-hidden="true" />
            {t.projects.steamAll}
            <LuArrowUpRight aria-hidden="true" />
            <span className="sr-only"> {t.common.newTab}</span>
          </a>
        </div>

        <ProjectGrid projects={ownProjects} columns={columns} open={open} onToggle={toggle} />
      </div>

      <div className="wrap">
        <div className="projects__demand">
          <div className="projects__head projects__head--demand">
            <h2 className="projects__title">{t.projects.onDemandTitle}</h2>
            <div className="projects__intro">
              <p className="prose">{t.projects.onDemandIntro}</p>
              <ul role="list" className="projects__services" aria-label={t.projects.servicesLabel}>
                {serviceIds.map((id) => {
                  const Icon = serviceIcons[id];
                  return (
                    <li key={id}>
                      <Icon aria-hidden="true" />
                      {t.projects.services[id]}
                    </li>
                  );
                })}
              </ul>
              <Button href="#contact">{t.common.startProject}</Button>
            </div>
          </div>

          {clientProjects.length > 0 ? (
            <ProjectGrid projects={clientProjects} columns={columns} open={open} onToggle={toggle} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
