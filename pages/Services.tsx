import React from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { ChefHat, HandPlatter, HeartHandshake, Users } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Services: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <div className="bg-pomona-forest pt-32 pb-20">
        <div className="container mx-auto px-6 text-center md:text-left">
          <h1 className="font-syne font-extrabold text-5xl md:text-7xl text-pomona-cream mb-4">Services</h1>
          <p className="font-work text-xl text-sage-soft">From recipes to full visual stories.</p>
        </div>
      </div>

      {/* Services Grid */}
      <Section bgClass="bg-sage-soft">
        <div className="grid md:grid-cols-2 gap-8">
          <ServiceBlock 
            icon={<ChefHat size={32} />}
            title="Recipe Development"
            items={["Editorial features", "Brand collaborations", "Café menu consulting"]}
            price="From £450"
          />
          <ServiceBlock 
            icon={<HandPlatter size={32} />}
            title="Bespoke Catering"
            items={["Private Dinners", "Weddings & Celebrations", "Corporate Events"]}
            price="From £650"
          />
          <ServiceBlock 
            icon={<HeartHandshake size={32} />}
            title="Brand Collaborations"
            items={["Co-branded products", "Seasonal campaigns", "Influencer partnerships"]}
            price="From £1200"
          />
          <ServiceBlock 
            icon={<Users size={32} />}
            title="Workshops & Events"
            items={["In-person cooking classes", "Styling workshops", "Virtual hosting sessions"]}
            price="From £95 pp"
          />
        </div>
      </Section>

      {/* Process */}
      <Section bgClass="bg-pomona-forest text-pomona-cream">
        <h2 className="font-dm text-3xl md:text-4xl text-center mb-16">How we work</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <ProcessStep number="01" title="Listen" text="We start with your story, audience and practical needs to understand the roots of the project." />
          <ProcessStep number="02" title="Shape" text="We design concepts, recipes and visuals that fit your world, iterating until it feels natural." />
          <ProcessStep number="03" title="Gather" text="We bring everything together into content, products or experiences ready for the table." />
        </div>
        <div className="text-center mt-16">
            <Button onClick={() => navigate('/contact')}>Start a Project</Button>
        </div>
      </Section>
    </>
  );
};

const ServiceBlock: React.FC<{icon: React.ReactNode, title: string, items: string[], price: string}> = ({ icon, title, items, price }) => (
  <div className="bg-pomona-forest/5 p-8 md:p-12 rounded-xl border border-pomona-forest/10 hover:bg-white/30 transition-colors flex flex-col h-full">
    <div className="text-pomona-forest mb-6">{icon}</div>
    <h3 className="font-dm text-2xl md:text-3xl text-pomona-forest mb-6">{title}</h3>
    <ul className="space-y-3 mb-8 flex-grow">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center font-work text-neutral-charcoal/80">
          <span className="w-1.5 h-1.5 bg-leaf-mid rounded-full mr-3"></span>
          {item}
        </li>
      ))}
    </ul>
    <div className="flex items-center justify-between mt-auto">
      <Link to="/contact" className="text-pomona-forest font-bold uppercase text-sm border-b border-pomona-forest hover:text-leaf-mid hover:border-leaf-mid transition-colors pb-0.5">
        Let's talk
      </Link>
      <span className="bg-pomona-forest text-pomona-cream px-4 py-1.5 rounded-full font-work text-xs font-medium tracking-wide">
        {price}
      </span>
    </div>
  </div>
);

const ProcessStep: React.FC<{number: string, title: string, text: string}> = ({ number, title, text }) => (
  <div className="p-6">
    <span className="block font-syne text-6xl text-leaf-mid/30 mb-4">{number}</span>
    <h3 className="font-dm text-2xl text-pomona-cream mb-4">{title}</h3>
    <p className="font-work text-sage-soft leading-relaxed">{text}</p>
  </div>
);

export default Services;
