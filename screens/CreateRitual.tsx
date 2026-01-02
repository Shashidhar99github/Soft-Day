
import React, { useState } from 'react';
import { Ritual } from '../types';

interface CreateRitualProps {
  onClose: () => void;
  onSave: (ritual: Omit<Ritual, 'id' | 'checked'>) => void;
}

const CreateRitual: React.FC<CreateRitualProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [time, setTime] = useState('Sunrise');
  const [symbol, setSymbol] = useState('Nature');
  const [intention, setIntention] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (isSaved) return;

    const ritualData = {
      name: name.trim() || 'Untitled Ritual',
      frequency,
      time,
      symbol,
      intention: intention.trim() || 'A mindful moment',
      createdAt: new Date().toISOString(),
    };
    
    console.log('✨ Persisting New Ritual:', ritualData);
    
    // Save to global state
    onSave(ritualData);
    
    // Show confirmation
    setIsSaved(true);
    
    // Brief delay before closing to allow user to see the confirmation
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light font-sans texture-paper animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/90 backdrop-blur-sm p-5 pb-3 justify-between border-b border-stone-100">
        <button 
          onClick={onClose}
          disabled={isSaved}
          className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-colors text-nav-inactive ${isSaved ? 'opacity-0' : 'hover:bg-charcoal/5'}`}
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
        <h2 className="text-ink text-lg font-medium leading-tight tracking-wide flex-1 text-center opacity-80 font-serif">New Ritual</h2>
        <div className="flex w-10 items-center justify-center">
          {!isSaved && (
            <button 
              onClick={handleSave}
              className="text-matcha hover:text-matcha-dark font-semibold text-base leading-normal tracking-wide shrink-0 transition-colors"
            >
              Save
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 pb-48">
        {/* Name Section */}
        <div className="pt-8 pb-3">
          <h3 className="text-ink tracking-[-0.02em] text-[28px] font-medium leading-tight text-left font-serif">
            Name your ritual
          </h3>
        </div>
        <div className="py-2">
          <label className="flex flex-col w-full group">
            <p className="text-charcoal/50 text-sm font-medium leading-normal pb-2.5 ml-1">What is this moment for?</p>
            <div className="relative">
              <input 
                disabled={isSaved}
                className="flex w-full min-w-0 flex-1 rounded-2xl text-ink placeholder:text-nav-inactive/40 focus:outline-0 focus:ring-1 focus:ring-matcha/40 border-none bg-white h-[72px] px-6 text-xl font-normal leading-normal transition-all shadow-soft group-hover:bg-white disabled:opacity-50" 
                placeholder="e.g. Morning Tea" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-nav-inactive/50 text-[20px]">edit</span>
            </div>
          </label>
        </div>

        <div className="h-10"></div>

        {/* Reminders Section */}
        <div className="pt-2 pb-3">
          <h3 className="text-ink tracking-[-0.02em] text-[26px] font-medium leading-tight text-left font-serif">
            Gentle reminders
          </h3>
        </div>
        <div className="flex flex-col gap-5 py-2">
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {['Daily', 'Weekdays', 'Weekends'].map(f => (
              <button 
                key={f}
                disabled={isSaved}
                onClick={() => setFrequency(f)}
                className={`flex-none px-6 py-3 rounded-xl border font-medium text-sm shadow-sm transition-all ${frequency === f ? 'bg-white border-matcha text-matcha' : 'bg-transparent border-stone-200 text-nav-inactive hover:border-matcha/30'} disabled:opacity-50`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TimeOption 
              label="Sunrise" 
              time="06:30 AM" 
              icon="wb_twilight" 
              active={time === 'Sunrise'} 
              onClick={() => !isSaved && setTime('Sunrise')} 
              disabled={isSaved}
            />
            <TimeOption 
              label="Midday" 
              time="12:00 PM" 
              icon="wb_sunny" 
              active={time === 'Midday'} 
              onClick={() => !isSaved && setTime('Midday')} 
              disabled={isSaved}
            />
            <TimeOption 
              label="Evening" 
              time="09:00 PM" 
              icon="bedtime" 
              active={time === 'Evening'} 
              onClick={() => !isSaved && setTime('Evening')} 
              disabled={isSaved}
            />
            <div className="cursor-pointer group flex flex-col gap-3 rounded-2xl border border-transparent bg-white p-5 hover:shadow-soft transition-all shadow-sm items-center justify-center text-center opacity-50">
              <span className="material-symbols-outlined text-nav-inactive text-[26px] font-light">schedule</span>
              <p className="text-nav-inactive font-medium text-sm tracking-wide">Custom</p>
            </div>
          </div>
        </div>

        <div className="h-10"></div>

        {/* Symbols Section */}
        <div className="pt-2 pb-3">
          <h3 className="text-ink tracking-[-0.02em] text-[26px] font-medium leading-tight text-left font-serif">
            Choose a symbol
          </h3>
        </div>
        <div className="grid grid-cols-4 gap-4 py-2">
          <SymbolOption icon="spa" label="Nature" active={symbol === 'Nature'} onClick={() => !isSaved && setSymbol('Nature')} disabled={isSaved} />
          <SymbolOption icon="self_improvement" label="Rest" active={symbol === 'Rest'} onClick={() => !isSaved && setSymbol('Rest')} disabled={isSaved} />
          <SymbolOption icon="visibility" label="Focus" active={symbol === 'Focus'} onClick={() => !isSaved && setSymbol('Focus')} disabled={isSaved} />
          <SymbolOption icon="bolt" label="Energy" active={symbol === 'Energy'} onClick={() => !isSaved && setSymbol('Energy')} disabled={isSaved} />
          <SymbolOption icon="local_cafe" label="Brew" active={symbol === 'Brew'} onClick={() => !isSaved && setSymbol('Brew')} disabled={isSaved} />
          <SymbolOption icon="book_2" label="Read" active={symbol === 'Read'} onClick={() => !isSaved && setSymbol('Read')} disabled={isSaved} />
          <SymbolOption icon="fitness_center" label="Move" active={symbol === 'Move'} onClick={() => !isSaved && setSymbol('Move')} disabled={isSaved} />
          <div className="aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-stone-200 bg-transparent text-nav-inactive/60 opacity-50">
            <span className="material-symbols-outlined text-[28px] font-light">add</span>
          </div>
        </div>

        <div className="h-10"></div>

        {/* Intention Section */}
        <div className="pt-2 pb-3">
          <h3 className="text-ink tracking-[-0.02em] text-[26px] font-medium leading-tight text-left font-serif">
            Intention
          </h3>
        </div>
        <div className="py-2">
          <div className="relative w-full rounded-2xl border border-transparent bg-white shadow-soft overflow-hidden p-6 transition-colors">
            <textarea 
              disabled={isSaved}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full resize-none bg-transparent border-0 p-0 text-ink placeholder:text-nav-inactive/50 focus:ring-0 text-base leading-relaxed h-32 font-light disabled:opacity-50" 
              placeholder="Add a gentle note or a quote to guide you..."
            />
            <div className="absolute bottom-5 right-6 text-nav-inactive/40 text-[10px] uppercase tracking-widest font-medium">
              Max 200
            </div>
          </div>
        </div>

        <div className="mt-12 mb-6 flex justify-center opacity-70">
          <p className="text-sm italic text-charcoal/60 font-serif text-center leading-relaxed">
            "Slowly, steadily,<br/>the garden grows."
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background-light via-background-light/90 to-transparent pointer-events-none flex justify-center items-end h-36 max-w-md mx-auto z-40">
        <button 
          onClick={handleSave}
          disabled={isSaved}
          className={`pointer-events-auto w-full shadow-soft font-medium text-lg h-16 rounded-2xl flex items-center justify-center gap-3 transform transition-all duration-500 ease-out ${isSaved ? 'bg-accent-green text-white scale-[1.02]' : 'bg-matcha hover:bg-matcha-dark text-white active:scale-[0.98]'}`}
        >
          <span className="material-symbols-outlined text-[22px] animate-pulse">
            {isSaved ? 'check_circle' : 'spa'}
          </span>
          <span className="tracking-wide">
            {isSaved ? 'Ritual Planted!' : 'Plant Ritual'}
          </span>
        </button>
      </div>
    </div>
  );
};

const TimeOption: React.FC<{ label: string; time: string; icon: string; active: boolean; onClick: () => void; disabled?: boolean }> = ({ label, time, icon, active, onClick, disabled }) => (
  <div 
    onClick={onClick}
    className={`cursor-pointer group relative flex flex-col gap-3 rounded-2xl border p-5 transition-all shadow-sm ${active ? 'border-matcha/20 bg-matcha/5' : 'border-transparent bg-white hover:shadow-soft'} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
  >
    <div className="flex justify-between items-start">
      <span className={`material-symbols-outlined text-[26px] font-light ${active ? 'text-matcha' : 'text-nav-inactive/70 group-hover:text-matcha'}`}>{icon}</span>
      <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${active ? 'border-matcha bg-matcha' : 'border-stone-200 group-hover:border-matcha/50'}`}>
        {active && <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>}
      </div>
    </div>
    <div>
      <p className={`font-semibold text-base tracking-wide ${active ? 'text-ink' : 'text-ink/80'}`}>{label}</p>
      <p className="text-nav-inactive text-xs mt-1 font-medium tracking-wide">{time}</p>
    </div>
  </div>
);

const SymbolOption: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void; disabled?: boolean }> = ({ icon, label, active, onClick, disabled }) => (
  <div 
    onClick={onClick}
    className={`aspect-square cursor-pointer flex flex-col items-center justify-center gap-2 rounded-2xl border transition-all shadow-sm group ${active ? 'border-matcha/30 bg-matcha/10' : 'border-transparent bg-white hover:shadow-soft'} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
  >
    <span className={`material-symbols-outlined text-[28px] font-light transition-colors ${active ? 'text-matcha' : 'text-nav-inactive group-hover:text-charcoal'}`}>{icon}</span>
    <span className={`text-[11px] font-semibold tracking-wider uppercase ${active ? 'text-matcha' : 'text-nav-inactive'}`}>{label}</span>
  </div>
);

export default CreateRitual;
