import React, { useState } from 'react';

interface SectionBackdropProps {
  src: string;
  alt: string;
  scrimClassName: string;
  imageClassName?: string;
}

export const SectionBackdrop: React.FC<SectionBackdropProps> = ({
  src,
  alt,
  scrimClassName,
  imageClassName = 'opacity-85',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover object-center ${imageClassName}`}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#141414] via-[#1A1A1A] to-[#242424]" />
      )}
      <div className={`absolute inset-0 ${scrimClassName}`} />
    </div>
  );
};
