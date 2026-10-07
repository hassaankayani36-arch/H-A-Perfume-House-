import type { SyntheticEvent } from 'react';
import bottleFallback from '../assets/images/bottle-fallback.svg';

export const handleProductImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied) return;

  image.dataset.fallbackApplied = 'true';
  image.src = bottleFallback;
};
