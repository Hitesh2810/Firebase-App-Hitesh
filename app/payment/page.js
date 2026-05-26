"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const methods = [
  {
    id: "upi",
    label: "UPI",
    description: "Pay instantly with any UPI app.",
    badge: "Fast",
    fields: [{ name: "upiId", label: "UPI ID", placeholder: "name@bank", inputMode: "email" }],
  },
  {
    id: "debit",
    label: "Debit Card",
    description: "Use your bank debit card securely.",
    badge: "Bank",
    fields: [
      { name: "holderName", label: "Card Holder Name", placeholder: "Alex Morgan" },
      { name: "cardNumber", label: "Card Number", placeholder: "1234 5678 9012 3456", inputMode: "numeric" },
      { name: "expiryDate", label: "Expiry Date", placeholder: "MM/YY", inputMode: "numeric" },
      { name: "cvv", label: "CVV", placeholder: "123", inputMode: "numeric", type: "password" },
    ],
  },
  {
    id: "credit",
    label: "Credit Card",
    description: "Pay now with a credit card.",
    badge: "Card",
    fields: [
      { name: "holderName", label: "Card Holder Name", placeholder: "Alex Morgan" },
      { name: "cardNumber", label: "Card Number", placeholder: "1234 5678 9012 3456", inputMode: "numeric" },
      { name: "expiryDate", label: "Expiry Date", placeholder: "MM/YY", inputMode: "numeric" },
      { name: "cvv", label: "CVV", placeholder: "123", inputMode: "numeric", type: "password" },
    ],
  },
];

const emptyForms = {
  upi: { upiId: "" },
  debit: { holderName: "", cardNumber: "", expiryDate: "", cvv: "" },
  credit: { holderName: "", cardNumber: "", expiryDate: "", cvv: "" },
};

function PaymentMethodTabs({ activeMethod, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-3" role="tablist" aria-label="Payment method">
      {methods.map((method) => {
        const isActive = activeMethod === method.id;

        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            role="tab"
            aria-selected={isActive}
            className={`rounded-lg border p-4 text-left shadow-sm transition ${
              isActive
                ? "border-cyan-600 bg-cyan-50 ring-4 ring-cyan-100"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="text-base font-semibold text-slate-950">{method.label}</span>
              <span
                className={`rounded-md px-2 py-1 text-xs font-semibold ${
                  isActive ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {method.badge}
              </span>
            </span>
            <span className="mt-2 block text-sm leading-5 text-slate-600">{method.description}</span>
          </button>
        );
      })}
    </div>
  );
}

function TextField({ field, value, error, onChange }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{field.label}</span>
      <input
        name={field.name}
        type={field.type || "text"}
        value={value}
        onChange={onChange}
        inputMode={field.inputMode}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        className={`mt-2 h-12 w-full rounded-md border bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
            : "border-slate-300 focus:border-cyan-600 focus:ring-cyan-100"
        }`}
        placeholder={field.placeholder}
      />
      {error ? <span className="mt-2 block text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

function PaymentForm({ method, form, errors, isProcessing, onChange, onSubmit }) {
  const cardGrid = method.id === "upi" ? "" : "sm:grid-cols-2";

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5">
      <div className={`grid gap-4 ${cardGrid}`}>
        {method.fields.map((field) => (
          <div
            key={field.name}
            className={field.name === "holderName" || field.name === "cardNumber" ? "sm:col-span-2" : ""}
          >
            <TextField field={field} value={form[field.name] || ""} error={errors[field.name]} onChange={onChange} />
          </div>
        ))}
      </div>

      {errors.form ? <p className="rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-700">{errors.form}</p> : null}

      <button
        type="submit"
        disabled={isProcessing}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isProcessing ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Processing payment...
          </>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
}

function ProcessingPanel({ isProcessing }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Payment Summary</h2>
          <p className="mt-1 text-sm text-slate-500">Dummy checkout for your SaaS workspace.</p>
        </div>
        <span className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">Test mode</span>
      </div>

      <dl className="mt-6 space-y-4 text-sm">
        {[
          ["Plan", "Professional"],
          ["Billing", "Monthly"],
          ["Amount", "Rs. 999.00"],
          ["Gateway", "Frontend only"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <dt className="text-slate-500">{label}</dt>
            <dd className="font-semibold text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-md bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">{isProcessing ? "Processing payment" : "Ready to process"}</span>
          <span className="text-slate-500">{isProcessing ? "Please wait" : "Secure demo"}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className={`h-full rounded-full bg-cyan-600 ${isProcessing ? "w-full transition-all duration-1000" : "w-1/3"}`} />
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-xl">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100">
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-600 text-white">
            <span className="block h-5 w-3 rotate-45 border-b-2 border-r-2 border-white" />
          </div>
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-slate-950">Payment Successful</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Your dummy payment was processed successfully. No real payment gateway was used.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Make Another Payment
          </button>
          <Link
            href="/dashboard"
            className="flex h-11 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const [activeMethod, setActiveMethod] = useState("upi");
  const [forms, setForms] = useState(emptyForms);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedMethod = useMemo(
    () => methods.find((method) => method.id === activeMethod) || methods[0],
    [activeMethod],
  );

  function handleMethodChange(methodId) {
    setActiveMethod(methodId);
    setErrors({});
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;

    setForms((current) => ({
      ...current,
      [activeMethod]: {
        ...current[activeMethod],
        [name]: value,
      },
    }));

    setErrors((current) => ({ ...current, [name]: "", form: "" }));
  }

  function validateForm() {
    const nextErrors = {};

    selectedMethod.fields.forEach((field) => {
      if (!forms[activeMethod][field.name]?.trim()) {
        nextErrors[field.name] = `${field.label} is required.`;
      }
    });

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors({ ...validationErrors, form: "Please complete all required fields before paying." });
      return;
    }

    setErrors({});
    setIsProcessing(true);

    window.setTimeout(() => {
      setForms((current) => ({ ...current, [activeMethod]: emptyForms[activeMethod] }));
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Secure checkout</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Complete your payment</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Choose a payment method and run a dummy frontend-only transaction with validation, loading, and success states.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
          >
            Go to Dashboard
          </Link>
        </header>

        <div className="grid gap-6 py-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Payment Method</h2>
              <p className="mt-1 text-sm text-slate-500">Switch between UPI, debit card, and credit card.</p>
            </div>

            <PaymentMethodTabs activeMethod={activeMethod} onChange={handleMethodChange} />
            <PaymentForm
              method={selectedMethod}
              form={forms[activeMethod]}
              errors={errors}
              isProcessing={isProcessing}
              onChange={handleFieldChange}
              onSubmit={handleSubmit}
            />
          </section>

          <ProcessingPanel isProcessing={isProcessing} />
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </main>
  );
}
