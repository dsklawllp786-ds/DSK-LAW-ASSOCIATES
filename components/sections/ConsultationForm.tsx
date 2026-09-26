"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn, SectionHeading } from "@/components/ui/motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { sectionClass } from "@/lib/section-styles";
import { siteConfig } from "@/lib/site-config";
import { consultationSchema, type ConsultationInput } from "@/lib/validations";

export function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
  });

  const onSubmit = async (data: ConsultationInput) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/consultations", {
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
    <section id="consultation" className={sectionClass}>
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Book a Consultation"
          title="Schedule Your Legal Consultation"
          description="Optional request — name and phone are enough for a callback. Add details only if you want to."
        />

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <FadeIn className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Request Form</CardTitle>
              </CardHeader>
              <CardContent>
                {status === "success" ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-950">
                    <p className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Thank you! Your consultation request has been received.
                    </p>
                    <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                      We will contact you shortly. For urgent matters, please call or WhatsApp us.
                    </p>
                    <Button className="mt-4" onClick={() => setStatus("idle")}>
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input id="fullName" placeholder="Your full name" {...register("fullName")} />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">{errors.fullName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input id="phone" placeholder="+91 XXXXX XXXXX" {...register("phone")} />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input id="email" type="email" placeholder="your@email.com" {...register("email")} />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Practice area (optional)</Label>
                      <Controller
                        name="practiceArea"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Criminal or civil — if known" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="criminal">Criminal Law</SelectItem>
                              <SelectItem value="civil">Civil Law</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.practiceArea && (
                        <p className="text-sm text-destructive">{errors.practiceArea.message}</p>
                      )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input id="preferredDate" type="date" {...register("preferredDate")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Input id="preferredTime" placeholder="e.g. 10:00 AM" {...register("preferredTime")} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Brief note (optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Anything you would like us to know before we call..."
                        rows={4}
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    {status === "error" && (
                      <p className="text-sm text-destructive">{errorMessage}</p>
                    )}

                    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Consultation Request"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-2">
            <div className="space-y-6">
              <Card>
                <CardContent className="space-y-5 p-6">
                  <h3 className="font-heading text-xl font-semibold">Office Information</h3>
                  <div className="flex gap-3 text-sm">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <p className="text-muted-foreground">{siteConfig.address}</p>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Phone className="h-5 w-5 shrink-0 text-gold" />
                    <a href={`tel:${siteConfig.phone}`} className="hover:text-gold">
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Mail className="h-5 w-5 shrink-0 text-gold" />
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                      {siteConfig.email}
                    </a>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Clock className="h-5 w-5 shrink-0 text-gold" />
                    <p>{siteConfig.officeHours}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gold/20 bg-gold/5">
                <CardContent className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    For urgent matters outside office hours, please WhatsApp us. We respond as
                    promptly as possible to all inquiries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
