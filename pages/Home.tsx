import React from 'react';
import { ArrowRight, Utensils, HandPlatter, Calendar } from 'lucide-react';
import Section from '../components/Section';
import Button from '../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-pomona-forest pt-24 md:pt-32 overflow-hidden flex flex-col">
        <div className="container mx-auto px-6 flex-grow flex flex-col relative z-10">
          <div className="md:w-2/3 lg:w-1/2 pt-10 md:pt-20">
            <h1 className="font-syne font-extrabold text-[64px] md:text-[120px] leading-[0.85] text-pomona-cream lowercase relative z-10 mb-6 md:mb-8">
              pomona's
            </h1>
            
            <p className="font-work text-lime-zest uppercase tracking-widest text-sm mb-4">
              Food, foliage & everyday slow living
            </p>
            <h2 className="font-dm text-2xl md:text-4xl text-white mb-10 leading-tight max-w-xl">
              A food-lifestyle studio bringing seasonal recipes, leafy spaces and slow rituals into your home.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Button onClick={() => navigate('/services')}>Explore Our Recipes</Button>
              <Button variant="secondary" onClick={() => navigate('/merchandise')}>Shop the Pomona's Pantry</Button>
            </div>
          </div>
        </div>
        
        {/* Leafy Image Island */}
        <div className="absolute bottom-0 right-0 w-full md:w-[50%] lg:w-[45%] h-[40vh] md:h-[80vh] z-0 pointer-events-none">
           <img 
            src="https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=1920&auto=format&fit=crop" 
            alt="Lush green foliage" 
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
              src="https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90?q=80&w=1200&auto=format&fit=crop" 
              alt="Rustic table spread" 
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
          <ProductCardMini name="Pomona's Ceramic Vase" price="£55" img="https://raw.github.com/acehuall/Pomonas_Website/main/Photos/Orange%20vase.jpg" />
          <ProductCardMini name="Citrus Tea Towel" price="£18" img="https://raw.github.com/acehuall/Pomonas_Website/main/Photos/Tea%20Towel%20Image%20(600x600).png" />
          <ProductCardMini name="Pomona's Net Bag" price="£18" img="https://raw.github.com/acehuall/Pomonas_Website/main/Photos/Net%20Bag.jpg" />
          <ProductCardMini name="Pomona's Baseball Cap" price="£25" img="https://raw.github.com/acehuall/Pomonas_Website/main/Photos/Pomonas%20hat.png" />
        </div>
      </Section>

      {/* Newsletter */}
      <Section bgClass="bg-pomona-cream text-pomona-forest">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-dm text-4xl md:text-5xl mb-4">A greener inbox.</h2>
          <p className="font-work text-lg mb-8 text-neutral-charcoal/80">
            Seasonal recipes, plant musings and the odd kitchen playlist. No spam, just warm bread.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="px-6 py-3.5 bg-transparent border border-pomona-forest/30 rounded-full font-work placeholder:text-pomona-forest/50 focus:outline-none focus:border-pomona-forest w-full sm:w-auto min-w-[300px]"
            />
            <Button>Join the list</Button>
          </div>
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

const ProductCardMini: React.FC<{name: string, price: string, img: string}> = ({ name, price, img }) => {
  const navigate = useNavigate();
  return (
    <div className="min-w-[280px] group cursor-pointer" onClick={() => navigate('/merchandise')}>
      <div className="h-[280px] w-full overflow-hidden rounded-lg mb-4 bg-leaf-mid/10">
        <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <h4 className="font-dm text-xl text-pomona-cream">{name}</h4>
      <p className="font-work text-sm text-lime-zest">{price}</p>
    </div>
  );
};

export default Home;
