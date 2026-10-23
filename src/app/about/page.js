import PageShell from "@/components/PageShell";
import AboutPage from "@/views/about";

export const metadata = {
  title:       "About Pravin G — WordPress Developer & Technical Integrations",
  description: "Learn more about Pravin G — WordPress Developer at OneData Software Solution, specializing in custom plugins, PHP templates, React frontend integrations, and Power Automate workflows.",
  keywords:    ["WordPress Developer India", "Pravin G", "custom WordPress plugins", "PHP developer Coimbatore", "Power Automate developer", "React WordPress integration"],
  alternates:  { canonical: "https://pravin-g.dev/about" },
  openGraph: {
    title: "About Pravin G — WordPress Developer & Technical Integrations",
    description: "WordPress Developer specializing in custom plugins, PHP templates, React frontend integrations, and enterprise workflow automation. Based in Coimbatore, Tamil Nadu, India.",
  },
};

export default function Page() {
  return (
    <PageShell>
      <style>{`.bottom-blur { display: none !important; }`}</style>
      <AboutPage />
    </PageShell>
  );
}
