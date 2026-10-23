import { FALLBACK_PROJECTS } from "@/app/work/content";
import { supabase } from "@/lib/supabase";

const BASE = "https://pravin-g.dev";

export default async function sitemap() {
  const staticPages = [
    { url: BASE,                       lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE}/projects`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE}/work`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE}/about`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8  },
    { url: `${BASE}/contact`,          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.75 },
  ];

  let projectPages = [];

  if (supabase) {
    try {
      const { data: projects } = await supabase
        .from("works")
        .select("id, updated_at")
        .order("created_at", { ascending: false });

      if (projects && projects.length > 0) {
        projectPages = projects.map((p) => ({
          url: `${BASE}/project/${p.id}`,
          lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        }));
      }
    } catch {
      // ignore
    }
  }

  if (projectPages.length === 0) {
    projectPages = FALLBACK_PROJECTS.map((p) => ({
      url: `${BASE}/project/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  }

  return [...staticPages, ...projectPages];
}
