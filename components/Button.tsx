import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-work uppercase tracking-[0.08em] transition-all duration-300 text-sm md:text-base px-8 py-3.5";
  
  const variants = {
    primary: "bg-pomelo-orange text-pomona-forest hover:bg-lime-zest hover:text-pomona-forest font-medium",
    secondary: "bg-transparent border border-pomona-cream text-pomona-cream hover:bg-pomona-cream hover:text-pomona-forest",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;