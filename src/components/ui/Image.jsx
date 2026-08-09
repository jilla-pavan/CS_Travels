import { useState } from "react";
import { cn } from "../../lib/utils";

/**
 * Responsive picture element.
 *
 * Takes the `as=picture` output from vite-imagetools:
 *
 *   import tirumala from "@/assets/tirumala.jpg?preset=card";
 *   <Picture source={tirumala} alt="…" sizes="(max-width: 768px) 100vw, 33vw" />
 *
 * Three things this handles that a bare <img> does not:
 *
 *  1. AVIF/WebP with automatic fallback, via real <source> elements.
 *  2. CLS — `aspectRatio` reserves the box before the image arrives. Nothing on
 *     this site is allowed to shift on load, so it's a required prop in practice.
 *  3. A fade-in on decode instead of a hard pop. Opacity-only, so reduced motion
 *     needs no exception.
 *
 * `sizes` matters more than it looks: get it wrong and the browser downloads the
 * 2560px derivative for a 400px card. Always pass the real rendered width.
 */
export function Picture({
  source,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  aspectRatio,
  priority = false,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  /* imagetools `as=picture` shape: { sources: { avif: "…", webp: "…" }, img: { src, w, h } } */
  const sources = source?.sources ?? {};
  const img = source?.img ?? {};

  return (
    <picture
      className={cn("relative block overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {Object.entries(sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}

      <img
        src={img.src}
        width={img.w}
        height={img.h}
        alt={alt}
        sizes={sizes}
        /* The hero image is the LCP element and must not be lazy or async —
           that's the single most common way a "fast" site fails LCP. */
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover",
          "transition-opacity duration-entrance ease-entrance",
          loaded || priority ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
        {...props}
      />
    </picture>
  );
}

/**
 * Plain remote image with the same CLS and fade guarantees, for sources that
 * can't go through the build pipeline (currently the Unsplash package images —
 * see CONTENT-BRIEF.md §8, these are placeholders pending real photography).
 */
export function RemoteImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  aspectRatio,
  priority = false,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn("relative block overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover",
          "transition-opacity duration-entrance ease-entrance",
          loaded || priority ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
        {...props}
      />
    </div>
  );
}
