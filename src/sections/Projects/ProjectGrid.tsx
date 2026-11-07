import { useRef, type CSSProperties } from 'react';
import { FaSpotify, FaSteam } from 'react-icons/fa6';
import { LuArrowUpRight, LuFlashlight, LuPlus } from 'react-icons/lu';
import { Button } from '../../components/Button/Button';
import type { Project, ProjectCopy, ProjectId } from '../../content/projects';
import { useI18n } from '../../i18n/I18nProvider';
import { useFinePointer } from '../../lib/media';
import { useFlashlight } from '../../lib/useFlashlight';

type GridProps = {
  projects: Project[];
  columns: number;
  open: ProjectId | null;
  onToggle: (id: ProjectId) => void;
};

/**
 * Cards in rows; each row is followed by the details of its cards, so the open
 * one unfolds right under the card that opened it, at any number of columns.
 * Every detail stays in the page (hidden when closed) for search engines.
 */
export function ProjectGrid({ projects, columns, open, onToggle }: GridProps) {
  const { t } = useI18n();
  const rows: Project[][] = [];
  for (let index = 0; index < projects.length; index += columns) rows.push(projects.slice(index, index + columns));

  return (
    <div className="pgrid" style={{ '--cols': columns } as CSSProperties}>
      {rows.flatMap((row) => [
        ...row.map((project) => (
          <ProjectCard
            key={`card-${project.id}`}
            project={project}
            copy={t.projects.items[project.id]}
            open={open === project.id}
            onToggle={onToggle}
          />
        )),
        ...row.map((project, column) => (
          <ProjectDetail
            key={`detail-${project.id}`}
            project={project}
            copy={t.projects.items[project.id]}
            open={open === project.id}
            column={column}
          />
        )),
      ])}
    </div>
  );
}

type CardProps = { project: Project; copy: ProjectCopy; open: boolean; onToggle: (id: ProjectId) => void };

function ProjectCard({ project, copy, open, onToggle }: CardProps) {
  // A soft torch follows the pointer over the picture.
  const light = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <h3 className="pcard" id={project.id}>
      <button
        type="button"
        id={`${project.id}-card`}
        className="pcard__button"
        aria-expanded={open}
        aria-controls={`${project.id}-detail`}
        onClick={() => onToggle(project.id)}
        onPointerMove={light}
      >
        <span className="pcard__art">
          <img
            src={project.art.small}
            srcSet={`${project.art.small} 900w, ${project.art.large} ${project.art.width}w`}
            sizes="(min-width: 760px) 50vw, 100vw"
            alt=""
            width={project.art.width}
            height={project.art.height}
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className="pcard__foot">
          <span className="pcard__text">
            <span className="pcard__name">{project.name}</span>
            <span className="pcard__tag mono">{copy.tag}</span>
          </span>
          <span className="pcard__toggle" aria-hidden="true">
            <LuPlus />
          </span>
        </span>
      </button>
    </h3>
  );
}

type DetailProps = { project: Project; copy: ProjectCopy; open: boolean; column: number };

function ProjectDetail({ project, copy, open, column }: DetailProps) {
  const { t } = useI18n();
  const fine = useFinePointer();

  return (
    <div
      id={`${project.id}-detail`}
      className="pdetail"
      role="region"
      aria-labelledby={`${project.id}-card`}
      hidden={!open}
      style={{ '--col': column } as CSSProperties}
    >
      <div className="pdetail__grid">
        <div className="pdetail__copy">
          <img
            className="pdetail__logo"
            src={project.logo.src}
            alt={project.name}
            width={project.logo.width}
            height={project.logo.height}
            loading="lazy"
            decoding="async"
          />
          <p className="lead pdetail__summary">{copy.summary}</p>

          <dl className="facts">
            {copy.facts.map((fact) => (
              <div key={fact.term} className="facts__item">
                <dt className="mono">{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="actions">
            <Button href={project.primary.href} icon={project.primary.steam ? <FaSteam /> : undefined}>
              {copy.primary}
            </Button>
            {project.secondary && copy.secondary ? (
              <Button href={project.secondary.href} variant="secondary">
                {copy.secondary}
              </Button>
            ) : null}
          </div>

          {project.soundtrack && copy.soundtrack ? (
            <a className="text-link pdetail__link" href={project.soundtrack} target="_blank" rel="noopener noreferrer">
              <FaSpotify aria-hidden="true" />
              {copy.soundtrack}
              <LuArrowUpRight aria-hidden="true" />
              <span className="sr-only"> {t.common.newTab}</span>
            </a>
          ) : null}
        </div>

        <div className="pdetail__media">
          {project.flashlight ? (
            <>
              <LitArt project={project} flashlight={project.flashlight} alt={copy.artAlt} active={open} fine={fine} />
              <p className="pdetail__hint mono">
                <LuFlashlight aria-hidden="true" />
                {fine ? t.projects.hintPointer : t.projects.hintTouch}
              </p>
            </>
          ) : (
            <div className="pdetail__art">
              <ArtImage project={project} alt={copy.artAlt} />
            </div>
          )}
        </div>
      </div>

      {copy.awards?.length ? (
        <ul role="list" className="awards" aria-label={t.projects.awardsLabel}>
          {copy.awards.map((award) => (
            <li key={award.event} className="awards__item">
              <span className="awards__result mono">{award.result}</span>
              <span className="awards__title">{award.title}</span>
              <span className="awards__event">{award.event}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ArtImage({ project, alt, className }: { project: Project; alt: string; className?: string }) {
  return (
    <img
      className={className}
      src={project.art.large}
      srcSet={`${project.art.small} 900w, ${project.art.large} ${project.art.width}w`}
      sizes="(min-width: 960px) 58vw, 100vw"
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={project.art.width}
      height={project.art.height}
      loading="lazy"
      decoding="async"
    />
  );
}

type LitArtProps = {
  project: Project;
  flashlight: NonNullable<Project['flashlight']>;
  alt: string;
  active: boolean;
  fine: boolean;
};

/** The picture in the dark: one dim copy, one lit copy masked around the light. */
function LitArt({ project, flashlight, alt, active, fine }: LitArtProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  useFlashlight(stageRef, { enabled: active, fine, start: flashlight.start, rest: flashlight.rest });

  return (
    <div
      ref={stageRef}
      className="pdetail__art pdetail__art--lit"
      style={{ '--lx': `${flashlight.start[0] * 100}%`, '--ly': `${flashlight.start[1] * 100}%` } as CSSProperties}
    >
      <ArtImage project={project} alt="" className="pdetail__layer pdetail__layer--dark" />
      <ArtImage project={project} alt={alt} className="pdetail__layer pdetail__layer--lit" />
      <div className="pdetail__glow" aria-hidden="true" />
    </div>
  );
}
