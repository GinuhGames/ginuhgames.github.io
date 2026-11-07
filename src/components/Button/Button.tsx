import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { LuArrowRight, LuArrowUpRight } from 'react-icons/lu';
import { useI18n } from '../../i18n/I18nProvider';
import './Button.css';

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: 'primary' | 'secondary' | 'dark';
  size?: 'md' | 'sm';
  /** Leading icon, e.g. a platform logo. */
  icon?: ReactNode;
  children: ReactNode;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function Button({ href, variant = 'primary', size = 'md', icon, children, className = '', ...rest }: ButtonProps) {
  const { t } = useI18n();
  const external = isExternal(href);
  const Trail = external ? LuArrowUpRight : LuArrowRight;

  return (
    <a
      href={href}
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {icon ? <span className="btn__icon" aria-hidden="true">{icon}</span> : null}
      <span className="btn__label">{children}</span>
      <Trail className="btn__trail" aria-hidden="true" />
      {external ? <span className="sr-only"> {t.common.newTab}</span> : null}
    </a>
  );
}
