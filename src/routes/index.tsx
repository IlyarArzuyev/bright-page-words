import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import desk from "@/assets/desk.jpg";
import design from "@/assets/design.jpg";
import places from "@/assets/places.jpg";
import apogee from "@/assets/apogee.jpg";

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

const stories = [
  { title: "Design", author: "Chengtao Yi", img: design, avatar: "from-avatar-a to-avatar-b",
    points: [{ t: "Form", a: "Lena Ortiz", x: 20, y: 55 }, { t: "Flow", a: "Chengtao Yi", x: 45, y: 30 }, { t: "Matter", a: "Noah Kim", x: 72, y: 12 }] },
  { title: "Places", author: "Brooke Holm", img: places, avatar: "from-avatar-b to-avatar-c",
    points: [{ t: "Shore", a: "Ana Ruiz", x: 20, y: 55 }, { t: "Salt", a: "Brooke Holm", x: 45, y: 30 }, { t: "Horizon", a: "Tom Hale", x: 72, y: 12 }] },
  { title: "Apogee", author: "John Westrock", img: apogee, avatar: "from-avatar-c to-avatar-a",
    points: [{ t: "Base Camp", a: "Patricia Schmidt", x: 20, y: 55 }, { t: "Apogee", a: "John Westrock", x: 45, y: 30 }, { t: "Explorer", a: "Samantha Jensen", x: 72, y: 12 }] },
  { title: "Motion", author: "Mia Laurent", img: design, avatar: "from-avatar-a to-avatar-c",
    points: [{ t: "Start", a: "Ivan Petrov", x: 20, y: 55 }, { t: "Pulse", a: "Mia Laurent", x: 45, y: 30 }, { t: "Rest", a: "Eva Stone", x: 72, y: 12 }] },
];

function Index() {
  const [open, setOpen] = useState<number | null>(null);
  const s = open !== null ? stories[open] : null;

  return (
    <main className="relative h-screen min-h-[640px] w-full overflow-hidden bg-background text-foreground">
      <img src={desk} alt="" width={1600} height={912}
        className="pointer-events-none absolute bottom-0 left-1/2 w-[1100px] max-w-none -translate-x-1/2 mix-blend-multiply" />

      <header className="relative z-20 flex items-center justify-between px-6 py-8 text-xs md:px-14">
        <div className="flex items-center gap-8 text-muted-foreground">
          <span>Monday, 16 nov</span>
          <span className="hidden sm:inline">◎ 22°, living room</span>
        </div>
        <nav className="flex items-center gap-7">
          {["Stories", "Schedule", "Habitat"].map((n) => (
            <a key={n} href="#" className="transition-opacity hover:opacity-60">{n}</a>
          ))}
          <span aria-hidden>⌂</span>
        </nav>
      </header>

      {/* Cards row */}
      <section className={`relative z-10 flex gap-14 px-6 pt-6 transition-all duration-700 ease-out md:px-14 ${s ? "pointer-events-none -translate-y-6 opacity-0" : "opacity-100"}`}>
        {stories.map((st, i) => (
          <button key={st.title} onClick={() => setOpen(i)}
            className="group relative h-[300px] w-[220px] shrink-0 overflow-hidden rounded-sm bg-card text-center shadow-card transition-transform duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-6"
            style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}>
            <img src={st.img} alt={st.title} loading="lazy" width={768} height={1024}
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-card via-card/80 to-transparent" />
            <div className="relative pt-7">
              <h2 className="text-xl font-light">{st.title}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{st.author}</p>
            </div>
            <span className={`absolute bottom-5 left-6 h-7 w-7 rounded-full bg-gradient-to-br ${st.avatar} ring-2 ring-card`} />
          </button>
        ))}
      </section>

      {/* Detail view */}
      {s && (
        <section className="absolute inset-0 z-10 flex justify-center pt-20 animate-in fade-in zoom-in-95 duration-700">
          <div className="relative h-[380px] w-full max-w-3xl">
            <img src={s.img} alt={s.title} className="absolute inset-0 mx-auto h-full object-contain mix-blend-multiply" />
            {s.points.map((p, i) => (
              <div key={p.t} className="absolute -translate-x-1/2 text-center animate-in fade-in slide-in-from-bottom-4"
                style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${300 + i * 150}ms`, animationFillMode: "both" }}>
                <div className="mb-1 text-sm text-muted-foreground">{["◎", "△", "⚑"][i]}</div>
                <h3 className={`font-light ${i === 2 ? "text-4xl" : "text-xl"}`}>{p.t}</h3>
                <p className="text-xs text-muted-foreground">{p.a}</p>
              </div>
            ))}
            <button onClick={() => setOpen(null)} aria-label="Close"
              className="absolute bottom-6 left-[30%] grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-accent transition-transform hover:rotate-45">
              +
            </button>
          </div>
        </section>
      )}

      <footer className="absolute bottom-16 left-6 z-20 md:left-14">
        <span className="block h-6 w-6 rounded-sm bg-gradient-to-br from-avatar-a to-avatar-b" />
        <h1 className="mt-6 text-2xl font-light">Stories</h1>
        <p className="mt-1 text-xs">Design, Living, Voyage</p>
      </footer>
    </main>
  );
}
