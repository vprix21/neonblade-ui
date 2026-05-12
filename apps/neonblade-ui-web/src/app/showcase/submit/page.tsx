"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import CornerCutButton from "../../../lib/components/ui/buttons/CornerCutButton";

interface RegistryComponent {
  name: string;
  category: string;
  description: string;
}

interface FormData {
  displayName: string;
  email: string;
  country: string;
  projectLink: string;
  description: string;
  components: string[];
  feedback: string;
}

interface FormErrors {
  displayName?: string;
  email?: string;
  country?: string;
  projectLink?: string;
  components?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidUrl(url: string) {
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function formatComponentName(name: string) {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.displayName.trim())
    errors.displayName = "Display name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.country.trim()) errors.country = "Country is required.";
  if (!data.projectLink.trim()) {
    errors.projectLink = "Project link is required.";
  } else if (!isValidUrl(data.projectLink)) {
    errors.projectLink =
      "Please enter a valid live website URL (must start with http:// or https://).";
  }
  if (data.components.length < 2) {
    errors.components =
      "You must select at least 2 NeonBlade UI components used in your project.";
  }
  return errors;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function ShowcaseSubmitPage() {
  const [form, setForm] = useState<FormData>({
    displayName: "",
    email: "",
    country: "",
    projectLink: "",
    description: "",
    components: [],
    feedback: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [availableComponents, setAvailableComponents] = useState<
    RegistryComponent[]
  >([]);
  const [registryLoading, setRegistryLoading] = useState(true);
  const [registryError, setRegistryError] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://neonbladeui-registry.vercel.app/registry.json")
      .then((r) => r.json())
      .then((data) => {
        setAvailableComponents(data.components ?? []);
        setRegistryLoading(false);
      })
      .catch(() => {
        setRegistryError(true);
        setRegistryLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) setErrors(validate(updated));
  }

  function toggleComponent(name: string) {
    const updated = {
      ...form,
      components: form.components.includes(name)
        ? form.components.filter((c) => c !== name)
        : [...form.components, name],
    };
    setForm(updated);
    if (touched.components) setErrors(validate(updated));
  }

  function removeComponent(name: string) {
    const updated = {
      ...form,
      components: form.components.filter((c) => c !== name),
    };
    setForm(updated);
    if (touched.components) setErrors(validate(updated));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    Object.keys(form).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/showcase-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: form.displayName.trim(),
          email: form.email.trim().toLowerCase(),
          country: form.country.trim(),
          projectLink: form.projectLink.trim(),
          description: form.description.trim(),
          components: form.components,
          feedback: form.feedback.trim(),
        }),
      });
      if (!res.ok) {
        setSubmitStatus("error");
        return;
      }
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  const filteredComponents = availableComponents.filter((c) =>
    formatComponentName(c.name).toLowerCase().includes(search.toLowerCase()),
  );

  if (submitStatus === "success") {
    return (
      <main className="flex min-h-screen flex-col bg-black text-white selection:bg-[#00f3ff] selection:text-black">
        <Navbar />
        <section className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
          <div className="relative z-10 max-w-lg mx-auto">
            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-[#00f3ff]/40 bg-[#00f3ff]/5">
              <svg
                className="w-7 h-7 text-[#00f3ff]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="font-orbitron font-bold text-3xl text-[#00f3ff] mb-4">
              Submission Received
            </h2>
            <p className="text-white/65 mb-2 font-rajdhani text-lg leading-relaxed">
              Thanks for submitting your project!
            </p>
            <p className="text-white/60 text-base font-rajdhani mb-8">
              Your project will be reviewed. If your project is selected for the
              showcase, you&apos;ll be notified at the email you provided. Not
              all submissions are guaranteed to be featured — selection is
              subject to review and approval.
            </p>
            <Link href="/showcase">
              <CornerCutButton
                variant="outline"
                color="cyan"
                corner="all"
                hoverEffect="shift"
              >
                Back to Showcase
              </CornerCutButton>
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <Navbar />
      <section className="flex flex-1 flex-col items-center px-6 py-28 relative overflow-hidden">
        <div className="relative z-10 w-full max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <Link
              href="/showcase"
              className="inline-flex items-center gap-1.5 text-xs font-orbitron tracking-widest text-white/40 hover:text-[#00f3ff] uppercase transition-colors mb-6"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Showcase
            </Link>
            <h1 className="font-orbitron font-bold text-3xl sm:text-4xl tracking-tight mb-3">
              Submit Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff00ff]">
                Project
              </span>
            </h1>
            <p className="text-white/65 text-sm font-rajdhani leading-relaxed">
              Your submission will be reviewed. If selected, it will be featured
              in the showcase and you&apos;ll be notified via email. Featuring
              is not guaranteed — all submissions are subject to review and
              approval by the creator.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Display Name */}
            <div>
              <label className="block font-orbitron text-xs tracking-widest uppercase text-white/60 mb-2">
                Display Name <span className="text-[#ff00ff]">*</span>
              </label>
              <input
                type="text"
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
                onBlur={() => handleBlur("displayName")}
                placeholder="Your name or handle"
                autoComplete="name"
                className={`w-full bg-white/[0.03] border px-4 py-3 text-sm font-rajdhani text-white placeholder-white/20 focus:outline-none focus:border-[#00f3ff]/60 transition-colors ${touched.displayName && errors.displayName ? "border-[#ff00ff]/60" : "border-white/10"}`}
              />
              {touched.displayName && errors.displayName && (
                <p className="mt-1.5 text-xs text-[#ff00ff]/80 font-rajdhani">
                  {errors.displayName}
                </p>
              )}
              <p className="mt-1.5 text-xs text-white/60 font-rajdhani">
                Shown as the project creator on the showcase card.
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block font-orbitron text-xs tracking-widest uppercase text-white/60 mb-2">
                Email <span className="text-[#ff00ff]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="your@email.com"
                autoComplete="email"
                className={`w-full bg-white/[0.03] border px-4 py-3 text-sm font-rajdhani text-white placeholder-white/20 focus:outline-none focus:border-[#00f3ff]/60 transition-colors ${touched.email && errors.email ? "border-[#ff00ff]/60" : "border-white/10"}`}
              />
              {touched.email && errors.email && (
                <p className="mt-1.5 text-xs text-[#ff00ff]/80 font-rajdhani">
                  {errors.email}
                </p>
              )}
              <p className="mt-1.5 text-xs text-white/60 font-rajdhani">
                Used to notify you if your project is selected.
              </p>
            </div>

            {/* Country */}
            <div>
              <label className="block font-orbitron text-xs tracking-widest uppercase text-white/60 mb-2">
                Country <span className="text-[#ff00ff]">*</span>
              </label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                onBlur={() => handleBlur("country")}
                placeholder="e.g. United States"
                autoComplete="country-name"
                className={`w-full bg-white/[0.03] border px-4 py-3 text-sm font-rajdhani text-white placeholder-white/20 focus:outline-none focus:border-[#00f3ff]/60 transition-colors ${touched.country && errors.country ? "border-[#ff00ff]/60" : "border-white/10"}`}
              />
              {touched.country && errors.country && (
                <p className="mt-1.5 text-xs text-[#ff00ff]/80 font-rajdhani">
                  {errors.country}
                </p>
              )}
            </div>

            {/* Project Link */}
            <div>
              <label className="block font-orbitron text-xs tracking-widest uppercase text-white/60 mb-2">
                Live Project URL <span className="text-[#ff00ff]">*</span>
              </label>
              <input
                type="url"
                name="projectLink"
                value={form.projectLink}
                onChange={handleChange}
                onBlur={() => handleBlur("projectLink")}
                placeholder="https://your-project.com"
                autoComplete="off"
                className={`w-full bg-white/[0.03] border px-4 py-3 text-sm font-rajdhani text-white placeholder-white/20 focus:outline-none focus:border-[#00f3ff]/60 transition-colors ${touched.projectLink && errors.projectLink ? "border-[#ff00ff]/60" : "border-white/10"}`}
              />
              {touched.projectLink && errors.projectLink && (
                <p className="mt-1.5 text-xs text-[#ff00ff]/80 font-rajdhani">
                  {errors.projectLink}
                </p>
              )}
              <p className="mt-1.5 text-xs text-white/60 font-rajdhani">
                Must be a publicly accessible, live website.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block font-orbitron text-xs tracking-widest uppercase text-white/60 mb-2">
                Short Description{" "}
                <span className="text-white/30 normal-case tracking-normal font-rajdhani">
                  (optional)
                </span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us briefly what your project is about…"
                className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm font-rajdhani text-white placeholder-white/20 focus:outline-none focus:border-[#00f3ff]/60 transition-colors resize-none"
              />
            </div>

            {/* Components used */}
            <div>
              <label className="block font-orbitron text-xs tracking-widest uppercase text-white/60 mb-1.5">
                Components Used <span className="text-[#ff00ff]">*</span>
              </label>
              <p className="text-xs text-white/60 font-rajdhani mb-3">
                Select all that apply. You must have used at least 2 NeonBlade
                UI components.
              </p>

              {/* Selected tags */}
              {form.components.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.components.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-orbitron bg-[#00f3ff]/10 border border-[#00f3ff]/40 text-[#00f3ff]"
                    >
                      {formatComponentName(name)}
                      <button
                        type="button"
                        onClick={() => removeComponent(name)}
                        className="hover:text-white transition-colors leading-none"
                        aria-label={`Remove ${name}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className={`w-full flex items-center justify-between bg-white/[0.03] border px-4 py-3 text-sm font-rajdhani text-left transition-colors focus:outline-none ${touched.components && errors.components ? "border-[#ff00ff]/60" : dropdownOpen ? "border-[#00f3ff]/60" : "border-white/10"}`}
                >
                  <span className="text-white/20">
                    {registryLoading
                      ? "Loading components…"
                      : registryError
                        ? "Failed to load — try refreshing"
                        : "Select components…"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-white/40 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && !registryLoading && !registryError && (
                  <div className="absolute z-50 w-full mt-1 bg-[#0a0a0a] border border-[#00f3ff]/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-h-64 flex flex-col">
                    <div className="px-3 py-2 border-b border-white/5">
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search components…"
                        autoFocus
                        className="w-full bg-transparent text-sm font-rajdhani text-white placeholder-white/20 focus:outline-none"
                      />
                    </div>
                    <div className="overflow-y-auto flex-1">
                      {filteredComponents.length === 0 ? (
                        <p className="px-4 py-3 text-xs text-white/30 font-rajdhani">
                          No components match.
                        </p>
                      ) : (
                        filteredComponents.map((comp) => {
                          const selected = form.components.includes(comp.name);
                          return (
                            <button
                              key={comp.name}
                              type="button"
                              onClick={() => {
                                toggleComponent(comp.name);
                                setTouched((prev) => ({
                                  ...prev,
                                  components: true,
                                }));
                              }}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm font-rajdhani transition-colors ${selected ? "bg-[#00f3ff]/8 text-[#00f3ff]" : "text-white/60 hover:bg-white/[0.04] hover:text-white"}`}
                            >
                              <span>{formatComponentName(comp.name)}</span>
                              {selected && (
                                <svg
                                  className="w-3.5 h-3.5 shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>

              {touched.components && errors.components && (
                <p className="mt-2 text-xs text-[#ff00ff]/80 font-rajdhani">
                  {errors.components}
                </p>
              )}
              {form.components.length > 0 && (
                <p className="mt-2 text-xs text-white/30 font-rajdhani">
                  {form.components.length} selected
                </p>
              )}
            </div>

            {/* Feedback */}
            <div>
              <label className="block font-orbitron text-xs tracking-widest uppercase text-white/60 mb-2">
                Feedback / Comments{" "}
                <span className="text-white/30 normal-case tracking-normal font-rajdhani">
                  (optional)
                </span>
              </label>
              <textarea
                name="feedback"
                value={form.feedback}
                onChange={handleChange}
                rows={3}
                placeholder="Any feedback or thoughts about NeonBlade UI?"
                className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm font-rajdhani text-white placeholder-white/20 focus:outline-none focus:border-[#00f3ff]/60 transition-colors resize-none"
              />
            </div>

            {submitStatus === "error" && (
              <div className="border border-[#ff00ff]/30 bg-[#ff00ff]/5 px-4 py-3 text-sm font-rajdhani text-[#ff00ff]/80">
                Something went wrong. Please try again in a moment.
              </div>
            )}

            <CornerCutButton
              type="submit"
              disabled={submitStatus === "submitting"}
              variant="outline"
              color="green"
              corner="bottom-right"
              hoverEffect="shift"
            >
              {submitStatus === "submitting" ? "Submitting…" : "Submit Project"}
            </CornerCutButton>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
