import { useEffect } from 'react';

export const useJoystickTilt = () => {
  useEffect(() => {
    const joysticks = [...document.querySelectorAll('[data-joystick]')];

    function handlePointerMove(event: PointerEvent) {
      joysticks.forEach((joy) => {
        const rect = joy.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const distance = event.clientX - center;
        const tilt = Math.max(-18, Math.min(18, distance / 18));
        (joy as HTMLElement).style.setProperty('--joy-tilt', tilt + 'deg');
      });
    }

    window.addEventListener('pointermove', handlePointerMove as EventListener, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove as EventListener);
    };
  }, []);
}
