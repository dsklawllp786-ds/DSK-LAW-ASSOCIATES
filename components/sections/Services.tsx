import { FadeIn, SectionHeading } from "@/components/ui/motion";
import { sectionClass } from "@/lib/section-styles";
import { services } from "@/lib/site-config";

export function Services() {
  return (
    <section id="services" className={sectionClass}>
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Our Services"
          title="How We Work With You"
          description="A clear, structured approach from your first consultation to case resolution."
        />

        <div className="relative">
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-gold via-gold/50 to-transparent md:block lg:left-1/2 lg:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {services.map((service, index) => (
              <FadeIn key={service.step} delay={index * 0.1}>
                <div
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="hidden md:absolute md:left-8 md:top-1/2 md:z-10 md:flex md:h-4 md:w-4 md:-translate-y-1/2 md:rounded-full md:border-4 md:border-background md:bg-gold lg:left-1/2 lg:-translate-x-1/2" />

                  <div className={`flex-1 ${index % 2 === 1 ? "lg:text-right" : ""}`}>
                    <div
                      className={`rounded-2xl border border-border bg-card p-6 shadow-card md:p-8 ${
                        index % 2 === 1 ? "lg:ml-auto" : "lg:mr-auto"
                      } max-w-lg`}
                    >
                      <span className="font-heading text-4xl font-bold text-gold/30">
                        {service.step}
                      </span>
                      <h3 className="mt-2 font-heading text-xl font-semibold md:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground">{service.description}</p>
                    </div>
                  </div>

                  <div className="hidden flex-1 lg:block" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
