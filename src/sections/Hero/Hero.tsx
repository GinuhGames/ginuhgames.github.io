import { useRef } from 'react';
import { FaSteam } from 'react-icons/fa6';
import { LuArrowUpRight } from 'react-icons/lu';
import LightRays from '../../components/reactbits/LightRays/LightRays';
import SplitText from '../../components/reactbits/SplitText/SplitText';
import { Button } from '../../components/Button/Button';
import { links } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/media';
import cover from '../../assets/images/unlighted-cover-900.webp';
import './Hero.css';

export function Hero() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Supporting copy arrives just after the title starts rising.
      gsap.from('[data-hero-in]', {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.55,
      });

      // Leaving the hero: the content sinks back into the dark.
      gsap.to('.hero__content', {
        yPercent: -10,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 15%', scrub: true },
      });
      gsap.to('.hero__rays', {
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root }
  );

  const winner = t.game.awards[0];

  return (
    <section ref={root} id="top" className="hero">
      <div className="hero__rays" aria-hidden="true">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff7a45"
          raysSpeed={0.6}
          lightSpread={0.85}
          rayLength={1.5}
          rayDensity={1}
          glow={0.55}
          haze={0.35}
          atmosphere={0.25}
          intensity={1.05}
          saturation={1.1}
          followMouse
          mouseInfluence={0.14}
          cursorShadow
          clickPulse
          fadeDistance={1.1}
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="wrap hero__content">
        <SplitText
          tag="h1"
          text="Ginuh Games"
          className="hero__title"
          splitType="chars"
          trigger="load"
          mask
          delay={38}
          duration={1.15}
          ease="expo.out"
          from={{ yPercent: 105 }}
          to={{ yPercent: 0 }}
          textAlign="left"
        />

        <div className="hero__row">
          <div className="hero__intro">
            <p className="hero__lead" data-hero-in>
              {t.hero.lead}
            </p>
            <div className="actions" data-hero-in>
              <Button href={links.steam} icon={<FaSteam />}>
                {t.common.getOnSteam}
              </Button>
              <Button href="#contact" variant="secondary">
                {t.common.startProject}
              </Button>
            </div>
          </div>

          <a
            className="hero__feature"
            href={links.steam}
            target="_blank"
            rel="noopener noreferrer"
            data-hero-in
          >
            <span className="hero__feature-art">
              <img src={cover} alt="" width={900} height={505} />
            </span>
            <span className="hero__feature-text">
              <span className="hero__feature-status mono">{t.hero.status}</span>
              <span className="hero__feature-name">Unlighted</span>
              <span className="hero__feature-award">
                {winner.title} · {winner.event}
              </span>
            </span>
            <LuArrowUpRight className="hero__feature-arrow" aria-hidden="true" />
            <span className="sr-only"> {t.hero.opensSteam}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
