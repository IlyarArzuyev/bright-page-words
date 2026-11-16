import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import desk from "@/assets/desk.jpg";
import design from "@/assets/design.jpg";
import places from "@/assets/places.jpg";
import apogee from "@/assets/apogee.jpg";
import milkbath from "@/assets/milkbath.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Habitat — Stories" },
      { name: "description", content: "Минималистичная галерея историй: дизайн, места, путешествия." },
      { property: "og:title", content: "Habitat — Stories" },
      { property: "og:description", content: "Минималистичная галерея историй: дизайн, места, путешествия." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Story = { title: string; author: string; img: string; avatar: string; points: { t: string; a: string; x: number; y: number }[] };

const stories: Story[] = [
  { title: "Design", author: "Chengtao Yi", img: design, avatar: "from-avatar-a to-avatar-b",
    points: [{ t: "Form", a: "Lena Ortiz", x: 8, y: 52 }, { t: "Flow", a: "Chengtao Yi", x: 38, y: 26 }, { t: "Matter", a: "Noah Kim", x: 80, y: 4 }] },
  { title: "Places", author: "Brooke Holm", img: places, avatar: "from-avatar-c to-avatar-a",
    points: [{ t: "Shore", a: "Ana Ruiz", x: 8, y: 52 }, { t: "Salt", a: "Brooke Holm", x: 38, y: 26 }, { t: "Horizon", a: "Tom Hale", x: 80, y: 4 }] },
  { title: "Apogee", author: "John Westrock", img: apogee, avatar: "from-avatar-b to-avatar-a",
    points: [{ t: "Base Camp", a: "Patricia Schmidt", x: 8, y: 52 }, { t: "Apogee", a: "John Westrock", x: 38, y: 26 }, { t: "Explorer", a: "Samantha Jensen", x: 80, y: 4 }] },
  { title: "Milkbath", author: "Natasha", img: milkbath, avatar: "from-avatar-a to-avatar-c",
    points: [{ t: "Ritual", a: "Mia Laurent", x: 8, y: 52 }, { t: "Milkbath", a: "Natasha", x: 38, y: 26 }, { t: "Calm", a: "Eva Stone", x: 80, y: 4 }] },
];

const N = stories.length;
const CARD_W = 210;
const CARD_H = 285;
const GAP = 70;
const STEP = CARD_W + GAP;
const OPEN_W = 620;
const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
const DUR = 1100;
const ICONS = ["◎", "△", "⚐"];

function Index() {
  const [vw, setVw] = useState(1280);
  const [index, setIndex] = useState(N); // middle copy of the track
  const [animate, setAnimate] = useState(true);
  const [open, setOpen] = useState<number | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    const onR = () => setVw(window.innerWidth);
    onR();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  const go = (d: number) => {
    if (busy.current || open !== null) return;
    busy.current = true;
    setAnimate(true);
    setIndex((i) => i + d);
    setTimeout(() => {
      setIndex((i) => {
        if (i >= 2 * N || i < N) {
          setAnimate(false);
          requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
          return i >= 2 * N ? i - N : i + N;
        }
        return i;
      });
      busy.current = false;
    }, DUR);
  };

  // auto-advance like the reference
  useEffect(() => {
    if (open !== null) return;
    const t = setInterval(() => go(1), 3200);
    return () => clearInterval(t);
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const left = vw < 768 ? 24 : 56;
  const items = Array.from({ length: N * 3 }, (_, k) => k);

  const layout = (k: number) => {
    if (open === null) return { x: left + (k - index) * STEP, w: CARD_W };
    if (k === open) return { x: vw / 2 - OPEN_W / 2, w: OPEN_W };
    if (k < open) return { x: 70 - CARD_W - (open - 1 - k) * STEP, w: CARD_W };
    return { x: vw - 80 + (k - open - 1) * STEP, w: CARD_W };
  };

  const transition = animate
    ? `transform ${DUR}ms ${EASE}, width ${DUR}ms ${EASE}, height ${DUR}ms ${EASE}, top ${DUR}ms ${EASE}`
    : "none";

  return (
    <main className="relative h-screen min-h-[680px] w-full select-none overflow-hidden bg-background text-foreground">
      <img src={desk} alt="" width={1600} height={912}
        style={{ maskImage: "radial-gradient(ellipse 50% 50% at 50% 55%, #000 70%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 55%, #000 70%, transparent 100%)" }}
        className="pointer-events-none absolute bottom-[-40px] left-1/2 w-[1150px] max-w-none -translate-x-1/2 mix-blend-multiply" />

      <header className="relative z-30 flex items-center justify-between px-6 py-9 text-[13px] md:px-14">
        <div className="flex items-center gap-9">
          <span>Monday, 16 nov</span>
          <span className="hidden items-center gap-2 sm:flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="8" r="4"/><circle cx="8" cy="15" r="4"/><circle cx="16" cy="15" r="4"/></svg>
            22°, living room
          </span>
        </div>
        <nav className="flex items-center gap-8">
          {["Stories", "Schedule", "Habitat"].map((n) => (
            <a key={n} href="#" className="transition-opacity duration-300 hover:opacity-50">{n}</a>
          ))}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 11l9-7 9 7v9H3z"/></svg>
        </nav>
      </header>

      <section className="absolute inset-x-0 top-[110px] z-10" style={{ height: CARD_H + 80 }}>
        {items.map((k) => {
          const s = stories[k % N]!;
          const { x, w } = layout(k);
          const isOpen = open === k;
          return (
            <div key={k}
              onClick={() => (open === null ? setOpen(k) : !isOpen && setOpen(null))}
              className="absolute top-0 cursor-pointer"
              style={{ transform: `translate3d(${x}px,${isOpen ? -30 : 0}px,0)`, width: w, height: isOpen ? CARD_H + 60 : CARD_H, transition }}>
              {/* card surface */}
              <div className="absolute inset-0 rounded-[3px] bg-card shadow-card"
                style={{ opacity: isOpen ? 0 : 1, transition: `opacity ${DUR * 0.7}ms ${EASE}` }} />
              {/* image */}
              <div className="absolute inset-0 overflow-hidden rounded-[3px]"
                style={{ transition: `opacity ${DUR}ms ${EASE}` }}>
                <img src={s.img} alt={s.title} width={768} height={1024} draggable={false}
                  className="absolute bottom-0 left-1/2 h-[78%] w-full -translate-x-1/2 object-cover mix-blend-multiply"
                  style={{
                    objectFit: isOpen ? "contain" : "cover",
                    height: isOpen ? "100%" : "78%",
                    WebkitMaskImage: isOpen
                      ? "radial-gradient(ellipse 50% 50% at 50% 50%, #000 35%, transparent 72%)"
                      : "linear-gradient(to bottom, transparent 0%, #000 22%)",
                    maskImage: isOpen
                      ? "radial-gradient(ellipse 50% 50% at 50% 50%, #000 35%, transparent 72%)"
                      : "linear-gradient(to bottom, transparent 0%, #000 22%)",
                    transition: `height ${DUR}ms ${EASE}`,
                  }} />
              </div>
              {/* title */}
              <div className="pointer-events-none absolute inset-x-0 top-8 text-center"
                style={{ opacity: isOpen ? 0 : 1, transform: `translateY(${isOpen ? -10 : 0}px)`, transition: `all 500ms ${EASE}` }}>
                <h2 className="text-[22px] font-light tracking-tight">{s.title}</h2>
                <p className="mt-1 text-[13px]">{s.author}</p>
              </div>
              <span className={`absolute bottom-6 left-7 h-8 w-8 rounded-full bg-gradient-to-br ${s.avatar} ring-2 ring-card`}
                style={{ opacity: isOpen ? 0 : 1, transition: `opacity 400ms ${EASE}` }} />

              {/* story points */}
              {s.points.map((p, i) => (
                <div key={p.t} className="pointer-events-none absolute -translate-x-1/2 whitespace-nowrap text-center"
                  style={{
                    left: `${p.x}%`, top: `${p.y}%`,
                    opacity: isOpen ? 1 : 0,
                    transform: `translate(-50%, ${isOpen ? 0 : 16}px)`,
                    transition: `opacity 700ms ${EASE} ${isOpen ? 650 + i * 120 : 0}ms, transform 900ms ${EASE} ${isOpen ? 650 + i * 120 : 0}ms`,
                  }}>
                  <div className="mb-2 text-sm">{ICONS[i]}</div>
                  <h3 className={`font-light tracking-tight ${i === 2 ? "text-[40px] leading-none" : "text-[22px]"}`}>{p.t}</h3>
                  <p className="mt-1 text-[12px]">{p.a}</p>
                </div>
              ))}

              <button aria-label="Close story"
                onClick={(e) => { e.stopPropagation(); setOpen(null); }}
                className="absolute bottom-10 left-[10%] grid h-11 w-11 place-items-center rounded-full bg-primary text-xl font-light text-primary-foreground shadow-accent"
                style={{
                  opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none",
                  transform: `scale(${isOpen ? 1 : 0.4}) rotate(${isOpen ? 0 : -90}deg)`,
                  transition: `all 700ms ${EASE} ${isOpen ? 900 : 0}ms`,
                }}>+</button>
            </div>
          );
        })}
      </section>

      <footer className="absolute bottom-20 left-6 z-20 md:left-14">
        <span className="block h-7 w-7 rounded-[5px] bg-gradient-to-br from-avatar-a to-avatar-b" />
        <h1 className="mt-7 text-[28px] font-light tracking-tight">Stories</h1>
        <p className="mt-1 text-[13px]">Design, Living, Voyage</p>
      </footer>
    </main>
  );
}
