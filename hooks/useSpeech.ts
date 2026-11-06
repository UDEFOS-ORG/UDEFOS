import { useCallback, useEffect, useRef, useState } from 'react';

export type PlaybackStatus = 'idle' | 'playing' | 'paused';

export const SPEECH_RATES = [0.75, 1, 1.25, 1.5] as const;

export interface SpeechPlayback {
  isSupported: boolean;
  status: PlaybackStatus;
  activeIndex: number | null;
  rate: number;
  toggle: () => void;
  stop: () => void;
  changeRate: (rate: number) => void;
}

export function useSpeech(paragraphs: readonly string[]): SpeechPlayback {
  const [isSupported, setIsSupported] = useState(false);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rate, setRate] = useState<number>(1);
  const sessionRef = useRef(0);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
    return () => window.speechSynthesis?.cancel();
  }, []);

  const finish = useCallback(() => {
    setStatus('idle');
    setActiveIndex(null);
  }, []);

  const speakFrom = useCallback(
    (startIndex: number, playbackRate: number) => {
      const synth = window.speechSynthesis;
      synth.cancel();
      sessionRef.current += 1;
      const session = sessionRef.current;

      paragraphs.forEach((text, index) => {
        if (index < startIndex) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = playbackRate;
        utterance.onstart = () => {
          if (session !== sessionRef.current) return;
          setActiveIndex(index);
          setStatus('playing');
        };
        utterance.onend = () => {
          if (session === sessionRef.current && index === paragraphs.length - 1) finish();
        };
        utterance.onerror = () => {
          if (session === sessionRef.current) finish();
        };
        synth.speak(utterance);
      });
      setStatus('playing');
    },
    [paragraphs, finish],
  );

  const stop = useCallback(() => {
    sessionRef.current += 1;
    window.speechSynthesis.cancel();
    finish();
  }, [finish]);

  const toggle = useCallback(() => {
    if (status === 'playing') {
      window.speechSynthesis.pause();
      setStatus('paused');
    } else if (status === 'paused') {
      window.speechSynthesis.resume();
      setStatus('playing');
    } else {
      speakFrom(0, rate);
    }
  }, [status, rate, speakFrom]);

  const changeRate = useCallback(
    (nextRate: number) => {
      setRate(nextRate);
      if (status === 'playing' && activeIndex !== null) speakFrom(activeIndex, nextRate);
    },
    [status, activeIndex, speakFrom],
  );

  return { isSupported, status, activeIndex, rate, toggle, stop, changeRate };
}
