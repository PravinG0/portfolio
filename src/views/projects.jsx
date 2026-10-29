"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { 
  FiSearch, FiX, FiExternalLink, FiArrowRight, FiGrid, 
  FiLayers, FiChevronLeft, FiChevronRight, FiCode, FiCpu, 
  FiActivity, FiBox, FiServer, FiGlobe, FiCheckCircle
} from "react-icons/fi";
import { FALLBACK_PROJECTS } from "@/app/work/content";

const CircularGallery = dynamic(
  () => import("@/components/CircularGallery/CircularGallery"),
  { ssr: false }
);

function safeUrl(url) {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Accent colors and icons for project categories
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

/* ─── Fullscreen Quick Showcase Modal ─── */
function ProjectShowcaseModal({ items, currentIdx, onClose, onSelect }) {
  const current = items[currentIdx];
  const meta = DOMAIN_METAS[current?.id] || { accent: "#ff6b1a", tag: "System", icon: FiLayers };
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        onSelect((currentIdx + 1) % items.length);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        onSelect((currentIdx - 1 + items.length) % items.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx, items.length, onClose, onSelect]);

  if (!current) return null;

  const techList = current.tech ? current.tech.split(/·|,|;/).map(t => t.trim()).filter(Boolean) : [];
  const servicesList = current.services || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="pointer-events-none fixed inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: NOISE_SVG, backgroundRepeat: "repeat" }} 
      />

      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0c0e] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all"
        >
          <FiX size={18} />
        </button>

        {/* Visual Banner / Left Side */}
        <div className={`relative w-full md:w-[45%] min-h-[260px] md:min-h-full bg-gradient-to-br ${meta.bgGradient || "from-white/5 to-[#080808]"} p-8 flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-white/10`}>
          {/* Ambient glow */}
          <div 
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ backgroundColor: meta.accent }}
          />

          <div className="relative z-10 flex items-center justify-between">
            <span 
              className="text-xs font-mono font-bold tracking-[0.25em] px-3 py-1 rounded-full border"
              style={{ color: meta.accent, borderColor: `${meta.accent}40`, backgroundColor: `${meta.accent}15` }}
            >
              #{String(current.num || currentIdx + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40">
              {currentIdx + 1} / {items.length}
            </span>
          </div>

          <div className="relative z-10 my-auto py-8 text-center md:text-left">
            <div 
              className="w-16 h-16 rounded-2xl mx-auto md:mx-0 flex items-center justify-center mb-6 border shadow-lg"
              style={{ backgroundColor: `${meta.accent}15`, borderColor: `${meta.accent}30`, color: meta.accent }}
            >
              <meta.icon size={28} />
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] font-mono text-white/50 mb-2">
              {current.category}
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug">
              {current.title}
            </h2>
          </div>

          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => onSelect((currentIdx - 1 + items.length) % items.length)}
              className="flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white transition-colors"
            >
              <FiChevronLeft size={16} /> Prev
            </button>
            <div className="flex gap-1.5">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: i === currentIdx ? meta.accent : "rgba(255,255,255,0.15)",
                    transform: i === currentIdx ? "scale(1.2)" : "scale(1)"
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => onSelect((currentIdx + 1) % items.length)}
              className="flex items-center gap-2 text-xs font-medium text-white/50 hover:text-white transition-colors"
            >
              Next <FiChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Content Details / Right Side */}
        <div className="w-full md:w-[55%] p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-full">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.accent }} />
              <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-white/40">
                Case Study Overview
              </span>
            </div>

            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mb-6">
              {current.description}
            </p>

            {/* Deliverables */}
            {servicesList.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-white/40 mb-3">
                  Key Deliverables & Architecture
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {servicesList.map((svc, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-white/80 bg-white/[0.02] border border-white/[0.05] p-2.5 rounded-lg">
                      <FiCheckCircle size={13} style={{ color: meta.accent }} className="shrink-0" />
                      <span className="truncate">{svc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {techList.length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-white/40 mb-3">
                  Technologies Applied
                </p>
                <div className="flex flex-wrap gap-2">
                  {techList.map((t, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md text-[10px] tracking-[0.1em] font-mono text-white/60 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            {current.id && (
              <button
                onClick={() => {
                  onClose();
                  router.push(`/project/${current.id}`);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b1a] hover:bg-[#ff8533] text-black font-bold rounded-xl text-xs uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-orange-500/20"
              >
                Full Case Study <FiArrowRight size={14} />
              </button>
            )}

            {current.link && (
              <a
                href={safeUrl(current.link)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-white/15 hover:border-white/40 text-white/80 hover:text-white rounded-xl text-xs uppercase tracking-[0.2em] font-medium transition-all bg-white/[0.02]"
              >
                Live Preview <FiExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PROJECTS PAGE COMPONENT
   ═══════════════════════════════════════════════ */
export default function ProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "3d"
  const [showcaseIdx, setShowcaseIdx] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load projects from API or fallback
  useEffect(() => {
    fetch("/api/works")
      .then((r) => r.ok ? r.json() : FALLBACK_PROJECTS)
      .then((data) => {
        if (data && data.length > 0) {
          setWorks(data);
        } else {
          setWorks(FALLBACK_PROJECTS);
        }
      })
      .catch(() => setWorks(FALLBACK_PROJECTS))
      .finally(() => setLoading(false));
  }, []);

  // Category normalization mapping
  const normalizeCatKey = (cat) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("auto") || c.includes("power") || c.includes("sharepoint") || c.includes("teams")) return "AUTOMATION";
    if (c.includes("health") || c.includes("patient") || c.includes("rpm") || c.includes("medical")) return "HEALTHCARE";
    if (c.includes("plug") || c.includes("tool") || c.includes("custom plugin")) return "PLUGINS";
    if (c.includes("cloud") || c.includes("aws") || c.includes("infra") || c.includes("network") || c.includes("switch")) return "CLOUD_OPS";
    return "WORDPRESS";
  };

  // Sync category param if present in URL
  useEffect(() => {
    if (catParam) {
      const c = catParam.toUpperCase();
      if (["WORDPRESS", "AUTOMATION", "HEALTHCARE", "PLUGINS", "CLOUD_OPS"].includes(c)) {
        setActiveCategory(c);
      }
    }
  }, [catParam]);

  const categories = [
    { id: "ALL", label: "All Projects" },
    { id: "WORDPRESS", label: "WordPress & React" },
    { id: "AUTOMATION", label: "Power Automate" },
    { id: "HEALTHCARE", label: "Healthcare / RPM" },
    { id: "PLUGINS", label: "Plugins & Tools" },
    { id: "CLOUD_OPS", label: "Cloud & Ops" }
  ];

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return works.filter((p) => {
      const catKey = normalizeCatKey(p.category);
      const matchesCategory = activeCategory === "ALL" || catKey === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const titleMatch = (p.title || "").toLowerCase().includes(q);
      const descMatch = (p.description || "").toLowerCase().includes(q);
      const techMatch = (p.tech || "").toLowerCase().includes(q);
      const catMatch = (p.category || "").toLowerCase().includes(q);
      return titleMatch || descMatch || techMatch || catMatch;
    });
  }, [works, activeCategory, searchQuery]);

  // Gallery items for 3D view
  const galleryItems = useMemo(() => {
    return filteredProjects.map((p) => {
      // Short clean label for 3D card
      const shortTitle = p.title.split("—")[0].trim();
      return {
        image: p.image_url || "/photo/project.webp",
        text: shortTitle.length > 20 ? shortTitle.slice(0, 18) + "…" : shortTitle,
        id: p.id
      };
    });
  }, [filteredProjects]);

  const handleGalleryClick = useCallback((idx) => {
    if (idx >= 0 && idx < filteredProjects.length) {
      setShowcaseIdx(idx);
    }
  }, [filteredProjects]);

  return (
    <div className="relative min-h-screen bg-[#080808] text-white pt-28 pb-24 px-4 sm:px-8 md:px-14 lg:px-20 selection:bg-[#ff6b1a] selection:text-black">
      
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-40 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ─── Hero Header ─── */}
        <div className="mb-10 md:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#ff6b1a] animate-pulse" />
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-[#ff6b1a] font-semibold">
              Selected Work & Production Systems
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] text-white">
                Projects <span className="text-[#ff6b1a]">Archive.</span>
              </h1>
              <p className="text-white/50 text-sm sm:text-base font-light max-w-2xl mt-4 leading-relaxed">
                Production-engineered WordPress websites, enterprise Power Automate workflows, custom plugins, and healthcare medical device portals developed by Pravin G.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-6 py-3 px-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start lg:self-auto shrink-0">
              <div>
                <p className="text-2xl font-black text-white font-mono leading-none">11+</p>
                <p className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/40 mt-1">Systems</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-black text-[#ff6b1a] font-mono leading-none">13+</p>
                <p className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/40 mt-1">Industries</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="text-2xl font-black text-white font-mono leading-none">100%</p>
                <p className="text-[9px] uppercase tracking-[0.2em] font-mono text-white/40 mt-1">Production</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Filter & Toolbar ─── */}
        <div className="sticky top-[72px] z-40 mb-10 py-4 bg-[#080808]/90 backdrop-blur-xl border-y border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const count = cat.id === "ALL" 
                ? works.length 
                : works.filter(w => normalizeCatKey(w.category) === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-medium uppercase tracking-[0.15em] transition-all whitespace-nowrap flex items-center gap-2 ${
                    isActive 
                      ? "text-black bg-[#ff6b1a] font-bold shadow-md shadow-orange-500/20" 
                      : "text-white/60 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? "bg-black/20 text-black" : "bg-white/10 text-white/40"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Search & View Mode Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" size={14} />
              <input
                type="text"
                placeholder="Search tech, title, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-[#ff6b1a] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-white/30 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/[0.03] border border-white/[0.08] p-1 rounded-xl shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View"
                className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                  viewMode === "grid" 
                    ? "bg-[#ff6b1a] text-black font-bold shadow-sm" 
                    : "text-white/50 hover:text-white"
                }`}
              >
                <FiGrid size={15} />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Grid</span>
              </button>
              <button
                onClick={() => setViewMode("3d")}
                title="3D Orbit View"
                className={`p-2 rounded-lg text-xs flex items-center gap-1.5 transition-all ${
                  viewMode === "3d" 
                    ? "bg-[#ff6b1a] text-black font-bold shadow-sm" 
                    : "text-white/50 hover:text-white"
                }`}
              >
                <FiLayers size={15} />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">3D Ring</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── Projects Display ─── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[#ff6b1a] rounded-full animate-spin" />
            <p className="text-white/40 font-mono text-xs uppercase tracking-[0.25em]">Loading case studies...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
            <p className="text-white/30 text-sm font-mono uppercase tracking-[0.3em] mb-3">No matching projects found</p>
            <p className="text-white/50 text-xs max-w-sm mb-6">
              Try adjusting your search query or selecting a different category tab.
            </p>
            <button
              onClick={() => { setActiveCategory("ALL"); setSearchQuery(""); }}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono uppercase tracking-[0.2em] text-[#ff6b1a] transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* ─── GRID VIEW ─── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, idx) => {
              const meta = DOMAIN_METAS[project.id] || { accent: "#ff6b1a", bgGradient: "from-white/5 to-black", tag: "System", icon: FiLayers };
              const techPills = project.tech ? project.tech.split(/·|,|;/).map(t => t.trim()).filter(Boolean) : [];
              const services = project.services || [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="group relative bg-[#0e0e11] hover:bg-[#121217] border border-white/[0.08] hover:border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 overflow-hidden"
                >
                  {/* Accent glow line on top of card */}
                  <div 
                    className="absolute top-0 left-6 right-6 h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
                    style={{ backgroundColor: meta.accent }}
                  />

                  {/* Top Row: Project Index, Domain Badge & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full border"
                          style={{ color: meta.accent, borderColor: `${meta.accent}30`, backgroundColor: `${meta.accent}10` }}
                        >
                          #{String(project.num || idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                          {meta.tag}
                        </span>
                      </div>
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${meta.accent}12`, borderColor: `${meta.accent}25`, color: meta.accent }}
                      >
                        <meta.icon size={15} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#ff6b1a] transition-colors leading-snug tracking-tight mb-3">
                      <Link href={`/project/${project.id}`}>
                        {project.title}
                      </Link>
                    </h3>

                    {/* Description Excerpt */}
                    <p className="text-white/55 text-xs sm:text-sm font-light leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Deliverables snippet */}
                    {services.length > 0 && (
                      <div className="mb-6 space-y-1.5">
                        {services.slice(0, 2).map((svc, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-[11px] text-white/70">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: meta.accent }} />
                            <span className="truncate">{svc}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges */}
                    {techPills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {techPills.slice(0, 4).map((tech, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-md text-white/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {techPills.length > 4 && (
                          <span className="text-[9px] font-mono text-white/30 px-1.5 py-1">
                            +{techPills.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setShowcaseIdx(idx)}
                      className="text-xs font-mono uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors"
                    >
                      Quick View
                    </button>

                    <div className="flex items-center gap-2">
                      {project.link && (
                        <a
                          href={safeUrl(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open live website"
                          className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-white/50 hover:text-white transition-all"
                        >
                          <FiExternalLink size={14} />
                        </a>
                      )}
                      <Link
                        href={`/project/${project.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-[#ff6b1a] text-white hover:text-black border border-white/10 hover:border-[#ff6b1a] text-xs font-bold uppercase tracking-[0.15em] transition-all"
                      >
                        Details <FiArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* ─── 3D ORBIT VIEW ─── */
          <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-[#060608]">
            <div className="absolute inset-0">
              <CircularGallery
                key={`${activeCategory}-${searchQuery}`}
                items={galleryItems}
                bend={2.5}
                textColor="gradient"
                borderRadius={0.06}
                font="500 36px 'Inter', sans-serif"
                scrollSpeed={1.8}
                scrollEase={0.06}
                onItemClick={handleGalleryClick}
                activeIndex={0}
              />
            </div>

            {/* Instruction Banner at Bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/75 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#ff6b1a] animate-ping" />
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70">
                Drag horizontally to orbit · Click card for full case study
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─── Quick Showcase Modal ─── */}
      <AnimatePresence>
        {showcaseIdx !== null && (
          <ProjectShowcaseModal
            items={filteredProjects}
            currentIdx={showcaseIdx}
            onClose={() => setShowcaseIdx(null)}
            onSelect={(next) => setShowcaseIdx(next)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
