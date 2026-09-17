import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { contactEmail } from '../data/contact';
import { useFormspree } from '../hooks/useFormspree';
import FormError from '../components/FormError';
import Section from '../components/Section';
import Button from '../components/Button';
import { Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const product = products.find((item) => item.id === searchParams.get('product'));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(product ? 'Order enquiry' : 'Recipe Development');
  const [message, setMessage] = useState(product ? `I'd like to order: ${product.name}` : '');
  const { status, submit } = useFormspree(import.meta.env.VITE_FORMSPREE_CONTACT_ID);

  useEffect(() => {
    setSubject(product ? 'Order enquiry' : 'Recipe Development');
    setMessage(product ? `I'd like to order: ${product.name}` : '');
  }, [product]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submit({ name, email, subject, message });
  }

  return (
    <>
      <div className="bg-pomona-forest pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-7xl text-pomona-cream mb-4">Contact</h1>
          <p className="font-work text-xl text-sage-soft">Let's cook something up.</p>
        </div>
      </div>

      <Section bgClass="bg-neutral-stone text-pomona-forest">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Info */}
          <div>
            <h2 className="font-dm text-3xl mb-6">Get in touch</h2>
            <p className="font-work text-neutral-charcoal/80 mb-8 leading-relaxed">
              Whether you have a project in mind, want to collaborate on a recipe, or just want to say hello, we’d love to hear from you.
            </p>
            
            <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <Mail className="text-leaf-mid mt-1" />
                    <div>
                        <h4 className="font-dm text-lg">Email</h4>
                        <a href={`mailto:${contactEmail}`} className="font-work text-neutral-charcoal/70 hover:text-pomelo-orange transition-colors">{contactEmail}</a>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-leaf-mid/10">
            {status === 'success' ? (
              <p role="status" className="font-work">Thanks — we'll be in touch soon.</p>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
                <div>
                    <label htmlFor="contact-name" className="block font-work uppercase text-xs tracking-wider font-bold text-leaf-mid mb-2">Name *</label>
                    <input id="contact-name" name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} type="text" className="w-full bg-neutral-stone border-b-2 border-transparent focus:border-pomelo-orange p-3 outline-hidden transition-colors" placeholder="Jane Doe" />
                </div>
                <div>
                    <label htmlFor="contact-email" className="block font-work uppercase text-xs tracking-wider font-bold text-leaf-mid mb-2">Email *</label>
                    <input id="contact-email" name="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="w-full bg-neutral-stone border-b-2 border-transparent focus:border-pomelo-orange p-3 outline-hidden transition-colors" placeholder="jane@example.com" />
                </div>
                <div>
                    <label htmlFor="contact-subject" className="block font-work uppercase text-xs tracking-wider font-bold text-leaf-mid mb-2">How can we help?</label>
                    <select id="contact-subject" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)} className="w-full bg-neutral-stone border-b-2 border-transparent focus:border-pomelo-orange p-3 outline-hidden transition-colors">
                        <option>Recipe Development</option>
                        <option>Content & Styling</option>
                        <option>Collaboration</option>
                        <option>Order enquiry</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="contact-message" className="block font-work uppercase text-xs tracking-wider font-bold text-leaf-mid mb-2">Message</label>
                    <textarea id="contact-message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} rows={4} className="w-full bg-neutral-stone border-b-2 border-transparent focus:border-pomelo-orange p-3 outline-hidden transition-colors" placeholder="Tell us about your project..."></textarea>
                </div>
                {status === 'error' && <FormError />}
                <Button type="submit" disabled={status === 'sending'} className="w-full">{status === 'sending' ? 'Sending…' : 'Submit Message'}</Button>
            </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;