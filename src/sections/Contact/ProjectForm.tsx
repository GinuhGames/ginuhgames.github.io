import { useEffect, useId, useRef, useState } from 'react';
import { LuCircleAlert, LuCircleCheck, LuLoaderCircle, LuSend } from 'react-icons/lu';
import { links, serviceIds } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { onProjectTypeSelected, type ProjectType } from './projectType';
import './ProjectForm.css';

type Values = { name: string; email: string; company: string; message: string };
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: Values = { name: '', email: '', company: '', message: '' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const types: ProjectType[] = [...serviceIds, 'other'];

/**
 * Project request form. Requests go to /api/contact (a Vercel Function that emails
 * the studio). If sending fails, the visitor can still open it in their email app.
 */
export function ProjectForm() {
  const { t, locale } = useI18n();
  const f = t.contact.form;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(Date.now());
  const [values, setValues] = useState<Values>(EMPTY);
  const [picked, setPicked] = useState<ProjectType[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentTo, setSentTo] = useState({ name: '', email: '' });
  const [trap, setTrap] = useState('');

  useEffect(
    () =>
      onProjectTypeSelected((type) => {
        setStatus((current) => (current === 'sent' ? 'idle' : current));
        setPicked((current) => (current.includes(type) ? current : [...current, type]));
      }),
    []
  );

  useEffect(() => {
    if (status === 'sent') statusRef.current?.focus();
  }, [status]);

  const typeLabel = (type: ProjectType) => (type === 'other' ? f.other : t.services.items[type].title);

  const update = (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const toggle = (type: ProjectType) => {
    setPicked((current) => (current.includes(type) ? current.filter((item) => item !== type) : [...current, type]));
  };

  /** Fallback: the same request, ready to send from the visitor's email app. */
  const mailto = () => {
    const labels = f.fieldsLabel;
    const chosen = picked.map(typeLabel);
    const subject = `${f.subject}${chosen.length ? `: ${chosen.join(', ')}` : ''} — ${values.name.trim()}`;
    const body = [
      f.bodyIntro,
      '',
      values.message.trim(),
      '',
      '—',
      `${labels.name}: ${values.name.trim()}`,
      `${labels.email}: ${values.email.trim()}`,
      values.company.trim() ? `${labels.company}: ${values.company.trim()}` : null,
      chosen.length ? `${labels.type}: ${chosen.join(', ')}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n');
    return `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const next: Errors = {};
    if (!values.name.trim()) next.name = f.required;
    if (!values.email.trim()) next.email = f.required;
    else if (!EMAIL.test(values.email.trim())) next.email = f.invalidEmail;
    if (!values.message.trim()) next.message = f.required;
    setErrors(next);

    const firstInvalid = (['name', 'email', 'message'] as const).find((field) => next[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          message: values.message.trim(),
          types: picked,
          locale,
          website: trap,
          elapsed: Date.now() - openedAt.current,
        }),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || !result?.ok) throw new Error(`contact ${response.status}`);
      setSentTo({ name: values.name.trim(), email: values.email.trim() });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setPicked([]);
    setErrors({});
    openedAt.current = Date.now();
    setStatus('idle');
  };

  if (status === 'sent') {
    return (
      <div className="pform__sent" ref={statusRef} tabIndex={-1} role="status">
        <LuCircleCheck className="pform__sent-icon" aria-hidden="true" />
        <h3 className="pform__title">{f.sentTitle}</h3>
        <p>{f.sentBody(sentTo.name, sentTo.email)}</p>
        <button type="button" className="pform__again" onClick={reset}>
          {f.again}
        </button>
      </div>
    );
  }

  const field = (name: keyof Values) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    'aria-invalid': name in errors && errors[name as keyof Errors] ? true : undefined,
    'aria-describedby': errors[name as keyof Errors] ? `${uid}-${name}-error` : undefined,
  });

  const error = (name: keyof Errors) =>
    errors[name] ? (
      <p className="pform__error" id={`${uid}-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  const sending = status === 'sending';

  return (
    <form ref={formRef} className="pform" onSubmit={submit} noValidate aria-busy={sending}>
      <h3 className="pform__title">{f.title}</h3>

      <div className="pform__row">
        <div className="pform__field">
          <label htmlFor={`${uid}-name`}>{f.name}</label>
          <input {...field('name')} type="text" autoComplete="name" maxLength={120} required />
          {error('name')}
        </div>
        <div className="pform__field">
          <label htmlFor={`${uid}-email`}>{f.email}</label>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" maxLength={200} required />
          {error('email')}
        </div>
      </div>

      <div className="pform__field">
        <label htmlFor={`${uid}-company`}>
          {f.company} <span className="pform__optional">({f.optional})</span>
        </label>
        <input {...field('company')} type="text" autoComplete="organization" maxLength={160} />
      </div>

      {/* Spam trap: invisible to people, irresistible to bots. Its name avoids
          anything browsers autofill (url, website, address), so real people never trip it. */}
      <div className="pform__trap" aria-hidden="true">
        <label htmlFor={`${uid}-extra`}>Leave this field empty</label>
        <input
          id={`${uid}-extra`}
          name="ginuh_extra"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(event) => setTrap(event.target.value)}
        />
      </div>

      <fieldset className="pform__types">
        <legend>{f.type}</legend>
        <div className="pform__chips">
          {types.map((type) => (
            <label key={type} className="chip">
              <input type="checkbox" checked={picked.includes(type)} onChange={() => toggle(type)} />
              <span>{typeLabel(type)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="pform__field">
        <label htmlFor={`${uid}-message`}>{f.message}</label>
        <textarea {...field('message')} rows={5} maxLength={5000} required />
        {error('message')}
      </div>

      {status === 'error' ? (
        <div className="pform__alert" role="alert">
          <LuCircleAlert aria-hidden="true" />
          <p>
            {f.errorBody}{' '}
            <a className="text-link" href={mailto()}>
              {f.errorLink}
            </a>
          </p>
        </div>
      ) : null}

      <div className="pform__submit">
        <button type="submit" className="btn btn--primary btn--md" disabled={sending}>
          <span className="btn__label">{sending ? f.sending : f.submit}</span>
          {sending ? (
            <LuLoaderCircle className="btn__trail pform__spin" aria-hidden="true" />
          ) : (
            <LuSend className="btn__trail" aria-hidden="true" />
          )}
        </button>
        <p className="pform__note">{f.privacy}</p>
      </div>
    </form>
  );
}
