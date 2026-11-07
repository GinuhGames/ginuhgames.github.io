import { useRef, useState } from 'react';
import { team } from '../../content/site';
import { socialIcons, socialLabels } from '../../components/icons';
import { useI18n } from '../../i18n/I18nProvider';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/media';
import team900 from '../../assets/images/team-900.webp';
import team1600 from '../../assets/images/team-1600.webp';
import './Team.css';

export function Team() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const spotlight = useRef<(index: number | null) => void>(() => {});
  const lastPointer = useRef('mouse');

  // A soft spotlight finds whoever you point at; the rest of the photo dims.
  useGSAP(
    () => {
      const photo = photoRef.current;
      if (!photo) return;
      const state = { x: 50, y: 50, r: 160, dim: 0 };
      const render = () => {
        photo.style.setProperty('--sx', `${state.x}%`);
        photo.style.setProperty('--sy', `${state.y}%`);
        photo.style.setProperty('--sr', `${state.r}%`);
        photo.style.setProperty('--dim', `${state.dim}`);
      };
      render();
      const duration = prefersReducedMotion() ? 0 : 0.7;
      spotlight.current = (index) => {
        const member = index === null ? null : team[index];
        gsap.to(state, {
          x: member ? member.spot.x : 50,
          y: member ? member.spot.y : 50,
          r: member ? 26 : 160,
          dim: member ? 1 : 0,
          duration,
          ease: 'expo.out',
          overwrite: true,
          onUpdate: render,
        });
      };
    },
    { scope: root }
  );

  const focus = (index: number | null) => {
    setActive(index);
    spotlight.current(index);
  };

  // Nearest face along the row.
  const nearestTo = (event: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    let nearest = 0;
    team.forEach((member, index) => {
      if (Math.abs(member.spot.x - x) < Math.abs(team[nearest].spot.x - x)) nearest = index;
    });
    return nearest;
  };

  const onPhotoMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const nearest = nearestTo(event);
    if (nearest !== active) focus(nearest);
  };

  // On touch screens a tap on someone lights them; tapping them again clears it.
  const onPhotoTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (lastPointer.current === 'mouse') return;
    const nearest = nearestTo(event);
    focus(nearest === active ? null : nearest);
  };

  return (
    <section ref={root} id="team" className="section team theme-paper" aria-labelledby="team-title">
      <div className="wrap">
        <h2 id="team-title" className="team__title">
          {t.team.title}
        </h2>

        <div className="team__grid">
          <div
            ref={photoRef}
            className="team__photo"
            onPointerMove={onPhotoMove}
            onPointerLeave={(event) => event.pointerType === 'mouse' && focus(null)}
            onPointerDown={(event) => {
              lastPointer.current = event.pointerType;
            }}
            onClick={onPhotoTap}
          >
            <img
              className="team__layer team__layer--base"
              src={team1600}
              srcSet={`${team900} 900w, ${team1600} 1600w`}
              sizes="(max-width: 960px) 100vw, 60vw"
              alt={t.team.photoAlt}
              width={1600}
              height={1199}
              loading="lazy"
              decoding="async"
            />
            <img
              className="team__layer team__layer--lit"
              src={team1600}
              srcSet={`${team900} 900w, ${team1600} 1600w`}
              sizes="(max-width: 960px) 100vw, 60vw"
              alt=""
              aria-hidden="true"
              width={1600}
              height={1199}
              loading="lazy"
              decoding="async"
            />
          </div>

          <ul role="list" className="team__list">
            {team.map((member, index) => (
              <li
                key={member.name}
                className="member"
                data-active={active === index ? '' : undefined}
                onPointerEnter={(event) => event.pointerType === 'mouse' && focus(index)}
                onPointerLeave={(event) => event.pointerType === 'mouse' && focus(null)}
                onFocus={() => focus(index)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) focus(null);
                }}
                onPointerDown={(event) => {
                  lastPointer.current = event.pointerType;
                }}
                onClick={(event) => {
                  // A mouse already lit this member on hover; taps toggle the spotlight.
                  if (lastPointer.current === 'mouse' || (event.target as HTMLElement).closest('a')) return;
                  focus(active === index ? null : index);
                }}
              >
                <div className="member__text">
                  <h3 className="member__name">{member.name}</h3>
                  <p className="member__role">{t.team.roles[member.id]}</p>
                </div>
                <ul role="list" className="member__links">
                  {member.socials.map((social) => {
                    const Icon = socialIcons[social.id];
                    return (
                      <li key={social.id}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t.team.socialLabel(member.name, socialLabels[social.id])}
                        >
                          <Icon aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
