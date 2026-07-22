'use client';

import { useStore } from '@/store/useStore';

function playSynthSound(freq: number, type: OscillatorType, duration: number, volume: number) {
  try {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Gracefully handle browser autoplay or audio context constraints
  }
}

export function useInteractiveSounds() {
  const isAudioEnabled = useStore((s) => s.isAudioEnabled);

  const playHover = () => {
    if (isAudioEnabled) playSynthSound(440, 'sine', 0.05, 0.05);
  };

  const playClick = () => {
    if (isAudioEnabled) playSynthSound(800, 'triangle', 0.08, 0.1);
  };

  const playTheme = () => {
    if (isAudioEnabled) playSynthSound(1200, 'sine', 0.15, 0.12);
  };

  return { playHover, playClick, playTheme };
}
