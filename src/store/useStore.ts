import { create } from 'zustand';

interface GlobalState {
  currentRoute: string;
  theme: string;
  isAudioEnabled: boolean;
  setRoute: (route: string) => void;
  setTheme: (theme: string) => void;
  toggleAudio: () => void;
}

export const useStore = create<GlobalState>((set) => ({
  currentRoute: '/',
  theme: 'dark',
  isAudioEnabled: false,
  setRoute: (route) => set({ currentRoute: route }),
  setTheme: (theme) => set({ theme }),
  toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
}));
