/**
 * Hero depth scene — a single full-screen fragment shader.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * WHY RAW WebGL2 AND NOT three.js / React Three Fiber
 *
 * The stack in the brief lists R3F, and the 3D budget allows 4MB. But this scene
 * is one full-screen quad with no geometry, no camera, no lights, no materials
 * and no scene graph — every feature three.js exists to provide. Importing it
 * would cost ~150KB gzipped to draw two triangles.
 *
 * That cost lands on the hero, which is the LCP surface and the least forgiving
 * place on the site to spend payload. The brief's own instruction settles it:
 * "If a scene can be achieved convincingly with CSS layers + a shader plane
 * instead of geometry, do that."
 *
 * So: ~5KB of WebGL boilerplate here, and three.js stays reserved for the route
 * map in step 6, where actual geometry and camera work earn their weight.
 * ───────────────────────────────────────────────────────────────────────────
 *
 * Renders a dawn view over layered hill silhouettes: graded sky, low sun with
 * bloom, volumetric ray streaks, two drifting mist bands, three parallaxed
 * ridges, vignette and grain. All procedural — no image assets, which is what
 * unblocks the hero while photography is outstanding.
 */

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uParallax;   /* -1..1, already damped by the caller */
uniform float uScroll;     /* 0 at top of hero, 1 when it has fully left */

out vec4 fragColor;

/* ---------------------------------------------------------------- noise --- */

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

/* Rotated octaves — stops the axis-aligned banding plain fbm produces. */
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = rot * p * 2.03;
    a *= 0.5;
  }
  return v;
}

/* ------------------------------------------------------------- palette --- */
/* Straight from design-tokens.js, kept in sync by hand — the shader can't
   import JS. ink-950, ink-800, ink-600, gold-500. */

const vec3 INK_DEEP = vec3(0.012, 0.035, 0.075);
const vec3 INK_MID  = vec3(0.043, 0.122, 0.227);
const vec3 INK_HAZE = vec3(0.102, 0.259, 0.439);
const vec3 GOLD     = vec3(0.831, 0.686, 0.216);

/* A ridge line at height "base", roughened by fbm. Returns coverage with a
   1-pixel smoothstep so the silhouette edge is antialiased.
   (No backticks in here — this whole shader is a JS template literal.) */
