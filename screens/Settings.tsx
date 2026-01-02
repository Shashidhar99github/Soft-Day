
import React, { useRef } from 'react';
import { UserState, CustomSound, Screen } from '../types';

interface SettingsProps {
  onBack: () => void;
  userState: UserState;
  onUpdateSettings: (settings: UserState['settings']) => void;
  onAddCustomSound: (sound: CustomSound) => void;
  onRemoveCustomSound: (id: string) => void;
  onNavigate: (screen: Screen) => void;
}

const Settings: React.FC<SettingsProps> = ({ onBack, userState, onUpdateSettings, onAddCustomSound, onRemoveCustomSound, onNavigate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { settings, customSounds } = userState;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please select an audio file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      onAddCustomSound({
        id: `custom_${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        data: base64Data
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-paper overflow-x-hidden font-wa border-x border-stone/50 pb-32 transition-colors duration-1000">
      <header className="flex items-center px-8 pt-10 pb-6 justify-between sticky top-0 bg-paper/90 backdrop-blur-sm z-20 transition-colors">
        <button onClick={onBack} className="group flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-stone/50 transition-all duration-300">
          <span className="material-symbols-outlined text-[#6b665f] group-hover:text-ink transition-colors" style={{ fontSize: '24px', fontWeight: 300 }}>arrow_back</span>
        </button>
        <h1 className="font-serif text-xl font-medium tracking-wide text-ink">Settings</h1>
        <div className="w-8"></div> 
      </header>

      <main className="flex flex-col flex-1 px-8 pb-12 space-y-12">
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="font-serif text-xs uppercase tracking-[0.2em] text-[#9c8e7e] font-semibold block mb-1">Atmosphere</span>
            <h2 className="text-2xl font-serif text-ink font-light">Ambience</h2>
            <p className="text-[#6b665f] text-sm font-light leading-relaxed max-w-[260px] mx-auto">
              Select the light that brings you peace.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <AmbienceOption 
              value="Morning" 
              icon="wb_sunny" 
              active={settings.theme === 'Morning'} 
              onClick={() => onUpdateSettings({ ...settings, theme: 'Morning' })} 
            />
            <AmbienceOption 
              value="Evening" 
              icon="wb_twilight" 
              active={settings.theme === 'Evening'} 
              onClick={() => onUpdateSettings({ ...settings, theme: 'Evening' })} 
            />
            <AmbienceOption 
              value="Night" 
              icon="dark_mode" 
              active={settings.theme === 'Night'} 
              onClick={() => onUpdateSettings({ ...settings, theme: 'Night' })} 
            />
          </div>
        </section>

        <div className="w-16 h-px bg-stone mx-auto"></div>

        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="font-serif text-xs uppercase tracking-[0.2em] text-[#9c8e7e] font-semibold block mb-1">Audio</span>
            <h2 className="text-2xl font-serif text-ink font-light">Custom Soundscape</h2>
            <p className="text-[#6b665f] text-sm font-light leading-relaxed max-w-[260px] mx-auto">
              Your own sanctuary of sound.
            </p>
          </div>
          <div className="flex flex-col space-y-3">
            <SoundOption 
              id="silence"
              title="Silence" 
              desc="Absolute quiet for focus" 
              icon="no_sound" 
              active={settings.soundscape === 'silence'} 
              onClick={() => onUpdateSettings({ ...settings, soundscape: 'silence' })} 
            />

            {customSounds.length > 0 ? (
              <div className="pt-2 border-t border-stone/30 mt-2">
                <p className="text-[10px] uppercase tracking-widest text-[#9c8e7e] mb-3 px-1 font-bold">Your Sounds</p>
                <div className="flex flex-col space-y-3">
                  {customSounds.map((sound) => (
                    <div key={sound.id} className="relative group">
                      <SoundOption 
                        id={sound.id}
                        title={sound.name}
                        desc="Personal Soundscape"
                        icon="audio_file"
                        active={settings.soundscape === sound.id}
                        onClick={() => onUpdateSettings({ ...settings, soundscape: sound.id })}
                      />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveCustomSound(sound.id);
                        }}
                        className="absolute right-14 top-1/2 -translate-y-1/2 p-2 text-charcoal/20 hover:text-accent-orange transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-4 text-center opacity-40 italic text-xs">
                No custom sounds added yet.
              </div>
            )}

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center p-5 rounded-2xl border border-dashed border-stone-300 hover:border-matcha/50 hover:bg-matcha/5 transition-all text-[#6b665f] group"
            >
              <span className="material-symbols-outlined mr-3 transition-colors group-hover:text-matcha">upload_file</span>
              <span className="text-sm font-medium">Add custom soundscape</span>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="audio/*" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
            </button>
          </div>
        </section>

        <section>
          <div className="relative overflow-hidden rounded-3xl bg-[#f0eee9] p-8 border border-stone/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col items-start relative z-10">
              <div className="mb-4 p-3 rounded-xl bg-white text-ink shadow-sm inline-flex">
                <span className="material-symbols-outlined font-light" style={{ fontSize: '24px' }}>lock</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-ink mb-2">Your thoughts stay with you.</h3>
              <p className="text-sm font-light text-[#6b665f] leading-relaxed mb-6">
                Data is stored locally on this device. No cloud uploads, no tracking pixels. Just you and your mind.
              </p>
              <button 
                onClick={() => onNavigate('PRIVACY_MANIFESTO')}
                className="text-xs font-bold uppercase tracking-widest text-ink hover:text-[#9c8e7e] transition-colors flex items-center gap-2 group"
              >
                Privacy Manifesto
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" style={{ fontSize: '16px' }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        <footer className="text-center pb-8 opacity-60">
          <div className="w-1 h-1 bg-[#6b665f] rounded-full mx-auto mb-4"></div>
          <p className="font-serif text-xs text-[#6b665f] italic">SoftDay v1.1.0</p>
        </footer>
      </main>
    </div>
  );
};

const AmbienceOption: React.FC<{ value: string; icon: string; active: boolean; onClick: () => void }> = ({ value, icon, active, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center group">
    <div className={`flex flex-col items-center justify-center aspect-square w-full rounded-2xl bg-white border shadow-paper transition-all duration-300 group-hover:-translate-y-1 ${active ? 'border-matcha bg-[#fcfefb]' : 'border-stone/60'}`}>
      <span className={`material-symbols-outlined mb-2 transition-colors font-light ${active ? 'text-matcha' : 'text-[#6b665f]'}`} style={{ fontSize: '28px' }}>{icon}</span>
      <span className={`text-xs font-medium ${active ? 'text-ink' : 'text-[#6b665f]'}`}>{value}</span>
    </div>
  </button>
);

const SoundOption: React.FC<{ id: string; title: string; desc: string; icon: string; active: boolean; onClick: () => void }> = ({ title, desc, icon, active, onClick }) => (
  <button onClick={onClick} className="text-left w-full group">
    <div className={`flex items-center p-5 rounded-2xl bg-white border transition-all duration-300 ${active ? 'border-matcha/30 bg-[#f4f7f2]' : 'border-transparent shadow-sm hover:shadow-md'}`}>
      <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${active ? 'bg-matcha text-white' : 'bg-stone/30 text-[#6b665f]'}`}>
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
      </div>
      <div className="ml-5 flex-1 pr-6">
        <h3 className="font-serif text-base text-ink font-medium truncate">{title}</h3>
        <p className="text-xs text-[#6b665f] font-light mt-0.5 truncate">{desc}</p>
      </div>
      <div className={`w-2 h-2 rounded-full transition-colors ${active ? 'bg-matcha' : 'bg-stone'}`}></div>
    </div>
  </button>
);

export default Settings;
