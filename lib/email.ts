import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const notificationEmail =
  process.env.NOTIFICATION_EMAIL ?? "ds9500068@gmail.com";

export async function sendConsultationEmail(data: {
  fullName: string;
  phone: string;
  email?: string;
  practiceArea: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
}) {
  const subject = `New Consultation Request — ${data.fullName}`;
  const html = `
    <h2>New Consultation Request</h2>
    <p><strong>Name:</strong> ${data.fullName}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
    <p><strong>Practice Area:</strong> ${data.practiceArea}</p>
    <p><strong>Preferred Date:</strong> ${data.preferredDate || "Not specified"}</p>
    <p><strong>Preferred Time:</strong> ${data.preferredTime || "Not specified"}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;

  if (!resend) {
    console.log("[Email] Resend not configured. Consultation notification:", data);
    return { success: true, mock: true };
  }

  await resend.emails.send({
    from: "DSK Law Associates <onboarding@resend.dev>",
    to: notificationEmail,
    subject,
    html,
  });

  return { success: true };
}

export async function sendContactEmail(data: {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}) {
  const subject = `New Contact Message — ${data.name}`;
  const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.email || "Not provided"}</p>
    <p><strong>Subject:</strong> ${data.subject || "General inquiry"}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;

  if (!resend) {
    console.log("[Email] Resend not configured. Contact notification:", data);
    return { success: true, mock: true };
  }

  await resend.emails.send({
    from: "DSK Law Associates <onboarding@resend.dev>",
    to: notificationEmail,
    subject,
    html,
  });

  return { success: true };
}
