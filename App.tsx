
import React, { useState, useEffect, useRef } from 'react';
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import AddThought from './screens/AddThought';
import JournalWrite from './screens/JournalWrite';
import JournalsList from './screens/JournalsList';
import Nudges from './screens/Nudges';
import Reflection from './screens/Reflection';
import Settings from './screens/Settings';
import CreateRitual from './screens/CreateRitual';
import Profile from './screens/Profile';
import PrivacyManifesto from './screens/PrivacyManifesto';
import BottomNav from './components/BottomNav';
import { Screen, UserState, Task, Mood, Ritual, CustomSound, JournalEntry } from './types';
import { getMindfulAdvice } from './geminiService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('WELCOME');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('softday_state_v2');
    if (saved) return JSON.parse(saved);
    return {
      tasks: [
        { id: '1', text: 'Read 10 pages of a book', subtext: 'Maybe with some tea?', color: 'bg-accent-orange', icon: 'book_2', completed: false },
        { id: '2', text: 'Water the plants', subtext: 'They need love too', color: 'bg-accent-green', icon: 'potted_plant', completed: false },
        { id: '3', text: 'Call Mom', subtext: 'Just a quick check-in', color: 'bg-accent-purple', icon: 'call', completed: false },
      ],
      rituals: [
        { id: 'r1', name: 'Hydration', frequency: 'Daily', time: 'Every 2 hrs', symbol: 'Nature', intention: 'A mindful sip of water', createdAt: new Date().toISOString(), checked: true },
        { id: 'r2', name: 'Deep Breath', frequency: 'Daily', time: 'Sunrise', symbol: 'Rest', intention: 'Inhale calm, exhale worry', createdAt: new Date().toISOString(), checked: true },
      ],
      journals: [],
      profile: {
        name: 'Aoi',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
        joinDate: new Date().toISOString()
      },
      customSounds: [],
      settings: {
        theme: 'Morning',
        soundscape: 'silence'
      }
    };
  });

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    let soundUrl = '';
    if (userState.settings.soundscape !== 'silence') {
      const custom = userState.customSounds.find(s => s.id === userState.settings.soundscape);
      if (custom) soundUrl = custom.data;
    }

    if (soundUrl) {
      audioRef.current.src = soundUrl;
      audioRef.current.play().catch(e => console.log("Sound error:", e));
    } else {
      audioRef.current.pause();
    }

    return () => audioRef.current?.pause();
  }, [userState.settings.soundscape, userState.customSounds]);

  useEffect(() => {
    localStorage.setItem('softday_state_v2', JSON.stringify(userState));
  }, [userState]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      subtext: 'Added today',
      color: 'bg-matcha',
      icon: 'spa',
      completed: false
    };
    setUserState(prev => ({ ...prev, tasks: [...prev.tasks, newTask] }));
  };

  const addRitual = (ritualData: Omit<Ritual, 'id' | 'checked'>) => {
    const newRitual: Ritual = { ...ritualData, id: Date.now().toString(), checked: true };
    setUserState(prev => ({ ...prev, rituals: [...prev.rituals, newRitual] }));
  };

  const saveJournal = (content: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      mood: userState.mood
    };
    setUserState(prev => ({ ...prev, journals: [newEntry, ...prev.journals] }));
    setCurrentScreen('JOURNALS_LIST');
  };

  const toggleRitual = (id: string) => {
    setUserState(prev => ({
      ...prev,
      rituals: prev.rituals.map(r => r.id === id ? { ...r, checked: !r.checked } : r)
    }));
  };

  const toggleTask = (id: string) => {
    setUserState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const setMood = async (mood: Mood) => {
    setUserState(prev => ({ ...prev, mood, moodAdvice: '...' }));
    const advice = await getMindfulAdvice(mood);
    setUserState(prev => ({ ...prev, moodAdvice: advice }));
  };

  const updateSettings = (settings: UserState['settings']) => {
    setUserState(prev => ({ ...prev, settings }));
  };

  const updateProfile = (profile: UserState['profile']) => {
    setUserState(prev => ({ ...prev, profile }));
  };

  const showNav = ['HOME', 'JOURNALS_LIST', 'NUDGES', 'SETTINGS', 'PROFILE'].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'WELCOME': return <Welcome onStart={() => setCurrentScreen('HOME')} />;
      case 'HOME': return <Home userState={userState} onNavigate={setCurrentScreen} setMood={setMood} onToggleTask={toggleTask} />;
      case 'ADD_THOUGHT': return <AddThought onClose={() => setCurrentScreen('HOME')} onAdd={addTask} />;
      case 'JOURNAL_WRITE': return <JournalWrite onClose={() => setCurrentScreen('HOME')} onSave={saveJournal} initialValue="" />;
      case 'JOURNALS_LIST': return <JournalsList userState={userState} onNavigate={setCurrentScreen} />;
      case 'NUDGES': return <Nudges onNavigate={setCurrentScreen} rituals={userState.rituals} onToggleRitual={toggleRitual} />;
      case 'REFLECTION': return <Reflection onClose={() => setCurrentScreen('HOME')} />;
      case 'SETTINGS': return <Settings onBack={() => setCurrentScreen('PROFILE')} userState={userState} onUpdateSettings={updateSettings} onAddCustomSound={(s) => setUserState(p => ({ ...p, customSounds: [...p.customSounds, s]}))} onRemoveCustomSound={(id) => setUserState(p => ({ ...p, customSounds: p.customSounds.filter(s => s.id !== id)}))} onNavigate={setCurrentScreen} />;
      case 'PROFILE': return <Profile userState={userState} onNavigate={setCurrentScreen} onUpdateProfile={updateProfile} onLogout={() => setCurrentScreen('WELCOME')} />;
      case 'CREATE_RITUAL': return <CreateRitual onClose={() => setCurrentScreen('NUDGES')} onSave={addRitual} />;
      case 'PRIVACY_MANIFESTO': return <PrivacyManifesto onBack={() => setCurrentScreen('SETTINGS')} />;
      default: return <Welcome onStart={() => setCurrentScreen('HOME')} />;
    }
  };

  return (
    <div className={`min-h-screen max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-stone-200/30 transition-colors duration-1000 ${userState.settings.theme === 'Night' ? 'bg-ink' : 'bg-cream'}`}>
      <div className={`fixed inset-0 pointer-events-none z-[100] transition-all duration-1000 ${userState.settings.theme === 'Evening' ? 'bg-orange-500/5 mix-blend-soft-light backdrop-sepia-[0.2]' : userState.settings.theme === 'Night' ? 'bg-slate-900/10 mix-blend-multiply backdrop-brightness-[0.85] contrast-[1.1]' : 'bg-white/0'}`}></div>
      <div className="flex flex-col h-full w-full relative z-10">
        {renderScreen()}
        {showNav && <BottomNav activeScreen={currentScreen} onNavigate={setCurrentScreen} />}
      </div>
    </div>
  );
};

export default App;
