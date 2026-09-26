import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-navy text-white dark:bg-background dark:text-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-md object-contain"
              />
              <div>
                <p className="font-heading text-xl font-bold">DSK Law Associates</p>
                <p className="text-sm text-white/70 dark:text-muted-foreground">
                  Prayagraj, Uttar Pradesh
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70 dark:text-muted-foreground">
              Trusted criminal and civil legal representation led by Adv. Diwan Saifullah Khan.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-gold dark:text-muted-foreground dark:hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Practice Areas</h3>
            <ul className="space-y-2 text-sm text-white/70 dark:text-muted-foreground">
              <li>Criminal Law</li>
              <li>Civil Law</li>
              <li>Bail Applications</li>
              <li>Property Disputes</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-white/70 dark:text-muted-foreground">
              <li>{siteConfig.address}</li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                  {siteConfig.email}
                </a>
              </li>
              <li>Office Hours: {siteConfig.officeHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 dark:border-border">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/60 dark:text-muted-foreground">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <p className="max-w-xl text-xs text-white/50 dark:text-muted-foreground">
              Disclaimer: This website is for informational purposes only and does not constitute
              legal advice. Consult an advocate for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
