import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(
    message ?? "Hello, I would like to inquire about legal services at DSK Law Associates."
  );
  return `https://wa.me/919415445087?text=${text}`;
}

/** Format phone for display: +91 62844 96165 */
export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const local = digits.startsWith("91") && digits.length >= 12 ? digits.slice(2) : digits;

  if (local.length === 10) {
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }

  return phone.startsWith("+") ? phone : `+${digits}`;
}

export function formatPhoneTel(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.startsWith("91")) return `+${digits}`;
  return phone.startsWith("+") ? phone : `+${digits}`;
}

const practiceAreaLabels: Record<string, string> = {
  criminal: "Criminal Law",
  civil: "Civil Law",
};

export function formatPracticeArea(area: string): string {
  return practiceAreaLabels[area.toLowerCase()] ?? area;
}

const statusLabels: Record<string, string> = {
  new: "New Inquiry",
  contacted: "Contacted",
  closed: "Closed",
};

export function formatConsultationStatus(status: string): string {
  return statusLabels[status] ?? status;
}

export function formatDateTime(dateStr: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateStr));
}

export function formatPreferredSlot(
  dateStr: string | null,
  timeStr: string | null
): string | null {
  if (!dateStr && !timeStr) return null;

  let datePart = "";
  if (dateStr) {
    datePart = new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  }

  if (datePart && timeStr) return `${datePart} · ${timeStr}`;
  return datePart || timeStr;
}
