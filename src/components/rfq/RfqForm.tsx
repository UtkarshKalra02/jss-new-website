"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/content/products";
import { company } from "@/content/company";
import { ArrowIcon } from "@/components/ui/Button";
import {
  emptyFields,
  validate,
  whatsappSendUrl,
  mailtoSendUrl,
  type Fields,
  type Errors,
} from "@/lib/rfq";

export function RfqForm({ presetProduct }: { presetProduct?: string }) {
  const router = useRouter();
  const [fields, setFields] = useState<Fields>({
    ...emptyFields,
    productType: presetProduct ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const errorCount = useMemo(() => Object.keys(errors).length, [errors]);

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((f) => ({ ...f, [key]: value }));
    if (submitted) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSend(channel: "whatsapp" | "email") {
    setSubmitted(true);
    if (fields.website) return; // honeypot tripped

    const found = validate(fields);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      first?.focus({ preventScroll: true });
      return;
    }

    if (channel === "whatsapp") {
      window.open(whatsappSendUrl(fields), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = mailtoSendUrl(fields);
    }

    router.push(`/thank-you?via=${channel}`);
  }

  const invalid = (k: keyof Fields) => submitted && Boolean(errors[k]);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSend("whatsapp");
      }}
      className="space-y-8"
    >
      {submitted && errorCount > 0 && (
        <div
          role="alert"
          className="rounded-sm border border-danger-500/40 bg-danger-050 px-5 py-4 text-[14px] leading-relaxed text-ink-800"
        >
          {errorCount === 1
            ? "One field needs your attention before we can send this."
            : `${errorCount} fields need your attention before we can send this.`}
        </div>
      )}

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <fieldset className="space-y-6">
        <legend className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
          Who we are speaking to
        </legend>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id="companyName"
            label="Company name"
            required
            value={fields.companyName}
            onChange={(v) => set("companyName", v)}
            error={invalid("companyName") ? errors.companyName : undefined}
            autoComplete="organization"
          />
          <Field
            id="name"
            label="Contact person"
            required
            value={fields.name}
            onChange={(v) => set("name", v)}
            error={invalid("name") ? errors.name : undefined}
            autoComplete="name"
          />
          <Field
            id="phone"
            label="Phone"
            type="tel"
            inputMode="tel"
            value={fields.phone}
            onChange={(v) => set("phone", v)}
            error={invalid("phone") ? errors.phone : undefined}
            autoComplete="tel"
            hint="Fastest route to a quotation."
          />
          <Field
            id="email"
            label="Email"
            type="email"
            inputMode="email"
            value={fields.email}
            onChange={(v) => set("email", v)}
            error={invalid("email") ? errors.email : undefined}
            autoComplete="email"
            hint="Phone or email — either is enough."
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
          What you need
        </legend>

        <div>
          <label htmlFor="productType" className={labelCls}>
            Packaging format <span className="text-accent-500">*</span>
          </label>
          <select
            id="productType"
            value={fields.productType}
            onChange={(e) => set("productType", e.target.value)}
            data-invalid={invalid("productType")}
            aria-invalid={invalid("productType")}
            aria-describedby={invalid("productType") ? "productType-error" : undefined}
            className={`${inputCls} ${
              invalid("productType") ? errorBorder : "border-paper-400"
            }`}
          >
            <option value="">Select the closest format…</option>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
            <option value="Other / not sure">Other, or not sure yet</option>
          </select>
          {invalid("productType") && <ErrorText id="productType-error">{errors.productType}</ErrorText>}
        </div>

        <Field
          id="requirement"
          label="Tell us about the product"
          required
          textarea
          rows={4}
          value={fields.requirement}
          onChange={(v) => set("requirement", v)}
          error={invalid("requirement") ? errors.requirement : undefined}
          hint="What is the product, where does it sell, and is this a new pack or a reprint? A sentence or two is plenty."
        />
      </fieldset>

      <div className="rule pt-8">
        <button
          type="button"
          onClick={() => setShowSpecs((v) => !v)}
          aria-expanded={showSpecs}
          aria-controls="spec-fields"
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <span>
            <span className="block text-[16px] font-semibold text-ink-900">
              Add specifications
              <span className="ml-2 font-normal text-ink-500">(optional)</span>
            </span>
            <span className="mt-1 block text-[14px] leading-relaxed text-ink-600">
              Quantity, dimensions and timeline let us quote in one round instead of three.
            </span>
          </span>
          <span
            className={`shrink-0 font-mono text-[20px] leading-none text-accent-500 transition-transform duration-300 ${
              showSpecs ? "rotate-45" : ""
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </button>

        {showSpecs && (
          <div id="spec-fields" className="mt-7 grid gap-6 sm:grid-cols-2">
            <Field
              id="quantity"
              label="Approximate quantity"
              value={fields.quantity}
              onChange={(v) => set("quantity", v)}
              hint="Per order, or annually — whichever you know."
            />
            <Field
              id="timeline"
              label="Timeline"
              value={fields.timeline}
              onChange={(v) => set("timeline", v)}
              hint="Launch date or required delivery week."
            />
            <div className="sm:col-span-2">
              <Field
                id="dimensions"
                label="Dimensions & specifications"
                textarea
                rows={3}
                value={fields.dimensions}
                onChange={(v) => set("dimensions", v)}
                hint="L × W × H, board or GSM, number of colours, finish — whatever is already decided."
              />
            </div>
            <div className="sm:col-span-2">
              <Field
                id="notes"
                label="Anything else"
                textarea
                rows={3}
                value={fields.notes}
                onChange={(v) => set("notes", v)}
                hint="Existing supplier issues, delivery location, artwork status."
              />
            </div>
          </div>
        )}
      </div>

      <div className="rule space-y-4 pt-8">
        <button
          type="button"
          onClick={() => handleSend("whatsapp")}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-accent-500 px-7 py-5 text-[16px] font-medium text-white transition-colors hover:bg-accent-600"
        >
          Send enquiry on WhatsApp
          <ArrowIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => handleSend("email")}
          className="inline-flex w-full items-center justify-center rounded-sm border border-ink-900/25 px-7 py-5 text-[16px] font-medium text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-paper-100"
        >
          Send by email instead
        </button>

        <noscript>
          <p className="rounded-sm border border-accent-500/40 bg-accent-050 px-5 py-4 text-[14px] leading-relaxed text-ink-800">
            This form needs JavaScript to send your enquiry.{" "}
            <a href={`tel:${company.phoneHref}`} className="underline">
              Call us
            </a>{" "}
            or email{" "}
            <a href={`mailto:${company.email}`} className="font-mono underline">
              {company.email}
            </a>{" "}
            instead — both reach us directly.
          </p>
        </noscript>

        <p className="text-[13px] leading-relaxed text-ink-500">
          Your details go straight to {company.name} — no third-party service in
          between. We reply {company.responseSla}. We do not share enquiry details
          with anyone else; see our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-ink-800">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}

const labelCls = "block text-[14px] font-medium text-ink-800";
const inputCls =
  "mt-2 w-full rounded-sm border bg-paper-50 px-4 py-3.5 text-[16px] text-ink-900 outline-none transition-colors placeholder:text-ink-500 focus:border-ink-900";
const errorBorder = "border-danger-500";

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[13px] text-danger-600">
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  textarea,
  rows,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  type?: string;
  inputMode?: "tel" | "email" | "text";
  autoComplete?: string;
}) {
  const describedBy =
    [error ? `${id}-error` : null, hint ? `${id}-hint` : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const shared = {
    id,
    name: id,
    value,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    "data-invalid": Boolean(error),
    autoComplete,
    className: `${inputCls} ${error ? errorBorder : "border-paper-400"}`,
  } as const;

  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label} {required && <span className="text-accent-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          {...shared}
          rows={rows ?? 4}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared.className} resize-y`}
        />
      ) : (
        <input
          {...shared}
          type={type}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[13px] leading-relaxed text-ink-500">
          {hint}
        </p>
      )}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}
