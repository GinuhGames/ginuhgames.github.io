import { useEffect, useRef } from 'react';
import { FaSteam } from 'react-icons/fa6';
import { LuFlashlight } from 'react-icons/lu';
import { Button } from '../../components/Button/Button';
import { LanguageSwitch } from '../../components/LanguageSwitch/LanguageSwitch';
import { links } from '../../content/site';
import { pathFor, useI18n } from '../../i18n/I18nProvider';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion, useFinePointer } from '../../lib/media';
import wordmark from '../../assets/images/ginuh-wordmark.webp';
import './NotFound.css';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * The 404 is an empty Unlighted test room: "404" sits in the dark and only the
 * visitor's light shows it.
 */
export function NotFound() {
  const { t, locale } = useI18n();
  const fine = useFinePointer();
  const stageRef = useRef<HTMLDivElement>(null);
  const home = pathFor(locale);

  useEffect(() => {
    document.title = t.notFound.metaTitle;
  }, [t]);

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;
      const reduced = prefersReducedMotion();
      const light = { x: 0, y: 0, r: 0 };
      let radius = 200;

      const measure = () => {
        radius = clamp(Math.min(stage.clientWidth, stage.clientHeight * 1.4) * 0.26, 130, 380);
      };
      // Rest on the number, wherever the layout put it.
      const digits = stage.querySelector<HTMLElement>('.nf__digits');
      const rest = () => {
        const lift = digits ? parseFloat(getComputedStyle(digits).paddingBottom) || 0 : 0;
        return { x: stage.clientWidth * 0.5, y: (stage.clientHeight - lift) / 2 };
      };
      const render = () => {
        stage.style.setProperty('--lx', `${light.x.toFixed(1)}px`);
        stage.style.setProperty('--ly', `${light.y.toFixed(1)}px`);
        stage.style.setProperty('--lr', `${Math.max(light.r, 0.5).toFixed(1)}px`);
      };

      measure();
      Object.assign(light, rest());
      render();

      const follow = reduced ? 0.01 : 0.6;
      const xTo = gsap.quickTo(light, 'x', { duration: follow, ease: 'power3', onUpdate: render });
      const yTo = gsap.quickTo(light, 'y', { duration: follow, ease: 'power3', onUpdate: render });
      const rTo = gsap.quickTo(light, 'r', { duration: reduced ? 0.01 : 0.45, ease: 'power3', onUpdate: render });

      // The torch flickers on, then waits for the visitor.
      let intro: gsap.core.Tween | null = null;
      if (reduced) {
        light.r = radius;
        render();
      } else {
        intro = gsap.to(light, {
          keyframes: { r: [0, radius * 0.5, radius * 0.1, radius * 0.85, radius * 0.35, radius] },
          duration: 0.8,
          delay: 0.35,
          ease: 'none',
          onUpdate: render,
        });
      }

      const aim = (clientX: number, clientY: number) => {
        if (intro?.isActive()) {
          intro.kill();
          rTo(radius);
        }
        const rect = stage.getBoundingClientRect();
        xTo(clientX - rect.left);
        yTo(clientY - rect.top);
      };

      const onPointerMove = (event: PointerEvent) => aim(event.clientX, event.clientY);
      const onTouch = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (touch) aim(touch.clientX, touch.clientY);
      };
      const onLeave = () => {
        const target = rest();
        xTo(target.x);
        yTo(target.y);
      };
      const onDown = () => rTo(radius * 1.4);
      const onUp = () => rTo(radius);
      const onResize = () => {
        measure();
        rTo(radius);
        onLeave();
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('touchstart', onTouch, { passive: true });
      window.addEventListener('touchmove', onTouch, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      window.addEventListener('pointerdown', onDown);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('touchstart', onTouch);
        window.removeEventListener('touchmove', onTouch);
        document.documentElement.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('resize', onResize);
      };
    },
    { scope: stageRef }
  );

  return (
    <div className="nf">
      <header className="wrap nf__bar">
        <a href={home} className="nf__brand" aria-label={t.nav.home}>
          <img src={wordmark} alt="" width={1200} height={434} />
        </a>
        <LanguageSwitch />
      </header>

      <div ref={stageRef} className="nf__stage" aria-hidden="true">
        <span className="nf__digits nf__digits--dark">404</span>
        <span className="nf__digits nf__digits--lit">404</span>
        <span className="nf__glow" />
      </div>

      <main className="wrap nf__copy">
        <h1 className="nf__title">{t.notFound.title}</h1>
        <p className="nf__body">{t.notFound.body}</p>
        <div className="actions">
          <Button href={home}>{t.notFound.home}</Button>
          <Button href={links.steam} variant="secondary" icon={<FaSteam />}>
            {t.common.getOnSteam}
          </Button>
        </div>
        <p className="nf__hint mono">
          <LuFlashlight aria-hidden="true" />
          {fine ? t.notFound.hintPointer : t.notFound.hintTouch}
        </p>
      </main>
    </div>
  );
}
