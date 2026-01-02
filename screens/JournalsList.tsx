
import React from 'react';
import { UserState, Screen, JournalEntry, Mood } from '../types';

interface JournalsListProps {
  userState: UserState;
  onNavigate: (screen: Screen) => void;
}

const moodIcons: Record<Mood, string> = {
  very_satisfied: 'sentiment_very_satisfied',
  satisfied: 'sentiment_satisfied',
  neutral: 'sentiment_neutral',
  dissatisfied: 'sentiment_dissatisfied',
  cloudy: 'cloud'
};

const JournalsList: React.FC<JournalsListProps> = ({ userState, onNavigate }) => {
  const formatDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light overflow-x-hidden font-wa pb-32">
      <header className="flex items-center px-8 pt-10 pb-6 justify-between sticky top-0 bg-background-light/90 backdrop-blur-sm z-20">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.2em]">Memories</span>
          <h1 className="font-serif text-xl font-medium tracking-wide text-ink">My Journal</h1>
        </div>
        <button 
          onClick={() => onNavigate('JOURNAL_WRITE')}
          className="flex items-center justify-center size-10 rounded-full bg-matcha text-white shadow-soft active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add_notes</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col px-8 space-y-6 overflow-y-auto no-scrollbar pt-4">
        {userState.journals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <span className="material-symbols-outlined text-[48px] mb-4">edit_calendar</span>
            <p className="font-serif italic text-sm">No entries yet. Start writing your story.</p>
          </div>
        ) : (
          userState.journals.map((entry) => (
            <div 
              key={entry.id} 
              className="bg-white p-6 rounded-3xl shadow-paper border border-stone-100/50 group hover:shadow-soft transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-charcoal/30 uppercase tracking-[0.15em] mb-1">
                    {formatDate(entry.date)}
                  </span>
                  <div className="w-6 h-0.5 bg-matcha/30 rounded-full"></div>
                </div>
                {entry.mood && (
                  <span className={`material-symbols-outlined text-lg ${
                    entry.mood === 'very_satisfied' ? 'text-accent-orange' : 
                    entry.mood === 'satisfied' ? 'text-accent-green' : 
                    'text-charcoal/20'
                  }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {moodIcons[entry.mood]}
                  </span>
                )}
              </div>
              <p className="text-ink/80 text-sm leading-relaxed font-serif italic line-clamp-4">
                "{entry.content}"
              </p>
            </div>
          ))
        )}

        <div className="h-20"></div>
      </main>

      <div className="fixed bottom-28 right-8 z-30 pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-matcha/5 flex items-center justify-center border border-matcha/10 animate-pulse-slow">
           <span className="material-symbols-outlined text-matcha/20 text-4xl">spa</span>
        </div>
      </div>
    </div>
  );
};

export default JournalsList;
