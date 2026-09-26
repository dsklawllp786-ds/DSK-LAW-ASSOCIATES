import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn, SectionHeading } from "@/components/ui/motion";
import { sectionClass } from "@/lib/section-styles";
import { faqs } from "@/lib/site-config";

export function FAQs() {
  return (
    <section id="faqs" className={sectionClass}>
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="FAQs"
          title="Frequently Asked Questions"
          description="Common questions about consultations, fees, and our legal services."
        />

        <FadeIn className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
