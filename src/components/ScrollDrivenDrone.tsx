import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import icon from "../assets/images/icon.png";

const MODEL_URL = "/models/agricultural-drone.glb";

type ScrollRefs = {
  scrollY: React.MutableRefObject<number>;
  viewportHeight: React.MutableRefObject<number>;
  maxScroll: React.MutableRefObject<number>;
};

function WaterSpray({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 140 }, (_, i) => ({
        x: Math.sin(i * 127.1) * 0.5 + 0.5,
        z: Math.sin(i * 311.7) * 0.5 + 0.5,
        speed: 0.7 + (i % 7) * 0.1,
        offset: (i * 0.173) % 1,
        size: 0.006 + (i % 4) * 0.002,
      })),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;

    group.current.visible = active;
    if (!active) return;

    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const p = particles[i];
      const phase = (clock.elapsedTime * p.speed + p.offset) % 1;
      const spread = 0.025 + phase * 0.72;

      // Fan-shaped droplets rather than a straight column.
      mesh.position.set(
        (p.x * 2 - 1) * spread,
        -phase * 0.95,
        (p.z * 2 - 1) * (0.025 + phase * 0.2),
      );

      mesh.scale.setScalar(p.size * (1 + phase * 0.4));

      const material = mesh.material as THREE.MeshBasicMaterial;
      material.opacity = 0.42 * (1 - phase * 0.4);
    });
  });

  return (
    <group ref={group} position={[0, -0.48, 0]} visible={false}>
      {particles.map((p, i) => (
        <mesh key={i} scale={p.size}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial
            color="#d8f5ff"
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function DroneModel({
  scrollY,
  viewportHeight,
  maxScroll,
  spraying,
}: ScrollRefs & { spraying: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const dimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.5 / dimension;

    clone.scale.setScalar(scale);
    clone.position.copy(center).multiplyScalar(-scale);

    return clone;
  }, [scene]);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const y = scrollY.current;
    const vh = viewportHeight.current || window.innerHeight;
    const intro = THREE.MathUtils.clamp(y / vh, 0, 1);
    const travel = THREE.MathUtils.clamp(
      (y - vh) / Math.max(1, maxScroll.current - vh),
      0,
      1,
    );

    if (y < vh) {
      // Intro: drone lớn ở bên phải logo.
      const targetX = window.innerWidth < 640 ? 0.7 : 1.8;

      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        targetX,
        4,
        delta,
      );

      // Fly upward with the intro as the user scrolls.
      group.current.position.y =
        0.05 + intro * 5.5 + Math.sin(clock.elapsedTime * 1.4) * 0.035;

      group.current.position.z = 0;

      const scale = window.innerWidth < 640 ? 1.0 : 1.85;
      group.current.scale.setScalar(scale * (1 - intro * 0.12));

      group.current.rotation.z = -0.025 + intro * 0.08;
      group.current.rotation.y = -0.25;
    } else {
      const isMobile = window.innerWidth < 640;
      const elapsed = clock.elapsedTime;

      // Drone nhỏ, cố định ở góc trên bên phải
      group.current.position.x = isMobile ? 1.65 : 4.55;
      group.current.position.y =
        (isMobile ? 1.35 : 1.65) + Math.sin(elapsed * 1.1) * 0.025;

      group.current.position.z = 0;

      // Thu nhỏ drone để không che nội dung
      group.current.scale.setScalar(isMobile ? 0.24 : 0.52);

      // Chỉ lơ lửng nhẹ tại chỗ
      group.current.rotation.z = Math.sin(elapsed * 0.7) * 0.012;
      group.current.rotation.y = -0.15 + Math.sin(elapsed * 0.5) * 0.02;
    }
  });

  return (
    <group ref={group}>
      <primitive object={model} />
      <WaterSpray active={spraying} />
    </group>
  );
}

