
import React, { useState, useRef } from 'react';

interface AuthProps {
  onAuthSuccess: (email: string, name?: string, avatar?: string) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill in all required fields.");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call with dynamic data
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess(email, isLogin ? undefined : name, avatar);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light px-8 py-10 font-wa overflow-y-auto">
      <header className="mb-12">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm mb-8 hover:shadow-md transition-shadow">
          <span className="material-symbols-outlined text-charcoal/60">arrow_back</span>
        </button>
        <h1 className="text-3xl font-serif text-ink mb-2">
          {isLogin ? 'Welcome back' : 'Create Account'}
        </h1>
        <p className="text-charcoal/50 font-light italic">
          {isLogin ? 'Find your quiet space again' : 'Begin your mindful journey'}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {!isLogin && (
          <div className="flex flex-col items-center gap-4 mb-2">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative size-24 rounded-full bg-white shadow-soft flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-stone-200 hover:border-matcha transition-colors"
            >
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" alt="Selected avatar" />
              ) : (
                <div className="flex flex-col items-center text-charcoal/30">
                  <span className="material-symbols-outlined">add_a_photo</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Photo</span>
                </div>
              )}
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAvatarUpload} 
            />
            <p className="text-[10px] text-charcoal/40 font-medium tracking-widest uppercase">Select Profile Image</p>
          </div>
        )}

        {!isLogin && (
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-charcoal/40 font-bold ml-1">Name</label>
            <input 
              type="text" 
              value={name}
              required={!isLogin}
              onChange={(e) => setName(e.target.value)}
              className="h-14 w-full rounded-2xl border-none bg-white px-6 text-ink shadow-sm focus:ring-1 focus:ring-matcha/40 transition-all"
              placeholder="Your name"
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-charcoal/40 font-bold ml-1">Email</label>
          <input 
            type="email" 
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 w-full rounded-2xl border-none bg-white px-6 text-ink shadow-sm focus:ring-1 focus:ring-matcha/40 transition-all"
            placeholder="hello@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-charcoal/40 font-bold ml-1">Password</label>
          <input 
            type="password" 
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="h-14 w-full rounded-2xl border-none bg-white px-6 text-ink shadow-sm focus:ring-1 focus:ring-matcha/40 transition-all"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="mt-4 h-16 w-full rounded-wa bg-charcoal text-white font-medium tracking-wide shadow-calm active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? (
            <span className="animate-spin material-symbols-outlined">refresh</span>
          ) : (
            <>
              <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center pb-12">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-charcoal/60 hover:text-matcha transition-colors"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
