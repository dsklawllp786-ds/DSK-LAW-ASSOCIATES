import Image from "next/image";
import { FadeIn, SectionHeading } from "@/components/ui/motion";
import { siteConfig, values } from "@/lib/site-config";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="About Us"
          title="A Trusted Name in Prayagraj Legal Practice"
          description="DSK Law Associates is dedicated to providing clear, effective legal counsel in criminal and civil matters across Prayagraj and surrounding areas."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="right">
            <div className="relative mx-auto w-full max-w-sm sm:max-w-md">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-2xl border-2 border-gold/30" />
              <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-muted/20 shadow-card">
                <Image
                  src={siteConfig.ownerImage}
                  alt={siteConfig.owner}
                  width={400}
                  height={400}
                  className="aspect-square w-full object-contain"
                />
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {siteConfig.owner}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.15}>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Founded and led by <strong className="text-foreground">{siteConfig.owner}</strong>,
                DSK Law Associates brings years of courtroom experience and a client-first approach
                to every matter — whether it involves criminal defence, bail applications, property
                disputes, or civil litigation.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                We believe every client deserves honest advice, thorough preparation, and strong
                representation. Our team works diligently to protect your rights and pursue the best
                possible outcome at every stage of your case.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <h3 className="font-heading text-lg font-semibold text-gold">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
