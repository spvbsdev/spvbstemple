import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { client } from './sanity.client';

const builder = imageUrlBuilder(client);

export interface ImageSource {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface ImageOptimizationOptions {
  width: number;
  height: number;
  quality: number;
  format?: 'jpg' | 'webp' | 'png';
  blur?: number;
  sharpen?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
}

const defaultOptions: ImageOptimizationOptions = {
  width: 1920,
  height: 1080,
  quality: 80,
  format: 'webp',
};

export function urlForImage(source: string | ImageSource, options: Partial<ImageOptimizationOptions> = {}): ImageUrlBuilder {
  const opts = { ...defaultOptions, ...options };
  let imageBuilder = builder.image(source);

  // Apply basic dimensions and quality
  imageBuilder = imageBuilder
    .width(opts.width)
    .height(opts.height)
    .quality(opts.quality);

  // Apply format if specified
  if (opts.format) {
    imageBuilder = imageBuilder.format(opts.format);
  }

  // Apply blur if specified
  if (opts.blur) {
    imageBuilder = imageBuilder.blur(opts.blur);
  }

  // Apply sharpen if specified
  if (opts.sharpen) {
    imageBuilder = imageBuilder.sharpen(opts.sharpen);
  }

  // Apply fit if specified
  if (opts.fit) {
    imageBuilder = imageBuilder.fit(opts.fit);
  }

  // Auto format based on browser support
  imageBuilder = imageBuilder.auto('format');

  return imageBuilder;
} 