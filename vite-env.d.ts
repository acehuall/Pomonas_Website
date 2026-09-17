/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_CONTACT_ID?: string;
  readonly VITE_FORMSPREE_NEWSLETTER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
