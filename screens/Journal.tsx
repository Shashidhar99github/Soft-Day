
import React, { useState } from 'react';

interface JournalProps {
  onClose: () => void;
  onSave: (text: string) => void;
  initialValue: string;
}

const Journal: React.FC<JournalProps> = ({ onClose, onSave, initialValue }) => {
  const [text, setText] = useState(initialValue);

  return (
    <div className="relative flex h-screen w-full flex-col bg-paper transition-colors duration-500 ease-in-out font-wa pb-32">
      <header className="flex items-center justify-between px-6 pt-14 pb-4 z-10 bg-transparent">
        <button onClick={onClose} className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors duration-300">
          <span className="material-symbols-outlined text-ink/70 font-light" style={{ fontSize: '24px' }}>close</span>
        </button>
        <div className="text-center">
          <p className="text-[#8C8883] text-xs font-medium tracking-[0.15em] uppercase">Today</p>
        </div>
        <button onClick={() => onSave(text)} className="group flex items-center justify-center h-10 px-3 rounded-full hover:bg-accent/10 transition-all duration-300 active:scale-95">
          <span className="text-[#8E9A82] text-sm font-semibold tracking-wide">Done</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col w-full relative overflow-y-auto no-scrollbar px-8 pt-6">
        <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-[#8E9A82]/5 to-transparent pointer-events-none opacity-50"></div>
        <div className="relative z-10 mb-8">
          <h2 className="font-serif text-[28px] leading-snug text-ink">
            One quiet thought<br/>
            <span className="text-[#8E9A82] italic">from today...</span>
          </h2>
        </div>
        <div className="flex-1 w-full relative z-10">
          <textarea 
            autoFocus 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full resize-none bg-transparent border-none p-0 text-lg leading-[1.8] text-ink/90 placeholder:text-[#8C8883]/30 focus:ring-0 focus:outline-none focus:border-none font-serif" 
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </main>

      <div className="relative w-full z-0 shadow-[0_-1px_3px_rgba(0,0,0,0.03)] opacity-90 grayscale-[0.1]">
        <div 
          className="w-full bg-cover bg-center aspect-[390/180]" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsZEXv4N_IpokOC9j6W8wOqfSyb1boo3-4cE_4ovjpvVGlJSx_lIC_el845t1se80LUpLPRbJeR7pVGFBDeREDVO3HRor-yRfiLNv6hetjpIf4klM3jgMf7H9zdCuie6mzCzoMHNpwnwQzjbJF0ieqGc_U4VPxcBx-MpadMVuF5oAPlaxd6CnDkAx0SlMFEudEbIDa_MB6LgF44lXh9vi4vRDv10fiF-e-hI72LygTRXUlA3SeqRzmy6CkSAyaEFE5lcectlaRtMlw')" }}
        ></div>
      </div>
    </div>
  );
};

export default Journal;
