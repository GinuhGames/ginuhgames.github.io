import { useRef } from 'react';
import { FaSpotify, FaSteam } from 'react-icons/fa6';
import { LuArrowUpRight, LuFlashlight } from 'react-icons/lu';
import { Button } from '../../components/Button/Button';
import { links } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion, useFinePointer } from '../../lib/media';
import logo from '../../assets/images/unlighted-logo.webp';
import art900 from '../../assets/images/unlighted-art-900.webp';
import art1600 from '../../assets/images/unlighted-art-1600.webp';
import './Unlighted.css';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function Unlighted() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  // Unlighted's core mechanic on its key art: the scene stays dark and the pointer is the light.
  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;
      const reduced = prefersReducedMotion();

      const light = { x: 0, y: 0, r: 0 };
      const box = { w: 1, h: 1, radius: 160 };
      let lit = false;
      let touching = false;
      let intro: gsap.core.Timeline | null = null;

      const measure = () => {
        box.w = stage.clientWidth || 1;
        box.h = stage.clientHeight || 1;
        box.radius = clamp(box.w * 0.24, 110, 260);
      };
      // Where the Umbralita sits on the desk.
      const rest = () => ({ x: box.w * 0.63, y: box.h * 0.47 });

      const render = () => {
        stage.style.setProperty('--lx', `${light.x.toFixed(1)}px`);
        stage.style.setProperty('--ly', `${light.y.toFixed(1)}px`);
        stage.style.setProperty('--lr', `${Math.max(light.r, 0.5).toFixed(1)}px`);
      };

      measure();
      light.x = box.w * 0.14;
      light.y = box.h * 0.24;
      render();

      const follow = reduced ? 0.01 : 0.65;
      const xTo = gsap.quickTo(light, 'x', { duration: follow, ease: 'power3', onUpdate: render });
      const yTo = gsap.quickTo(light, 'y', { duration: follow, ease: 'power3', onUpdate: render });
      const rTo = gsap.quickTo(light, 'r', { duration: reduced ? 0.01 : 0.45, ease: 'power3', onUpdate: render });

      const takeOver = () => {
        if (intro) {
          intro.kill();
          intro = null;
        }
        if (!lit) {
          lit = true;
          stage.dataset.lit = '';
        }
        rTo(box.radius);
      };

      // The light flickers on beside the lamp when the art scrolls into view, then finds the crystal.
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 65%',
        once: true,
        onEnter: () => {
          if (lit) return;
          if (reduced) {
            Object.assign(light, rest(), { r: box.radius });
            lit = true;
            stage.dataset.lit = '';
            render();
            return;
          }
          const target = rest();
          intro = gsap
            .timeline({
              onUpdate: render,
              onComplete: () => {
                intro = null;
                lit = true;
                stage.dataset.lit = '';
              },
            })
            .to(light, {
              keyframes: { r: [0, box.radius * 0.55, box.radius * 0.12, box.radius * 0.8, box.radius * 0.4, box.radius] },
              duration: 0.7,
              ease: 'none',
            })
            .to(light, { x: target.x, y: target.y, duration: 1.5, ease: 'power2.inOut' }, 0.35);
        },
      });

      const local = (clientX: number, clientY: number) => {
        const rect = stage.getBoundingClientRect();
        return { x: clientX - rect.left, y: clientY - rect.top };
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        takeOver();
        const point = local(event.clientX, event.clientY);
        xTo(point.x);
        yTo(point.y);
      };
      const onPointerLeave = () => {
        if (!lit) return;
        const target = rest();
        xTo(target.x);
        yTo(target.y);
      };
      const onPointerDown = () => {
        takeOver();
        rTo(box.radius * 1.4);
      };
      const onPointerUp = () => rTo(box.radius);

      const onTouch = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) return;
        touching = true;
        takeOver();
        const point = local(touch.clientX, touch.clientY);
        xTo(point.x);
        yTo(point.y);
      };
      const onTouchEnd = () => {
        touching = false;
      };

      stage.addEventListener('pointermove', onPointerMove);
      stage.addEventListener('pointerleave', onPointerLeave);
      stage.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointerup', onPointerUp);
      stage.addEventListener('touchstart', onTouch, { passive: true });
      stage.addEventListener('touchmove', onTouch, { passive: true });
      stage.addEventListener('touchend', onTouchEnd);

      // On touch screens scrolling sweeps the light from the lamp across the desk.
      const sweep = ScrollTrigger.create({
        trigger: stage,
        start: 'top 75%',
        end: 'bottom 25%',
        onUpdate: (self) => {
          if (fine || touching || intro || reduced) return;
          const p = self.progress;
          xTo(box.w * (0.2 + 0.6 * p));
          yTo(box.h * (0.6 - 0.18 * Math.sin(p * Math.PI)));
        },
      });

      const resize = new ResizeObserver(() => {
        measure();
        if (lit) rTo(box.radius);
      });
      resize.observe(stage);

      return () => {
        sweep.kill();
        resize.disconnect();
        stage.removeEventListener('pointermove', onPointerMove);
        stage.removeEventListener('pointerleave', onPointerLeave);
        stage.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointerup', onPointerUp);
        stage.removeEventListener('touchstart', onTouch);
        stage.removeEventListener('touchmove', onTouch);
        stage.removeEventListener('touchend', onTouchEnd);
      };
    },
    { scope: root, dependencies: [fine] }
  );

  return (
    <section ref={root} id="unlighted" className="section unlighted" aria-labelledby="unlighted-title">
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

        <div className="unlighted__media">
          <div ref={stageRef} className="unlighted__art">
            <img
              className="unlighted__layer unlighted__layer--dark"
              src={art1600}
              srcSet={`${art900} 900w, ${art1600} 1591w`}
              sizes="(max-width: 960px) 100vw, 58vw"
              alt=""
              aria-hidden="true"
              width={1591}
              height={892}
              loading="lazy"
              decoding="async"
            />
            <img
              className="unlighted__layer unlighted__layer--lit"
              src={art1600}
              srcSet={`${art900} 900w, ${art1600} 1591w`}
              sizes="(max-width: 960px) 100vw, 58vw"
              alt={t.game.artAlt}
              width={1591}
              height={892}
              loading="lazy"
              decoding="async"
            />
            <div className="unlighted__glow" aria-hidden="true" />
          </div>
          <p className="unlighted__hint mono">
            <LuFlashlight aria-hidden="true" />
            {fine ? t.game.hintPointer : t.game.hintTouch}
          </p>
        </div>
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
