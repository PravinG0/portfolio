import { Suspense } from "react";
import Cursor from "../../components/Cursor";
import Navbar from "../../components/Navbar";
import ProjectsPage from "../../views/projects";

export const metadata = {
  title:       "Projects & Systems — Case Studies by Pravin G",
  description: "Explore production case studies by Pravin G: custom WordPress development, PHP templates, React frontend integrations, Power Automate enterprise workflows, and AWS integrations.",
  keywords:    ["WordPress projects", "case studies", "custom plugins", "Power Automate workflows", "React WordPress integration", "Pravin G"],
  alternates:  { canonical: "https://pravin-g.dev/projects" },
  openGraph: {
    title: "Projects & Systems — Pravin G | WordPress Developer",
    description: "Production case studies of WordPress platforms, custom plugins, React integrations, and workflow automations by Pravin G.",
  },
};

export default function Page() {
  return (
    <main>
      <div className="grain-overlay" />
      <Cursor />
      <Navbar />
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen bg-[#060606]" />}>
          <ProjectsPage />
        </Suspense>
      </div>
    </main>
  );
}
