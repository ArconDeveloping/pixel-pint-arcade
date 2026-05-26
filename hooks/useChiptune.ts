import { useEffect } from 'react';

const notes = [
  261.63, 329.63, 392.00, 523.25,
  392.00, 329.63, 293.66, 392.00,
  246.94, 293.66, 369.99, 493.88,
  392.00, 329.63, 261.63, 196.00,
];

const bass = [65.41, 65.41, 98.00, 98.00, 82.41, 82.41, 73.42, 98.00];

export const useChiptune = () => {
  useEffect(() => {
    const soundBtn = document.getElementById('soundBtn');

    let audioCtx: AudioContext | null = null;
    let musicTimer: ReturnType<typeof setInterval> | null = null;
    let soundOn = false;
    let noteIndex = 0;

    function makeOsc(freq: number, start: number, duration: number, type: OscillatorType, gainValue: number) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.02);
    }

    function playStep() {
      if (!audioCtx || !soundOn) return;
      const now = audioCtx.currentTime;
      const melody = notes[noteIndex % notes.length];
      const bassNote = bass[Math.floor(noteIndex / 2) % bass.length];

      makeOsc(melody, now, 0.12, 'square', 0.045);
      if (noteIndex % 2 === 0) makeOsc(bassNote, now, 0.18, 'triangle', 0.035);
      if (noteIndex % 4 === 0) makeOsc(1046.5, now, 0.04, 'square', 0.02);

      noteIndex++;
    }

    function startMusic() {
      if (!audioCtx) audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      soundOn = true;
      if (soundBtn) {
        soundBtn.textContent = 'Sound ON';
        soundBtn.classList.add('is-on');
      }
      if (musicTimer) clearInterval(musicTimer);
      playStep();
      musicTimer = setInterval(playStep, 170);
    }

    function stopMusic() {
      soundOn = false;
      if (soundBtn) {
        soundBtn.textContent = 'Sound OFF';
        soundBtn.classList.remove('is-on');
      }
      if (musicTimer) clearInterval(musicTimer);
    }

    function handleClick() {
      soundOn ? stopMusic() : startMusic();
    }

    soundBtn?.addEventListener('click', handleClick);

    return () => {
      soundBtn?.removeEventListener('click', handleClick);
      if (musicTimer) clearInterval(musicTimer);
      audioCtx?.close();
    };
  }, []);
}
