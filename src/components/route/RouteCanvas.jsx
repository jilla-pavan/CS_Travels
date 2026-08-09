import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * Mounts the 3D route scene.
 *
 * The dynamic-import boundary — the geometry and matrix code are never in the
 * initial bundle, and only load once this section is within a viewport of being
 * reached. A visitor who never scrolls this far downloads none of it.
 *
 * Scroll drives the scene directly through a ref, so travelling the road never
 * re-renders React.
 */
export default function RouteCanvas({ className, sectionRef }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let cancelled = false;
    let scene = null;

    import("./routeScene")
      .then(({ createRouteScene }) => {
        if (cancelled) return;
        scene = createRouteScene(canvas, { reducedMotion: prefersReducedMotion });
        /* null = no WebGL2 or a program that failed to build. The section's
           static fallback is already correct, so there's nothing to do. */
        if (!scene) return;
        sceneRef.current = scene;
        scene.start();
        setReady(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      scene?.dispose();
      sceneRef.current = null;
      setReady(false);
    };
  }, [prefersReducedMotion]);

  /* Pause in a background tab — a GPU loop nobody is watching is pure battery. */
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

  /* Section progress → the road's draw position and the camera. */
  useEffect(() => {
    const onScroll = () => {
      const scene = sceneRef.current;
      const section = sectionRef?.current;
      if (!scene || !section) return;

      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        scene.setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      scene.setProgress(Math.min(Math.max(-rect.top / total, 0), 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1)",
      }}
      aria-hidden="true"
    />
  );
}
