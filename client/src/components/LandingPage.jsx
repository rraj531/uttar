import React from 'react';
import heroImage from '../assets/hero.png';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#f7f1e8] text-uttar-charcoal">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(188,108,77,0.12),transparent_26%),linear-gradient(180deg,#fbf8f3_0%,#f0e4d7_100%)]" />

      <nav className="relative z-20 border-b border-[#dccbbe] bg-[#fbf8f3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <div>
            <span className="block font-heritage-serif text-3xl italic">Uttar</span>
            <span className="block text-[10px] uppercase tracking-[0.4em] text-uttar-charcoal/45">Classic wellness companion</span>
          </div>

          <button
            onClick={onGetStarted}
            className="rounded-full bg-[linear-gradient(135deg,#8f4f36,#bc6c4d)] px-6 py-3 text-sm font-medium text-white shadow-[0_18px_40px_-22px_rgba(84,45,28,0.8)] transition hover:-translate-y-0.5"
          >
            Open Sanctuary
          </button>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.34em] text-uttar-clay">Private reflection, presented with care</p>
            <h1 className="mt-5 font-heritage-serif text-5xl leading-[1.05] sm:text-6xl">
              A more professional front door for your wellness experience.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-uttar-charcoal/65">
              Uttar now feels calmer, cleaner, and more editorial. The interface stays warm, but the layout, typography, and surfaces are much more polished and trustworthy.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={onGetStarted}
                className="rounded-full bg-[linear-gradient(135deg,#8f4f36,#bc6c4d)] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_20px_44px_-24px_rgba(84,45,28,0.9)] transition hover:-translate-y-0.5"
              >
                Launch App
              </button>
              <div className="rounded-full border border-[#dccbbe] bg-white/70 px-6 py-4 text-sm text-uttar-charcoal/60">
                Better WhatsApp sharing and tunnel-friendly API paths included.
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle,rgba(188,108,77,0.16),transparent_60%)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-[#d9c9bc] bg-white/80 p-4 shadow-[0_40px_100px_-60px_rgba(62,39,26,0.95)]">
              <img
                src={heroImage}
                alt="Uttar application preview"
                className="w-full rounded-[24px] border border-[#eadccf] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-3">
          <article className="rounded-[28px] border border-[#dccbbe] bg-white/72 p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-uttar-clay">Look & feel</p>
            <h2 className="mt-3 font-heritage-serif text-2xl">Classic and composed</h2>
            <p className="mt-3 text-sm leading-7 text-uttar-charcoal/62">
              Warmer neutrals, stronger hierarchy, and softer framing make the app feel more premium and dependable.
            </p>
          </article>

          <article className="rounded-[28px] border border-[#dccbbe] bg-white/72 p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-uttar-clay">Sharing</p>
            <h2 className="mt-3 font-heritage-serif text-2xl">WhatsApp-ready exports</h2>
            <p className="mt-3 text-sm leading-7 text-uttar-charcoal/62">
              Reflection shares now include a proper app link and use a safer WhatsApp URL pattern for desktop and mobile.
            </p>
          </article>

          <article className="rounded-[28px] border border-[#dccbbe] bg-white/72 p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-uttar-clay">Remote access</p>
            <h2 className="mt-3 font-heritage-serif text-2xl">Tunnel-friendly behavior</h2>
            <p className="mt-3 text-sm leading-7 text-uttar-charcoal/62">
              The frontend now calls `/api` instead of local-only backend URLs, so friends opening your shared link can use the app properly.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
