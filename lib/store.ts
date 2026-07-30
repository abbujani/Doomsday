"use client";

import { create } from "zustand";
import type { Phase } from "./constants";

/**
 * Discrete experience state. Phase flips as the scroll crosses section
 * boundaries (intro → hero); the website chrome keys off it. Per-frame values
 * live in `signals.ts`.
 */
interface ExperienceState {
  phase: Phase;
  ready: boolean;
  started: boolean; // first user gesture (used to (re)prime the video decoders)
  reduceMotion: boolean;
  marvelBlobUrl: string | null;
  heroBlobUrl: string | null;
  finaleBlobUrl: string | null;
  loadProgress: number;

  setPhase: (p: Phase) => void;
  setReady: (v: boolean) => void;
  start: () => void;
  setReduceMotion: (v: boolean) => void;
  setBlobUrl: (which: "marvel" | "hero" | "finale", url: string) => void;
  setLoadProgress: (p: number) => void;
}

export const useExperience = create<ExperienceState>((set) => ({
  phase: "loading",
  ready: false,
  started: false,
  reduceMotion: false,
  marvelBlobUrl: null,
  heroBlobUrl: null,
  finaleBlobUrl: null,
  loadProgress: 0,

  setPhase: (phase) => set({ phase }),
  setReady: (ready) => set({ ready }),
  start: () => set({ started: true }),
  setReduceMotion: (reduceMotion) => set({ reduceMotion }),
  setBlobUrl: (which, url) =>
    set((state) => ({
      ...state,
      [`${which}BlobUrl`]: url,
    })),
  setLoadProgress: (loadProgress) => set({ loadProgress }),
}));

export const experience = useExperience;
