import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pomona-forest text-pomona-cream py-12 md:py-16 border-t border-leaf-mid/30">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        
        {/* Logo */}
        <div className="text-center md:text-left">
          <h2 className="font-syne font-bold text-2xl lowercase">pomona's</h2>
        </div>

        {/* Tagline */}
        <div className="text-center">
          <p className="font-dm text-lg md:text-xl opacity-80">
            Food, foliage & everyday slow living.
          </p>
        </div>

        {/* Socials & Copyright */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          {/* Social icons omitted until real profile URLs are supplied. */}
          <p className="font-work text-sm text-sage-soft/60">
            © {new Date().getFullYear()} Pomona's Studio.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;