/**
 * Route scene — real 3D, drawn on scroll.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHY RAW WebGL2 AGAIN, AND WHY THIS IS ACTUAL 3D
 *
 * The hero shader is a flat plane: no geometry, no camera, no depth. This is
 * different — it builds real vertex geometry (a terrain mesh and a tube along a
 * 3D spline), transforms it through a perspective camera with a proper MVP
 * matrix, and depth-sorts it. It is a 3D scene in every sense except that it
 * doesn't carry three.js's 150KB to get there.
 *
 * Everything here is ~7KB gzipped: a 4x4 matrix helper, one terrain mesh, one
 * extruded ribbon along a Catmull-Rom spline, and two shader programs.
 *
 * The route itself is the Tirumala ghat road: a climb from the plain up through
 * seven hairpins. Scroll drives BOTH the camera (which flies along the route)
 * and how much of the road has been drawn, so the page's scroll position is
 * literally the journey's progress.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ------------------------------------------------------------- math ------ */

const mat4 = {
  identity: () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),

  perspective(fovY, aspect, near, far) {
    const f = 1 / Math.tan(fovY / 2);
    const nf = 1 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, 2 * far * near * nf, 0,
    ]);
  },

  lookAt(eye, center, up) {
    const [ex, ey, ez] = eye;
    let zx = ex - center[0], zy = ey - center[1], zz = ez - center[2];
    let len = Math.hypot(zx, zy, zz) || 1;
    zx /= len; zy /= len; zz /= len;

    let xx = up[1] * zz - up[2] * zy;
    let xy = up[2] * zx - up[0] * zz;
    let xz = up[0] * zy - up[1] * zx;
    len = Math.hypot(xx, xy, xz) || 1;
    xx /= len; xy /= len; xz /= len;

    const yx = zy * xz - zz * xy;
    const yy = zz * xx - zx * xz;
    const yz = zx * xy - zy * xx;

    return new Float32Array([
      xx, yx, zx, 0,
      xy, yy, zy, 0,
      xz, yz, zz, 0,
      -(xx * ex + xy * ey + xz * ez),
      -(yx * ex + yy * ey + yz * ez),
      -(zx * ex + zy * ey + zz * ez),
      1,
    ]);
  },

  multiply(a, b) {
    const o = new Float32Array(16);
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        o[c * 4 + r] =
          a[r] * b[c * 4] +
          a[4 + r] * b[c * 4 + 1] +
          a[8 + r] * b[c * 4 + 2] +
          a[12 + r] * b[c * 4 + 3];
      }
    }
    return o;
  },
};

/* ------------------------------------------------------- route spline ---- */

/**
 * Control points for the ghat road, in world units.
 *
 * x/z wander across the hill, y climbs. The switchbacks are deliberate: the
 * Tirumala road is famous for its hairpins, and a straight line up a hill would
 * be a generic 3D flourish rather than this specific road.
 */
const CONTROL = [
  [0.0, 0.00, 6.0],
  [0.6, 0.10, 4.6],
  [-1.4, 0.28, 3.6],
  [1.5, 0.50, 2.6],
  [-1.3, 0.74, 1.6],
  [1.1, 0.98, 0.6],
  [-0.7, 1.22, -0.3],
  [0.5, 1.44, -1.1],
  [0.0, 1.60, -1.9],
];

/** Catmull-Rom through the control points — C1 continuous, passes through each. */
function sampleSpline(points, t) {
  const n = points.length - 1;
  const scaled = Math.min(t, 0.9999) * n;
  const i = Math.floor(scaled);
  const f = scaled - i;

  const p0 = points[Math.max(i - 1, 0)];
  const p1 = points[i];
  const p2 = points[Math.min(i + 1, n)];
  const p3 = points[Math.min(i + 2, n)];

  const out = [0, 0, 0];
  for (let k = 0; k < 3; k++) {
    const a = 2 * p1[k];
    const b = p2[k] - p0[k];
    const c = 2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k];
    const d = -p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k];
    out[k] = 0.5 * (a + b * f + c * f * f + d * f * f * f);
  }
  return out;
}

/** Extrudes the spline into a flat ribbon with a per-vertex progress value. */
function buildRoad(segments = 320, halfWidth = 0.055) {
  const positions = [];
  const progress = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = sampleSpline(CONTROL, t);
    const ahead = sampleSpline(CONTROL, Math.min(t + 0.004, 1));

    /* Perpendicular in the XZ plane — the ribbon stays flat to the ground so it
       reads as tarmac rather than a floating tube. */
    let dx = ahead[0] - p[0];
    let dz = ahead[2] - p[2];
    const len = Math.hypot(dx, dz) || 1;
    dx /= len; dz /= len;
    const nx = -dz * halfWidth;
    const nz = dx * halfWidth;

    positions.push(p[0] + nx, p[1], p[2] + nz);
    positions.push(p[0] - nx, p[1], p[2] - nz);
    progress.push(t, t);
  }

  return {
    positions: new Float32Array(positions),
    progress: new Float32Array(progress),
    vertexCount: (segments + 1) * 2,
  };
}

