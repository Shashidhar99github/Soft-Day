
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 backdrop-blur-xl border-t border-stone-200/50 pb-8 pt-4 px-10 flex justify-between items-center z-50 transition-all shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
      <NavItem 
        icon="home" 
        active={activeScreen === 'HOME'} 
        onClick={() => onNavigate('HOME')} 
      />
      <NavItem 
        icon="auto_stories" 
        active={activeScreen === 'JOURNALS_LIST' || activeScreen === 'JOURNAL_WRITE'} 
        onClick={() => onNavigate('JOURNALS_LIST')} 
      />
      <NavItem 
        icon="self_improvement" 
        active={activeScreen === 'NUDGES'} 
        onClick={() => onNavigate('NUDGES')} 
      />
      <NavItem 
        icon="settings" 
        active={activeScreen === 'SETTINGS' || activeScreen === 'PROFILE'} 
        onClick={() => onNavigate('SETTINGS')} 
      />
    </div>
  );
};

const NavItem: React.FC<{ icon: string; active: boolean; onClick: () => void }> = ({ icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`group relative flex flex-col items-center justify-center p-2 transition-all duration-300 ${active ? 'scale-110' : 'hover:scale-105'}`}
  >
    <div className={`absolute -top-1 w-8 h-8 rounded-full transition-all duration-500 ${active ? 'bg-stone-100 scale-100' : 'bg-transparent scale-0'}`}></div>
    <span className={`material-symbols-outlined text-[26px] relative z-10 transition-colors duration-300 ${active ? 'text-charcoal' : 'text-nav-inactive'}`} style={{ fontVariationSettings: active ? "'FILL' 0, 'wght' 400" : "'FILL' 0, 'wght' 300" }}>
      {icon}
    </span>
    {active && (
      <div className="absolute -bottom-1 h-1 w-1 bg-charcoal rounded-full mt-1 animate-pulse"></div>
    )}
  </button>
);

export default BottomNav;
