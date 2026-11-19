import React from 'react';

interface ChevronMotifProps {
  className?: string;
}

/**
 * 5-chevron hollow outline motif inspired by the Usizolethu Holdings Company Profile slides.
 */
export const ChevronMotif: React.FC<ChevronMotifProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 180 56"
    fill="none"
    aria-hidden="true"
    className={`select-none pointer-events-none ${className}`}
  >
    {[0, 26, 52, 78, 104].map((offsetX) => (
      <path
        key={offsetX}
        d={`M${offsetX + 4} 6L${offsetX + 28} 28L${offsetX + 4} 50H${offsetX + 16}L${offsetX + 40} 28L${offsetX + 16} 6H${offsetX + 4}Z`}
        stroke="#9ADBE8"
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
    ))}
  </svg>
);

interface DotMatrixAccentProps {
  className?: string;
}

/**
 * Graduated corner dot matrix inspired by pages 2, 7, 8, and 9 of the Company Profile PDF.
 */
export const DotMatrixAccent: React.FC<DotMatrixAccentProps> = ({ className = '' }) => {
  const rows = 7;
  const cols = 10;
  const dots: Array<{ cx: number; cy: number; r: number; opacity: number }> = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const progress = (col / (cols - 1)) * 0.65 + (row / (rows - 1)) * 0.35;
      dots.push({
        cx: 10 + col * 18,
        cy: 10 + row * 18,
        r: 1.2 + progress * 2.2,
        opacity: 0.1 + progress * 0.45,
      });
    }
  }

  return (
    <svg
      viewBox="0 0 190 130"
      fill="none"
      aria-hidden="true"
      className={`select-none pointer-events-none ${className}`}
    >
      {dots.map((dot, idx) => (
        <circle
          key={idx}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="#9ADBE8"
          fillOpacity={dot.opacity}
        />
      ))}
    </svg>
  );
};