/** A low-poly hill the road climbs, built as a displaced grid. */
function buildTerrain(size = 56, extent = 9) {
  const positions = [];
  const indices = [];

  const height = (x, z) => {
    const ridge = Math.exp(-((x * x) / 14 + ((z + 1) * (z + 1)) / 26)) * 2.1;
    const rough =
      Math.sin(x * 1.6) * Math.cos(z * 1.3) * 0.09 +
      Math.sin(x * 3.1 + z * 2.2) * 0.04;
    return ridge + rough - 0.28;
  };

  for (let i = 0; i <= size; i++) {
    for (let j = 0; j <= size; j++) {
      const x = (i / size - 0.5) * extent * 2;
      const z = (j / size - 0.5) * extent * 2;
      positions.push(x, height(x, z), z);
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const a = i * (size + 1) + j;
      const b = a + size + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    indices: new Uint32Array(indices),
    indexCount: indices.length,
  };
}

/* ----------------------------------------------------------- shaders ----- */

const TERRAIN_VS = `#version 300 es
in vec3 aPos;
uniform mat4 uMVP;
out float vHeight;
out vec3 vWorld;
void main() {
  vHeight = aPos.y;
  vWorld = aPos;
  gl_Position = uMVP * vec4(aPos, 1.0);
}`;

const TERRAIN_FS = `#version 300 es
precision highp float;
in float vHeight;
in vec3 vWorld;
uniform float uFade;
out vec4 fragColor;

void main() {
  /* Wireframe-free shading: altitude drives the mix from deep ink to a lit
     ridge, so the hill reads as form without needing lights or normals. */
  vec3 low  = vec3(0.020, 0.055, 0.110);
  vec3 high = vec3(0.075, 0.170, 0.290);
  vec3 col = mix(low, high, clamp(vHeight * 0.55 + 0.18, 0.0, 1.0));

  /* Warm the crest, where the temple sits. */
  col += vec3(0.30, 0.24, 0.09) * smoothstep(1.1, 2.0, vHeight) * 0.55;

  /* Distance fade into the page background — no hard mesh edge. */
  float d = length(vWorld.xz);
  col *= 1.0 - smoothstep(5.0, 8.6, d);

  fragColor = vec4(col * uFade, 1.0);
}`;

const ROAD_VS = `#version 300 es
in vec3 aPos;
in float aProgress;
uniform mat4 uMVP;
out float vProgress;
void main() {
  vProgress = aProgress;
  gl_Position = uMVP * vec4(aPos, 1.0);
}`;

const ROAD_FS = `#version 300 es
precision highp float;
in float vProgress;
uniform float uDraw;   /* 0..1 — how much of the road has been travelled */
uniform float uFade;
out vec4 fragColor;

void main() {
  /* Undrawn road is discarded outright, so the ribbon appears to be laid down
     ahead of the camera rather than fading in as a whole. */
  if (vProgress > uDraw) discard;

  vec3 gold = vec3(0.831, 0.686, 0.216);

  /* The leading 6% burns brighter — the light at the head of the draw. */
  float head = smoothstep(uDraw - 0.06, uDraw, vProgress);
  vec3 col = mix(gold * 0.55, vec3(1.0, 0.93, 0.72), head);

  fragColor = vec4(col * uFade, 1.0);
}`;

/* ------------------------------------------------------------ program ---- */

function compile(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(log);
  }
  return sh;
}

function link(gl, vsSrc, fsSrc) {
  const p = gl.createProgram();
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p));
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return p;
}

/**
 * Boots the scene. Returns a controller, or null when WebGL2 is unavailable —
 * the caller keeps its static fallback in that case.
 */
