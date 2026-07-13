type LogoMarkProps = {
  className?: string;
};

export const LogoMark = ({ className }: LogoMarkProps) => (
  <svg
    aria-hidden="true"
    className={className}
    focusable="false"
    viewBox="0 0 38 38"
  >
    <rect x="4" y="4" width="34" height="34" fill="#000" />
    <rect x="0" y="0" width="34" height="34" fill="#090411" />
    <rect x="0" y="0" width="34" height="4" fill="#331244" />
    <rect x="0" y="30" width="34" height="4" fill="#331244" />
    <rect x="0" y="0" width="4" height="34" fill="#331244" />
    <rect x="30" y="0" width="4" height="34" fill="#331244" />
    <rect x="8" y="4" width="18" height="6" fill="var(--yellow)" />
    <rect x="6" y="10" width="22" height="18" fill="var(--orange)" />
  </svg>
);
