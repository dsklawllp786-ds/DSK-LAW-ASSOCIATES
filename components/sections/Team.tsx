import Image from "next/image";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, SectionHeading } from "@/components/ui/motion";
import { teamMembers, siteConfig } from "@/lib/site-config";

export function Team() {
  const featured = teamMembers.find((m) => m.featured);
  const others = teamMembers.filter((m) => !m.featured);

  return (
    <section id="team" className="bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Our Team"
          title="Meet the Advocates"
          description="Experienced legal professionals committed to your case."
        />

        {featured && (
          <FadeIn className="mx-auto mb-10 max-w-2xl">
            <Card className="overflow-hidden border-gold/30 shadow-md">
              <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start sm:p-8">
                <div className="shrink-0 overflow-hidden rounded-xl border-2 border-gold/30 shadow-sm">
                  <Image
                    src={featured.image ?? siteConfig.ownerImage}
                    alt={featured.name}
                    width={140}
                    height={175}
                    className="h-[175px] w-[140px] object-cover object-top"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="inline-flex rounded-full bg-gold/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-gold">
                    Founder
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-bold">{featured.name}</h3>
                  <p className="mt-1 text-sm font-medium text-gold">{featured.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {featured.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        )}

        <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
          {others.map((member, index) => (
            <FadeIn key={member.name} delay={index * 0.1}>
              <Card className="h-full transition-all hover:border-gold/30 hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 dark:bg-muted">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gold" />
                    )}
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-gold">{member.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
