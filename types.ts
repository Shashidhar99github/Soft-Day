
export type Screen = 'WELCOME' | 'HOME' | 'ADD_THOUGHT' | 'JOURNAL_WRITE' | 'JOURNALS_LIST' | 'NUDGES' | 'REFLECTION' | 'SETTINGS' | 'CREATE_RITUAL' | 'PROFILE' | 'PRIVACY_MANIFESTO';

export interface Task {
  id: string;
  text: string;
  subtext?: string;
  color: string;
  icon: string;
  completed?: boolean;
}

export interface Ritual {
  id: string;
  name: string;
  frequency: string;
  time: string;
  symbol: string;
  intention: string;
  createdAt: string;
  checked: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: Mood;
}

export interface CustomSound {
  id: string;
  name: string;
  data: string;
}

export type Mood = 'very_satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'cloudy';

export interface UserState {
  tasks: Task[];
  rituals: Ritual[];
  mood?: Mood;
  moodAdvice?: string;
  journals: JournalEntry[];
  profile: {
    name: string;
    avatar: string;
    joinDate: string;
  };
  customSounds: CustomSound[];
  settings: {
    theme: 'Morning' | 'Evening' | 'Night';
    soundscape: string;
  };
}
