"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      router.replace(user ? "/dashboard" : "/login");
    }
  }, [loading, router, user]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] text-slate-700">
      <div className="rounded-md border border-slate-200 bg-white px-6 py-4 text-sm shadow-sm">
        Loading your workspace...
      </div>
    </main>
  );
}
