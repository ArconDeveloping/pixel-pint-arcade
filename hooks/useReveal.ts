import { useEffect } from 'react';

export const useReveal = () => {
  useEffect(() => {
    const reveals = [...document.querySelectorAll('[data-reveal]')];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.22 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
