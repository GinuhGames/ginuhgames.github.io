import { useRef } from 'react';
import { LuFlashlight } from 'react-icons/lu';
import { useI18n } from '../../i18n/I18nProvider';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion, useFinePointer } from '../../lib/media';
import lab from '../../assets/images/unlighted-lab.webp';
import './Light.css';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * The page's authored moment, built from Unlighted's core mechanic:
 * the room stays dark and the visitor's pointer is the light that makes it real.
 */
export function Light() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;
      const reduced = prefersReducedMotion();

      const light = { x: 0, y: 0, r: 0 };
      const box = { w: 1, h: 1, radius: 200 };
      let lit = false;
      let touching = false;
      let intro: gsap.core.Timeline | null = null;

      const measure = () => {
        box.w = stage.clientWidth || 1;
        box.h = stage.clientHeight || 1;
        box.radius = clamp(box.w * 0.19, 120, 340);
      };
      // Where the Umbralita sits in the frame.
      const rest = () => ({ x: box.w * 0.5, y: box.h * 0.44 });

      const render = () => {
        stage.style.setProperty('--lx', `${light.x.toFixed(1)}px`);
        stage.style.setProperty('--ly', `${light.y.toFixed(1)}px`);
        stage.style.setProperty('--lr', `${Math.max(light.r, 0.5).toFixed(1)}px`);
      };

      measure();
      light.x = box.w * 0.16;
      light.y = box.h * 0.55;
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

      // The light flickers on when the room scrolls into view, then finds the crystal.
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 60%',
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

      // On touch screens scrolling sweeps the light across the room.
      const sweep = ScrollTrigger.create({
        trigger: stage,
        start: 'top 70%',
        end: 'bottom 30%',
        onUpdate: (self) => {
          if (fine || touching || intro || reduced) return;
          const p = self.progress;
          xTo(box.w * (0.18 + 0.64 * p));
          yTo(box.h * (0.56 - 0.16 * Math.sin(p * Math.PI)));
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
    <section ref={root} id="light" className="section light" aria-labelledby="light-title">
      <div className="wrap">
        <div className="light__head">
          <h2 id="light-title" className="light__title">
            {t.light.title}
          </h2>
          <div className="light__intro">
            <p className="prose">{t.light.body}</p>
            <p className="light__hint mono">
              <LuFlashlight aria-hidden="true" />
              {fine ? t.light.hintPointer : t.light.hintTouch}
            </p>
          </div>
        </div>

        <div ref={stageRef} className="light__stage">
          <img className="light__layer light__layer--dark" src={lab} alt="" aria-hidden="true" width={1366} height={768} />
          <img
            className="light__layer light__layer--lit"
            src={lab}
            alt={t.light.alt}
            width={1366}
            height={768}
            loading="lazy"
            decoding="async"
          />
          <div className="light__glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
