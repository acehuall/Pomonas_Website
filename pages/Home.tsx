import React, { useState } from 'react';
import { useFormspree } from '../hooks/useFormspree';
import FormError from '../components/FormError';
import { heroFoliage, rusticTable } from '../src/assets/images';
import { ArrowRight, Utensils, HandPlatter, Calendar } from 'lucide-react';
import Section from '../components/Section';
import { products } from '../data/products';
import type { Product } from '../types';
import Button from '../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const { status, submit } = useFormspree(import.meta.env.VITE_FORMSPREE_NEWSLETTER_ID);

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-pomona-forest pt-24 md:pt-32 overflow-hidden flex flex-col">
        <div className="container mx-auto px-6 flex-grow flex flex-col relative z-10">
          <div className="md:w-2/3 lg:w-1/2 pt-10 md:pt-20">
            <h1 className="font-syne font-extrabold text-[64px] md:text-[120px] leading-[0.85] text-pomona-cream relative z-10 mb-6 md:mb-8">
              Pomona's
            </h1>

            <p className="font-work text-lime-zest uppercase tracking-widest text-sm mb-4">
              Food, foliage & everyday slow living
            </p>
            <h2 className="font-dm text-2xl md:text-4xl text-white mb-10 leading-tight max-w-xl">
              A food studio bringing seasonal recipes, leafy spaces and slow rituals into your home.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Button onClick={() => navigate('/services')}>Explore Our Services</Button>
              <Button variant="secondary" onClick={() => navigate('/merchandise')}>Shop the Pomona's Pantry</Button>
            </div>
          </div>
        </div>

        {/* Leafy Image Island */}
        <div className="absolute bottom-0 right-0 w-full md:w-[50%] lg:w-[45%] h-[40vh] md:h-[80vh] z-0 pointer-events-none">
           <img
            src={heroFoliage.src} width={heroFoliage.width} height={heroFoliage.height} decoding="async" fetchPriority="high"
            alt="A lone tree in a grassy field in golden light"
            className="w-full h-full object-cover rounded-tl-[80px] opacity-90 md:opacity-100"
          />
        </div>
      </div>

      {/* What We Are About */}
      <Section bgClass="bg-pomona-forest text-pomona-cream">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <h2 className="font-dm text-3xl md:text-5xl mb-6 text-pomona-cream">
              Fresh food. <br/>Soft mornings. <br/>Green corners.
            </h2>
            <p className="font-work text-sage-soft text-lg leading-relaxed mb-8">
              We’re a small studio obsessed with good food, houseplants and rituals that make everyday life feel a little slower. Pomona's brings together recipes, styling and objects for people who want their kitchens to feel as alive as their living rooms.
            </p>
            <NavLink to="/about" className="inline-flex items-center text-lime-zest hover:text-pomelo-orange transition-colors font-work uppercase tracking-wider text-sm border-b border-lime-zest pb-1">
              Read our story <ArrowRight size={16} className="ml-2" />
            </NavLink>
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <img
              src={rusticTable.src} width={rusticTable.width} height={rusticTable.height} decoding="async" loading="lazy"
              alt="Pastel macarons, a cup and white flowers on a tiled table"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </Section>

      {/* Services Highlight */}
      <Section bgClass="bg-sage-soft text-pomona-forest">
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Utensils className="w-8 h-8 text-leaf-mid" />}
            title="Recipe Development"
            description="Plant-forward recipes for brands, cafés and home cooks seeking nourishment."
          />
          <ServiceCard
            icon={<HandPlatter className="w-8 h-8 text-leaf-mid" />}
            title="Bespoke Catering"
            description="Tailored culinary experiences for your special occasions."
          />
          <ServiceCard
            icon={<Calendar className="w-8 h-8 text-leaf-mid" />}
            title="Workshops & Events"
            description="Intimate sessions on cooking, styling and slow hosting rituals."
          />
        </div>
      </Section>

      {/* Products Strip */}
      <Section bgClass="bg-pomona-forest" className="overflow-hidden">
        <div className="flex items-center justify-between mb-12">
           <h2 className="font-dm text-3xl text-pomona-cream">Curated Goods</h2>
           <NavLink to="/merchandise" className="text-lime-zest font-work uppercase text-sm tracking-wide">View Shop</NavLink>
        </div>
        <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide">
          {products.filter(p => p.featured).map((product) => (
            <ProductCardMini key={product.id} product={product} />
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section bgClass="bg-pomona-cream text-pomona-forest">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-dm text-4xl md:text-5xl mb-4">A greener inbox.</h2>
          <p className="font-work text-lg mb-8 text-neutral-charcoal/80">
            Seasonal recipes, plant musings and the odd kitchen playlist. No spam, just warm bread.
          </p>
          {status === 'success' ? (
            <p role="status" className="font-work">Thanks — you're on the list.</p>
          ) : (
          <form onSubmit={(event) => { event.preventDefault(); void submit({ email }); }} aria-busy={status === 'sending'}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <label htmlFor="newsletter-email" className="sr-only">Email for newsletter</label>
            <input
              id="newsletter-email" name="email" autoComplete="email" required
              value={email} onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="YOUR EMAIL"
              className="px-6 py-3.5 bg-transparent border border-pomona-forest/30 rounded-full font-work placeholder:text-pomona-forest/50 focus:outline-hidden focus:border-pomona-forest w-full sm:w-auto min-w-[300px]"
            />
            <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Join the list'}</Button>
          </div>
          {status === 'error' && <div className="mt-4"><FormError /></div>}
          </form>
          )}
        </div>
      </Section>
    </>
  );
};

const ServiceCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="p-8 border border-leaf-mid/20 rounded-xl hover:bg-white/20 transition-colors duration-300">
    <div className="mb-6">{icon}</div>
    <h3 className="font-dm text-2xl mb-3 text-pomona-forest">{title}</h3>
    <p className="font-work text-pomona-forest/80 leading-relaxed">{description}</p>
  </div>
);

const ProductCardMini: React.FC<{product: Product}> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="min-w-[280px] group cursor-pointer" onClick={() => navigate('/merchandise')}>
      <div className="h-[280px] w-full overflow-hidden rounded-lg mb-4 bg-leaf-mid/10">
        <img src={product.image} width={product.imageWidth} height={product.imageHeight} decoding="async" loading="lazy" alt={product.imageAlt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <h4 className="font-dm text-xl text-pomona-cream">{product.name}</h4>
      <p className="font-work text-sm text-lime-zest">{product.price}</p>
    </div>
  );
};

export default Home;
