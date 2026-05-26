'use client';

import { useEffect } from 'react';
import { useChiptune } from '@/hooks/useChiptune';
import { useReveal } from '@/hooks/useReveal';
import { useJoystickTilt } from '@/hooks/useJoystickTilt';

export const ArcadeEffects = () => {
  useChiptune();
  useReveal();
  useJoystickTilt();

  useEffect(() => {
    const root = document.documentElement;
    const runner = document.getElementById('runner');
    const navLinks = [...document.querySelectorAll('.nav-links a')];
    const sections = [...document.querySelectorAll('section[id]')];

    let lastScrollY = window.scrollY;
    let runScale = 1;
    let scrollStopTimer: ReturnType<typeof setTimeout> | null = null;
    let jumpSection: Element | null = null;
    let activeObstacle: Element | null = null;
    let battlePlayed = false;
    let battleTimer: ReturnType<typeof setTimeout> | null = null;
    let battleResetTimer: ReturnType<typeof setTimeout> | null = null;
    let scrollTicking = false;
    let swordPicked = false;

    function measureGapTarget() {
      if (!runner) return;
      const gapTarget =
        activeObstacle ||
        (jumpSection && jumpSection.classList.contains('is-active')
          ? jumpSection.querySelector('.cta-box')
          : null);
      const jumpActive = Boolean(gapTarget);

      root.style.setProperty('--runner-hop', jumpActive ? '-150px' : '0px');
      root.style.setProperty('--road-gap-opacity', '0');
      runner.classList.toggle('is-jumping', jumpActive);
    }

    function updateSwordPickup() {
      const history = document.getElementById('history');
      if (!history || swordPicked) return;
      const rect = history.getBoundingClientRect();

      if (rect.top <= window.innerHeight * 0.56) {
        swordPicked = true;
        history.classList.add('sword-collected');
        runner?.classList.add('has-sword');
      }
    }

    function updateRunner() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      const isMoving = Math.abs(delta) > 1;
      const speed = Math.min(1.28, Math.abs(delta) / 32 + 0.88);
      runScale = speed;
      lastScrollY = currentY;

      if (isMoving && runner) {
        runner.classList.add('is-running');
        const bob = Math.sin(performance.now() / 65) * 3;
        root.style.setProperty('--runner-bob', Math.round(bob) + 'px');
      }

      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        runner?.classList.remove('is-running');
        root.style.setProperty('--run-scale', '1');
        root.style.setProperty('--runner-bob', '0px');
      }, 130);

      measureGapTarget();
      updateSwordPickup();
      root.style.setProperty('--run-scale', runScale.toFixed(2));
      scrollTicking = false;
    }

    function requestRunnerUpdate() {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(updateRunner);
    }

    function triggerVideoBattle(section: Element) {
      if (battlePlayed) return;
      battlePlayed = true;
      if (battleTimer) clearTimeout(battleTimer);
      if (battleResetTimer) clearTimeout(battleResetTimer);

      section.classList.remove('battle-on', 'battle-done');
      void (section as HTMLElement).offsetWidth;
      section.classList.add('battle-on');

      runner?.classList.add('has-sword', 'is-fighting');
      root.style.setProperty('--run-scale', '1');

      battleTimer = setTimeout(() => {
        section.classList.remove('battle-on');
        section.classList.add('battle-done');
        runner?.classList.remove('is-fighting');
        runner?.classList.add('has-sword');
      }, 2600);

      battleResetTimer = setTimeout(() => {
        battlePlayed = false;
        section.classList.remove('battle-on', 'battle-done');
      }, 10000);
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            if ((entry.target as HTMLElement).dataset.runnerMode === 'jump') {
              jumpSection = entry.target;
              measureGapTarget();
            }
            if (id === 'videos') triggerVideoBattle(entry.target);
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
          } else {
            entry.target.classList.remove('is-active');
            if (jumpSection === entry.target) jumpSection = null;
            if (!activeObstacle && !(jumpSection && jumpSection.classList.contains('is-active'))) {
              measureGapTarget();
            }
          }
        });
      },
      { threshold: 0.42 }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const obstacleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeObstacle = entry.target;
            entry.target.classList.add('is-jump-target');
            measureGapTarget();
          } else {
            entry.target.classList.remove('is-jump-target');
            if (activeObstacle === entry.target) activeObstacle = null;
            if (!activeObstacle && !(jumpSection && jumpSection.classList.contains('is-active'))) {
              measureGapTarget();
            }
          }
        });
      },
      { threshold: 0.72 }
    );

    document.querySelectorAll('[data-runner-mode="jump-card"]').forEach((el) => {
      obstacleObserver.observe(el);
    });

    window.addEventListener('scroll', requestRunnerUpdate, { passive: true });
    window.addEventListener('resize', requestRunnerUpdate);
    updateRunner();

    return () => {
      window.removeEventListener('scroll', requestRunnerUpdate);
      window.removeEventListener('resize', requestRunnerUpdate);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      if (battleTimer) clearTimeout(battleTimer);
      if (battleResetTimer) clearTimeout(battleResetTimer);
      sectionObserver.disconnect();
      obstacleObserver.disconnect();
    };
  }, []);

  return null;
}
