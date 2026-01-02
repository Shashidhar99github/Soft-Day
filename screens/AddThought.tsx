
import React, { useState } from 'react';

interface AddThoughtProps {
  onClose: () => void;
  onAdd: (text: string) => void;
}

const AddThought: React.FC<AddThoughtProps> = ({ onClose, onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      onClose();
    }
  };

  return (
    <div className="bg-[#EBE7E2] flex justify-center items-center min-h-screen font-wa p-4 sm:p-6 overflow-hidden">
      <div className="relative flex flex-col w-full max-w-[420px] h-[85vh] max-h-[800px] bg-paper rounded-[40px] shadow-wa overflow-hidden animate-[floatIn_0.8s_ease-out_forwards]">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#F7F3EF] to-transparent pointer-events-none opacity-60"></div>
        <div className="relative z-20 flex items-center justify-between px-8 py-8">
          <button onClick={onClose} className="flex items-center justify-center size-12 rounded-full text-ink/60 hover:bg-stone transition-colors duration-300">
            <span className="material-symbols-outlined" style={{ fontSize: '26px', fontWeight: 300 }}>close</span>
          </button>
          <div className="text-xs font-semibold tracking-[0.2em] text-ink/30 uppercase">New Thought</div>
          <div className="size-12"></div> 
        </div>
        <div className="flex-1 flex flex-col px-8 z-10 relative">
          <textarea 
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-full bg-transparent border-none p-2 text-[28px] sm:text-[32px] leading-relaxed font-normal text-ink placeholder:text-[#A89F95]/70 focus:ring-0 focus:outline-none resize-none" 
            placeholder="Something small I’d like to do…"
          ></textarea>
        </div>
        <div className="relative z-20 px-8 pb-10 pt-6 bg-gradient-to-t from-paper via-paper/95 to-transparent flex flex-col gap-5">
          <button 
            onClick={handleSubmit}
            className="group w-full h-16 rounded-[28px] bg-matcha hover:bg-matcha-dark active:scale-[0.98] transition-all duration-300 shadow-float flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: '22px' }}>spa</span>
            <span className="text-white text-lg font-medium tracking-wide">I’ll try today</span>
          </button>
          <div className="flex flex-col gap-2">
            <button onClick={onClose} className="w-full h-14 rounded-[28px] bg-stone hover:bg-[#E6E2DC] active:scale-[0.98] transition-all duration-300 flex items-center justify-center text-ink/80">
              <span className="text-base font-medium">Another time</span>
            </button>
            <button onClick={onClose} className="w-full h-12 rounded-[28px] hover:bg-stone/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center text-ink/40 hover:text-ink/70">
              <span className="text-sm font-medium">I can let this go</span>
            </button>
          </div>
          <div className="h-2"></div>
        </div>
      </div>
    </div>
  );
};

export default AddThought;
