"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn, SectionHeading } from "@/components/ui/motion";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/utils";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error ?? "Something went wrong");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to submit");
    }
  };

  return (
    <section id="contact" className="bg-muted/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Contact Us"
          title="Get in Touch"
          description="Visit our office in Prayagraj or reach out via phone, email, or WhatsApp."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <FadeIn>
            <div className="space-y-6">
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

              <Button asChild size="lg" className="w-full bg-[#25D366] hover:bg-[#20BD5A]">
                <a
                  href={getWhatsAppUrl(siteConfig.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Talk to Us on WhatsApp
                </a>
              </Button>

              <div className="overflow-hidden rounded-xl border border-border shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.456!2d81.784!3d25.435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI2JzA2LjAiTiA4McKwNDcnMDIuNCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
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
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {status === "success" ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950">
                    <p className="font-semibold text-green-800 dark:text-green-200">
                      Message sent successfully!
                    </p>
                    <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                      We will get back to you soon.
                    </p>
                    <Button className="mt-4" onClick={() => setStatus("idle")}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input id="contact-name" {...register("name")} />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Phone *</Label>
                        <Input id="contact-phone" {...register("phone")} />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" type="email" {...register("email")} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">Subject</Label>
                      <Input id="contact-subject" {...register("subject")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Message *</Label>
                      <Textarea id="contact-message" rows={4} {...register("message")} />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-destructive">{errorMessage}</p>
                    )}
                    <Button type="submit" disabled={status === "loading"}>
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
