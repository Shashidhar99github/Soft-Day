
import React, { useState, useRef } from 'react';
import { UserState, Screen } from '../types';

interface ProfileProps {
  userState: UserState;
  onNavigate: (screen: Screen) => void;
  onUpdateProfile: (profile: UserState['profile']) => void;
  onLogout: () => void;
}

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop',
];

const Profile: React.FC<ProfileProps> = ({ userState, onNavigate, onUpdateProfile, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userState.profile.name);
  const [tempAvatar, setTempAvatar] = useState(userState.profile.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const joinDateStr = new Date(userState.profile.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const completedTasks = userState.tasks.filter(t => t.completed).length;
  const activeRituals = userState.rituals.filter(r => r.checked).length;
  const journalCount = userState.journals.length;

  const handleSave = () => {
    onUpdateProfile({
      ...userState.profile,
      name: tempName,
      avatar: tempAvatar,
    });
    setIsEditing(false);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light overflow-x-hidden font-wa pb-32">
      <header className="flex items-center px-8 pt-10 pb-6 justify-between sticky top-0 bg-background-light/90 backdrop-blur-sm z-20">
        <button onClick={() => isEditing ? setIsEditing(false) : onNavigate('HOME')} className="group flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-stone/50 transition-all duration-300">
          <span className="material-symbols-outlined text-charcoal/60" style={{ fontSize: '24px', fontWeight: 300 }}>
            {isEditing ? 'close' : 'arrow_back'}
          </span>
        </button>
        <h1 className="font-serif text-xl font-medium tracking-wide text-ink">
          {isEditing ? 'Edit Profile' : 'Your Journey'}
        </h1>
        {isEditing ? (
          <button onClick={handleSave} className="text-matcha font-bold text-sm tracking-widest uppercase">Save</button>
        ) : (
          <button onClick={() => onNavigate('SETTINGS')} className="flex items-center justify-center p-2 rounded-full hover:bg-stone/50 transition-colors">
            <span className="material-symbols-outlined text-charcoal/60" style={{ fontSize: '22px' }}>settings</span>
          </button>
        )}
      </header>

      <main className="flex flex-col px-8 space-y-10">
        {/* Profile Header */}
        <section className="flex flex-col items-center pt-4">
          <div className="relative group">
            <div className={`w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-soft transition-all duration-500 ${isEditing ? 'ring-2 ring-matcha/40' : 'group-hover:scale-105'}`}>
              <img src={isEditing ? tempAvatar : userState.profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            {isEditing ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-matcha p-2 rounded-full shadow-md text-white transition-transform active:scale-90"
              >
                <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm border border-stone-100 transition-transform active:scale-90"
              >
                <span className="material-symbols-outlined text-matcha text-[16px]">edit</span>
              </button>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleCustomUpload} 
            />
          </div>

          <div className="mt-4 text-center w-full">
            {isEditing ? (
              <div className="flex flex-col gap-6 mt-4 animate-fade-in">
                <div className="flex flex-col gap-1.5 px-4">
                  <label className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest text-left ml-2">Display Name</label>
                  <input 
                    type="text" 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-white/80 border-none rounded-2xl px-5 py-3 text-center text-lg font-serif text-ink focus:ring-1 focus:ring-matcha/40 shadow-sm"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="flex flex-col gap-3">
                  <p className="text-[10px] text-charcoal/40 font-bold uppercase tracking-widest">Select Preset</p>
                  <div className="flex justify-center gap-4">
                    {AVATAR_OPTIONS.map((url, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setTempAvatar(url)}
                        className={`size-12 rounded-full overflow-hidden border-2 transition-all ${tempAvatar === url ? 'border-matcha scale-110 shadow-md' : 'border-white opacity-60 hover:opacity-100'}`}
                      >
                        <img src={url} className="w-full h-full object-cover" alt={`Avatar option ${idx}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-ink">{userState.profile.name}</h2>
                <p className="text-xs font-medium text-charcoal/40 tracking-[0.1em] uppercase mt-1">Reflecting since {joinDateStr}</p>
              </>
            )}
          </div>
        </section>

        {!isEditing && (
          <>
            {/* Stats Grid */}
            <section className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-paper border border-stone-100/50 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-matcha mb-2 text-[28px] font-light">spa</span>
                <span className="text-2xl font-serif text-ink">{activeRituals}</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mt-1">Rituals</span>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-paper border border-stone-100/50 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-accent-purple mb-2 text-[28px] font-light">auto_stories</span>
                <span className="text-2xl font-serif text-ink">{journalCount}</span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold mt-1">Entries</span>
              </div>
            </section>

            {/* Achievement section */}
            <section className="bg-matcha/5 p-6 rounded-3xl border border-matcha/10 relative overflow-hidden">
               <div className="relative z-10">
                 <h4 className="text-[10px] font-bold text-matcha-dark uppercase tracking-[0.2em] mb-2">Spirit of Wabi-sabi</h4>
                 <p className="text-sm font-serif italic text-ink/70">
                    "Finding beauty in imperfection, and peace in the quiet moments of the everyday."
                 </p>
               </div>
               <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-matcha/5 text-[100px] pointer-events-none">landscape</span>
            </section>
          </>
        )}

        <footer className="text-center pt-8 opacity-30 pb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">SoftDay • Minimalist Living</p>
        </footer>
      </main>
    </div>
  );
};

export default Profile;
