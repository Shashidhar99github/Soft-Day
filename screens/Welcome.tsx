
import React from 'react';
import AppIcon from '../components/AppIcon';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-gradient-to-b from-cream via-cream to-cream-dark">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-[#EBE5D9] opacity-30 blur-[80px]"></div>
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-[#DCD8D0] opacity-20 blur-[60px]"></div>
      </div>
      
      <div className="relative z-10 flex h-full flex-col justify-between px-8 py-10">
        <div className="flex flex-col items-center pt-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-charcoal/10 bg-white/40 backdrop-blur-sm">
            <AppIcon size={32} color="#464340" />
          </div>
          <h1 className="text-[22px] font-medium tracking-wide text-charcoal">SoftDay</h1>
        </div>

        <div className="flex flex-col items-center justify-center space-y-10">
          <div className="relative group">
            <div className="absolute -inset-3 rounded-[28px] border border-charcoal/5"></div>
            <div className="relative h-[340px] w-[280px] overflow-hidden rounded-wa bg-white shadow-calm">
              <div 
                className="h-full w-full bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop")' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent opacity-40"></div>
            </div>
          </div>
          <div className="max-w-[240px] text-center">
            <p className="text-[18px] font-light leading-relaxed text-charcoal">
              A gentle space for<br/>everyday moments
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-5 pb-4">
          <button 
            onClick={onStart}
            className="group relative flex h-14 w-full max-w-[320px] items-center justify-center gap-3 rounded-wa bg-charcoal text-cream transition-all duration-300 hover:bg-opacity-90 active:scale-[0.98]"
          >
            <span className="text-[16px] font-medium tracking-wide">Enter the Silence</span>
            <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
