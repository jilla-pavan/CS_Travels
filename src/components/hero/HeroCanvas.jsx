import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Mounts the WebGL hero scene.
 *
 * This module is the dynamic-import boundary — it is never in the initial
 * bundle. Hero renders the CSS poster immediately and lazy-loads this only once
 * the hero is actually on screen, so the shader never competes with LCP.
 *
 * The canvas fades in over the poster on first paint rather than replacing it,
 * so there is no flash and no layout shift: the poster stays underneath for the
 * whole life of the component and shows through if WebGL ever fails.
 */
export default function HeroCanvas({ className }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  /**
   * Reveal is React state, not an imperative `canvas.style.opacity = "1"`.
   *
   * The canvas's inline style is React-owned, so any subsequent render — and
   * StrictMode guarantees one — re-applied `opacity: 0` and wiped the imperative
   * value. The scene was rendering correctly the whole time behind a canvas
   * React kept resetting to invisible.
   */
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let cancelled = false;
    let scene = null;

    /* The scene module is imported here rather than at the top of the file so
       the WebGL code is a separate chunk from this component's shell. */
    import("./scene")
      .then(({ createHeroScene }) => {
        if (cancelled) return;

        scene = createHeroScene(canvas, {
          reducedMotion: prefersReducedMotion,
        });

        /* null means no WebGL2, or a shader that failed to build. The poster
           underneath is already correct, so there is nothing to do. */
        if (!scene) return;

        sceneRef.current = scene;
        scene.start();
        setReady(true);
      })
      .catch(() => {
        /* Chunk failed to load — poster remains. Not worth surfacing. */
      });

    return () => {
      cancelled = true;
      scene?.dispose();
      sceneRef.current = null;
      setReady(false);
    };
  }, [prefersReducedMotion]);

  /* Pause when the tab is hidden. A shader burning GPU in a background tab is
     pure battery cost on a phone, and rAF throttling makes it visibly stutter
     on return anyway. */
  useEffect(() => {
    const onVisibility = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      if (document.hidden) scene.stop();
      else scene.start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /**
   * Scroll → shader.
   *
   * Progress of the hero through the viewport, written straight into the render
   * loop. No React state, so scrolling never re-renders the tree; the shader
   * eases toward the value on its own frames.
   *
   * Runs under reduced motion too — the scene is a still there, but it should
   * be the *correct* still for where the page is.
   */
  useEffect(() => {
    const onScroll = () => {
      const scene = sceneRef.current;
      const canvas = canvasRef.current;
      if (!scene || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const height = rect.height || 1;
      /* 0 when the hero's top is at the viewport top, 1 once it has fully left. */
      const progress = Math.min(Math.max(-rect.top / height, 0), 1);
      scene.setScroll(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Pointer parallax. Handled on window rather than on the canvas so the effect
     continues while the cursor is over the headline and booking card, and
     written straight to the render loop — no React state, no re-render. */
  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const onPointerMove = (event) => {
      const scene = sceneRef.current;
      if (!scene) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      scene.setParallax(x, y);
    };

    /* Pointer events, not mouse — but only fine pointers produce the effect,
       since a touch drag would fight the scroll. */
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return undefined;

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1)",
      }}
      /* Decorative: the scene carries no information the copy doesn't. */
      aria-hidden="true"
    />
  );
}
