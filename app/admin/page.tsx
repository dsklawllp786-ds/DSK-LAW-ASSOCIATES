"use client";

import {
  Calendar,
  ChevronDown,
  Clock,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Scale,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";
import {
  cn,
  formatConsultationStatus,
  formatDateTime,
  formatPhoneDisplay,
  formatPhoneTel,
  formatPracticeArea,
  formatPreferredSlot,
} from "@/lib/utils";

interface Consultation {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  practiceArea: string;
  preferredDate: string | null;
  preferredTime: string | null;
  message: string;
  status: string;
  createdAt: string;
}

type FilterTab = "all" | "new" | "contacted" | "closed";

const statusStyles: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 ring-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:ring-blue-900",
  contacted:
    "bg-amber-100 text-amber-900 ring-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:ring-amber-900",
  closed:
    "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:ring-emerald-900",
};

const filterTabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "closed", label: "Closed" },
];

function truncateMessage(message: string, max = 72) {
  if (message.length <= max) return message;
  return `${message.slice(0, max).trim()}…`;
}

function sortConsultations(list: Consultation[]) {
  const statusOrder = { new: 0, contacted: 1, closed: 2 };
  return [...list].sort((a, b) => {
    const statusDiff =
      (statusOrder[a.status as keyof typeof statusOrder] ?? 9) -
      (statusOrder[b.status as keyof typeof statusOrder] ?? 9);
    if (statusDiff !== 0) return statusDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function ConsultationAccordionItem({
  consultation,
  isExpanded,
  onToggle,
  onStatusChange,
}: {
  consultation: Consultation;
  isExpanded: boolean;
  onToggle: () => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  const preferredSlot = formatPreferredSlot(
    consultation.preferredDate,
    consultation.preferredTime
  );
  const phoneDisplay = formatPhoneDisplay(consultation.phone);
  const phoneTel = formatPhoneTel(consultation.phone);
  const receivedShort = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(consultation.createdAt));

  return (
    <Card
      className={cn(
        "overflow-hidden border-border/80 shadow-sm transition-shadow",
        consultation.status === "new" && "border-l-4 border-l-blue-500",
        isExpanded && "ring-1 ring-gold/20"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-4 text-left transition-colors hover:bg-muted/40 sm:px-6"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start gap-3">
          <ChevronDown
            className={cn(
              "mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform",
              isExpanded && "rotate-180"
            )}
          />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-heading text-lg font-semibold">{consultation.fullName}</h3>
                <span className="hidden text-sm text-muted-foreground sm:inline">·</span>
                <span className="text-sm font-medium text-foreground/80">
                  {formatPracticeArea(consultation.practiceArea)}
                </span>
              </div>
              <span
                className={cn(
                  "inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset",
                  statusStyles[consultation.status]
                )}
              >
                {formatConsultationStatus(consultation.status)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                {phoneDisplay}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {receivedShort}
              </span>
            </div>
            {!isExpanded && (
              <p className="text-sm italic text-muted-foreground">
                &ldquo;{truncateMessage(consultation.message)}&rdquo;
              </p>
            )}
          </div>
        </div>
      </button>

      {isExpanded && (
        <CardContent className="space-y-6 border-t border-border px-4 pb-6 pt-2 sm:px-6">
          <p className="text-xs text-muted-foreground">
            Received {formatDateTime(consultation.createdAt)}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Client Contact
              </p>
              <div className="space-y-2 rounded-xl border border-border bg-card p-4">
                <a
                  href={`tel:${phoneTel}`}
                  className="flex items-center gap-3 text-sm transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  <span className="font-medium">{phoneDisplay}</span>
                </a>
                {consultation.email ? (
                  <a
                    href={`mailto:${consultation.email}`}
                    className="flex items-center gap-3 text-sm transition-colors hover:text-gold"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-gold" />
                    <span className="break-all">{consultation.email}</span>
                  </a>
                ) : (
                  <p className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    Email not provided
                  </p>
                )}
                <a
                  href={`https://wa.me/${phoneTel.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hello ${consultation.fullName}, regarding your consultation request at DSK Law Associates.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#25D366] hover:underline"
                >
                  Reply on WhatsApp
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Matter Details
              </p>
              <div className="space-y-3 rounded-xl border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <Scale className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs text-muted-foreground">Practice Area</p>
                    <p className="font-medium">{formatPracticeArea(consultation.practiceArea)}</p>
                  </div>
                </div>
                {preferredSlot ? (
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">Preferred Consultation</p>
                      <p className="font-medium">{preferredSlot}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>No preferred date/time specified</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
              <MessageSquare className="h-3.5 w-3.5" />
              Brief of Matter
            </p>
            <blockquote className="rounded-xl border-l-4 border-gold/50 bg-muted/40 px-5 py-4 text-sm leading-relaxed text-foreground">
              {consultation.message}
            </blockquote>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">Update inquiry status</p>
            <div className="flex flex-wrap gap-2">
              {(["new", "contacted", "closed"] as const).map((s) => (
                <Button
                  key={s}
                  variant={consultation.status === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => onStatusChange(consultation.id, s)}
                >
                  {formatConsultationStatus(s)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [tabInitialized, setTabInitialized] = useState(false);

  const counts = useMemo(
    () => ({
      all: consultations.length,
      new: consultations.filter((c) => c.status === "new").length,
      contacted: consultations.filter((c) => c.status === "contacted").length,
      closed: consultations.filter((c) => c.status === "closed").length,
    }),
    [consultations]
  );

  useEffect(() => {
    if (!tabInitialized && consultations.length > 0) {
      setActiveTab(counts.new > 0 ? "new" : "all");
      setTabInitialized(true);
    }
  }, [consultations, counts.new, tabInitialized]);

  const filteredConsultations = useMemo(() => {
    const filtered =
      activeTab === "all"
        ? consultations
        : consultations.filter((c) => c.status === activeTab);
    return sortConsultations(filtered);
  }, [consultations, activeTab]);

  const fetchConsultations = async (authToken: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/consultations", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!res.ok) throw new Error("Invalid password or unauthorized");

      const data = await res.json();
      setConsultations(data.consultations);
      setToken(authToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchConsultations(password);
  };

  const updateStatus = async (id: string, status: string) => {
    if (!token) return;

    const res = await fetch(`/api/admin/consultations/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
              <Lock className="h-6 w-6 text-gold" />
            </div>
            <CardTitle className="font-heading">Admin Dashboard</CardTitle>
            <p className="text-sm text-muted-foreground">
              {siteConfig.name} — Consultation Requests
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-gold">
              {siteConfig.name}
            </p>
            <h1 className="font-heading text-3xl font-bold">Consultation Inquiries</h1>
            <p className="mt-1 text-muted-foreground">
              {counts.all} total enquiry{counts.all !== 1 ? "ies" : ""}
            </p>
          </div>
          <Button variant="outline" onClick={() => fetchConsultations(token)}>
            Refresh
          </Button>
        </div>

        {consultations.length > 0 && (
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-navy text-white dark:bg-gold dark:text-navy"
                    : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    activeTab === tab.id
                      ? "bg-white/20 dark:bg-navy/20"
                      : "bg-muted text-foreground"
                  )}
                >
                  {counts[tab.id]}
                </span>
              </button>
            ))}
          </div>
        )}

        {consultations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No consultation requests yet.
            </CardContent>
          </Card>
        ) : filteredConsultations.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No {activeTab === "all" ? "" : formatConsultationStatus(activeTab).toLowerCase()}{" "}
              enquiries in this view.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredConsultations.map((c) => (
              <ConsultationAccordionItem
                key={c.id}
                consultation={c}
                isExpanded={expandedIds.has(c.id)}
                onToggle={() => toggleExpanded(c.id)}
                onStatusChange={updateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
