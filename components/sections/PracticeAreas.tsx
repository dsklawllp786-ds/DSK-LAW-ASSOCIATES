import { CheckCircle2, Landmark, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn, SectionHeading } from "@/components/ui/motion";
import { practiceAreas } from "@/lib/site-config";

const iconMap = {
  Scale: Scale,
  Landmark: Landmark,
};

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Practice Areas"
          title="Expertise in Criminal & Civil Law"
          description="Focused legal practice in the areas that matter most to our clients in Prayagraj."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {practiceAreas.map((area, index) => {
            const Icon = iconMap[area.icon as keyof typeof iconMap] ?? Scale;
            return (
              <FadeIn key={area.id} delay={index * 0.1}>
                <Card className="group h-full overflow-hidden border-border/60 transition-all hover:border-gold/40 hover:shadow-lg">
                  <CardHeader className="space-y-4 pb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">{area.title}</CardTitle>
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {area.services.map((service) => (
                        <li key={service} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
