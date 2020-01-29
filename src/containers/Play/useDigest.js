import { useState, useEffect } from 'react';

export const time = {
  energy: 10,
  poop: 3,
}

export default function useDigest(props) {
  const [isRun, setRun] = useState(false);
  const [energy, setEnergy] = useState(0);
  const [dirty, setDirty] = useState(0);
  const [poop, setPoop] = useState(false);

  const start = () => {
    setRun(true);
  };

  const stop = () => {
    setRun(false);
  };

  useEffect(() => {
    if (!isRun) return;
    const interval = setInterval(() => {
      setEnergy(energy - 1);
      if (poop) {
        setDirty(dirty + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRun, energy, poop, dirty]);

  const feed = () => {
    setEnergy(time.energy);
    setTimeout(() => {
      setPoop(true);
    }, time.poop * 1000);
  };

  const cleanPoop = () => {
    setPoop(false);
    setDirty(0);
  };

  return { state: { isRun, energy, dirty, poop }, actions: { start, stop, feed, cleanPoop} };
}