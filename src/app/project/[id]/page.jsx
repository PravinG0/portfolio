"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FiArrowLeft, FiArrowRight, FiExternalLink, FiCalendar, 
  FiUser, FiLayers, FiCheck, FiCpu, FiActivity, FiBox, 
  FiServer, FiGlobe, FiCode, FiShield
} from "react-icons/fi";
import PageShell from "../../../components/PageShell";
import { FALLBACK_PROJECTS } from "@/app/work/content";

function safeUrl(url) {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const DOMAIN_METAS = {
  "edgeone": {
    accent: "#00d4ff",
    bgGradient: "from-[#002b4d]/40 via-[#001726]/30 to-[#080808]",
    tag: "Edge AI & IoT",
    icon: FiCpu
  },
  "onecare-rpm": {
    accent: "#00e5a3",
    bgGradient: "from-[#003d2b]/40 via-[#001f16]/30 to-[#080808]",
    tag: "MedTech / RPM",
    icon: FiActivity
  },
  "onedata-corp": {
    accent: "#a855f7",
    bgGradient: "from-[#320b57]/40 via-[#18052b]/30 to-[#080808]",
    tag: "Corporate Software",
    icon: FiLayers
  },
  "enterprise-automation": {
    accent: "#ff6b1a",
    bgGradient: "from-[#4d1f00]/40 via-[#260f00]/30 to-[#080808]",
    tag: "Power Automate",
    icon: FiCpu
  },
  "upskilled-ai": {
    accent: "#f43f5e",
    bgGradient: "from-[#4d0017]/40 via-[#26000c]/30 to-[#080808]",
    tag: "AI & SEO Audit",
    icon: FiGlobe
  },
  "tekedge-plugins": {
    accent: "#f59e0b",
    bgGradient: "from-[#4d3200]/40 via-[#261900]/30 to-[#080808]",
    tag: "Custom Plugins",
    icon: FiBox
  },
  "pulse-v2": {
    accent: "#ff8c00",
    bgGradient: "from-[#4d2600]/40 via-[#261300]/30 to-[#080808]",
    tag: "AWS Cloud & S3",
    icon: FiServer
  },
  "hireone": {
    accent: "#3b82f6",
    bgGradient: "from-[#0d2859]/40 via-[#06142e]/30 to-[#080808]",
    tag: "Recruitment Portal",
    icon: FiGlobe
  },
  "zts-systems": {
    accent: "#06b6d4",
    bgGradient: "from-[#04333d]/40 via-[#02191e]/30 to-[#080808]",
    tag: "Custom Themes",
    icon: FiCode
  },
  "anuvic-stores": {
    accent: "#10b981",
    bgGradient: "from-[#033b24]/40 via-[#011c11]/30 to-[#080808]",
    tag: "WooCommerce",
    icon: FiBox
  },
  "hcl-infrastructure": {
    accent: "#8b5cf6",
    bgGradient: "from-[#290d59]/40 via-[#14062e]/30 to-[#080808]",
    tag: "Network IT Ops",
    icon: FiServer
  }
};

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  // Find static project immediately to ensure ZERO latency / no blank screen
  const staticProject = useMemo(() => {
    if (!id) return null;
    return FALLBACK_PROJECTS.find(
      (p) => p.id === id || p.id === decodeURIComponent(id)
    ) || null;
  }, [id]);

  const [project, setProject] = useState(staticProject);
  const [loading, setLoading] = useState(!staticProject);
  const [notFound, setNotFound] = useState(false);

  // Calculate previous and next projects
  const { prevProject, nextProject } = useMemo(() => {
    if (!project) return { prevProject: null, nextProject: null };
    const currentIndex = FALLBACK_PROJECTS.findIndex((p) => p.id === project.id);
    if (currentIndex === -1) return { prevProject: null, nextProject: null };

    const prevIndex = (currentIndex - 1 + FALLBACK_PROJECTS.length) % FALLBACK_PROJECTS.length;
    const nextIndex = (currentIndex + 1) % FALLBACK_PROJECTS.length;

    return {
      prevProject: FALLBACK_PROJECTS[prevIndex],
      nextProject: FALLBACK_PROJECTS[nextIndex]
    };
  }, [project]);

  useEffect(() => {
    if (!id) return;

    // Reset scroll position instantly to top of page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const match = FALLBACK_PROJECTS.find(
      (p) => p.id === id || p.id === decodeURIComponent(id)
    );

    if (match) {
      setProject(match);
      setLoading(false);
      setNotFound(false);
    }

    // Dynamic background refresh from API if database has updates
    fetch(`/api/works/${id}`)
      .then((r) => {
        if (r.status === 404) {
          if (!match) {
            setNotFound(true);
            setLoading(false);
          }
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setProject(data);
          setNotFound(false);
        } else if (!match) {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (!match) setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Tech / Services parsing
  const servicesData = project?.services || project?.tech;
  let services = [];
  if (Array.isArray(servicesData)) {
    services = servicesData;
  } else if (typeof servicesData === "string") {
    services = servicesData.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  }

  // Tech tags parsing
  let techList = [];
  if (project?.tech) {
    if (Array.isArray(project.tech)) {
      techList = project.tech;
    } else if (typeof project.tech === "string") {
      techList = project.tech.split(/[·,;]/).map((s) => s.trim()).filter(Boolean);
    }
  }

  // Gallery parsing
  let gallery = [];
  if (project?.gallery) {
    if (Array.isArray(project.gallery)) {
      gallery = project.gallery;
    } else if (typeof project.gallery === "string") {
      try {
        gallery = JSON.parse(project.gallery);
      } catch (e) {
        console.error("Failed to parse gallery:", e);
      }
    }
  }

  const meta = DOMAIN_METAS[project?.id] || {
    accent: "#ff6b1a",
    bgGradient: "from-[#4d1f00]/30 via-[#260f00]/20 to-[#080808]",
    tag: project?.category || "Project",
    icon: FiLayers
  };

  return (
    <PageShell>
      <div className="min-h-screen bg-[#080808] text-white">

        {loading && (
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[#ff6b1a] rounded-full animate-spin" />
          </div>
        )}

        {notFound && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-6 text-center">
            <span className="p-4 rounded-full bg-white/5 border border-white/10 text-[#ff6b1a]">
              <FiShield size={32} />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Project Not Found</h2>
              <p className="text-white/40 text-sm max-w-sm mx-auto">
                The requested case study could not be located or may have been updated.
              </p>
            </div>
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff6b1a] text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#ff8533] transition-all"
            >
              <FiArrowLeft size={14} /> Back to Projects
            </Link>
          </div>
        )}

        {project && (
          <>
            {/* ── HERO ── */}
            <div className="relative w-full min-h-[50vh] md:min-h-[60vh] flex flex-col justify-end overflow-hidden bg-[#0d0d10] border-b border-white/[0.08]">
              {/* Background visuals */}
              {project.image_url && project.image_url !== "/photo/project.webp" ? (
                (project.image_url?.includes(".mp4") || project.image_url?.includes(".webm") || project.image_url?.includes(".mov")) ? (
                  <video 
                    src={project.image_url} 
                    className="absolute inset-0 w-full h-full object-cover opacity-40" 
                    muted 
                    loop 
                    playsInline 
                    autoPlay 
                  />
                ) : (
                  <picture>
                    {project.mobile_image_url && <source media="(max-width: 767px)" srcSet={project.mobile_image_url} />}
                    <img
                      src={project.image_url || project.mobile_image_url}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                  </picture>
                )
              ) : (
                <div className="absolute inset-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${meta.bgGradient}`} />
                  <div 
                    className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-25"
                    style={{ backgroundColor: meta.accent }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                </div>
              )}

              {/* Dark overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent" />

              {/* Hero text */}
              <div className="relative z-10 px-6 md:px-16 pt-32 pb-12 md:pb-16 max-w-7xl mx-auto w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="proj-hero-text"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <Link
                      href="/projects"
                      className="text-white/60 hover:text-white font-mono text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/20"
                    >
                      <FiArrowLeft size={13} /> Projects
                    </Link>

                    {project.category && (
                      <span 
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium tracking-[0.2em] uppercase px-3.5 py-1 rounded-full border"
                        style={{ 
                          backgroundColor: `${meta.accent}15`, 
                          borderColor: `${meta.accent}35`, 
                          color: meta.accent 
                        }}
                      >
                        <meta.icon size={13} />
                        {project.category}
                      </span>
                    )}

                    {project.num && (
                      <span className="text-white/30 font-mono text-xs tracking-widest">
                        #{project.num}
                      </span>
                    )}
                  </div>

                  <h1
                    className="font-black tracking-tight leading-[1.05] text-white max-w-4xl"
                    style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                  >
                    {project.title}
                  </h1>

                  {(project.client || project.year) && (
                    <div className="flex flex-wrap items-center gap-6 mt-6 text-white/60 text-xs sm:text-sm font-mono">
                      {project.client && (
                        <span className="flex items-center gap-2">
                          <FiUser className="text-[#ff6b1a]" />
                          <span className="text-white/40">Client:</span> {project.client}
                        </span>
                      )}
                      {project.year && (
                        <span className="flex items-center gap-2">
                          <FiCalendar className="text-[#ff6b1a]" />
                          <span className="text-white/40">Year:</span> {project.year}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* ── BODY ── */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="proj-body px-6 md:px-16 py-16 md:py-20 max-w-7xl mx-auto"
            >
              <div className="grid md:grid-cols-[1fr_320px] gap-12 md:gap-16 items-start">

                {/* LEFT — Challenge, Solution & Deliverables */}
                <div className="space-y-12">
                  {project.description && (
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                      <h2 className="font-black text-xl text-white mb-4 tracking-tight flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.accent }} />
                        The Challenge & Scope
                      </h2>
                      <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  )}

                  {/* Deliverables / Scope of Work */}
                  {services.length > 0 && (
                    <div>
                      <h2 className="font-black text-xl text-white mb-6 tracking-tight flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.accent }} />
                        Key Deliverables & Responsibilities
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-3.5">
                        {services.map((item, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all"
                          >
                            <span 
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: `${meta.accent}20`, color: meta.accent }}
                            >
                              <FiCheck size={12} />
                            </span>
                            <span className="text-white/80 text-sm font-medium leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Client Review / Testimonial */}
                  {project.review && (
                    <blockquote 
                      className="border-l-4 pl-6 py-4 my-8 rounded-r-2xl"
                      style={{ 
                        borderColor: meta.accent,
                        backgroundColor: `${meta.accent}08` 
                      }}
                    >
                      <p className="text-white/90 italic text-base md:text-lg leading-relaxed font-serif">
                        "{project.review}"
                      </p>
                    </blockquote>
                  )}

                  {/* Responsive Previews */}
                  {(project.desktop_view_url || project.phone_view_url) && (
                    <div>
                      <h2 className="font-black text-xl text-white mb-6 tracking-tight flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.accent }} />
                        Interface Previews
                      </h2>
                      <div className="flex flex-col gap-6">
                        {project.desktop_view_url && (
                          <div className="w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                            <img src={project.desktop_view_url} alt="Desktop Preview" className="w-full object-cover" />
                          </div>
                        )}
                        {project.phone_view_url && (
                          <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                            <img src={project.phone_view_url} alt="Phone Preview" className="w-full object-cover" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Gallery */}
                  {gallery && gallery.length > 0 && (
                    <div>
                      <h2 className="font-black text-xl text-white mb-6 tracking-tight flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.accent }} />
                        Project Gallery
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {gallery.map((url, i) => (
                          <div key={i} className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                            {url.includes(".mp4") || url.includes(".webm") || url.includes(".mov") ? (
                              <video
                                src={url}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                muted loop playsInline autoPlay
                              />
                            ) : (
                              <img
                                src={url}
                                alt={`${project.title} screenshot ${i + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT — Project Specs & Sticky Sidebar */}
                <div className="md:sticky md:top-28 space-y-6">
                  <div className="bg-[#101014] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col gap-6 shadow-xl">
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                      <h3 className="font-bold text-white text-base tracking-tight">Project Snapshot</h3>
                      <span 
                        className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md border"
                        style={{ 
                          backgroundColor: `${meta.accent}15`, 
                          borderColor: `${meta.accent}30`, 
                          color: meta.accent 
                        }}
                      >
                        {meta.tag}
                      </span>
                    </div>

                    {project.client && (
                      <div>
                        <p className="text-[10px] text-white/35 font-mono uppercase tracking-[0.2em] mb-1">Client</p>
                        <p className="text-white text-sm font-medium">{project.client}</p>
                      </div>
                    )}

                    {project.year && (
                      <div>
                        <p className="text-[10px] text-white/35 font-mono uppercase tracking-[0.2em] mb-1">Year</p>
                        <p className="text-white text-sm font-medium">{project.year}</p>
                      </div>
                    )}

                    {project.category && (
                      <div>
                        <p className="text-[10px] text-white/35 font-mono uppercase tracking-[0.2em] mb-1">Domain</p>
                        <p className="text-white/80 text-sm font-medium">{project.category}</p>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    {techList.length > 0 && (
                      <div>
                        <p className="text-[10px] text-white/35 font-mono uppercase tracking-[0.2em] mb-2.5">Technologies</p>
                        <div className="flex flex-wrap gap-1.5">
                          {techList.map((t, idx) => (
                            <span 
                              key={idx} 
                              className="text-[10px] font-mono px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Links */}
                    {project.link ? (
                      <a
                        href={safeUrl(project.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                        style={{ backgroundColor: meta.accent }}
                      >
                        Launch Project <FiExternalLink size={14} />
                      </a>
                    ) : (
                      <div className="mt-2 py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                        <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-center gap-1.5">
                          <FiShield size={12} className="text-[#ff6b1a]" /> Internal / Enterprise Architecture
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Back to all projects link */}
                  <Link
                    href="/projects"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 text-white/70 hover:text-white text-xs font-mono uppercase tracking-widest transition-all"
                  >
                    <FiArrowLeft size={13} /> View All Projects
                  </Link>
                </div>

              </div>
            </motion.div>

            {/* ── PROJECT PAGINATION (Next / Prev) ── */}
            {(prevProject || nextProject) && (
              <div className="border-t border-white/[0.08] py-8 px-6 md:px-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevProject && (
                    <Link
                      href={`/project/${prevProject.id}`}
                      className="group flex flex-col p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/15 transition-all text-left"
                    >
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5 mb-2 group-hover:text-[#ff6b1a] transition-colors">
                        <FiArrowLeft size={12} /> Previous Case Study
                      </span>
                      <span className="text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-white">
                        {prevProject.title}
                      </span>
                    </Link>
                  )}
                  {nextProject && (
                    <Link
                      href={`/project/${nextProject.id}`}
                      className="group flex flex-col p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/15 transition-all text-right sm:items-end"
                    >
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1.5 mb-2 group-hover:text-[#ff6b1a] transition-colors">
                        Next Case Study <FiArrowRight size={12} />
                      </span>
                      <span className="text-white font-bold text-sm sm:text-base line-clamp-1 group-hover:text-white">
                        {nextProject.title}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* ── CTA ── */}
            <div className="border-t border-white/[0.08] py-24 px-6 md:px-16 text-center bg-gradient-to-b from-transparent to-[#050507]">
              <p className="text-[11px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-mono font-medium">Start Your Project</p>
              <h2 className="font-black tracking-tight leading-[1] mb-6 text-white" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
                Ready to Build Something<br />
                <span className="text-[#ff6b1a] italic font-serif">Exceptional Together?</span>
              </h2>
              <p className="text-white/40 text-sm sm:text-base font-light mb-10 max-w-lg mx-auto leading-relaxed">
                Whether you need high-performance WordPress architecture, custom React integrations, or enterprise workflow automation.
              </p>
              <Link
                href="/#contact-section"
                className="inline-flex items-center gap-3 bg-[#ff6b1a] hover:bg-[#ff8533] text-black font-black px-8 py-4 rounded-full text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-xl hover:shadow-orange-500/25"
              >
                Get In Touch
                <FiArrowRight size={14} />
              </Link>
            </div>
          </>
        )}

      </div>
    </PageShell>
  );
}
