"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "@/components/AuthProvider";
import { auth, db } from "@/firebase/config";

const emptyForm = {
  fullName: "",
  email: "",
  phoneNumber: "",
  age: "",
  address: "",
};

function formatDate(timestamp) {
  if (!timestamp?.toDate) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp.toDate());
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [records, setRecords] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    const recordsQuery = query(collection(db, "usersData"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      recordsQuery,
      (snapshot) => {
        setRecords(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setDataLoading(false);
      },
      () => {
        setMessage({ type: "error", text: "Unable to load Firestore records." });
        setDataLoading(false);
      },
    );

    return unsubscribe;
  }, [user]);

  const stats = useMemo(
    () => [
      { label: "Total records", value: records.length },
      { label: "Signed in as", value: user?.email || "-" },
      { label: "Collection", value: "usersData" },
    ],
    [records.length, user?.email],
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await addDoc(collection(db, "usersData"), {
        ...form,
        age: Number(form.age),
        createdAt: serverTimestamp(),
        createdBy: user.email,
      });
      setForm(emptyForm);
      setMessage({ type: "success", text: "Record saved successfully." });
    } catch {
      setMessage({ type: "error", text: "Could not save the record. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  if (loading || (!loading && !user)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] text-slate-700">
        <div className="rounded-md border border-slate-200 bg-white px-6 py-4 text-sm shadow-sm">
          Checking your session...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-slate-950 px-5 py-6 text-white lg:block">
          <div className="flex h-full flex-col">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-md bg-cyan-400 font-bold text-slate-950">
                  F
                </div>
                <div>
                  <p className="font-semibold">Firebase Suite</p>
                  <p className="text-xs text-slate-400">Admin dashboard</p>
                </div>
              </div>

              <nav className="mt-10 space-y-1 text-sm">
                {["Overview", "Users Data", "Firestore", "Settings"].map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={`flex h-11 w-full items-center rounded-md px-4 text-left transition ${
                      index === 1
                        ? "bg-white text-slate-950"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-auto rounded-md bg-white/10 p-4">
              <p className="text-sm font-medium">Protected route</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">
                Only authenticated Firebase users can view this dashboard.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">Welcome back</p>
                <h1 className="break-all text-xl font-semibold sm:text-2xl">{user.email}</h1>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="h-10 rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-2 truncate text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[420px_1fr]">
              <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold">Add user data</h2>
                  <p className="mt-1 text-sm text-slate-500">Submissions are saved to Firestore.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Full Name</span>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Email</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Phone Number</span>
                      <input
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        required
                        className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Age</span>
                      <input
                        name="age"
                        type="number"
                        min="1"
                        value={form.age}
                        onChange={handleChange}
                        required
                        className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Address</span>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="mt-2 w-full resize-none rounded-md border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
                    />
                  </label>

                  {message.text ? (
                    <p
                      className={`rounded-md px-4 py-3 text-sm ${
                        message.type === "success"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {message.text}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="h-11 w-full rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {submitting ? "Saving..." : "Save to Firestore"}
                  </button>
                </form>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 p-5">
                  <h2 className="text-lg font-semibold">Saved records</h2>
                  <p className="mt-1 text-sm text-slate-500">Latest entries appear first.</p>
                </div>

                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-5 py-3 font-semibold">Name</th>
                        <th className="px-5 py-3 font-semibold">Email</th>
                        <th className="px-5 py-3 font-semibold">Phone</th>
                        <th className="px-5 py-3 font-semibold">Age</th>
                        <th className="px-5 py-3 font-semibold">Created</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {records.map((record) => (
                        <tr key={record.id} className="align-top">
                          <td className="px-5 py-4 font-medium text-slate-900">{record.fullName}</td>
                          <td className="px-5 py-4 text-slate-600">{record.email}</td>
                          <td className="px-5 py-4 text-slate-600">{record.phoneNumber}</td>
                          <td className="px-5 py-4 text-slate-600">{record.age}</td>
                          <td className="px-5 py-4 text-slate-600">{formatDate(record.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-3 p-4 lg:hidden">
                  {records.map((record) => (
                    <article key={record.id} className="rounded-md border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold">{record.fullName}</h3>
                          <p className="mt-1 break-all text-sm text-slate-600">{record.email}</p>
                        </div>
                        <span className="rounded-md bg-cyan-50 px-2 py-1 text-xs font-semibold text-cyan-700">
                          {record.age}
                        </span>
                      </div>
                      <dl className="mt-4 space-y-2 text-sm text-slate-600">
                        <div className="flex justify-between gap-4">
                          <dt className="font-medium text-slate-500">Phone</dt>
                          <dd>{record.phoneNumber}</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="font-medium text-slate-500">Created</dt>
                          <dd className="text-right">{formatDate(record.createdAt)}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-slate-500">Address</dt>
                          <dd className="mt-1">{record.address}</dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>

                {!dataLoading && records.length === 0 ? (
                  <div className="p-10 text-center text-sm text-slate-500">
                    No Firestore records yet. Submit the form to create the first one.
                  </div>
                ) : null}

                {dataLoading ? (
                  <div className="p-10 text-center text-sm text-slate-500">Loading Firestore records...</div>
                ) : null}
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
