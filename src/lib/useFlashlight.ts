import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';
import { prefersReducedMotion } from './media';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Options = {
  /** Off while the stage is hidden; switching it on starts the light again. */
  enabled: boolean;
  /** A mouse or trackpad. Without one, scrolling sweeps the light. */
  fine: boolean;
  /** Where the light first flickers on and where it rests, as fractions of the stage. */
  start: [number, number];
  rest: [number, number];
};

/**
 * Unlighted's core mechanic: the scene stays dark and the pointer is the light that
 * reveals it. Writes --lx, --ly and --lr (position and radius, in px) on the stage.
 */
export function useFlashlight(stageRef: RefObject<HTMLElement | null>, { enabled, fine, start, rest }: Options) {
  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage || !enabled) return;
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
      const restPoint = () => ({ x: box.w * rest[0], y: box.h * rest[1] });

      const render = () => {
        stage.style.setProperty('--lx', `${light.x.toFixed(1)}px`);
        stage.style.setProperty('--ly', `${light.y.toFixed(1)}px`);
        stage.style.setProperty('--lr', `${Math.max(light.r, 0.5).toFixed(1)}px`);
      };

      measure();
      light.x = box.w * start[0];
      light.y = box.h * start[1];
      render();

      const follow = reduced ? 0.01 : 0.65;
      const xTo = gsap.quickTo(light, 'x', { duration: follow, ease: 'power3', onUpdate: render });
      const yTo = gsap.quickTo(light, 'y', { duration: follow, ease: 'power3', onUpdate: render });
      const rTo = gsap.quickTo(light, 'r', { duration: reduced ? 0.01 : 0.45, ease: 'power3', onUpdate: render });

      const takeOver = () => {
        intro?.kill();
        intro = null;
        lit = true;
        rTo(box.radius);
      };

      // The light flickers on when the stage comes into view, then finds its resting point.
      const reveal = ScrollTrigger.create({
        trigger: stage,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (lit) return;
          if (reduced) {
            Object.assign(light, restPoint(), { r: box.radius });
            lit = true;
            render();
            return;
          }
          const target = restPoint();
          intro = gsap
            .timeline({
              onUpdate: render,
              onComplete: () => {
                intro = null;
                lit = true;
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
        const target = restPoint();
        xTo(target.x);
        yTo(target.y);
      };
      const onPointerDown = () => {
        takeOver();
        rTo(box.radius * 1.4);
      };
      const onPointerUp = () => {
        if (lit) rTo(box.radius);
      };

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

      // On touch screens scrolling sweeps the light across the scene.
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
        intro?.kill();
        reveal.kill();
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
    { dependencies: [enabled, fine, start, rest], revertOnUpdate: true }
  );
}
