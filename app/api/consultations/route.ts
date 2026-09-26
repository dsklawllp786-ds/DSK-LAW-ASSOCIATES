import { NextResponse } from "next/server";
import { sendConsultationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { consultationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = consultationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const practiceArea = data.practiceArea ?? "unspecified";
    const message = data.message?.trim() || "No additional details provided.";

    const consultation = await prisma.consultation.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        practiceArea,
        preferredDate: data.preferredDate ? new Date(data.preferredDate) : null,
        preferredTime: data.preferredTime || null,
        message,
      },
    });

    await sendConsultationEmail({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      practiceArea,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      message,
    });

    return NextResponse.json({ success: true, id: consultation.id });
  } catch (error) {
    console.error("Consultation submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit consultation request. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
