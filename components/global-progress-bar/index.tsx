"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import s from "./progress-bar.module.scss";

export const GlobalProgressBar = () => {
  // Check immediately on mount if we should show progress bar
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return !!sessionStorage.getItem("isNavigating");
    }
    return false;
  });
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're navigating (flag set by navigation links)
    const isNavigating = sessionStorage.getItem("isNavigating");

    if (isNavigating) {
      console.log("Navigation detected - showing progress bar");
      setIsVisible(true);
      setProgress(0);

      // Animate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev; // Stop at 95% until navigation completes
          return prev + Math.random() * 15; // Random increment for realistic feel
        });
      }, 50);

      // Complete progress and hide after navigation
      // Use longer timeout for reload cases
      const isReloading = sessionStorage.getItem("navigatedFromHome");
      const timeoutDuration = isReloading ? 1000 : 300;

      const timeout = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
          sessionStorage.removeItem("isNavigating");
        }, 200);
      }, timeoutDuration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [pathname]); // Re-run when pathname changes

  if (!isVisible) return null;

  return (
    <div className={s.progressBarContainer}>
      <div className={s.progressBar} style={{ width: `${progress}%` }} />
    </div>
  );
};
