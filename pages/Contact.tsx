import React from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
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
                        <a href="mailto:hello@pomona.studio" className="font-work text-neutral-charcoal/70 hover:text-pomelo-orange transition-colors">hello@pomona.studio</a>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <MapPin className="text-leaf-mid mt-1" />
                    <div>
                        <h4 className="font-dm text-lg">Studio</h4>
                        <p className="font-work text-neutral-charcoal/70">12 Greenleaf Avenue,<br/>Botanica District</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-leaf-mid/10">
            <form className="space-y-6">
                <div>
                    <label className="block font-work uppercase text-xs tracking-wider font-bold text-leaf-mid mb-2">Name *</label>
                    <input type="text" className="w-full bg-neutral-stone border-b-2 border-transparent focus:border-pomelo-orange p-3 outline-none transition-colors" placeholder="Jane Doe" />
                </div>
                <div>
                    <label className="block font-work uppercase text-xs tracking-wider font-bold text-leaf-mid mb-2">Email *</label>
                    <input type="email" className="w-full bg-neutral-stone border-b-2 border-transparent focus:border-pomelo-orange p-3 outline-none transition-colors" placeholder="jane@example.com" />
                </div>
                <div>
                    <label className="block font-work uppercase text-xs tracking-wider font-bold text-leaf-mid mb-2">How can we help?</label>
                    <select className="w-full bg-neutral-stone border-b-2 border-transparent focus:border-pomelo-orange p-3 outline-none transition-colors">
                        <option>Recipe Development</option>
                        <option>Content & Styling</option>
                        <option>Collaboration</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label className="block font-work uppercase text-xs tracking-wider font-bold text-leaf-mid mb-2">Message</label>
                    <textarea rows={4} className="w-full bg-neutral-stone border-b-2 border-transparent focus:border-pomelo-orange p-3 outline-none transition-colors" placeholder="Tell us about your project..."></textarea>
                </div>
                <Button className="w-full">Submit Message</Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Contact;