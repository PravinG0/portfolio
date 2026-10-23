// ─────────────────────────────────────────────
//  ABOUT SECTION — Pravin G Portfolio
// ─────────────────────────────────────────────

import {
  SiWordpress, SiPhp, SiReact, SiJavascript,
  SiHtml5, SiCss, SiTailwindcss, SiMysql,
  SiGit, SiGitlab, SiHostinger, SiVercel,
  SiElementor, SiWoocommerce, SiFigma, SiPostman,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import {
  TbApi, TbPlug, TbNetwork, TbServer,
  TbCloudNetwork, TbTransform, TbRobot, TbSchema,
  TbBrandSpeedtest
} from "react-icons/tb";

export const SECTION = {
  label: "WordPress Developer & Technical Integrations",
};

export const HEADING = {
  line1: "Code.",
  line2: "Systems.",
  line3: "Automation.",   // ghost (outline) style
};

// *word* = highlighted/bold in BlurText
export const BIO = [
  "I'm *Pravin G*, a *WordPress Developer* specializing in responsive website development, *custom plugin development*, *PHP templates*, and *interactive frontend experiences*.",
  "I have experience building and maintaining business and SaaS websites, integrating *React components into WordPress*, developing reusable templates, and implementing *structured SEO improvements*.",
  "My work extends beyond traditional web development into *REST APIs*, *webhooks*, *Microsoft Power Automate*, *SharePoint*, *Microsoft Teams*, *GitLab*, *YouTrack*, and *AWS integrations*.",
  "I enjoy solving technical challenges, developing *reusable solutions*, improving website performance and functionality, and *connecting different business systems through automation*.",
  "My previous background in *network operations* at *HCL Technologies* strengthened my *troubleshooting*, system monitoring, and problem-solving skills, which I now apply directly to full-lifecycle web development and cloud integrations.",
  "Education: Bachelor of Engineering in *Electronics and Communication Engineering* from *SNS College of Technology* (2017–2021). Based in *Coimbatore, Tamil Nadu, India*."
];

export const RESUME_URL = "/resume.pdf";

export const TECH = [
  { name: "WordPress",         icon: SiWordpress },
  { name: "PHP",               icon: SiPhp },
  { name: "React",             icon: SiReact },
  { name: "JavaScript",        icon: SiJavascript },
  { name: "HTML5",             icon: SiHtml5 },
  { name: "CSS3",              icon: SiCss },
  { name: "Tailwind CSS",      icon: SiTailwindcss },
  { name: "Custom Plugins",    icon: TbPlug },
  { name: "PHP Templates",     icon: TbServer },
  { name: "REST APIs & JSON",  icon: TbApi },
  { name: "Webhooks",          icon: TbTransform },
  { name: "MySQL",             icon: SiMysql },
  { name: "AWS (Lambda/S3)",   icon: FaAws },
  { name: "Git",               icon: SiGit },
  { name: "Hostinger",         icon: SiHostinger },
  { name: "Vercel",            icon: SiVercel },
  { name: "Postman",           icon: SiPostman },
];

export const CREATIVE = [
  { name: "Power Automate",    icon: TbRobot },
  { name: "SharePoint Lists",  icon: TbCloudNetwork },
  { name: "Microsoft Teams",   icon: TbNetwork },
  { name: "GitLab",            icon: SiGitlab },
  { name: "YouTrack",          icon: TbServer },
  { name: "Elementor",         icon: SiElementor },
  { name: "Spectra",           icon: SiWordpress },
  { name: "WooCommerce",       icon: SiWoocommerce },
  { name: "Fluent Forms",      icon: TbPlug },
  { name: "FluentSMTP",        icon: TbApi },
  { name: "JSON-LD Schema",    icon: TbSchema },
  { name: "SEO Optimization",  icon: TbBrandSpeedtest },
  { name: "Figma",             icon: SiFigma },
  { name: "SolarWinds",        icon: TbNetwork },
  { name: "ServiceNow",        icon: TbServer },
];

export const EXPERIENCE = [
  {
    role: "WordPress Developer",
    company: "OneData Software Solution",
    period: "April 2025 – Present · Coimbatore, India",
    desc: "WordPress development, custom plugins, PHP templates, React integrations, SEO, Hostinger deployments, and Power Automate workflows."
  },
  {
    role: "WordPress Developer Intern",
    company: "Anuvic Designs",
    period: "July 2024 – March 2025 · Bangalore, India",
    desc: "Responsive WordPress websites, cross-browser compatibility, e-commerce stores, buttons, forms, and client delivery."
  },
  {
    role: "Network Analyst",
    company: "HCL Technologies",
    period: "2022 – 2024 · Chennai, India",
    desc: "Global network monitoring, proactive troubleshooting, SolarWinds, ServiceNow, SD-WAN, and Cisco switch deployments."
  },
  {
    role: "B.E. Electronics & Communication",
    company: "SNS College of Technology",
    period: "2017 – 2021 · Coimbatore, India",
    desc: "Graduated in Electronics and Communication Engineering with strong analytical and engineering foundation."
  }
];

export const WHAT_I_DO = [
  {
    title: "WordPress Development",
    desc: "Custom plugins, reusable PHP templates, tailored themes, and responsive website architecture for SaaS, corporate, and healthcare platforms."
  },
  {
    title: "Frontend & React Integration",
    desc: "Integrating compiled React components and dynamic JavaScript into WordPress with custom sliders, SVG animations, and interactive interfaces."
  },
  {
    title: "API & Webhook Integrations",
    desc: "Connecting websites and external platforms using REST APIs, HTTP requests, webhooks, Fluent Forms, and automated data pipelines."
  },
  {
    title: "Enterprise Workflow Automation",
    desc: "Automating business operations using Power Automate, SharePoint lists, GitLab, YouTrack, Adaptive Cards, and Microsoft Teams notifications."
  },
  {
    title: "Technical SEO & Optimization",
    desc: "JSON-LD structured data, FAQ schema, metadata optimization, URL slugs, image loading fixes, and search engine crawler indexing troubleshooting."
  }
];
