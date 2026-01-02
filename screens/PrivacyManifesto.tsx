
import React from 'react';

interface PrivacyManifestoProps {
  onBack: () => void;
}

const PrivacyManifesto: React.FC<PrivacyManifestoProps> = ({ onBack }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-cream overflow-x-hidden font-wa animate-fade-in">
      <header className="flex items-center px-8 pt-10 pb-6 justify-between sticky top-0 bg-cream/90 backdrop-blur-sm z-20">
        <button onClick={onBack} className="group flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-stone/50 transition-all duration-300">
          <span className="material-symbols-outlined text-[#6b665f]" style={{ fontSize: '24px', fontWeight: 300 }}>close</span>
        </button>
        <h1 className="font-serif text-lg font-medium tracking-widest uppercase text-ink/40">Manifesto</h1>
        <div className="w-8"></div>
      </header>

      <main className="flex-1 px-10 pb-32 flex flex-col items-center text-center">
        <div className="mt-12 mb-16">
          <span className="material-symbols-outlined text-matcha text-[64px] font-light opacity-50">spa</span>
        </div>

        <h2 className="font-serif text-[32px] leading-tight text-ink mb-12">
          Your mind is a garden,<br/>
          <span className="italic text-matcha">not a data field.</span>
        </h2>

        <div className="space-y-16 max-w-[280px]">
          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-ink/30">Local First</h3>
            <p className="text-base text-ink/70 font-light leading-relaxed">
              Every thought, every ritual, and every breath stays on your device. We have no servers, only memories.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-ink/30">Quiet Intent</h3>
            <p className="text-base text-ink/70 font-light leading-relaxed">
              There are no notifications, no alerts, and no trackers. SoftDay only exists when you choose to open it.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-ink/30">Minimalist Honesty</h3>
            <p className="text-base text-ink/70 font-light leading-relaxed">
              We do not profit from your attention. We are a space for reflection, built for you, owned by you.
            </p>
          </section>
        </div>

        <div className="mt-24 opacity-30 italic font-serif text-sm">
          "Softly, gently,<br/>the path becomes clear."
        </div>
      </main>
    </div>
  );
};

export default PrivacyManifesto;
