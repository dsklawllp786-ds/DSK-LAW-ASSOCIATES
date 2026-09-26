"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, SectionHeading } from "@/components/ui/motion";
import { sectionClass } from "@/lib/section-styles";
import { testimonials } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section id="testimonials" className={sectionClass}>
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Testimonials"
          title="What Our Clients Say"
          description="Placeholder testimonials — replace with actual client feedback when available."
        />

        <FadeIn>
          <div className="relative mx-auto max-w-3xl">
            <Card className="overflow-hidden border-border/60">
              <CardContent className="p-8 md:p-12">
                <Quote className="mb-6 h-10 w-10 text-gold/40" />
                <blockquote className="font-heading text-xl leading-relaxed md:text-2xl">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{testimonials[active].name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[active].role}
                    </p>
                    <div className="mt-2 flex gap-1">
                      {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prev} aria-label="Previous">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={next} aria-label="Next">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === active ? "w-8 bg-gold" : "w-2 bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
