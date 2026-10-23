import { Suspense } from "react";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import ProjectsPage from "@/views/projects";

export const metadata = {
  title: "Selected Work & Systems — Pravin G | WordPress Developer",
  description: "Production case studies of WordPress websites, custom plugins, React integrations, and workflow automations by Pravin G.",
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
