"use client";

import { useEffect, useState } from "react";
import { useExperience } from "@/lib/store";
import styles from "./ui.module.css";

export default function LoaderOverlay() {
  const loadProgress = useExperience((s) => s.loadProgress);
  const ready = useExperience((s) => s.ready);
  const setReady = useExperience((s) => s.setReady);
  const start = useExperience((s) => s.start);

  const [activeLog, setActiveLog] = useState("INITIALIZING DOOM METADATA CORE...");
  const [showEnter, setShowEnter] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (loadProgress < 25) {
      setActiveLog("INITIALIZING DOOM METADATA CORE...");
    } else if (loadProgress < 55) {
      setActiveLog("SYNCHRONIZING INTERSTELLAR TIMELINES...");
    } else if (loadProgress < 85) {
      setActiveLog("BUFFERING CINEMATIC FRAMES (ALL-INTRA)...");
    } else if (loadProgress < 100) {
      setActiveLog("STABILIZING DECODER MEMORY STRIP...");
    } else {
      setActiveLog("COMMUNICATION CHANNELS ESTABLISHED.");
      const t = setTimeout(() => setShowEnter(true), 300);
      return () => clearTimeout(t);
    }
  }, [loadProgress]);

  const handleEnter = () => {
    setFadeOut(true);
    // Wait for fade animation, then reveal experience and prime videos
    setTimeout(() => {
      setReady(true);
      start();
    }, 800);
  };

  if (ready) return null;

  return (
    <div
      className={`${styles.loaderWrap} ${fadeOut ? styles.loaderFade : ""}`}
      style={{ opacity: fadeOut ? 0 : 1 }}
    >
      <div className={styles.loaderContent}>
        <div className={styles.loaderHUD}>
          <span className={styles.loaderSystemLabel}>SYSTEM RECRUITMENT STATUS</span>
          <div className={styles.loaderStatus}>{activeLog}</div>
        </div>

        <div className={styles.loaderProgress}>
          <div className={styles.loaderPercent}>{loadProgress}%</div>
          <div className={styles.loaderTrack}>
            <div className={styles.loaderBar} style={{ width: `${loadProgress}%` }} />
          </div>
        </div>

        {showEnter && (
          <button className={styles.loaderBtn} onClick={handleEnter} type="button">
            ENTER EXPERIENCE
          </button>
        )}
      </div>
    </div>
  );
}