export function createRouteScene(canvas, { reducedMotion = false } = {}) {
  const gl = canvas.getContext("webgl2", {
    antialias: true,
    alpha: true,
    depth: true,
    powerPreference: "low-power",
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return null;

  let terrainProgram;
  let roadProgram;
  try {
    terrainProgram = link(gl, TERRAIN_VS, TERRAIN_FS);
    roadProgram = link(gl, ROAD_VS, ROAD_FS);
  } catch (error) {
    if (import.meta.env.DEV) console.error("[route]", error);
    return null;
  }

  /* ---- terrain buffers ---- */
  const terrain = buildTerrain();
  const terrainVao = gl.createVertexArray();
  gl.bindVertexArray(terrainVao);
  const tPos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tPos);
  gl.bufferData(gl.ARRAY_BUFFER, terrain.positions, gl.STATIC_DRAW);
  const tPosLoc = gl.getAttribLocation(terrainProgram, "aPos");
  gl.enableVertexAttribArray(tPosLoc);
  gl.vertexAttribPointer(tPosLoc, 3, gl.FLOAT, false, 0, 0);
  const tIdx = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, tIdx);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, terrain.indices, gl.STATIC_DRAW);

  /* ---- road buffers ---- */
  const road = buildRoad();
  const roadVao = gl.createVertexArray();
  gl.bindVertexArray(roadVao);
  const rPos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rPos);
  gl.bufferData(gl.ARRAY_BUFFER, road.positions, gl.STATIC_DRAW);
  const rPosLoc = gl.getAttribLocation(roadProgram, "aPos");
  gl.enableVertexAttribArray(rPosLoc);
  gl.vertexAttribPointer(rPosLoc, 3, gl.FLOAT, false, 0, 0);
  const rProg = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, rProg);
  gl.bufferData(gl.ARRAY_BUFFER, road.progress, gl.STATIC_DRAW);
  const rProgLoc = gl.getAttribLocation(roadProgram, "aProgress");
  gl.enableVertexAttribArray(rProgLoc);
  gl.vertexAttribPointer(rProgLoc, 1, gl.FLOAT, false, 0, 0);

  gl.bindVertexArray(null);

  const uni = {
    terrainMVP: gl.getUniformLocation(terrainProgram, "uMVP"),
    terrainFade: gl.getUniformLocation(terrainProgram, "uFade"),
    roadMVP: gl.getUniformLocation(roadProgram, "uMVP"),
    roadDraw: gl.getUniformLocation(roadProgram, "uDraw"),
    roadFade: gl.getUniformLocation(roadProgram, "uFade"),
  };

  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 0);

  let width = 0;
  let height = 0;
  let raf = null;
  let running = false;
  let disposed = false;

  let targetProgress = 0;
  let currentProgress = 0;

  function applySize(cssW, cssH) {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(1, Math.floor(cssW * dpr));
    const h = Math.max(1, Math.floor(cssH * dpr));
    if (w === width && h === height) return false;
    width = w; height = h;
    canvas.width = w; canvas.height = h;
    gl.viewport(0, 0, w, h);
    return true;
  }

  const resizeObserver = new ResizeObserver((entries) => {
    const box = entries[0]?.contentRect;
    if (!box) return;
    if (applySize(box.width, box.height) && !running) draw();
  });
  resizeObserver.observe(canvas);

  function draw() {
    currentProgress += (targetProgress - currentProgress) * (reducedMotion ? 1 : 0.08);
    const p = currentProgress;

    /* Camera flies along the route, looking slightly ahead and above — so the
       user is travelling the road rather than watching it from outside. */
    const eyeT = Math.min(p * 0.82, 0.999);
    const eye = sampleSpline(CONTROL, eyeT);
    const look = sampleSpline(CONTROL, Math.min(eyeT + 0.13, 1));

    const camera = mat4.lookAt(
      [eye[0] * 0.55, eye[1] + 1.55 - p * 0.35, eye[2] + 2.9 - p * 0.5],
      [look[0] * 0.4, look[1] + 0.15, look[2]],
      [0, 1, 0],
    );
    const projection = mat4.perspective(
      (52 * Math.PI) / 180,
      width / Math.max(height, 1),
      0.1,
      40,
    );
    const mvp = mat4.multiply(projection, camera);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(terrainProgram);
    gl.uniformMatrix4fv(uni.terrainMVP, false, mvp);
    gl.uniform1f(uni.terrainFade, 1);
    gl.bindVertexArray(terrainVao);
    gl.drawElements(gl.TRIANGLES, terrain.indexCount, gl.UNSIGNED_INT, 0);

    gl.useProgram(roadProgram);
    gl.uniformMatrix4fv(uni.roadMVP, false, mvp);
    gl.uniform1f(uni.roadDraw, p);
    gl.uniform1f(uni.roadFade, 1);
    gl.bindVertexArray(roadVao);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, road.vertexCount);

    gl.bindVertexArray(null);
  }

  function frame() {
    if (!running) return;
    draw();
    raf = requestAnimationFrame(frame);
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
      const rect = canvas.getBoundingClientRect();
      applySize(rect.width, rect.height);
      draw();
      if (reducedMotion) return;
      running = true;
      raf = requestAnimationFrame(frame);
    },

    stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    },

    /** Scroll progress through the section, 0..1. */
    setProgress(value) {
      targetProgress = Math.max(0, Math.min(1, value));
      if (reducedMotion) {
        currentProgress = targetProgress;
        draw();
      }
    },

    dispose() {
      disposed = true;
      this.stop();
      resizeObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteProgram(terrainProgram);
      gl.deleteProgram(roadProgram);
      gl.deleteBuffer(tPos);
      gl.deleteBuffer(tIdx);
      gl.deleteBuffer(rPos);
      gl.deleteBuffer(rProg);
      gl.deleteVertexArray(terrainVao);
      gl.deleteVertexArray(roadVao);
      /* Deliberately NOT calling loseContext() — it permanently poisons the
         canvas element and breaks StrictMode's double-mount. */
    },
  };
}
