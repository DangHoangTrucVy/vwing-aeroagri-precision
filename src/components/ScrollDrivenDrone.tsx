import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

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
      <div aria-hidden="true" className="h-[100svh] w-full" />

      {/* All intro layers ignore pointer events so the Header remains clickable */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
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
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/40 bg-emerald-300/10 text-emerald-300 shadow-[0_0_35px_rgba(52,211,153,0.15)] sm:h-14 sm:w-14">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M12 21V10M12 15C5 15 4 10 4 7c5 0 8 2 8 8ZM12 12c0-5 3-8 8-8 0 5-2 8-8 8Z" />
                </svg>
              </div>

              <span className="text-6xl font-semibold tracking-[-0.07em] text-white drop-shadow-[0_0_30px_rgba(110,231,183,0.15)] sm:text-8xl">
                VWing
              </span>
            </div>

            <p className="max-w-md text-xs font-medium uppercase leading-7 tracking-[0.2em] text-emerald-200/80 sm:text-sm">
              Nông nghiệp thông minh
              <span className="block text-white/80">
                Chính xác trong từng chuyến bay
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

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
          style={{ opacity: Math.max(0, 1 - introProgress * 1.5) }}
        >
          <span className="animate-bounce text-lg">↓</span>
        </div>

        <div className="absolute right-8 top-8 hidden text-right sm:block">
          <p className="text-[10px] tracking-[0.24em] text-emerald-200/70">
            AEROAGRI SYSTEM
          </p>
          <p className="mt-2 text-xs tracking-widest text-white/40">
            PRECISION FLIGHT · 01
          </p>
        </div>

        <div className="absolute inset-0 border border-white/[0.035]" />
      </div>

      {/* Drone Canvas: does not block Header, buttons or page interactions */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[61] overflow-hidden"
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
      `}</style>
    </>
  );
}

useGLTF.preload(MODEL_URL);
