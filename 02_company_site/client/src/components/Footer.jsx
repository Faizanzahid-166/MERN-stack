// src/components/Footer.jsx
// ✅ import Link from 'next/link'  (was react-router-dom)
// ✅ External URLs use plain <a> tags (they're not internal routes)
// ✅ No react-router-dom imports remain

import Link from 'next/link';
import { Zap, Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook, Youtube, Globe } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'Home',     href: '/' },
    { label: 'About',    href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Career',   href: '/career' },
    { label: 'Contact',  href: '/contact' },
  ],
  Services: [
    { label: 'Web Development',   href: '/services' },
    { label: 'AI Automation',     href: '/services' },
    { label: 'Digital Marketing', href: '/services' },
    { label: 'SEO Optimization',  href: '/services' },
    { label: 'App Development',   href: '/services' },
    { label: 'UI/UX Design',      href: '/services' },
  ],
};

const socials = [
  { icon: Twitter,  href: 'https://x.com/BlitzTechHub',                              label: 'Twitter'   },
  { icon: Linkedin, href: 'https://linkedin.com/company/blitztechhub',               label: 'LinkedIn'  },
  { icon: Github,   href: 'https://github.com/Faizanzahid-166',                      label: 'GitHub'    },
  { icon: Facebook, href: 'https://www.facebook.com/BltitzProgrammingHub',           label: 'Facebook'  },
  { icon: Youtube,  href: 'https://www.youtube.com/@ProgrammingHub-7107/playlists',  label: 'YouTube'   },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E3A] bg-[#080810]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="gradient-text">Blitz</span>
                <span className="text-white"> Tech Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your one-stop solution for digital transformation. We build, automate, and scale
              your digital presence with cutting-edge technology.
            </p>

            {/* Socials — external links, use <a> not <Link> */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[#1E1E3A] flex items-center justify-center
                             text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Mail size={15} className="mt-0.5 text-primary shrink-0" />
                <span>blitztechhub@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <Phone size={15} className="mt-0.5 text-primary shrink-0" />
                <span>+92 331 9887683</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin size={15} className="mt-0.5 text-primary shrink-0" />
                <span>Islamabad, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1E1E3A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Blitz Tech Hub. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-2">
            <Globe size={15} />
            {/* External URL — use <a> with target="_blank" */}
            <a
              href="https://marked-guts.blitz-box.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Our Personal Portfolio
            </a>
          </p>
          <p className="text-gray-600 text-xs">
            Built with ⚡ by the Blitz Tech Hub team
          </p>
        </div>
      </div>
    </footer>
  );
}
