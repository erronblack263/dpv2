"use client";

import { useState, useEffect } from "react";
import { X, Send, Sparkles, Mail, CheckCircle2, Lock } from "lucide-react";

export function openContactDrawer() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-contact-drawer"));
  }
}

type Status = "idle" | "sending" | "sent" | "error";

export function ContactDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
      setSubmitted(false);
      setStatus("idle");
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("open-contact-drawer", handleOpen);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-contact-drawer", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.subject
            ? `Subject: ${formData.subject}\n\n${formData.message}`
            : formData.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setStatus("idle");
          setIsOpen(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      } else {
        // Fallback to mailto if API key is not set
        const mailtoSubject = encodeURIComponent(
          formData.subject ||
            `Message from ${formData.name || "Portfolio Visitor"}`,
        );
        const mailtoBody = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
        );
        window.location.href = `mailto:musonzahw@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        setStatus("sent");
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setStatus("idle");
          setIsOpen(false);
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 3000);
      }
    } catch {
      const mailtoSubject = encodeURIComponent(
        formData.subject ||
          `Message from ${formData.name || "Portfolio Visitor"}`,
      );
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      );
      window.location.href = `mailto:musonzahw@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      setStatus("sent");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setStatus("idle");
        setIsOpen(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer panel */}
        <div className="w-screen max-w-md bg-background/95 dark:bg-[#090a14]/95 backdrop-blur-2xl border-l border-border dark:border-white/10 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 text-foreground">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-border/60 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-500">
                  <Sparkles className="size-4 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight">
                    Let&apos;s Talk
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Send a direct message to Witness
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Close drawer"
              >
                <X className="size-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                <div className="size-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="size-6" />
                </div>
                <h3 className="text-lg font-bold">Message Sent!</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Thank you for reaching out! Your message has been sent to{" "}
                  <strong>musonzahw@gmail.com</strong>. Witness will get back to
                  you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col gap-4"
              >
                {/* Pre-filled Recipient Field */}
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    To (Recipient)
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-border/80 dark:border-white/10 bg-muted/50 dark:bg-white/5 px-3.5 py-2 text-xs font-medium text-foreground">
                    <Mail className="size-3.5 text-violet-500 shrink-0" />
                    <span className="font-semibold text-violet-600 dark:text-violet-400">
                      musonzahw@gmail.com
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                      <Lock className="size-3" /> Pre-filled
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Alex Smith"
                    className="w-full rounded-xl border border-border/80 dark:border-white/10 bg-card dark:bg-white/5 px-3.5 py-2 text-xs font-medium text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="alex@example.com"
                    className="w-full rounded-xl border border-border/80 dark:border-white/10 bg-card dark:bg-white/5 px-3.5 py-2 text-xs font-semibold text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Project Inquiry / Collaboration"
                    className="w-full rounded-xl border border-border/80 dark:border-white/10 bg-card dark:bg-white/5 px-3.5 py-2 text-xs font-medium text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Message ("What to say") */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    What to say (Message)
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project, timeline, stack, or idea..."
                    className="w-full rounded-xl border border-border/80 dark:border-white/10 bg-card dark:bg-white/5 p-3.5 text-xs font-medium text-foreground outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder:text-muted-foreground/60 resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] transition-all hover:shadow-[0_0_28px_rgba(99,102,241,0.7)] hover:brightness-110 disabled:opacity-60"
                >
                  <Send className="size-3.5" />
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-border/40 dark:border-white/10 mt-6 text-center">
            <p className="text-[11px] text-muted-foreground">
              Prefer direct mail? Reach Witness at{" "}
              <a
                href="mailto:musonzahw@gmail.com"
                className="text-violet-500 font-semibold underline"
              >
                musonzahw@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
