import React from 'react';
import { products } from '../data/products';
import Section from '../components/Section';
import Button, { ButtonLink } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Merchandise: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-pomona-forest pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-7xl text-pomona-cream mb-4">Merchandise</h1>
          <p className="font-work text-xl text-sage-soft">Objects for kitchens, tables and leafy corners.</p>
        </div>
      </div>

      <Section bgClass="bg-neutral-stone text-pomona-forest">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-white p-4 rounded-xl shadow-sm mb-6 overflow-hidden">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                        src={product.image}
                        width={product.imageWidth} height={product.imageHeight} decoding="async" loading="lazy"
                        alt={product.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-dm text-2xl group-hover:text-leaf-mid transition-colors">{product.name}</h3>
                <span className="font-work font-medium text-leaf-mid">{product.price}</span>
              </div>
              <p className="font-work text-neutral-charcoal/60 text-sm mb-4">{product.description}</p>
              <ButtonLink to={`/contact?product=${encodeURIComponent(product.id)}`} variant="outline-dark">
                Enquire
              </ButtonLink>
            </div>
          ))}
        </div>
      </Section>

      <Section bgClass="bg-sage-soft/30 text-pomona-forest text-center">
        <h2 className="font-dm text-3xl mb-4">How to Buy</h2>
        <p className="font-work max-w-lg mx-auto mb-8 leading-relaxed">
            We are currently updating our online store. In the meantime, you can place orders directly via email or find us at local weekend markets.
        </p>
        <Button onClick={() => navigate('/contact')}>Email to Order</Button>
      </Section>
    </>
  );
};

export default Merchandise;
