import React from 'react';

interface FisioProLogoProps {
  className?: string;
  size?: number;
}

export function FisioProLogo({ className = 'w-9 h-9', size = 36 }: FisioProLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={`${className} shrink-0`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fpGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="fpPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>
      </defs>

      {/* Head of figure */}
      <circle cx="218" cy="132" r="26" fill="url(#fpGreenGrad)" />

      {/* Upper torso and arm leaping upwards */}
      <path
        d="M 142 255 C 145 200 178 162 250 148 C 295 138 290 100 290 100 C 275 140 230 155 185 175 C 150 190 140 225 142 255 Z"
        fill="url(#fpGreenGrad)"
      />

      {/* Lower dynamic sweeping leg/curve */}
      <path
        d="M 35 356 C 130 340 230 280 300 260 C 315 256 305 315 305 350 C 295 320 235 300 180 315 C 115 330 65 350 35 356 Z"
        fill="url(#fpGreenGrad)"
      />

      {/* Spine/movement arc of purple circles increasing in size */}
      <circle cx="168" cy="265" r="7.5" fill="url(#fpPurpleGrad)" />
      <circle cx="190" cy="246" r="10.5" fill="url(#fpPurpleGrad)" />
      <circle cx="225" cy="226" r="14" fill="url(#fpPurpleGrad)" />
      <circle cx="262" cy="192" r="17" fill="url(#fpPurpleGrad)" />
      <circle cx="305" cy="142" r="21" fill="url(#fpPurpleGrad)" />
      <circle cx="342" cy="68" r="27" fill="url(#fpPurpleGrad)" />
    </svg>
  );
}
