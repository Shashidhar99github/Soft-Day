
import React, { useState } from 'react';

interface JournalWriteProps {
  onClose: () => void;
  onSave: (text: string) => void;
  initialValue: string;
}

const JournalWrite: React.FC<JournalWriteProps> = ({ onClose, onSave, initialValue }) => {
  const [text, setText] = useState(initialValue);

  return (
    <div className="relative flex h-screen w-full flex-col bg-paper transition-colors duration-500 ease-in-out font-wa pb-32">
      <header className="flex items-center justify-between px-6 pt-14 pb-4 z-10 bg-transparent">
        <button onClick={onClose} className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors duration-300">
          <span className="material-symbols-outlined text-ink/70 font-light" style={{ fontSize: '24px' }}>close</span>
        </button>
        <div className="text-center">
          <p className="text-[#8C8883] text-xs font-medium tracking-[0.15em] uppercase">New Entry</p>
        </div>
        <button 
          onClick={() => text.trim() && onSave(text)} 
          className={`group flex items-center justify-center h-10 px-4 rounded-full transition-all duration-300 active:scale-95 ${text.trim() ? 'bg-matcha/10 text-[#8E9A82]' : 'text-stone-300 cursor-not-allowed'}`}
        >
          <span className="text-sm font-semibold tracking-wide">Save</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col w-full relative overflow-y-auto no-scrollbar px-8 pt-6">
        <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-[#8E9A82]/5 to-transparent pointer-events-none opacity-50"></div>
        <div className="relative z-10 mb-8">
          <h2 className="font-serif text-[28px] leading-snug text-ink">
            A quiet thought<br/>
            <span className="text-[#8E9A82] italic">for today...</span>
          </h2>
        </div>
        <div className="flex-1 w-full relative z-10">
          <textarea 
            autoFocus 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full resize-none bg-transparent border-none p-0 text-lg leading-[1.8] text-ink/90 placeholder:text-[#8C8883]/30 focus:ring-0 focus:outline-none focus:border-none font-serif" 
            placeholder="Write freely..."
          ></textarea>
        </div>
      </main>

      <div className="relative w-full z-0 shadow-[0_-1px_3px_rgba(0,0,0,0.03)] opacity-90 grayscale-[0.1]">
        <div 
          className="w-full bg-cover bg-center aspect-[390/180]" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop')" }}
        ></div>
      </div>
    </div>
  );
};

export default JournalWrite;
