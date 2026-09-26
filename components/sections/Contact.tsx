"use client";

import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, SectionHeading } from "@/components/ui/motion";
import { sectionClass } from "@/lib/section-styles";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" className={`bg-muted/40 ${sectionClass}`}>
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Contact Us"
          title="Get in Touch"
          description="Visit our chamber in Prayagraj, call us, or message on WhatsApp — no form required."
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeIn className="space-y-5">
            <Card>
              <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    content: siteConfig.address,
                    href: siteConfig.mapUrl,
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: siteConfig.phoneDisplay,
                    href: `tel:${siteConfig.phone}`,
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: siteConfig.email,
                    href: `mailto:${siteConfig.email}`,
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    content: siteConfig.officeHours,
                  },
                ].map(({ icon: Icon, title, content, href }) => (
                  <div key={title} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-gold" />
                      <h3 className="font-semibold">{title}</h3>
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target={title === "Address" ? "_blank" : undefined}
                        rel={title === "Address" ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground hover:text-gold"
                      >
                        {content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{content}</p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="flex-1 bg-[#25D366] hover:bg-[#20BD5A]">
                <a
                  href={getWhatsAppUrl(siteConfig.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1 border-gold/40">
                <Link href="#consultation">
                  Book Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="overflow-hidden rounded-xl border border-border shadow-card">
              <iframe
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DSK Law Associates Location"
              />
              <div className="border-t border-border bg-card p-3 text-center">
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gold hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="h-full border-gold/20">
              <CardContent className="flex h-full flex-col justify-center gap-4 p-8">
                <h3 className="font-heading text-xl font-semibold">Prefer a callback?</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Use the consultation form above when it suits you — only your{" "}
                  <strong className="font-medium text-foreground">name and phone</strong> are
                  required. Share case details if you wish; we will call you during office hours.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  For urgent matters, WhatsApp or call directly for the fastest response.
                </p>
                <Button asChild className="mt-2 w-full sm:w-auto">
                  <Link href="#consultation">Go to consultation form</Link>
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
