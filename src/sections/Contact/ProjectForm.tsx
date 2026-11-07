import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { LuCircleAlert, LuCircleCheck, LuLoaderCircle, LuSend } from 'react-icons/lu';
import { legalPaths } from '../../content/legal';
import { budgetTiers, links, type BudgetId } from '../../content/site';
import { useI18n } from '../../i18n/I18nProvider';
import './ProjectForm.css';

type Values = { name: string; email: string; company: string; message: string };
type Field = 'name' | 'email' | 'budget' | 'message' | 'consent';
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: Values = { name: '', email: '', company: '', message: '' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Checked in this order; the first one wrong takes the focus. */
const FIELDS: Field[] = ['name', 'email', 'budget', 'message', 'consent'];

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
  const [budget, setBudget] = useState<BudgetId | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [sentTo, setSentTo] = useState({ name: '', email: '' });
  const [trap, setTrap] = useState('');

  useEffect(() => {
    if (status === 'sent') statusRef.current?.focus();
  }, [status]);

  const clear = (field: Field) => {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const update = (field: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== 'company') clear(field);
  };

  const choose = (id: BudgetId) => {
    setBudget(id);
    clear('budget');
  };

  /** Fallback: the same request, ready to send from the visitor's email app. */
  const mailto = () => {
    const labels = f.fieldsLabel;
    const range = budget ? f.budget[budget] : '';
    const subject = `${f.subject}${range ? ` (${range})` : ''} — ${values.name.trim()}`;
    const body = [
      f.bodyIntro,
      '',
      values.message.trim(),
      '',
      '—',
      `${labels.name}: ${values.name.trim()}`,
      `${labels.email}: ${values.email.trim()}`,
      values.company.trim() ? `${labels.company}: ${values.company.trim()}` : null,
      range ? `${labels.budget}: ${range}` : null,
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
    if (!budget) next.budget = f.budgetRequired;
    if (!values.message.trim()) next.message = f.required;
    if (!consent) next.consent = f.consentRequired;
    setErrors(next);

    const firstInvalid = FIELDS.find((field) => next[field]);
    if (firstInvalid) {
      const target =
        firstInvalid === 'budget'
          ? formRef.current?.querySelector<HTMLElement>('input[name="budget"]')
          : formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      target?.focus();
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
          budget,
          consent,
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
    setBudget(null);
    setConsent(false);
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

  const describedBy = (name: Field) => (errors[name] ? `${uid}-${name}-error` : undefined);

  const field = (name: keyof Values) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    'aria-invalid': name !== 'company' && errors[name] ? true : undefined,
    'aria-describedby': name !== 'company' ? describedBy(name) : undefined,
  });

  const error = (name: Field) =>
    errors[name] ? (
      <p className="pform__error" id={`${uid}-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  const sending = status === 'sending';
  // How far the meter is charged: the chosen tier and every one below it.
  const level = budgetTiers.findIndex((tier) => tier.id === budget);

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

      {/* Budget as a power meter: each range charges the bars up to it. */}
      <fieldset className="budget" aria-describedby={describedBy('budget')} aria-invalid={errors.budget ? true : undefined}>
        <legend>{f.budgetLegend}</legend>
        <div className="budget__meter" data-level={level}>
          {budgetTiers.map((tier, index) => (
            <label
              key={tier.id}
              className="budget__tier"
              data-on={level >= index ? '' : undefined}
              style={{ '--i': index } as CSSProperties}
            >
              <input
                type="radio"
                name="budget"
                value={tier.id}
                checked={budget === tier.id}
                onChange={() => choose(tier.id)}
              />
              <span className="budget__bar" aria-hidden="true" />
              <span className="budget__short mono" aria-hidden="true">
                {tier.short}
              </span>
              <span className="sr-only">{f.budget[tier.id]}</span>
            </label>
          ))}
        </div>
        <div className="budget__foot">
          <p className="budget__readout mono" aria-hidden="true" data-empty={budget ? undefined : ''}>
            {budget ? f.budget[budget] : '—'}
          </p>
          <label className="chip">
            <input type="radio" name="budget" value="unsure" checked={budget === 'unsure'} onChange={() => choose('unsure')} />
            <span>{f.budget.unsure}</span>
          </label>
        </div>
        {error('budget')}
      </fieldset>

      <div className="pform__field">
        <label htmlFor={`${uid}-message`}>{f.message}</label>
        <textarea {...field('message')} rows={5} maxLength={5000} required />
        {error('message')}
      </div>

      <div className="pform__consent">
        <label className="consent">
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              clear('consent');
            }}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={describedBy('consent')}
            required
          />
          <span>
            {f.consentBefore}{' '}
            <a className="text-link" href={legalPaths.privacy[locale]} target="_blank" rel="noopener">
              {f.consentLink}
              <span className="sr-only"> {t.common.newTab}</span>
            </a>
            {f.consentAfter}
          </span>
        </label>
        {error('consent')}
        <p className="pform__note">{f.privacy}</p>
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
      </div>
    </form>
  );
}
