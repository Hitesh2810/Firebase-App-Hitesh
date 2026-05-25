"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const messages = {
  "auth/email-already-in-use": "An account already exists for this email.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/missing-password": "Please enter your password.",
};

function getErrorMessage(error) {
  return messages[error?.code] || "Something went wrong. Please try again.";
}

export default function AuthForm({ mode }) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", text: "" });
    setSubmitting(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        setStatus({ type: "success", text: "Account created successfully. Opening your dashboard..." });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setStatus({ type: "success", text: "Welcome back. Opening your dashboard..." });
      }

      router.push("/dashboard");
    } catch (error) {
      setStatus({ type: "error", text: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_420px]">
          <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">Firebase Suite</p>
              <h1 className="mt-6 max-w-lg text-4xl font-semibold leading-tight">
                Manage signups and customer records from one clean workspace.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Secure authentication, Firestore submissions, and a responsive dashboard built with Next.js App Router.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-md bg-white/10 p-4">
                <p className="text-2xl font-semibold">Auth</p>
                <p className="mt-1 text-slate-300">Email login</p>
              </div>
              <div className="rounded-md bg-white/10 p-4">
                <p className="text-2xl font-semibold">DB</p>
                <p className="mt-1 text-slate-300">Firestore</p>
              </div>
              <div className="rounded-md bg-white/10 p-4">
                <p className="text-2xl font-semibold">UI</p>
                <p className="mt-1 text-slate-300">Tailwind</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-medium text-cyan-700">{isSignup ? "Create account" : "Sign in"}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {isSignup ? "Start your dashboard" : "Welcome back"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {isSignup ? "Use email and password to create your Firebase account." : "Log in to access the protected dashboard."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Email address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                  placeholder="name@example.com"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="mt-2 h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                  placeholder="Minimum 6 characters"
                />
              </label>

              {status.text ? (
                <p
                  className={`rounded-md px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {status.text}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="h-12 w-full rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {submitting ? "Please wait..." : isSignup ? "Create account" : "Log in"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <GoogleLoginButton />

            <p className="mt-6 text-center text-sm text-slate-600">
              {isSignup ? "Already have an account?" : "Need an account?"}{" "}
              <Link className="font-semibold text-cyan-700 hover:text-cyan-800" href={isSignup ? "/login" : "/signup"}>
                {isSignup ? "Log in" : "Sign up"}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
