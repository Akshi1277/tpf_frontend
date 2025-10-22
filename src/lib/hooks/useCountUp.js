// lib/hooks/useCountUp.js
import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;

    const animate = (currentTime) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime;
      const progress = (currentTime - startTimeRef.current) / duration;

      if (progress < 1) {
        countRef.current = Math.floor(end * progress);
        setCount(countRef.current);
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
}