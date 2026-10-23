import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import TrackVisit from "@/components/TrackVisit";
import { Analytics } from "@vercel/analytics/next";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap"
});

const BASE = "https://pravin-g.dev";

export const viewport = {
  themeColor: "#ff6b1a",
};

export const metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: "Pravin G — WordPress Developer | PHP, React, Custom Plugins & Automation",
    template: "%s — Pravin G | WordPress Developer",
  },
  description:
    "I'm Pravin G, a WordPress Developer specializing in responsive website development, custom plugin development, PHP templates, React frontend integrations, and enterprise workflow automation.",
  keywords: [
    "WordPress Developer", "PHP Developer", "React Developer",
    "Custom WordPress Plugins", "Custom PHP Templates", "Frontend Integration",
    "Power Automate", "SharePoint Automation", "Microsoft Teams Integration",
    "AWS Lambda", "REST APIs", "Fluent Forms", "SEO Specialist",
    "WordPress Developer Coimbatore", "Full Stack Developer India"
  ],
  authors: [{ name: "Pravin G", url: BASE }],
  creator: "Pravin G",
  publisher: "Pravin G",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: "Pravin G — WordPress Developer & Technical Integrations",
    title: "Pravin G — WordPress Developer | PHP, React, Custom Plugins & Automation",
    description: "WordPress Developer specializing in custom plugins, PHP templates, React integrations, REST APIs, and automated business workflows.",
    images: [{
      url: "/photo/pravin.jpg",
      width: 1200,
      height: 630,
      alt: "Pravin G — WordPress Developer",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pravin G — WordPress Developer | PHP, React, Custom Plugins & Automation",
    description: "WordPress Developer specializing in custom plugins, PHP templates, React integrations, REST APIs, and automated business workflows.",
    images: ["/photo/pravin.jpg"],
    creator: "@pravin_g",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/photo/favicon.png", type: "image/png" },
    ],
    apple: "/photo/favicon.png",
    shortcut: "/photo/favicon.png",
  },

  manifest: "/manifest.json",

  alternates: { canonical: BASE },

  category: "portfolio",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      "name": "Pravin G",
      "url": BASE,
      "jobTitle": "WordPress Developer",
      "telephone": "+91-9944709748",
      "email": "pravin87ec@gmail.com",
      "description": "WordPress Developer specializing in responsive website development, custom plugin development, PHP templates, React frontend integrations, and workflow automation.",
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "SNS College of Technology",
        "sameAs": "https://snsct.org/"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "OneData Software Solution",
        "location": "Coimbatore, Tamil Nadu, India"
      },
      "knowsAbout": [
        "WordPress", "PHP", "Custom WordPress Plugins", "React", "JavaScript",
        "HTML5", "CSS3", "REST APIs", "Webhooks", "JSON", "Power Automate",
        "SharePoint", "Microsoft Teams", "GitLab", "YouTrack", "AWS Lambda",
        "API Gateway", "Amazon S3", "Fluent Forms", "FluentSMTP", "Yoast SEO",
        "JSON-LD", "Schema Markup", "Elementor", "Spectra", "SolarWinds", "ServiceNow"
      ],
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "WordPress Developer",
          "occupationLocation": { "@type": "City", "name": "Coimbatore, India" },
          "skills": "WordPress, PHP, React, Custom Plugins, REST APIs, Power Automate, AWS"
        },
        {
          "@type": "Occupation",
          "name": "WordPress Developer Intern",
          "occupationLocation": { "@type": "City", "name": "Bangalore, India" },
          "skills": "WordPress, Responsive Web Design, Elementor, PHP, CSS"
        },
        {
          "@type": "Occupation",
          "name": "Network Analyst",
          "occupationLocation": { "@type": "City", "name": "Chennai, India" },
          "skills": "SolarWinds, ServiceNow, LAN troubleshooting, SD-WAN, Cisco Switches"
        }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom WordPress & Plugin Development",
            "description": "Custom WordPress plugins, tailored PHP templates, and responsive websites for SaaS, corporate, and healthcare platforms."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "React & Frontend Integration",
            "description": "Integrating compiled React components and dynamic JavaScript into WordPress with smooth interactive experiences."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Workflow Automation & System Integrations",
            "description": "Connecting websites, SharePoint, GitLab, YouTrack, Microsoft Teams, and AWS Lambda using Power Automate and webhooks."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technical SEO & Schema Optimization",
            "description": "Structured data (JSON-LD), FAQ schemas, metadata optimization, and crawler indexing issue resolution."
          }
        }
      ],
      "sameAs": [],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE}/#localbusiness`,
      "name": "Pravin G — WordPress Developer",
      "image": `${BASE}/photo/pravin.jpg`,
      "url": BASE,
      "telephone": "+91-9944709748",
      "email": "pravin87ec@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "priceRange": "$$",
      "description": "WordPress Developer & Technical Solutions specialist based in Coimbatore, Tamil Nadu, India.",
      "founder": { "@id": `${BASE}/#person` }
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      "url": BASE,
      "name": "Pravin G — WordPress Developer Portfolio",
      "description": "Portfolio of Pravin G, showcasing custom WordPress development, PHP templates, React integrations, and workflow automation.",
      "publisher": { "@id": `${BASE}/#person` },
      "inLanguage": "en-US",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Pravin G provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pravin G provides custom WordPress plugin development, reusable PHP templates, React-to-WordPress frontend integrations, enterprise workflow automation (Power Automate, SharePoint, MS Teams), cloud integrations (AWS Lambda, S3), and technical SEO optimization."
          }
        },
        {
          "@type": "Question",
          "name": "What companies has Pravin G worked with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pravin G currently works as a WordPress Developer at OneData Software Solution (Coimbatore). Previously, he was a WordPress Developer Intern at Anuvic Designs (Bangalore) and a Network Analyst at HCL Technologies (Chennai)."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact Pravin G for web development projects?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach Pravin G directly via email at pravin87ec@gmail.com or by phone/WhatsApp at +91 9944709748. He is based in Coimbatore, Tamil Nadu, India and available for development opportunities."
          }
        },
        {
          "@type": "Question",
          "name": "What is Pravin G's educational background?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pravin G holds a Bachelor of Engineering (B.E.) in Electronics and Communication Engineering from SNS College of Technology (2017–2021)."
          }
        }
      ]
    }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Resource hints */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://ip-api.com" />

        {/* Structured Data for Google + AI bots */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* LLMs.txt discovery */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site info" />

        {/* Custom Search/Keywords XML index for AEO */}
        <link rel="search" type="application/xml" href="/searchwords.xml" title="Search Keywords" />
      </head>
      <body>
        <TrackVisit />
        <div className="bottom-blur" aria-hidden="true" />
        {children}
        <Analytics />
        <NewsletterPopup />
      </body>
    </html>
  );
}
