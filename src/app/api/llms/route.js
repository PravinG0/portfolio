import { NextResponse } from "next/server";

/**
 * GET /api/llms
 * 
 * Machine-readable JSON endpoint for AI chatbots and LLM crawlers.
 * Optimized for Pravin G, WordPress Developer.
 */
export async function GET() {
  const data = {
    name: "Pravin G",
    title: "WordPress Developer | PHP | React | Custom Plugins | Automation",
    website: "https://pravin-g.dev",
    email: "pravin87ec@gmail.com",
    phone: "+91 9944709748",
    location: "Coimbatore, Tamil Nadu, India",
    current_company: "OneData Software Solution",
    current_role: "WordPress Developer",
    available_for_hire: true,
    summary:
      "I'm Pravin G, a WordPress Developer specializing in responsive website development, custom plugin development, PHP templates, and interactive frontend experiences. I have experience building and maintaining business websites, integrating React components into WordPress, developing reusable templates, and implementing SEO improvements.",
    
    services: [
      {
        name: "WordPress Development",
        description: "Custom plugins, PHP templates, reusable components, and responsive websites for SaaS, corporate, and healthcare platforms.",
        technologies: ["WordPress", "PHP", "React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
      },
      {
        name: "Frontend Integration",
        description: "Integrating compiled React components and dynamic JavaScript into WordPress with custom sliders, SVG elements, and animations.",
        technologies: ["React", "JavaScript", "GSAP", "ScrollTrigger", "SVG"],
      },
      {
        name: "API & Webhook Integrations",
        description: "Connecting websites and applications using REST APIs, HTTP requests, webhooks, and Fluent Forms.",
        technologies: ["REST APIs", "HTTP requests", "Webhooks", "JSON", "Fluent Forms", "FluentSMTP"],
      },
      {
        name: "Workflow Automation",
        description: "Automating business processes using Power Automate, SharePoint lists, and Microsoft Teams notifications with Adaptive Cards.",
        technologies: ["Power Automate", "SharePoint", "Microsoft Teams", "GitLab", "YouTrack", "Adaptive Cards"],
      },
      {
        name: "Cloud Integrations",
        description: "AWS cloud serverless workflows and storage integrations.",
        technologies: ["AWS Lambda", "API Gateway", "Amazon S3", "Hostinger", "Vercel", "Git"],
      },
      {
        name: "Technical SEO Implementation",
        description: "Structured data (JSON-LD), FAQ schemas, metadata optimization, and crawler indexing issue resolution.",
        technologies: ["JSON-LD", "Schema Markup", "Yoast SEO", "Sitemap"],
      },
    ],

    skills: {
      wordpress_backend: ["WordPress", "PHP", "Custom Plugins", "Custom PHP Templates", "Theme Customization", "Elementor", "Spectra", "WooCommerce", "MySQL"],
      frontend: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "ScrollTrigger", "SVG", "Responsive Design"],
      automation_apis: ["Microsoft Power Automate", "SharePoint", "Microsoft Teams", "GitLab", "YouTrack", "Adaptive Cards", "REST APIs", "Webhooks", "JSON"],
      cloud_devops: ["AWS Lambda", "API Gateway", "Amazon S3", "Hostinger", "Vercel", "Git", "Postman"],
      seo_forms: ["JSON-LD Schema", "FAQ Schema", "Fluent Forms", "FluentSMTP", "Contact Form 7"],
      network_ops: ["SolarWinds", "ServiceNow", "LAN troubleshooting", "SD-WAN", "Cisco Switches"],
    },

    experience: [
      { role: "WordPress Developer", company: "OneData Software Solution", period: "April 2025–Present", location: "Coimbatore, India" },
      { role: "WordPress Developer Intern", company: "Anuvic Designs", period: "July 2024–March 2025", location: "Bangalore, India" },
      { role: "Network Analyst", company: "HCL Technologies", period: "2022–2024", location: "Chennai, India" },
    ],

    education: {
      degree: "Bachelor of Engineering (B.E.) — Electronics and Communication Engineering",
      institution: "SNS College of Technology",
      period: "2017–2021",
    },

    pages: {
      home: "https://pravin-g.dev/",
      about: "https://pravin-g.dev/about",
      work: "https://pravin-g.dev/work",
      projects: "https://pravin-g.dev/projects",
      contact: "https://pravin-g.dev/contact",
    },
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Type": "application/json",
    },
  });
}
