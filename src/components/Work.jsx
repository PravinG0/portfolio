"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION } from "@/app/work/content";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    num: "01",
    label: "WordPress & React",
    title: "WordPress & Frontend Solutions",
    description:
      "Enterprise WordPress platforms, custom PHP templates, and compiled React component integrations built for speed, responsiveness, and conversions.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 14h32" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="9" cy="11" r="1.2" fill="currentColor"/>
        <circle cx="13" cy="11" r="1.2" fill="currentColor"/>
        <circle cx="17" cy="11" r="1.2" fill="currentColor"/>
      </svg>
    ),
    href: "/projects?cat=wordpress",
  },
  {
    num: "02",
    label: "Workflow Automation",
    title: "Enterprise Automation & APIs",
    description:
      "Power Automate workflows connecting SharePoint lists, GitLab project members, YouTrack assignments, and Microsoft Teams with Adaptive Cards.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
        <path d="M12 20h16M20 12v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="8" r="3" fill="currentColor"/>
        <circle cx="32" cy="20" r="3" fill="currentColor"/>
        <circle cx="8" cy="20" r="3" fill="currentColor"/>
        <circle cx="20" cy="32" r="3" fill="currentColor"/>
      </svg>
    ),
    href: "/projects?cat=automation",
  },
  {
    num: "03",
    label: "Custom Plugins & Cloud",
    title: "Custom Plugins & Cloud Architecture",
    description:
      "Custom WordPress plugins, AWS Lambda and S3 storage integrations, Fluent Forms data pipelines, and JSON-LD structured data SEO.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
        <path d="M6 14a6 6 0 0 1 10-4.47A8 8 0 0 1 31 15a5 5 0 0 1-1 9.9H8a6 6 0 0 1-2-10.9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 26l4-4 4 4M20 22v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: "/projects?cat=plugins",
  },
];

export default function Work() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".work-item").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 90%", toggleActions: "play none none none" },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        opacity: 0,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="work-section"
      className="relative w-full min-h-screen px-10 md:px-20 pt-64 pb-72 flex flex-col justify-center"
    >
      <div className="max-w-4xl w-full">

        {/* Header and Filters */}
        <div className="mb-14 md:mb-20">
          <p className="font-sans text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase mb-4 font-medium">
            {SECTION.label}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2
              className="font-sans font-black tracking-tighter text-slate-900 leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              {SECTION.heading}
            </h2>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 lg:pb-2">
              {[
                { label: "WordPress & React", cat: "wordpress" },
                { label: "Automation", cat: "automation" },
                { label: "Plugins & Tools", cat: "plugins" }
              ].map(({ label, cat }) => (
                <Link
                  key={cat}
                  href={`/projects?cat=${cat}`}
                  className="px-4 py-2 rounded-full text-[10px] md:text-xs font-medium tracking-widest uppercase transition-all duration-300 bg-white/70 text-slate-600 border border-slate-300 hover:text-slate-900 hover:border-slate-500 shadow-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Category Cards */}
        <div className="flex flex-col">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.num}
              href={cat.href}
              className="work-item group relative flex items-start gap-8 py-10 md:py-14 border-b border-slate-200 hover:border-slate-400 hover:bg-white/40 transition-all duration-500"
            >
              {/* Left orange accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#ff6b1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />

              {/* Number */}
              <div className="pl-3 shrink-0 w-8 pt-1">
                <span className="font-mono text-[10px] text-slate-400 group-hover:text-[#ff6b1a] tracking-widest transition-colors duration-300">
                  {cat.num}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
                <p className="font-sans text-[10px] text-slate-500 group-hover:text-[#ff6b1a] tracking-[0.4em] uppercase font-medium mb-2 transition-colors duration-300">
                  {cat.label}
                </p>
                <h3 className="font-sans text-xl md:text-2xl font-black text-slate-900 tracking-tighter mb-3 group-hover:text-black transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="font-sans text-sm text-slate-600 group-hover:text-slate-800 font-normal leading-relaxed max-w-2xl transition-colors duration-300">
                  {cat.description}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] text-slate-400 group-hover:text-slate-700 tracking-widest uppercase transition-colors duration-200 font-medium">
                  View Projects
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>

              {/* Icon */}
              <div className="hidden md:flex shrink-0 items-center pt-2 text-slate-600 group-hover:text-slate-900 transition-colors">
                {cat.icon}
              </div>
            </Link>
          ))}

          {/* 4th item — View Full Projects CTA */}
          <Link
            href="/projects"
            className="work-item group relative flex items-center gap-8 py-10 md:py-14 border-b border-slate-200 hover:border-slate-400 hover:bg-white/40 transition-all duration-500"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#ff6b1a] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out" />
            <div className="pl-3 shrink-0 w-8">
              <span className="font-mono text-[10px] text-slate-400 group-hover:text-[#ff6b1a] tracking-widest transition-colors duration-300">→</span>
            </div>
            <div className="flex-1 translate-x-0 group-hover:translate-x-1.5 transition-transform duration-500 ease-out">
              <p className="font-sans text-[10px] text-slate-500 group-hover:text-[#ff6b1a] tracking-[0.4em] uppercase font-medium mb-2 transition-colors duration-300">
                All Case Studies
              </p>
              <h3 className="font-sans text-xl md:text-2xl font-black text-slate-900 tracking-tighter group-hover:text-black transition-colors duration-300">
                Explore All 11+ Projects & Systems
              </h3>
            </div>
            <div className="hidden md:flex items-center gap-2 text-slate-400 group-hover:text-[#ff6b1a] transition-colors duration-300 pr-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14h16M16 8l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
