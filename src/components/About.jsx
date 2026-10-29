"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import BlurText from "./BlurText";
import { SECTION, HEADING, BIO, RESUME_URL, TECH, CREATIVE, EXPERIENCE } from "@/app/about/content";

gsap.registerPlugin(ScrollTrigger);

export default function About({ standalone = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (standalone) {
        gsap.from(".about-card-left", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });
        gsap.from(".about-card-right", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.45 });
        gsap.from(".about-skill", { opacity: 0, scale: 0.95, stagger: 0.03, duration: 0.35, delay: 0.7 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.from(".about-card-left", { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(".about-card-right", { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .from(".about-skill", { opacity: 0, scale: 0.95, stagger: 0.02, duration: 0.3, ease: "power2.out" }, "-=0.3");

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 35%",
          end: "bottom top",
          scrub: 1.2,
        },
        opacity: 0,
        y: -35,
      });

      setTimeout(() => ScrollTrigger.refresh(), 300);
    }, ref);
    return () => ctx.revert();
  }, [standalone]);

  return (
    <section
      id="about-section"
      ref={ref}
      className={`relative w-full min-h-screen px-6 sm:px-10 md:px-16 lg:px-20 ${standalone ? "" : "z-20"}`}
    >
      {standalone && (
        <div className="about-img absolute inset-0 z-0">
          <Image
            src="/photo/pravin.jpg"
            alt="Pravin G"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#080808] via-[#080808]/85 to-[#080808]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/70" />
        </div>
      )}

      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-10 xl:gap-14 py-28 md:py-36 max-w-7xl mx-auto">

        {/* ── LEFT FROSTED GLASS PANEL: BIO & INTRO ── */}
        <div className="about-card-left w-full lg:w-[50%] xl:w-[48%] bg-[#08080b]/85 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-7 sm:p-9 md:p-11 shadow-[0_25px_60px_rgba(0,0,0,0.75)] relative overflow-hidden flex flex-col items-start text-left">
          {/* Subtle top edge specular highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          {/* Ambient warm orange glow */}
          <div className="absolute -top-24 -left-24 w-52 h-52 bg-[#ff6b1a]/15 rounded-full blur-3xl pointer-events-none" />

          <p className="about-label text-[11px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-mono font-medium">
            {SECTION.label}
          </p>

          <h2
            className="about-h font-black tracking-tight leading-[0.92] mb-7"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
          >
            <span className="block text-white">{HEADING.line1}</span>
            <span className="block text-white">{HEADING.line2}</span>
            <span className="block ghost">{HEADING.line3}</span>
          </h2>

          <div className="space-y-4 mb-8">
            {BIO.map((text, i) => (
              <BlurText
                key={i}
                text={text}
                delay={15}
                animateBy="words"
                direction="bottom"
                stepDuration={0.2}
                className="about-p text-sm sm:text-[15px] text-white/90 font-normal leading-relaxed"
              />
            ))}
          </div>

          <div className="about-p mt-auto pt-4 flex justify-start w-full">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#ff6b1a] hover:bg-[#ff8533] text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-xl hover:shadow-orange-500/25"
            >
              View Resume
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── RIGHT FROSTED GLASS PANEL: TECH, AUTOMATION & EXPERIENCE ── */}
        <div className="about-card-right w-full lg:w-[48%] xl:w-[46%] bg-[#08080b]/85 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-7 sm:p-9 md:p-11 shadow-[0_25px_60px_rgba(0,0,0,0.75)] relative overflow-hidden flex flex-col gap-8 text-left">
          {/* Subtle top edge specular highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
          {/* Ambient cool glow */}
          <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Tech Badges */}
          <div className="w-full">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-[#ff6b1a]" />
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white">
                Tech I Work With
              </h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {TECH.map((s) => (
                <span 
                  key={s.name} 
                  className="about-skill group px-3 py-1.5 flex items-center gap-2 rounded-xl bg-white/[0.05] hover:bg-[#ff6b1a] border border-white/[0.1] hover:border-[#ff6b1a] text-xs font-mono font-medium text-white/90 hover:text-black transition-all duration-300 shadow-sm cursor-default"
                >
                  <s.icon className="w-3.5 h-3.5 text-[#ff6b1a] group-hover:text-black transition-colors shrink-0" />
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Automation & Tools */}
          <div className="w-full">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-[#ff6b1a]" />
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white">
                Automation & Tools
              </h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              {CREATIVE.map((s) => (
                <span 
                  key={s.name} 
                  className="about-skill group px-3 py-1.5 flex items-center gap-2 rounded-xl bg-white/[0.05] hover:bg-[#ff6b1a] border border-white/[0.1] hover:border-[#ff6b1a] text-xs font-mono font-medium text-white/90 hover:text-black transition-all duration-300 shadow-sm cursor-default"
                >
                  <s.icon className="w-3.5 h-3.5 text-[#ff6b1a] group-hover:text-black transition-colors shrink-0" />
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Experience List */}
          <div className="w-full">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-white/[0.08]">
              <span className="w-2 h-2 rounded-full bg-[#ff6b1a]" />
              <h3 className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white">
                Experience & Education
              </h3>
            </div>
            <div className="flex flex-col gap-3.5">
              {EXPERIENCE.map((exp, i) => (
                <div 
                  key={i} 
                  className="about-skill p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 transition-all flex flex-col gap-1 text-left"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-white text-sm font-bold">{exp.role}</p>
                    <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">
                      {exp.period?.split('·')[0]}
                    </span>
                  </div>
                  <p className="text-[#ff6b1a] text-xs font-medium">{exp.company}</p>
                  {exp.desc && (
                    <p className="text-white/70 text-xs font-normal leading-relaxed mt-1">
                      {exp.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
