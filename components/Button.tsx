import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

const baseStyles = "inline-flex items-center justify-center rounded-full font-work uppercase tracking-[0.08em] transition-all duration-300 disabled:opacity-60 disabled:cursor-wait text-sm md:text-base px-8 py-3.5";

  const variants = {
    primary: "bg-pomelo-orange text-pomona-forest hover:bg-lime-zest hover:text-pomona-forest font-medium",
    secondary: "bg-transparent border border-pomona-cream text-pomona-cream hover:bg-pomona-cream hover:text-pomona-forest",
  };


const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonLink: React.FC<LinkProps & { variant?: ButtonProps['variant'] }> = ({
  variant = 'primary', className = '', ...props
}) => <Link className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />;

export default Button;