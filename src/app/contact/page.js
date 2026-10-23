import PageShell from "@/components/PageShell";
import ContactPage from "@/views/contact";

export const metadata = {
  title:       "Contact Pravin G — WordPress Developer & Technical Integrations",
  description: "Get in touch with Pravin G for WordPress website development, custom plugin creation, PHP templates, React integrations, and workflow automation. Based in Coimbatore, Tamil Nadu, India.",
  keywords:    ["hire WordPress developer", "contact Pravin G", "WordPress developer Coimbatore", "hire PHP developer", "freelance automation developer"],
  alternates:  { canonical: "https://pravin-g.dev/contact" },
  openGraph: {
    title: "Contact Pravin G — WordPress Developer & Technical Integrations",
    description: "Contact Pravin G for WordPress development, custom plugins, React integrations, and Power Automate workflows. Available for development projects and opportunities.",
  },
};

export default function Page() {
  return (
    <PageShell>
      <ContactPage />
    </PageShell>
  );
}
