import React from 'react';
import Section from '../components/Section';

const About: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-pomona-forest pt-32 pb-16 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="font-syne font-extrabold text-6xl md:text-8xl text-pomona-cream lowercase mb-8 leading-[0.8]">
              about<br/>pomona
            </h1>
          </div>
          <div className="flex justify-center md:justify-end">
             <img 
              src="https://images.unsplash.com/photo-1566125882500-87e10f726cdc?q=80&w=800&auto=format&fit=crop" 
              alt="Classical Statue" 
              className="w-full max-w-sm h-[400px] md:h-[550px] object-cover rounded-t-full rounded-b-2xl shadow-xl bg-neutral-800"
            />
          </div>
        </div>
      </div>

      {/* Story */}
      <Section bgClass="bg-neutral-stone text-pomona-forest">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <h2 className="font-dm text-4xl md:text-5xl leading-tight">
            A small studio with a big appetite.
          </h2>
          <div className="font-work text-neutral-charcoal/80 text-lg leading-relaxed space-y-6">
            <p>
              Pomona's is named after the Roman goddess of fruit and orchards. We started as a tiny kitchen project – developing recipes for friends and local cafés – and grew into a food studio that blends seasonal cooking, styling and plant-filled spaces.
            </p>
            <p>
              Our work is grounded in simple, joyful food, honest ingredients you'll reach for again and again. We believe in the beauty of the imperfect and the slow rhythm of nature.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section bgClass="bg-neutral-stone text-pomona-forest pt-0">
        <div className="grid md:grid-cols-3 gap-12 border-t border-leaf-mid/20 pt-16">
          <ValueColumn 
            title="Seasonal by default"
            text="We work with ingredients that are in season and close to home wherever possible, respecting the earth's natural cycles."
          />
          <ValueColumn 
            title="Calm & considered"
            text="We design dishes, recipes and spaces that feel unhurried and generous, creating sanctuaries in busy lives."
          />
          <ValueColumn 
            title="Kind to people & planet"
            text="We collaborate with independent makers and suppliers who share our values of sustainability and ethical craft."
          />
        </div>
      </Section>
    </>
  );
};

const ValueColumn: React.FC<{title: string, text: string}> = ({ title, text }) => (
  <div>
    <h3 className="font-dm text-2xl mb-4 text-leaf-mid">{title}</h3>
    <p className="font-work text-neutral-charcoal/80 leading-relaxed">{text}</p>
  </div>
);

export default About;
