import type { ServiceId } from '../../content/site';

export type ProjectType = ServiceId | 'other';

const EVENT = 'ginuh:project-type';

/** Lets the services list preselect a project type in the request form. */
export function selectProjectType(type: ProjectType) {
  window.dispatchEvent(new CustomEvent<ProjectType>(EVENT, { detail: type }));
}

export function onProjectTypeSelected(handler: (type: ProjectType) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<ProjectType>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
