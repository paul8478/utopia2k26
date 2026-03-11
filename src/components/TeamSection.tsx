import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TEAM } from "@/data/constants";

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const badgeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const portraitRefs = useRef<Array<HTMLDivElement | null>>([]);
  const badgeQuickTo = useRef<Array<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>>([]);

  useGSAP(
    () => {
      rowRefs.current.forEach((row) => {
        if (!row) return;
        gsap.set(row, { height: "16vh" });
      });

      badgeQuickTo.current = badgeRefs.current.map((badge) => {
        if (!badge) return null;
        return {
          x: gsap.quickTo(badge, "x", { duration: 0.4, ease: "power3.out" }),
          y: gsap.quickTo(badge, "y", { duration: 0.4, ease: "power3.out" }),
        };
      });
    },
    { scope: sectionRef }
  );

  const expandRow = (index: number) => {
    const row = rowRefs.current[index];
    const badge = badgeRefs.current[index];
    const portrait = portraitRefs.current[index];

    if (!row) return;

    gsap.to(row, {
      height: "32vh",
      duration: 0.6,
      ease: "power3.inOut",
    });

    const nameEl = row.querySelector(".team-name");
    if (nameEl) {
      gsap.to(nameEl, {
        color: "hsl(var(--primary))",
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(nameEl, {
        WebkitTextStrokeColor: "rgba(0,0,0,0)",
      });
    }

    if (badge) {
      gsap.to(badge, {
        backgroundColor: "hsla(var(--primary) / 0.15)",
        borderColor: "hsla(var(--primary) / 0.8)",
        color: "hsl(var(--primary))",
        duration: 0.4,
        ease: "power3.out",
      });
    }

    if (portrait) {
      gsap.to(portrait, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      });
    }
  };

  const collapseRow = (index: number) => {
    const row = rowRefs.current[index];
    const badge = badgeRefs.current[index];
    const portrait = portraitRefs.current[index];

    if (!row) return;

    gsap.to(row, {
      height: "16vh",
      duration: 0.5,
      ease: "power3.inOut",
    });

    const nameEl = row.querySelector(".team-name");
    if (nameEl) {
      gsap.to(nameEl, {
        color: "transparent",
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(nameEl, {
        WebkitTextStrokeColor: "rgba(0,0,0,0.9)",
        backgroundColor: "transparent",
        borderColor: "rgba(0,0,0,0.35)",
        color: "hsl(var(--foreground))",
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    }

    if (portrait) {
      gsap.to(portrait, {
        x: 80,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  const handleRowEnter = (index: number) => {
    expandRow(index);
  };

  const handleRowMouseLeave = (index: number) => {
    const quick = badgeQuickTo.current[index];
    if (quick) {
      quick.x(0);
      quick.y(0);
    }
    collapseRow(index);
  };

  const handleRowClick = (index: number) => {
    expandRow(index);
    setTimeout(() => collapseRow(index), 900);
  };

  const handleRowMouseMove = (index: number, e: React.MouseEvent) => {
    const row = rowRefs.current[index];
    const quick = badgeQuickTo.current[index];
    if (!row || !quick) return;

    const rect = row.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    quick.x(relX * 0.15);
    quick.y(relY * 0.2);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-background text-foreground"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        <header className="border-b border-border/15 px-6 py-6 md:px-12 md:py-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-foreground/50">
            UTOPIA 2K26 · THE ARCHITECTS
          </p>
        </header>

        <div className="flex flex-col border-b border-border/15">
          {TEAM.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => (rowRefs.current[index] = el)}
              className="relative flex h-[16vh] cursor-pointer items-center overflow-hidden bg-background border-t border-border/15 px-6 transition-colors md:px-12"
              onMouseEnter={() => handleRowEnter(index)}
              onMouseLeave={() => handleRowMouseLeave(index)}
              onMouseMove={(e) => handleRowMouseMove(index, e)}
              onClick={() => handleRowClick(index)}
            >
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <h2
                    className="team-name font-syne text-[10vw] md:text-[7vw] leading-[0.8] uppercase tracking-[-0.04em] text-transparent"
                    style={{
                      WebkitTextStroke: "1px rgba(255,255,255,0.9)",
                    }}
                  >
                    {member.name}
                  </h2>

                  <span
                    ref={(el) => (badgeRefs.current[index] = el)}
                    className="mt-2 inline-flex items-center rounded-full border border-foreground/35 px-4 py-1 text-[10px] font-sans uppercase tracking-[0.35em]"
                  >
                    {member.role}
                  </span>
                </div>

                <p className="mt-4 max-w-md text-xs font-sans uppercase tracking-[0.25em] text-foreground/35">
                  Architecting the systems, light, and sound that hold the
                  festival together.
                </p>
              </div>

              <div
                ref={(el) => (portraitRefs.current[index] = el)}
                className="pointer-events-none absolute right-4 top-1/2 h-32 w-32 -translate-y-1/2 overflow-hidden rounded-3xl border border-foreground/15 bg-gradient-to-br from-foreground/5 to-white/0 opacity-0 md:right-12 md:h-40 md:w-40"
                style={{ transform: "translate(80px, -50%)" }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover grayscale"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
