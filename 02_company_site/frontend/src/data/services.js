import {
  Globe,
  Bot,
  TrendingUp,
  Search,
  Smartphone,
  Puzzle,
  Bug,
  Video,
  Palette,
  Layout,
} from 'lucide-react';

/**
 * Central source-of-truth for all 10 Blitz Tech Hub services.
 * Used by both the Home page highlights and the full Services page grid.
 */
const services = [
  {
    id: 1,
    icon: Globe,
    title: 'Website Development',
    description:
      'Blazing-fast, SEO-ready websites built with modern frameworks — React, Next.js, and more. From landing pages to complex web apps.',
    gradient: 'from-primary to-accent',
    tag: 'Most Popular',
  },
  {
    id: 2,
    icon: Bot,
    title: 'AI Automation Solutions',
    description:
      'Integrate GPT-powered chatbots, workflow automation, and intelligent agents that save your team hundreds of hours every month.',
    gradient: 'from-purple-500 to-pink-500',
    tag: 'Trending',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Digital Marketing',
    description:
      'Result-driven campaigns across Google, Meta, and TikTok. We grow your brand, increase conversions, and maximize ROI.',
    gradient: 'from-orange-500 to-yellow-400',
  },
  {
    id: 4,
    icon: Search,
    title: 'SEO Optimization',
    description:
      'Rank higher on Google with technical SEO audits, content strategy, backlink building, and data-driven keyword targeting.',
    gradient: 'from-green-500 to-teal-400',
  },
  {
    id: 5,
    icon: Smartphone,
    title: 'App Development',
    description:
      'Cross-platform mobile and web apps built with React Native and Flutter — shipped fast with clean, maintainable code.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 6,
    icon: Puzzle,
    title: 'Chrome Extension Development',
    description:
      'Custom Manifest V3 Chrome extensions that automate browser workflows, scrape data, inject UI, and integrate with any API.',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 7,
    icon: Bug,
    title: 'Code Debugging & Optimization',
    description:
      'Performance profiling, bug hunting, and code refactoring across any stack. We make your existing codebase faster and cleaner.',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    id: 8,
    icon: Video,
    title: 'Video Editing',
    description:
      'Professional video production — YouTube content, ads, reels, and corporate videos. Color grading, motion graphics included.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 9,
    icon: Palette,
    title: 'Graphic Design',
    description:
      'Eye-catching visuals with Adobe Photoshop & Illustrator — logos, social media kits, brand identity, and marketing materials.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 10,
    icon: Layout,
    title: 'UI/UX Design',
    description:
      'User-centered design in Figma — wireframes, interactive prototypes, and polished high-fidelity designs that convert.',
    gradient: 'from-teal-500 to-cyan-400',
  },
];

export default services;
