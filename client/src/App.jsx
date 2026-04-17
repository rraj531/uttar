import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import MoodTracker from './components/MoodTracker';
import LandingPage from './components/LandingPage';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    let currentSession = localStorage.getItem('uttar_session_id');

    if (!currentSession) {
      currentSession = `session_${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem('uttar_session_id', currentSession);
    }

    setSessionId(currentSession);
  }, []);

  if (!sessionId) return null;

  if (!showApp) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4ede4] text-uttar-charcoal selection:bg-uttar-clay/20 selection:text-uttar-charcoal">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(188,108,77,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(109,83,68,0.12),transparent_32%),linear-gradient(180deg,#f7f1e8_0%,#efe4d8_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),transparent)]" />

      <nav className="relative z-20 border-b border-[#d8c6b8] bg-[#fbf8f3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => setShowApp(false)}
            className="text-left transition hover:opacity-80"
          >
            <span className="block font-heritage-serif text-3xl italic text-uttar-charcoal">Uttar</span>
            <span className="block text-[10px] uppercase tracking-[0.38em] text-uttar-charcoal/45">Quiet guidance</span>
          </button>

          <div className="hidden rounded-full border border-[#d8c6b8] bg-white/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-uttar-charcoal/60 sm:block">
            Private by default
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:flex-row lg:items-start lg:py-12">
        <aside className="w-full shrink-0 lg:w-[340px]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-[#d8c6b8] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,240,232,0.92))] p-7 shadow-[0_30px_70px_-48px_rgba(62,39,26,0.85)]">
              <p className="text-[11px] uppercase tracking-[0.34em] text-uttar-clay">Reflection Room</p>
              <h1 className="mt-3 font-heritage-serif text-4xl leading-tight text-uttar-charcoal">
                A calmer, more thoughtful way to talk things through.
              </h1>
              <p className="mt-4 text-sm leading-7 text-uttar-charcoal/65">
                Step into a simple private space for check-ins, journaling, and supportive conversation you can save or share when it helps.
              </p>
            </section>

            <MoodTracker sessionId={sessionId} />

            <section className="rounded-[24px] border border-[#d8c6b8] bg-white/70 p-5 text-sm leading-7 text-uttar-charcoal/60">
              <p className="text-[11px] uppercase tracking-[0.3em] text-uttar-clay">Sharing Note</p>
              <p className="mt-2">
                When you open this app through a shared tunnel link, chat and mood actions now use the same public app origin instead of a local-only localhost path.
              </p>
            </section>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="rounded-[32px] border border-[#d8c6b8] bg-white/40 p-2 shadow-[0_40px_100px_-60px_rgba(62,39,26,0.95)] backdrop-blur-sm">
            <ChatInterface />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
