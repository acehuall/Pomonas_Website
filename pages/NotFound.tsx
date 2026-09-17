import { ButtonLink } from '../components/Button';

export default function NotFound() {
  return (
    <section className="bg-pomona-forest text-pomona-cream pt-32 pb-24">
      <div className="container mx-auto px-6 text-center">
        <p className="font-work text-sage-soft mb-4">404</p>
        <h1 className="font-syne font-extrabold text-5xl md:text-7xl mb-6">Page not found</h1>
        <p className="font-dm text-2xl mb-8">Let's find our way home.</p>
        <ButtonLink to="/">Back to Home</ButtonLink>
      </div>
    </section>
  );
}
