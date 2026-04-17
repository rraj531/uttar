import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const MOODS = [
    { label: 'Anxious', tone: 'Storm' },
    { label: 'Sad', tone: 'Rain' },
    { label: 'Neutral', tone: 'Still' },
    { label: 'Calm', tone: 'Breeze' },
    { label: 'Happy', tone: 'Light' }
];

const MoodTracker = ({ sessionId }) => {
    const [history, setHistory] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchMoods = async () => {
            try {
                const res = await api.get(`/mood/${sessionId}`);
                setHistory(res.data);
            } catch (err) {
                console.error('Could not fetch moods:', err);
            }
        };

        fetchMoods();
    }, [sessionId]);

    const handleMoodSelect = async (mood) => {
        setSaving(true);

        try {
            const res = await api.post('/mood', {
                sessionId,
                mood: mood.label
            });
            setHistory([res.data.mood, ...history]);
        } catch (err) {
            console.error('Could not save mood', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="rounded-[24px] border border-[#dac9ba] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(248,241,235,0.95))] p-5 shadow-[0_24px_60px_-44px_rgba(72,43,30,0.7)]">
            <h3 className="mb-2 font-heritage-serif text-xl font-semibold text-uttar-charcoal">How does the day feel?</h3>
            <p className="mb-4 text-sm text-uttar-charcoal/60">Keep a private record of your emotional weather.</p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {MOODS.map((mood) => (
                    <button
                        key={mood.label}
                        disabled={saving}
                        onClick={() => handleMoodSelect(mood)}
                        className="flex min-h-[88px] flex-col items-start justify-between rounded-2xl border border-[#e7d9ce] bg-white/80 p-3 text-left transition hover:-translate-y-0.5 hover:border-uttar-clay/40 hover:bg-[#fffaf5]"
                        title={mood.label}
                    >
                        <span className="text-[10px] uppercase tracking-[0.28em] text-uttar-charcoal/45">{mood.tone}</span>
                        <span className="text-sm font-medium text-uttar-charcoal">{mood.label}</span>
                    </button>
                ))}
            </div>

            {history.length > 0 && (
                <div className="mt-4 rounded-2xl border border-[#e7d9ce] bg-white/70 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-uttar-charcoal/60">Latest check-in</p>
                    <p className="mt-1 font-heritage-serif text-lg text-uttar-charcoal">{history[0].mood}</p>
                </div>
            )}
        </div>
    );
};

export default MoodTracker;
