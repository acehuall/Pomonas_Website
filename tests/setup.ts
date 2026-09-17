import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
  vi.stubGlobal('scrollTo', vi.fn());
  // All submissions are mocked. These IDs never contact Formspree.
  vi.stubEnv('VITE_FORMSPREE_CONTACT_ID', 'contact-test');
  vi.stubEnv('VITE_FORMSPREE_NEWSLETTER_ID', 'newsletter-test');
  window.history.replaceState({}, '', '/');
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.useRealTimers();
});