float ridge(vec2 uv, float base, float amp, float freq, float seed, float px) {
  float h = base + amp * (fbm(vec2(uv.x * freq + seed, seed * 1.7)) - 0.5);
  return smoothstep(h + px, h - px, uv.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  float px = 1.5 / uResolution.y;

  const float HORIZON = 0.40;

  /**
   * This layer now composites over the hero photograph in "screen" blend, so it
   * contributes LIGHT ONLY — anything near black disappears, anything bright
   * adds glow. The sky base and hill silhouettes are therefore gone: they would
   * wash out the photo rather than sit in it.
   *
   * Scroll drives the light. As the hero leaves the viewport the sun sinks and
   * dims and the mist thins, so the atmosphere responds to the page rather than
   * looping independently of it.
   */
  vec3 col = vec3(0.0);

  /* -------------------------------------------------------------- sun --- */
  /* Sinks toward the horizon and drifts right as you scroll. */
  vec2 sunPos = vec2(
    0.70 + uParallax.x * 0.012 + uScroll * 0.05,
    HORIZON + 0.075 - uScroll * 0.12
  );
  vec2 toSun = (uv - sunPos) * vec2(aspect, 1.0);
  float sunDist = length(toSun);

  /* Dims as the hero scrolls away. */
  float sunEnergy = 1.0 - uScroll * 0.65;

  col += GOLD * exp(-sunDist * 5.5) * 0.34 * sunEnergy;              /* bloom */
  col += vec3(1.0, 0.95, 0.82) * exp(-sunDist * 34.0) * 0.30 * sunEnergy; /* core */

  /* ------------------------------------------------- volumetric rays --- */
  /* Streaks in polar space around the sun, drifting slowly. These are the main
     reason this layer exists — a still photograph cannot have moving godrays. */
  float angle = atan(toSun.y, toSun.x);
  float rays = fbm(vec2(angle * 2.6, uTime * 0.018));
  rays = smoothstep(0.38, 0.92, rays);
  col += GOLD * rays * exp(-sunDist * 1.7) * 0.16 * sunEnergy;

  /* ------------------------------------------------------------ mist --- */
  /* Two drifting bands, additive rather than mixed, so they lighten the photo
     instead of replacing it. The nearer band moves faster with the pointer —
     the cue that reads as depth. Thins out on scroll. */
  float mistEnergy = 1.0 - uScroll * 0.5;

  float m1 = fbm(uv * vec2(2.4, 5.0) + vec2(uTime * 0.011 + uParallax.x * 0.01, uScroll * 0.3));
  float band1 = smoothstep(0.52, 0.82, m1)
              * smoothstep(0.10, 0.55, uv.y)
              * smoothstep(1.00, 0.55, uv.y);
  col += mix(INK_HAZE, GOLD, 0.25) * band1 * 0.22 * mistEnergy;

  float m2 = fbm(uv * vec2(4.2, 8.0) + vec2(uTime * 0.024 + uParallax.x * 0.02, 3.7 + uScroll * 0.5));
  float band2 = smoothstep(0.58, 0.88, m2)
              * smoothstep(0.05, 0.35, uv.y)
              * smoothstep(0.72, 0.30, uv.y);
  col += mix(INK_HAZE, GOLD, 0.35) * band2 * 0.16 * mistEnergy;

  /* -------------------------------------------------------- finishing --- */
  /* Vignette darkens the edges — under "screen" blend that simply means the
     overlay contributes nothing there, letting the photograph through clean. */
  vec2 v = (uv - vec2(0.5, 0.55)) * vec2(aspect * 0.85, 1.0);
  col *= 1.0 - smoothstep(0.30, 1.00, length(v)) * 0.75;

  /* Keep the left third clear: that's where the headline and booking card sit,
     and screen-blended haze under text costs contrast. */
  col *= smoothstep(0.02, 0.42, uv.x);

  fragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return shader;
}

/**
 * Boots the scene on a canvas.
 *
 * Returns a controller, or `null` when WebGL2 is unavailable or the program
 * fails to build — the caller keeps its CSS gradient poster in that case, so a
 * failure here degrades to a still image rather than an empty hero.
 */
export function createHeroScene(canvas, { reducedMotion = false } = {}) {
  const gl = canvas.getContext("webgl2", {
    antialias: false, // the shader antialiases its own ridges
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true, // bail on software rendering
  });

  if (!gl) return null;

  let program;
  try {
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program));
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  } catch (error) {
    if (import.meta.env.DEV) console.error("[hero] ", error);
    return null;
  }

  /* One oversized triangle rather than a quad — same coverage, one fewer
     vertex, and no diagonal seam where two triangles meet. */
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);
  const uResolution = gl.getUniformLocation(program, "uResolution");
  const uTime = gl.getUniformLocation(program, "uTime");
  const uParallax = gl.getUniformLocation(program, "uParallax");
  const uScroll = gl.getUniformLocation(program, "uScroll");

  let width = 0;
  let height = 0;
  let raf = null;
  let running = false;
  let startTime = performance.now();
  let disposed = false;

  /* Target and eased pointer offset. Easing here rather than in React keeps the
     parallax on the render loop instead of causing a re-render per mousemove. */
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  /* Scroll progress, 0..1. Written from outside on scroll and eased here on the
     render loop, same as the pointer — so it never causes a React render. */
  let scrollTarget = 0;
  let scrollCurrent = 0;

  /**
   * Sizing is driven by ResizeObserver, never by the render loop.
   *
   * Reading `clientWidth` inside the rAF callback forces a synchronous style
   * recalculation on every single frame — layout thrash, and precisely what the
   * "transform and opacity only, no layout thrash" rule exists to prevent. The
   * observer fires only when the box actually changes.
   */
  function applySize(cssWidth, cssHeight) {
    /* DPR capped at 1.5. A full-screen fragment shader is fill-rate bound, and
       the difference between 1.5x and 3x is invisible on this content while
       costing 4x the fragments — the single biggest lever on mid-range Android. */
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(1, Math.floor(cssWidth * dpr));
    const h = Math.max(1, Math.floor(cssHeight * dpr));

    if (w === width && h === height) return false;
    width = w;
    height = h;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uResolution, w, h);
    return true;
  }

  /* Seed from current layout so the very first draw is correctly sized even if
     the observer hasn't fired yet. */
  function measure() {
    const rect = canvas.getBoundingClientRect();
    applySize(rect.width || canvas.clientWidth, rect.height || canvas.clientHeight);
  }

  const resizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0];
    if (!entry) return;
    const box = entry.contentBoxSize?.[0];
    const changed = box
      ? applySize(box.inlineSize, box.blockSize)
      : applySize(entry.contentRect.width, entry.contentRect.height);

    /* Repaint immediately on resize. Without this, a resize while paused (or
       under reduced motion) leaves a stretched previous frame on screen. */
    if (changed && !running) draw(performance.now());
  });

  resizeObserver.observe(canvas);

  function draw(time) {
    /* Critically damped follow. The pointer leads, the scene trails — which is
       what makes the parallax feel like mass rather than a cursor tether. */
    current.x += (target.x - current.x) * 0.045;
    current.y += (target.y - current.y) * 0.045;
    scrollCurrent += (scrollTarget - scrollCurrent) * 0.12;

    gl.uniform1f(uTime, (time - startTime) / 1000);
    gl.uniform2f(uParallax, current.x, current.y);
    gl.uniform1f(uScroll, scrollCurrent);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function frame(time) {
    if (!running) return;
    draw(time);
    raf = requestAnimationFrame(frame);
  }

  /* Single static frame — the reduced-motion and paused-tab state. Still a full
     rendered scene, just not a moving one. */
  function renderOnce() {
    measure();
    draw(performance.now());
  }

  const onContextLost = (event) => {
    event.preventDefault();
    running = false;
    if (raf) cancelAnimationFrame(raf);
  };

  canvas.addEventListener("webglcontextlost", onContextLost);

  return {
    start() {
      if (disposed || running) return;

      /* Always paint one frame synchronously before starting the loop. rAF can
         be throttled to nothing in a background tab, and without this the hero
         would sit on an unpainted canvas until the tab was focused. */
      renderOnce();

      if (reducedMotion) return;

      running = true;
      startTime = performance.now() - 1000; // begin slightly in, not at t=0
      raf = requestAnimationFrame(frame);
    },

    stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    },

    /** Pointer position in -1..1, from the Hero's mousemove handler. */
    setParallax(x, y) {
      if (reducedMotion) return;
      target.x = Math.max(-1, Math.min(1, x));
      target.y = Math.max(-1, Math.min(1, y));
    },

    /**
     * Scroll progress through the hero, 0..1.
     *
     * Under reduced motion this still applies — but as a static value on the
     * single rendered frame, not an animation. Someone who scrolls back to the
     * top should see the scene as it was, and holding it at 0 forever would be
     * wrong rather than calm.
     */
    setScroll(progress) {
      scrollTarget = Math.max(0, Math.min(1, progress));
      if (reducedMotion) {
        scrollCurrent = scrollTarget;
        renderOnce();
      }
    },

    renderOnce,

    dispose() {
      disposed = true;
      this.stop();
      resizeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);

      /**
       * Deliberately NOT calling WEBGL_lose_context.loseContext().
       *
       * It looks like good hygiene, but it permanently poisons the canvas
       * ELEMENT: a later getContext("webgl2") on the same node returns the lost
       * context. React StrictMode mounts every effect twice in development, so
       * the first dispose killed the canvas and the second mount silently got a
       * dead context — the scene never drew, and the poster stayed up with no
       * error anywhere. The same thing would happen on any genuine remount.
       *
       * The GPU resources above are explicitly released; the context itself is
       * collected with the canvas when React unmounts it.
       */
    },
  };
}
