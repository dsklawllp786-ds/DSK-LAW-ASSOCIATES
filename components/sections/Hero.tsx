"use client";

import { ArrowRight, MessageCircle, Shield, Scale, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";

const trustBadges = [
  { icon: Scale, label: "Advocate-Led Practice" },
  { icon: Shield, label: "Confidential Consultations" },
  { icon: Clock, label: "Mon – Sat Availability" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-24 md:pt-28"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-background to-background dark:from-navy-dark dark:via-background dark:to-background" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-navy/5 blur-3xl dark:bg-gold/5" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B1F3A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto flex min-h-[calc(100vh-6rem)] flex-col items-center gap-10 px-4 pb-16 md:px-6 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1 space-y-6 text-center lg:max-w-xl lg:text-left xl:max-w-2xl">
          <FadeIn>
            <p className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              Criminal & Civil Law · Prayagraj
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.15] xl:text-5xl">
              Experienced Legal{" "}
              <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                Representation
              </span>{" "}
              in Prayagraj
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-lg text-base text-muted-foreground md:text-lg lg:mx-0">
              Criminal and civil matters handled with integrity, confidentiality, and dedication
              by {siteConfig.owner} and the DSK Law Associates team.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg">
                <Link href="#consultation">
                  Book Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gold/40">
                <a
                  href={getWhatsAppUrl(siteConfig.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk on WhatsApp
                </a>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-gold" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} direction="left" className="relative w-full flex-1 lg:flex-[1.15]">
          <div className="relative mx-auto w-full max-w-lg lg:ml-auto lg:max-w-xl xl:max-w-2xl">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-gold/20 to-navy/10 blur-xl" />
            <div className="relative overflow-hidden rounded-2xl border-2 border-gold/30 shadow-xl">
              <Image
                src={siteConfig.chamberImage}
                alt="DSK Law Associates chamber, Prayagraj"
                width={720}
                height={480}
                className="aspect-[3/2] w-full object-cover object-center"
                priority
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              DSK Law Associates chamber · Prayagraj
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
