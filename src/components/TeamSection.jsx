import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const TEAM = [
  {
    name: "ARA NØVA",
    role: "Creative Director",
    image:
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "DEV CHANDRA",
    role: "Technical Lead",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "MEI KASUMI",
    role: "Experience Architect",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "LIO RAY",
    role: "Music Curator",
    image:
      "https://images.pexels.com/photos/2837009/pexels-photo-2837009.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "SANA QADIR",
    role: "Production Lead",
    image:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const badgeRefs = useRef([]);
  const portraitRefs = useRef([]);
  const badgeQuickTo = useRef([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const expandRow = (index) => {
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
        color: "#E65100",
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(nameEl, {
        WebkitTextStrokeColor: "rgba(0,0,0,0)",
      });
    }

    if (badge) {
      gsap.to(badge, {
        backgroundColor: "rgba(230,81,0,0.15)",
        borderColor: "rgba(230,81,0,0.8)",
        color: "#E65100",
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

  const collapseRow = (index) => {
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
        color: "#111111",
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

  const handleRowEnter = (index) => {
    expandRow(index);
  };

  const handleRowMouseLeave = (index) => {
    const quick = badgeQuickTo.current[index];
    if (quick) {
      quick.x(0);
      quick.y(0);
    }
    collapseRow(index);
  };

  const handleRowClick = (index) => {
    expandRow(index);
    setTimeout(() => collapseRow(index), 900);
  };

  const handleRowMouseMove = (index, e) => {
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
      className="min-h-screen w-full bg-[#F4F4F0] text-[#111111]"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        <header className="border-b border-[#111111]/15 px-6 py-6 md:px-12 md:py-8">
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-[#111111]/50">
            UTOPIA 2K26 · THE ARCHITECTS
          </p>
        </header>

        <div className="flex flex-col divide-y divide-white/12">
          {TEAM.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => (rowRefs.current[index] = el)}
              className="relative flex h-[16vh] cursor-pointer items-center overflow-hidden bg-[#F4F4F0] px-6 transition-colors md:px-12"
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
                    className="mt-2 inline-flex items-center rounded-full border border-[#111111]/35 px-4 py-1 text-[10px] font-sans uppercase tracking-[0.35em]"
                  >
                    {member.role}
                  </span>
                </div>

                <p className="mt-4 max-w-md text-xs font-sans uppercase tracking-[0.25em] text-[#111111]/35">
                  Architecting the systems, light, and sound that hold the
                  festival together.
                </p>
              </div>

              <div
                ref={(el) => (portraitRefs.current[index] = el)}
                className="pointer-events-none absolute right-4 top-1/2 h-32 w-32 -translate-y-1/2 overflow-hidden rounded-3xl border border-[#111111]/15 bg-gradient-to-br from-[#111111]/5 to-white/0 opacity-0 md:right-12 md:h-40 md:w-40"
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