export default function ScrollDrivenDrone() {
  const scrollY = useRef(0);
  const viewportHeight = useRef(0);
  const maxScroll = useRef(0);

  const [introProgress, setIntroProgress] = useState(0);
  const [spraying, setSpraying] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const [droneOpacity, setDroneOpacity] = useState(1);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotion = () => setEnabled(!media.matches);
    updateMotion();

    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const y = window.scrollY;
        const max = Math.max(0, document.documentElement.scrollHeight - vh);

        viewportHeight.current = vh;
        maxScroll.current = max;
        scrollY.current = y;

        const progress = THREE.MathUtils.clamp(y / Math.max(1, vh), 0, 1);
        setIntroProgress(progress);

        const travel = THREE.MathUtils.clamp(
          (y - vh) / Math.max(1, max - vh),
          0,
          1,
        );

        setSpraying(y >= vh && travel > 0.28 && travel < 0.72);

        const fadeStart = 0.72;
        const fadeEnd = 0.9;

        const fade = THREE.MathUtils.clamp(
          (travel - fadeStart) / (fadeEnd - fadeStart),
          0,
          1,
        );

        setDroneOpacity(1 - fade);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (!enabled) return null;

  const introOpacity = 1 - introProgress;

  return (
    <>
      {/* One viewport reserved for the cinematic intro */}
      <div aria-hidden="true" className="h-svh w-full" />

      {/* All intro layers ignore pointer events so the Header remains clickable */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-60 overflow-hidden"
        style={{
          opacity: introOpacity,
          visibility: introProgress >= 1 ? "hidden" : "visible",
          background:
            "radial-gradient(ellipse at 72% 42%, #17473d 0%, #0b292a 40%, #06131f 100%)",
        }}
      >
        {/* Cinematic emerald glow */}
        <div
          className="absolute right-[-10%] top-[8%] h-[80vh] w-[75vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(52,211,153,0.20) 0%, rgba(20,184,166,0.08) 40%, transparent 72%)",
          }}
        />

        {/* Subtle agricultural field grid */}
        <div
          className="vwing-field-grid absolute inset-0"
          style={{
            backgroundImage: `
      linear-gradient(rgba(110,231,183,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(110,231,183,0.045) 1px, transparent 1px)
    `,
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 5%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 5%, transparent 78%)",
          }}
        />

        {/* Soft green light on the left */}
        <div
          className="absolute left-[-20%] top-[15%] h-[55vh] w-[55vw] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)",
          }}
        />

        {/* Radar rings */}
        <div className="vwing-radar absolute right-[8%] top-[20%] aspect-square w-[min(58vw,480px)] rounded-full">
          <div className="absolute inset-[12%] rounded-full border border-emerald-300/10" />
          <div className="absolute inset-[28%] rounded-full border border-emerald-300/15" />
          <div className="absolute inset-[44%] rounded-full border border-emerald-300/20" />

          <div className="vwing-radar-sweep absolute inset-0 rounded-full" />

          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-200 shadow-[0_0_14px_rgba(110,231,183,0.9)]" />
          <span className="absolute bottom-[18%] left-[17%] h-1.5 w-1.5 rounded-full bg-emerald-300/80 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
        </div>

        {/* Small precision markers */}
        <div className="absolute left-[6%] top-[20%] hidden sm:block">
          <div className="mb-2 h-px w-12 bg-emerald-300/40" />
          <p className="text-[9px] uppercase tracking-[0.3em] text-emerald-100/40">
            Nông nghiệp chính xác
          </p>
        </div>

        {/* Animated topographic lines */}
        <svg
          aria-hidden="true"
          className="topographic-lines absolute inset-0 h-full w-full opacity-[0.16]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="vwingTerrainLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#6EE7B7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {Array.from({ length: 13 }, (_, i) => (
            <ellipse
              key={i}
              cx="1030"
              cy="440"
              rx={190 + i * 34}
              ry={90 + i * 19}
              fill="none"
              stroke="url(#vwingTerrainLine)"
              strokeWidth="0.8"
              transform="rotate(-18 1030 440)"
            />
          ))}
        </svg>

        {/* Floating sensor points */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 24 }, (_, i) => (
            <span
              key={i}
              className="sensor-particle absolute h-1 w-1 rounded-full bg-emerald-200"
              style={{
                left: `${12 + ((i * 37) % 78)}%`,
                top: `${10 + ((i * 29) % 78)}%`,
                animationDuration: `${4 + (i % 5) * 1.3}s`,
                animationDelay: `${(i % 7) * -0.8}s`,
                opacity: 0.4,
                boxShadow: "0 0 12px rgba(110,231,183,0.8)",
              }}
            />
          ))}
        </div>

        {/* Animated flight route */}
        <svg
          aria-hidden="true"
          className="absolute right-[2%] top-[18%] h-[62%] w-[58%] opacity-50"
          viewBox="0 0 700 500"
          fill="none"
        >
          <path
            className="flight-route-line"
            d="M40 370 C160 330 145 100 330 125 S500 280 660 90"
            stroke="#6EE7B7"
            strokeWidth="1.5"
            strokeDasharray="5 9"
          />
          <circle cx="40" cy="370" r="4" fill="#A7F3D0" />
          <circle cx="330" cy="125" r="4" fill="#A7F3D0" />
          <circle cx="660" cy="90" r="4" fill="#A7F3D0" />
        </svg>

        {/* Extra atmospheric glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(61,180,127,0.12),transparent_42%)]" />

        {/* Agricultural field parcel map */}
        <svg
          aria-hidden="true"
          className="vwing-field-map absolute inset-x-0 bottom-0 h-[38%] w-full"
          viewBox="0 0 1440 340"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
        >
          <defs>
            <linearGradient id="fieldMapFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
              <stop offset="55%" stopColor="#10B981" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          <path
            d="M0 105 L180 75 L330 112 L490 58 L650 96 L820 45 L1010 83 L1200 48 L1440 95 V340 H0 Z"
            fill="url(#fieldMapFade)"
          />

          <g stroke="#34D399" strokeWidth="1" strokeOpacity="0.32">
            <path d="M0 180 L180 140 L350 165 L510 115 L680 155 L850 100 L1030 145 L1210 105 L1440 145" />
            <path d="M0 235 L180 195 L350 220 L510 170 L680 210 L850 155 L1030 200 L1210 160 L1440 200" />
            <path d="M0 290 L180 250 L350 275 L510 225 L680 265 L850 210 L1030 255 L1210 215 L1440 255" />

            <path d="M130 95 L180 140 L180 195 L220 255 L250 340" />
            <path d="M330 112 L350 165 L350 220 L400 275 L430 340" />
            <path d="M490 58 L510 115 L510 170 L550 225 L580 340" />
            <path d="M650 96 L680 155 L680 210 L720 265 L750 340" />
            <path d="M820 45 L850 100 L850 155 L900 210 L930 340" />
            <path d="M1010 83 L1030 145 L1030 200 L1080 255 L1110 340" />
            <path d="M1200 48 L1210 105 L1210 160 L1260 215 L1290 340" />
          </g>

          <g fill="#6EE7B7" fillOpacity="0.7">
            <circle cx="180" cy="195" r="3" />
            <circle cx="510" cy="170" r="3" />
            <circle cx="850" cy="155" r="3" />
            <circle cx="1210" cy="160" r="3" />
          </g>

          <path
            d="M180 195 C290 170 360 240 510 170 S730 235 850 155 S1080 225 1210 160"
            stroke="#6EE7B7"
            strokeWidth="1.5"
            strokeDasharray="5 8"
            strokeOpacity="0.75"
          />
        </svg>

        {/* Logo and intro text */}
        <div
          className="absolute inset-0 flex items-center justify-start px-7 sm:px-14 lg:px-[10vw]"
          style={{
            transform: `translateY(${-introProgress * 100}px)`,
            opacity: Math.max(0, 1 - introProgress * 1.2),
          }}
        >
          <div className="relative z-10 w-full max-w-xl text-left">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-30 w-18 shrink-0 items-center justify-center  overflow-hidden ">
              <img
                src={
                  icon
                } /* Sửa lại đường dẫn này trỏ đúng đến file ảnh logo/icon của bạn */
                alt="VWing Logo"
                className="object-cover w-full h-full"
              />
            </div>

              <span className="text-6xl font-semibold tracking-[-0.07em] text-white drop-shadow-[0_0_30px_rgba(110,231,183,0.15)] sm:text-8xl">
                VW<span className="text-emerald-400">ing</span>
              </span>
            </div>

            <p className="max-w-md text-xs font-medium uppercase leading-7 tracking-[0.2em] text-emerald-200/80 sm:text-xl -mt-5">
              Hiểu vườn,
              <span className="block text-white/80">
                chăm cây tốt hơn
              </span>
            </p>

            <div className="mt-8 flex items-center gap-3 text-[10px] tracking-[0.18em] text-white/55 sm:text-xs">
              <span className="h-px w-8 bg-emerald-300/60" />
              NÂNG TẦM NÔNG NGHIỆP, KIẾN TẠO TƯƠNG LAI XANH
            </div>

            <div className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">
              <span className="h-px w-8 bg-white/30" />
              Công nghệ nông nghiệp chính xác
            </div>
          </div>
        </div>

        {/* Field mapping coordinates */}
        <div className="vwing-telemetry absolute bottom-[9%] left-[4%] hidden sm:block">
          <div className="flex items-center gap-2 text-emerald-200/80">
            <span className="text-lg">⌖</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.24em]">
              Ánh xạ trường
            </span>
          </div>
          <p className="mt-2 pl-6 font-mono text-[10px] tracking-wider text-emerald-100/55">
            10.7626° N
          </p>
          <p className="mt-1 pl-6 font-mono text-[10px] tracking-wider text-emerald-100/55">
            106.6602° E
          </p>
        </div>

        {/* Flight route timeline */}
        <div className="vwing-telemetry absolute bottom-[5%] left-1/2 hidden w-[34%] -translate-x-1/2 items-center justify-between sm:flex">
          {[
            { label: "Bắt đầu", active: false },
            { label: "Lộ trình bay ", active: true },
            { label: "Trở lại", active: false },
          ].map((point, index) => (
            <div
              key={point.label}
              className="relative flex flex-col items-center gap-2"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full border ${
                  point.active
                    ? "border-emerald-200 bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]"
                    : "border-emerald-300/50 bg-[#0b292a]"
                }`}
              />
              <span className="text-[9px] tracking-[0.16em] text-emerald-100/65">
                {point.label}
              </span>
            </div>
          ))}
          <div className="absolute left-[10%] right-[10%] top-1.25 -z-10 border-t border-dashed border-emerald-300/40" />
        </div>

        {/* Field identification */}
        <div className="vwing-telemetry absolute bottom-[9%] right-[4%] hidden text-right sm:block">
          <div className="ml-auto mt-2 flex gap-1">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                className={`h-3 w-0.75 rounded-full ${
                  i < 5 ? "bg-emerald-300/70" : "bg-emerald-300/15"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
          style={{ opacity: Math.max(0, 1 - introProgress * 1.5) }}
        >
          <span className="animate-bounce text-lg">↓</span>
        </div>

        <div className="absolute inset-0 border border-white/[0.035]" />
      </div>

      {/* Drone Canvas: does not block Header, buttons or page interactions */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-61 overflow-hidden"
        style={{
          opacity: droneOpacity,
          transition: "opacity 250ms ease-out",
        }}
      >
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 7], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
          style={{
            background: "transparent",
            pointerEvents: "none",
          }}
        >
          <ambientLight intensity={1.7} />
          <directionalLight position={[3, 5, 4]} intensity={2.8} />
          <directionalLight
            position={[-4, 2, -3]}
            intensity={1.2}
            color="#bdebd1"
          />
          <pointLight
            position={[3, 1, 3]}
            intensity={22}
            color="#34D399"
            distance={9}
          />

          <Suspense fallback={null}>
            <DroneModel
              scrollY={scrollY}
              viewportHeight={viewportHeight}
              maxScroll={maxScroll}
              spraying={spraying}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Motion styles for terrain, particles and flight route */}
      <style>{`
        @keyframes vwing-terrain-drift {
          0% {
            transform: translate3d(-1%, 0, 0) scale(1);
          }
          100% {
            transform: translate3d(1%, -1.5%, 0) scale(1.04);
          }
        }

        .topographic-lines {
          transform-origin: center;
          animation: vwing-terrain-drift 30s ease-in-out infinite alternate;
        }

        @keyframes vwing-sensor-float {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate3d(12px, -18px, 0);
            opacity: 0.35;
          }
        }

        .sensor-particle {
          animation-name: vwing-sensor-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          will-change: transform, opacity;
        }

        @keyframes vwing-route-flow {
          to {
            stroke-dashoffset: -140;
          }
        }

        .flight-route-line {
          animation: vwing-route-flow 12s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .topographic-lines,
          .sensor-particle,
          .flight-route-line {
            animation: none !important;
          }
        }


.vwing-radar {
  border: 1px solid rgba(110, 231, 183, 0.12);
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.035),
    transparent 68%
  );
  opacity: 0.8;
  animation: vwing-radar-breathe 5s ease-in-out infinite;
}

.vwing-radar-sweep {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 285deg,
    rgba(110, 231, 183, 0.015) 315deg,
    rgba(110, 231, 183, 0.16) 360deg
  );
  animation: vwing-radar-rotate 12s linear infinite;
  mask-image: radial-gradient(
    circle,
    transparent 0%,
    black 100%
  );
}

.vwing-field-grid {
  animation: vwing-grid-breathe 8s ease-in-out infinite alternate;
}

@keyframes vwing-radar-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes vwing-radar-breathe {
  0%, 100% {
    opacity: 0.45;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.85;
    transform: scale(1.02);
  }
}

@keyframes vwing-grid-breathe {
  from {
    opacity: 0.45;
  }
  to {
    opacity: 0.9;
  }
}

@media (prefers-reduced-motion: reduce) {
  .vwing-radar,
  .vwing-radar-sweep,
  .vwing-field-grid {
    animation: none !important;
  }
}

<CodeBlock language="css" editable>
.vwing-field-map {
  opacity: 0.9;
  pointer-events: none;
  animation: vwing-map-glow 7s ease-in-out infinite alternate;
}
.vwing-telemetry {
  z-index: 2;
  pointer-events: none;
  text-shadow: 0 0 12px rgba(52, 211, 153, 0.12);
}
@keyframes vwing-map-glow {
  from {
    opacity: 0.55;
    transform: translateY(3px);
  }
  to {
    opacity: 0.95;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .vwing-field-map {
    animation: none !important;
  }
}
</CodeBlock>

      `}</style>
    </>
  );
}

useGLTF.preload(MODEL_URL);
