import { contactEmail } from '../data/contact';

export default function FormError() {
  return (
    <p role="alert" className="font-work text-sm text-pomona-forest">
      Sorry, we couldn't send that. Please try again or email us directly at{' '}
      <a className="underline" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
    </p>
  );
}
