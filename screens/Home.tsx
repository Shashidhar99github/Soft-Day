
import React from 'react';
import { UserState, Screen, Mood } from '../types';
import AppIcon from '../components/AppIcon';

interface HomeProps {
  userState: UserState;
  onNavigate: (screen: Screen) => void;
  setMood: (mood: Mood) => void;
  onToggleTask: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ userState, onNavigate, setMood, onToggleTask }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden pb-40 bg-background-light">
      <div className="flex items-center px-8 pt-8 pb-4 justify-between">
        <div className="flex items-center gap-3">
          <AppIcon size={24} color="#464340" />
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">Today</span>
            <h2 className="text-ink text-lg font-serif font-normal leading-tight tracking-wide">{today}</h2>
          </div>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button onClick={() => onNavigate('PROFILE')} className="flex items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-white/50 hover:bg-white transition-colors border border-charcoal/5">
            {userState.profile.avatar ? (
              <img src={userState.profile.avatar} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <span className="material-symbols-outlined font-light text-charcoal/60">account_circle</span>
            )}
          </button>
        </div>
      </div>

      <div className="px-8 pt-4 pb-8">
        <h1 className="text-ink tracking-[-0.02em] text-[36px] font-serif font-normal leading-[1.15]">
          Welcome back,<br/>
          <span className="text-charcoal/40 italic text-[32px]">take it slowly today</span> 🌿
        </h1>
      </div>

      <div className="px-8 mb-10">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-baseline px-1">
            <h2 className="text-ink text-lg font-medium tracking-tight">How is your heart feeling?</h2>
          </div>
          <div className="flex justify-between items-center gap-3">
            {(['very_satisfied', 'satisfied', 'neutral', 'dissatisfied', 'cloudy'] as Mood[]).map((m) => {
              const icons: Record<Mood, string> = {
                very_satisfied: 'sentiment_very_satisfied',
                satisfied: 'sentiment_satisfied',
                neutral: 'sentiment_neutral',
                dissatisfied: 'sentiment_dissatisfied',
                cloudy: 'cloud'
              };
              const colors: Record<Mood, string> = {
                very_satisfied: 'accent-orange',
                satisfied: 'accent-green',
                neutral: 'charcoal',
                dissatisfied: 'accent-purple',
                cloudy: 'sky'
              };
              const bgColors: Record<Mood, string> = {
                very_satisfied: 'soft-peach',
                satisfied: 'soft-sage',
                neutral: 'white',
                dissatisfied: 'soft-lavender',
                cloudy: 'sky-light'
              };

              return (
                <button key={m} onClick={() => setMood(m)} className="group">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${userState.mood === m ? `bg-${colors[m]} shadow-soft` : `bg-${bgColors[m]}`} group-hover:shadow-soft group-hover:-translate-y-1 border border-charcoal/5`}>
                    <span className={`material-symbols-outlined text-[28px] ${userState.mood === m ? 'text-white' : `text-${colors[m]}`}`} style={{ fontVariationSettings: "'FILL' 1" }}>{icons[m]}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {userState.moodAdvice && (
            <div className="mt-2 p-5 bg-white/60 backdrop-blur-sm rounded-2xl border border-stone-200/50 animate-fade-in">
               <p className="text-charcoal/70 text-sm italic font-serif leading-relaxed text-center">
                "{userState.moodAdvice}"
               </p>
            </div>
          )}
        </div>
      </div>

      {/* Journal Quick Entry */}
      <div className="px-8 mb-10">
        <button 
          onClick={() => onNavigate('JOURNAL_WRITE')}
          className="w-full bg-white/40 p-5 rounded-3xl border border-white/60 flex items-center justify-between hover:bg-white/60 transition-all group"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="size-12 rounded-2xl bg-matcha/10 flex items-center justify-center text-matcha group-hover:bg-matcha group-hover:text-white transition-all">
              <span className="material-symbols-outlined">auto_stories</span>
            </div>
            <div>
              <p className="text-sm font-bold text-ink tracking-wide">Write your entry</p>
              <p className="text-[11px] text-charcoal/40 uppercase tracking-widest font-medium">Record a quiet moment</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-stone-300">chevron_right</span>
        </button>
      </div>

      <div className="px-8 pt-2 pb-5 flex items-end justify-between">
        <h3 className="text-ink text-xl font-serif font-normal tracking-tight">Things I’d like to do</h3>
        <span className="text-xs text-charcoal/40 font-medium tracking-wide lowercase italic">tap to complete</span>
      </div>

      <div className="px-8 flex flex-col gap-5">
        {userState.tasks.length === 0 && (
          <div className="py-10 text-center opacity-30 italic font-serif">Empty space...</div>
        )}
        {userState.tasks.map((task) => (
          <div 
            key={task.id} 
            onClick={() => onToggleTask(task.id)}
            className={`group relative overflow-hidden bg-card-light p-6 rounded-xl shadow-paper hover:shadow-soft transition-all duration-300 cursor-pointer border border-stone-100/50 ${task.completed ? 'opacity-50' : 'opacity-100'}`}
          >
            <div className={`absolute top-0 left-0 w-1 h-full opacity-40 rounded-l-xl ${task.completed ? 'bg-stone-400' : (task.id === '1' ? 'bg-accent-orange' : task.id === '2' ? 'bg-accent-green' : 'bg-accent-purple')}`}></div>
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <span className={`text-base font-normal text-ink transition-all ${task.completed ? 'line-through decoration-stone-300 text-stone-400' : 'group-hover:text-charcoal'}`}>{task.text}</span>
                <span className="text-xs text-charcoal/40 font-light">{task.completed ? 'Completed' : task.subtext}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined font-light transition-colors ${task.completed ? 'text-stone-300' : 'group-hover:text-accent-orange'}`}>{task.completed ? 'check_circle' : task.icon}</span>
              </div>
            </div>
          </div>
        ))}

        <div onClick={() => onNavigate('REFLECTION')} className="mt-8 w-full h-40 rounded-2xl overflow-hidden relative cursor-pointer border border-charcoal/5">
          <img alt="Calming sky" className="w-full h-full object-cover opacity-60 mix-blend-multiply filter saturate-[0.6] sepia-[0.3]" src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop" />
          <div className="absolute inset-0 bg-stone/20"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-charcoal">
            <span className="material-symbols-outlined text-2xl opacity-70">wb_sunny</span>
            <span className="text-sm font-serif italic tracking-wide">Wonderful day ahead.</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-28 left-0 right-0 flex justify-center z-20 pointer-events-none">
        <button 
          onClick={() => onNavigate('ADD_THOUGHT')}
          className="pointer-events-auto shadow-soft bg-paper text-ink h-14 pl-6 pr-8 rounded-full flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 border border-stone-300/50"
        >
          <span className="material-symbols-outlined text-2xl text-charcoal/30 font-light">add</span>
          <span className="font-serif font-normal text-lg tracking-wide">Add gently</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
