import React from 'react';

const ImageWithFallback = ({ src, alt, className, fallbackSrc = '/fallback-image.jpg' }: { src: string, alt: string, className: string, fallbackSrc: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => { e.currentTarget.src = fallbackSrc; }}
    />
  );
};

export default ImageWithFallback;