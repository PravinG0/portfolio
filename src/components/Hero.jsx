"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";
import ContactPopup from "./ContactPopup";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const ref = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
      gsap.from(".hero-line",  { y: 90, opacity: 0, stagger: 0.1, duration: 1.1, ease: "power4.out", delay: 0.6 });
      
      // Premium staggered letter effect for the main name
      gsap.from(".hero-letter", { 
        y: 100, 
        opacity: 0, 
        rotateX: -40,
        stagger: 0.06, 
        duration: 1.2, 
        ease: "power4.out", 
        delay: 0.7 
      });

      gsap.from(".hero-sub",   { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", delay: 1.4 });
      gsap.from(".hero-actions", { y: 25, opacity: 0, duration: 0.8, ease: "power3.out", delay: 1.6 });

      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 60%",
          end:   "bottom 10%",
          scrub: 1.2,
        },
        opacity: 0,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-[135vh] flex flex-col justify-center px-10 md:px-24 overflow-hidden"
      >
        <div className="relative z-10 max-w-5xl">
          <p className="hero-label text-[10px] md:text-xs text-[#ff6b1a] tracking-[0.25em] uppercase font-bold mb-6 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff6b1a] animate-pulse" />
            WordPress Developer & Technical Integrations
          </p>

          <h1
            className="font-black tracking-tighter leading-[0.75] mb-10 flex flex-col relative z-10 hero-clamp-text"
          >
            <span className="hero-line block ghost z-0">Hey, I'm</span>
            <span className="block text-white -mt-2 md:-mt-6 z-10 hero-perspective">
              {"Pravin G.".split("").map((char, index) => (
                <span key={index} className="hero-letter inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          <div className="max-w-2xl hero-sub flex flex-col gap-5">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              I build websites that do more than look good.
            </h2>

            <BlurText
              text="I develop *custom* *WordPress* *solutions*, *PHP* *templates*, *React* *integrations*, and *automated* *workflows* that connect websites with the systems businesses rely on."
              delay={25}
              animateBy="words"
              direction="bottom"
              stepDuration={0.22}
              className="text-base md:text-[17px] text-white/70 font-medium leading-[1.6]"
            />
            <BlurText
              text="Specializing in *responsive* *development*, *custom* *plugins*, *REST* *APIs*, and enterprise automation using *Power* *Automate*, *SharePoint*, *Teams*, *GitLab*, *YouTrack*, and *AWS*."
              delay={20}
              animateBy="words"
              direction="bottom"
              stepDuration={0.2}
              className="text-xs md:text-sm text-white/50 font-light leading-relaxed"
            />
            <BlurText
              text="Currently at *OneData* *Software* *Solution* in Coimbatore. Previously at *Anuvic* *Designs* and *HCL* *Technologies*."
              delay={15}
              animateBy="words"
              direction="bottom"
              stepDuration={0.18}
              className="text-xs md:text-sm text-white/40 font-light leading-relaxed"
            />

            {/* CTAs */}
            <div className="hero-actions flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={scrollToWork}
                className="px-6 py-3 bg-[#ff6b1a] text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-[#ff6b1a]/20 flex items-center gap-2"
              >
                Explore My Work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
              </button>

              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:border-[#ff6b1a] hover:text-[#ff6b1a] transition-all duration-300"
              >
                Contact Me
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#ff6b1a]/30 text-[#ff6b1a] text-xs font-bold uppercase tracking-widest rounded-full hover:bg-[#ff6b1a] hover:text-black transition-all duration-300 flex items-center gap-2"
              >
                Download Resume
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            </div>

            <p className="mt-8 text-[10px] text-white/40 tracking-[0.4em] uppercase font-medium">
              Explore Selected Work ↓
            </p>
          </div>
        </div>
      </section>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
