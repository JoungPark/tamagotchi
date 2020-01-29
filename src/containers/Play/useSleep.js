import { useState, useEffect } from 'react';

export const time = {
  awaken: 30,
  dream: 10,
}

export default function useSleep(props) {
  const [isRun, setRun] = useState(false);
  const [onBed, setOnBed] = useState(false);
  const [dream, setDream] = useState(false);
  const [dreamTime, setDreamTime] = useState(false);
  const [age, setAge] = useState(0);
  const [activeness, setActiveness] = useState(time.awaken);
  const [discomfort, setDiscomfort] = useState(0);

  const start = () => {
    setRun(true);
  };

  const stop = () => {
    setRun(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!dream) {
        setActiveness(activeness - 1);
        if (activeness < 0) {
          setDream(true);
          setActiveness(0);
        }
      } else {
        setDreamTime(dreamTime + 1);
        if (dreamTime > time.dream) {
          wakeUp();
        }
        if (!onBed) {
          setDiscomfort(discomfort + 1);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const wakeUp = () => {
    setDream(false);
    setDreamTime(0);
    setAge(age + 1);
    setOnBed(false);
    setActiveness(time.awaken);
    setDiscomfort(0);
  };

  const bed = () => {
    setOnBed(true);
  };

  return { state: { isRun, onBed, dream, dreamTime, age, activeness, discomfort }, actions: { start, stop, bed } };
}
