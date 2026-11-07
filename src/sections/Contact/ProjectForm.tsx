import { useEffect, useId, useRef, useState } from 'react';
import { LuCircleCheck, LuSend } from 'react-icons/lu';
import { links, serviceIds } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import { onProjectTypeSelected, type ProjectType } from './projectType';
import './ProjectForm.css';

type Values = { name: string; email: string; company: string; message: string };
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMPTY: Values = { name: '', email: '', company: '', message: '' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const types: ProjectType[] = [...serviceIds, 'other'];

/**
 * Project request form. The site is static, so a valid request is handed to the
 * visitor's email app as a ready-to-send message addressed to the studio.
 */
export function ProjectForm() {
  const { t } = useI18n();
  const f = t.contact.form;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [picked, setPicked] = useState<ProjectType[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onProjectTypeSelected((type) => {
        setSent(false);
        setPicked((current) => (current.includes(type) ? current : [...current, type]));
      }),
    []
  );

  useEffect(() => {
    if (sent) statusRef.current?.focus();
  }, [sent]);

  const typeLabel = (type: ProjectType) => (type === 'other' ? f.other : t.services.items[type].title);

  const update = (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const toggle = (type: ProjectType) => {
    setPicked((current) => (current.includes(type) ? current.filter((item) => item !== type) : [...current, type]));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="pform__sent" ref={statusRef} tabIndex={-1} role="status">
        <LuCircleCheck className="pform__sent-icon" aria-hidden="true" />
        <h3 className="pform__title">{f.sentTitle}</h3>
        <p>
          {f.sentBody} <a className="text-link" href={`mailto:${links.email}`}>{links.email}</a>.
        </p>
        <button type="button" className="pform__again" onClick={() => setSent(false)}>
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

  return (
    <form ref={formRef} className="pform" onSubmit={submit} noValidate>
      <h3 className="pform__title">{f.title}</h3>

      <div className="pform__row">
        <div className="pform__field">
          <label htmlFor={`${uid}-name`}>{f.name}</label>
          <input {...field('name')} type="text" autoComplete="name" required />
          {error('name')}
        </div>
        <div className="pform__field">
          <label htmlFor={`${uid}-email`}>{f.email}</label>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" required />
          {error('email')}
        </div>
      </div>

      <div className="pform__field">
        <label htmlFor={`${uid}-company`}>
          {f.company} <span className="pform__optional">({f.optional})</span>
        </label>
        <input {...field('company')} type="text" autoComplete="organization" />
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
        <textarea {...field('message')} rows={5} required />
        {error('message')}
      </div>

      <div className="pform__submit">
        <button type="submit" className="btn btn--primary btn--md">
          <span className="btn__label">{f.submit}</span>
          <LuSend className="btn__trail" aria-hidden="true" />
        </button>
        <p className="pform__note">{f.note}</p>
      </div>
    </form>
  );
}
