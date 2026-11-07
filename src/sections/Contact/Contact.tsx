import { useEffect, useRef, useState } from 'react';
import { FaDiscord } from 'react-icons/fa6';
import { LuArrowUpRight, LuCheck, LuCopy, LuMapPin, LuPhone } from 'react-icons/lu';
import { Button } from '../../components/Button/Button';
import { socialIcons } from '../../components/icons';
import { links, socials } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { ProjectForm } from './ProjectForm';
import './Contact.css';

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${links.email}`;
    }
  };

  return (
    <section id="contact" className="section contact theme-orange" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact__head">
          <h2 id="contact-title" className="contact__title">
            {c.title}
          </h2>
          <p className="contact__intro">{c.intro}</p>
        </div>

        <div className="contact__layout">
          <div id="project-form" className="contact__card">
            <ProjectForm />
          </div>

          <aside className="contact__aside">
            <div className="contact__block">
              <h3 className="contact__label mono">{c.email}</h3>
              <a className="contact__address" href={`mailto:${links.email}`}>
                {links.email}
              </a>
              <button type="button" className="contact__copy" onClick={copy} data-copied={copied ? '' : undefined}>
                <span className="contact__copy-icon" aria-hidden="true">
                  <LuCopy />
                  <LuCheck />
                </span>
                <span>{copied ? c.copied : c.copy}</span>
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? c.copiedStatus : ''}
              </span>
            </div>

            <div className="contact__block">
              <h3 className="contact__label mono">{c.community}</h3>
              <p>{c.communityText}</p>
              <Button href={links.discord} variant="dark" icon={<FaDiscord />}>
                {c.joinDiscord}
              </Button>
            </div>

            <div className="contact__block">
              <h3 className="contact__label mono">{c.studio}</h3>
              <ul role="list" className="contact__details">
                <li>
                  <LuMapPin aria-hidden="true" />
                  {c.location}
                </li>
                <li>
                  <LuPhone aria-hidden="true" />
                  <a className="text-link" href={`tel:${links.phone.replace(/\s/g, '')}`}>
                    {links.phone}
                  </a>
                </li>
              </ul>
            </div>

            <div className="contact__block">
              <h3 className="contact__label mono">{c.follow}</h3>
              <ul role="list" className="contact__socials">
                {socials.map((social) => {
                  const Icon = socialIcons[social.id];
                  return (
                    <li key={social.id}>
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <Icon aria-hidden="true" className="contact__social-icon" />
                        <span>{social.label}</span>
                        <LuArrowUpRight aria-hidden="true" className="contact__social-arrow" />
                        <span className="sr-only"> {t.common.newTab}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
