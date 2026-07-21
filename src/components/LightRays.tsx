import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

import "./LightRays.css";

type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

type LightRaysProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
};

type UniformValue<T> = { value: T };

type LightRaysUniforms = {
  iTime: UniformValue<number>;
  iResolution: UniformValue<number[]>;
  rayPos: UniformValue<number[]>;
  rayDir: UniformValue<number[]>;
  raysColor: UniformValue<number[]>;
  raysSpeed: UniformValue<number>;
  lightSpread: UniformValue<number>;
  rayLength: UniformValue<number>;
  pulsating: UniformValue<number>;
  fadeDistance: UniformValue<number>;
  saturation: UniformValue<number>;
  mousePos: UniformValue<number[]>;
  mouseInfluence: UniformValue<number>;
  noiseAmount: UniformValue<number>;
  distortion: UniformValue<number>;
};

const DEFAULT_COLOR = "#ffffff";

const hexToRgb = (hex: string) => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return match
    ? [
        Number.parseInt(match[1], 16) / 255,
        Number.parseInt(match[2], 16) / 255,
        Number.parseInt(match[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDirection = (origin: RaysOrigin, width: number, height: number) => {
  const outside = 0.2;

  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * height], direction: [0, 1] };
    case "top-right":
      return { anchor: [width, -outside * height], direction: [0, 1] };
    case "left":
      return { anchor: [-outside * width, 0.5 * height], direction: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * width, 0.5 * height], direction: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * height], direction: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * width, (1 + outside) * height], direction: [0, -1] };
    case "bottom-right":
      return { anchor: [width, (1 + outside) * height], direction: [0, -1] };
    case "top-center":
    default:
      return { anchor: [0.5 * width, -outside * height], direction: [0, 1] };
  }
};

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2 mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 point) {
  return fract(sin(dot(point.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float rayStrength(
  vec2 raySource,
  vec2 rayReferenceDirection,
  vec2 coordinate,
  float seedA,
  float seedB,
  float speed
) {
  vec2 sourceToCoordinate = coordinate - raySource;
  vec2 direction = normalize(sourceToCoordinate);
  float cosineAngle = dot(direction, rayReferenceDirection);
  float distortedAngle = cosineAngle
    + distortion * sin(iTime * 2.0 + length(sourceToCoordinate) * 0.01) * 0.2;
  float spread = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distanceFromSource = length(sourceToCoordinate);
  float maximumDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp(
    (maximumDistance - distanceFromSource) / maximumDistance,
    0.0,
    1.0
  );
  float fadeFalloff = clamp(
    (iResolution.x * fadeDistance - distanceFromSource) / (iResolution.x * fadeDistance),
    0.5,
    1.0
  );
  float pulse = pulsating > 0.5 ? 0.82 + 0.18 * sin(iTime * speed * 3.0) : 1.0;
  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed))
      + (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0,
    1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spread * pulse;
}

void mainImage(out vec4 fragmentColor, in vec2 fragmentCoordinate) {
  vec2 coordinate = vec2(fragmentCoordinate.x, iResolution.y - fragmentCoordinate.y);
  vec2 finalRayDirection = rayDir;

  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPosition = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPosition - rayPos);
    finalRayDirection = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 firstRays = vec4(1.0) * rayStrength(
    rayPos,
    finalRayDirection,
    coordinate,
    36.2214,
    21.11349,
    1.5 * raysSpeed
  );
  vec4 secondRays = vec4(1.0) * rayStrength(
    rayPos,
    finalRayDirection,
    coordinate,
    22.3991,
    18.0234,
    1.1 * raysSpeed
  );

  fragmentColor = firstRays * 0.7 + secondRays * 0.52;

  if (noiseAmount > 0.0) {
    float grain = noise(coordinate * 0.01 + iTime * 0.1);
    fragmentColor.rgb *= 1.0 - noiseAmount + noiseAmount * grain;
  }

  float brightness = 1.0 - coordinate.y / iResolution.y;
  fragmentColor.x *= 0.46 + brightness * 0.74;
  fragmentColor.y *= 0.58 + brightness * 0.62;
  fragmentColor.z *= 0.66 + brightness * 0.54;

  if (saturation != 1.0) {
    float gray = dot(fragmentColor.rgb, vec3(0.299, 0.587, 0.114));
    fragmentColor.rgb = mix(vec3(gray), fragmentColor.rgb, saturation);
  }

  fragmentColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const uniformsRef = useRef<LightRaysUniforms | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.55 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.55 });
  const animationFrameRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.05,
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isVisible) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio, 1.75),
    });
    const { gl } = renderer;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.replaceChildren(gl.canvas);

    const uniforms: LightRaysUniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      rayLength: { value: rayLength },
      pulsating: { value: pulsating ? 1 : 0 },
      fadeDistance: { value: fadeDistance },
      saturation: { value: saturation },
      mousePos: { value: [0.5, 0.55] },
      mouseInfluence: { value: mouseInfluence },
      noiseAmount: { value: noiseAmount },
      distortion: { value: distortion },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new Mesh(gl, { geometry, program });

    rendererRef.current = renderer;
    uniformsRef.current = uniforms;

    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      renderer.setSize(width, height);
      const resolutionWidth = width * renderer.dpr;
      const resolutionHeight = height * renderer.dpr;
      const { anchor, direction } = getAnchorAndDirection(
        raysOrigin,
        resolutionWidth,
        resolutionHeight,
      );

      uniforms.iResolution.value = [resolutionWidth, resolutionHeight];
      uniforms.rayPos.value = anchor;
      uniforms.rayDir.value = direction;
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderFrame = (time: number) => {
      uniforms.iTime.value = time * 0.001;

      if (followMouse && mouseInfluence > 0) {
        const smoothing = 0.94;
        smoothMouseRef.current.x =
          smoothMouseRef.current.x * smoothing + mouseRef.current.x * (1 - smoothing);
        smoothMouseRef.current.y =
          smoothMouseRef.current.y * smoothing + mouseRef.current.y * (1 - smoothing);
        uniforms.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];
      }

      renderer.render({ scene: mesh });
      if (!prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);
    updateSize();
    animationFrameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      const loseContext = gl.getExtension("WEBGL_lose_context");
      loseContext?.loseContext();
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      rendererRef.current = null;
      uniformsRef.current = null;
    };
  }, [
    isVisible,
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  useEffect(() => {
    if (!followMouse) return;

    const handlePointerMove = (event: PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const bounds = container.getBoundingClientRect();
      mouseRef.current = {
        x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
        y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`light-rays-container ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
