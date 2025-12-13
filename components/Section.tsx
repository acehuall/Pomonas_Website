import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bgClass?: string;
  id?: string;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  bgClass = 'bg-pomona-forest',
  id
}) => {
  return (
    <section id={id} className={`w-full py-14 md:py-24 ${bgClass}`}>
      <div className={`container mx-auto px-6 ${className}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;