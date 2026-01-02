
import React from 'react';
import { Screen, Ritual } from '../types';

interface NudgesProps {
  onNavigate: (screen: Screen) => void;
  rituals: Ritual[];
  onToggleRitual: (id: string) => void;
}

const symbolToIcon: Record<string, string> = {
  'Nature': 'spa',
  'Rest': 'self_improvement',
  'Focus': 'visibility',
  'Energy': 'bolt',
  'Brew': 'local_cafe',
  'Read': 'book_2',
  'Move': 'fitness_center'
};

const symbolToColor: Record<string, string> = {
  'Nature': 'text-matcha',
  'Rest': 'text-sakura',
  'Focus': 'text-sky',
  'Energy': 'text-accent-orange',
  'Brew': 'text-ink',
  'Read': 'text-accent-purple',
  'Move': 'text-accent-green'
};

const symbolToBg: Record<string, string> = {
  'Nature': 'bg-matcha-light',
  'Rest': 'bg-sakura-light',
  'Focus': 'bg-sky-light',
  'Energy': 'bg-soft-peach',
  'Brew': 'bg-stone',
  'Read': 'bg-soft-lavender',
  'Move': 'bg-soft-sage'
};

const Nudges: React.FC<NudgesProps> = ({ onNavigate, rituals, onToggleRitual }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-wa-bg font-wa text-wa-text overflow-hidden">
      <div className="h-12 w-full shrink-0 z-10"></div>
      <div className="flex items-center px-6 pb-4 justify-between z-10 pt-2">
        <button onClick={() => onNavigate('HOME')} className="group flex size-10 shrink-0 items-center justify-center rounded-full bg-wa-card/60 backdrop-blur-sm border border-stone-100 shadow-sm hover:shadow-md transition-all active:scale-95 text-wa-text">
          <span className="material-symbols-outlined text-[20px] opacity-70">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs tracking-[0.2em] uppercase text-matcha font-bold">SoftDay</span>
        </div>
        <button className="group flex size-10 shrink-0 items-center justify-center rounded-full bg-wa-card/60 backdrop-blur-sm border border-stone-100 shadow-sm hover:shadow-md transition-all active:scale-95 text-wa-text">
          <span className="material-symbols-outlined text-[20px] opacity-70">more_horiz</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-40 pt-2 relative z-0">
        <div className="mb-10 mt-2 text-center">
          <div className="inline-block mb-4 p-3 rounded-full bg-matcha-light">
            <span className="material-symbols-outlined text-matcha text-[28px]">spa</span>
          </div>
          <h2 className="text-wa-text tracking-wide text-[28px] font-bold leading-tight pb-3">Gentle Nudges</h2>
          <p className="text-[#8c8686] text-base font-medium leading-relaxed max-w-[260px] mx-auto">Small moments of peace for your day.</p>
        </div>

        <div className="flex flex-col gap-5">
          {rituals.length === 0 && (
            <p className="text-center italic opacity-30 py-10">No rituals planted yet...</p>
          )}
          
          {rituals.map(ritual => (
            <NudgeItem 
              key={ritual.id}
              title={ritual.name} 
              desc={ritual.intention} 
              icon={symbolToIcon[ritual.symbol] || 'spa'} 
              iconColor={symbolToColor[ritual.symbol] || 'text-matcha'} 
              bgColor={symbolToBg[ritual.symbol] || 'bg-matcha-light'}
              time={ritual.time}
              checked={ritual.checked}
              onToggle={() => onToggleRitual(ritual.id)}
            />
          ))}

          <button 
            onClick={() => onNavigate('CREATE_RITUAL')}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-[1.5rem] border border-dashed border-matcha/40 bg-matcha-light/50 py-5 text-matcha transition-all hover:bg-matcha-light hover:border-matcha/60 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[22px]">add</span>
            <span className="text-[15px] font-bold tracking-wide">Create new ritual</span>
          </button>
          
          <div className="mt-8 mb-4 flex justify-center opacity-40 pointer-events-none">
            <div className="relative w-full h-24 border-b border-stone-300 flex items-end justify-center">
              <span className="material-symbols-outlined text-4xl text-stone-300 mb-2">landscape</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NudgeItemProps {
  title: string;
  desc: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  time?: string;
  checked?: boolean;
  onToggle: () => void;
}

const NudgeItem: React.FC<NudgeItemProps> = ({ title, desc, icon, iconColor, bgColor, time, checked, onToggle }) => (
  <div className={`group relative flex items-center justify-between gap-4 bg-white pl-2 pr-5 py-2 rounded-[2rem] shadow-paper hover:shadow-soft transition-all duration-300 border border-stone-50 ${!checked && 'opacity-60 hover:opacity-100'}`}>
    <div className="flex items-center gap-4 flex-1">
      <div className={`flex items-center justify-center rounded-[1.5rem] ${bgColor} shrink-0 size-16 ${iconColor} transition-transform group-hover:scale-105 duration-500`}>
        <span className="material-symbols-outlined text-[26px] font-light">{icon}</span>
      </div>
      <div className="flex flex-col justify-center py-2">
        <p className="text-wa-text text-[16px] font-bold tracking-wide">{title}</p>
        <p className="text-[#8c8686] text-[13px] font-medium leading-normal mt-0.5 line-clamp-1">{desc}</p>
        {time && (
          <div className="mt-2 inline-flex items-center gap-1.5 bg-stone-50 px-2.5 py-1 rounded-full w-fit">
            <span className="material-symbols-outlined text-[10px] text-matcha">schedule</span>
            <span className="text-[10px] font-bold tracking-wider text-matcha uppercase">{time}</span>
          </div>
        )}
      </div>
    </div>
    <div className="shrink-0 flex flex-col items-end gap-1">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onToggle} />
        <div className="w-12 h-7 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-matcha hover:bg-stone-300 transition-colors"></div>
      </label>
    </div>
  </div>
);

export default Nudges;
