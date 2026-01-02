
import React, { useState, useEffect } from 'react';

interface ReflectionProps {
  onClose: () => void;
}

const Reflection: React.FC<ReflectionProps> = ({ onClose }) => {
  const [breathePhase, setBreathePhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: any;
    const animate = () => {
      timer = setTimeout(() => {
        setBreathePhase(current => {
          if (current === 'Inhale') return 'Hold';
          if (current === 'Hold') return 'Exhale';
          if (current === 'Exhale') return 'Rest';
          return 'Inhale';
        });
        animate();
      }, 4000);
    };

    animate();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="bg-paper text-ink min-h-screen flex flex-col font-sans antialiased overflow-hidden bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&auto=format&fit=crop')" }}
    >
      {/* Softening overlay */}
      <div className="absolute inset-0 bg-paper/70 backdrop-blur-[2px] z-0"></div>

      <header className="w-full flex items-center justify-between p-8 z-20">
        <button onClick={onClose} className="group flex items-center justify-center w-10 h-10 rounded-full text-ink/60 hover:bg-stone transition-all duration-300">
          <span className="material-symbols-outlined text-[24px] font-light">close</span>
        </button>
        <h2 className="text-[#9A948D] text-xs font-medium tracking-[0.2em] uppercase opacity-50">Reflection</h2>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative w-full max-w-lg mx-auto px-8 z-10">
        <div className="flex flex-col items-center gap-16">
          
          {/* Breathing Circle */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing Backlight */}
            <div className={`absolute size-48 rounded-full bg-matcha/20 blur-3xl transition-all duration-[4000ms] ease-in-out ${breathePhase === 'Inhale' || breathePhase === 'Hold' ? 'scale-150 opacity-100' : 'scale-75 opacity-0'}`}></div>
            
            <div className={`relative size-40 md:size-48 rounded-full overflow-hidden border border-white/50 shadow-soft transition-all duration-[4000ms] ease-in-out ${breathePhase === 'Inhale' || breathePhase === 'Hold' ? 'scale-110' : 'scale-90'}`}>
              <div 
                className="w-full h-full bg-cover bg-center opacity-90 sepia-[0.3]" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&auto=format&fit=crop')" }}
              ></div>
              <div className="absolute inset-0 bg-matcha/10 mix-blend-overlay"></div>
            </div>

            {/* Breathing Label */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-full text-center">
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-ink/30 transition-all duration-1000">
                {breathePhase}
              </span>
            </div>
          </div>

          <div className="text-center space-y-6">
            <h1 className="font-serif text-ink text-[34px] md:text-[42px] leading-tight tracking-tight font-normal animate-pulse-slow">
              Today was enough.
            </h1>
            <p className="text-sm font-light italic text-ink/40 font-serif max-w-[200px] mx-auto leading-relaxed">
              Let the waves of the day wash back into the sea.
            </p>
          </div>
        </div>
      </main>

      <div className="w-full p-8 pb-16 z-20">
        <div className="flex flex-col items-center w-full max-w-[280px] mx-auto">
          <button onClick={onClose} className="group w-full flex items-center justify-center h-16 rounded-full bg-stone hover:bg-white text-ink/80 hover:text-ink transition-all duration-700 ease-out shadow-paper hover:shadow-soft">
            <span className="text-[14px] font-bold uppercase tracking-[0.2em]">Rest Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reflection;
