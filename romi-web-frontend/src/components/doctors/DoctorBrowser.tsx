"use client";

import { useEffect, useMemo, useState } from "react";
import DoctorsHero from "./DoctorHero";
import DoctorCard, { Doctor } from "./DoctorCard";
import { apiFetchAuth, endpoints } from "@/lib/api";

function normalize(s?: string) {
  if (!s) return "";
  return s
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ");
}
function singular(s: string) {
  return s.replace(/(oes|es|s)$/, (m) => (m === "s" ? "" : "o"));
}
function nkey(s?: string) {
  return singular(normalize(s));
}

export default function DoctorsBrowser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [query, setQuery] = useState("");
  const [spec, setSpec] = useState<string>("todas");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await apiFetchAuth<Doctor[]>(endpoints.users.listDoctors, { method: "GET" });

        if (!alive) return;
        setDoctors(
          (data ?? []).map((x: any) => ({
            id: x.id,
            name: x.name ?? x.fullName ?? "Dr. Sin Nombre",
            specialty: x.specialty ?? x.role ?? "General",
            city: x.city ?? x.location ?? undefined,
            price: x.price ?? 800,
            rating: x.rating ?? 4.8,
            years_exp: x.years_exp ?? 10,
            next_available: x.next_available ?? "Hoy 3:00 PM",
            languages: x.languages ?? ["Español"],
            is_available: x.is_available ?? true,
          }))
        );
      } catch (e: any) {
        setError(e?.message || "No se pudieron cargar los doctores.");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const chips = useMemo(() => {
    const labelByKey = new Map<string, string>();
    for (const d of doctors) {
      const key = nkey(d.specialty);
      const label = d.specialty?.trim() || "General";
      if (key) labelByKey.set(key, label);
    }
    const entries = Array.from(labelByKey.entries()).sort((a, b) => a[1].localeCompare(b[1], "es"));
    return [{ key: "todas", label: "Todas las especialidades" }, ...entries.map(([key, label]) => ({ key, label }))];
  }, [doctors]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    const specKey = spec;
    return doctors.filter((d) => {
      const dSpecKey = nkey(d.specialty);

      const okSpec = specKey === "todas" ? true : dSpecKey === specKey;
      const okQuery =
        !q ||
        normalize(d.name).includes(q) ||
        normalize(d.city).includes(q) ||
        normalize(d.specialty).includes(q);

      return okSpec && okQuery;
    });
  }, [doctors, query, spec]);

  if (loading) {
    return (
      <>
        <DoctorsHero />
        <div className="mx-auto max-w-6xl px-4 mt-6 grid gap-4 md:grid-cols-3 ">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-zinc-100 animate-pulse" />
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <DoctorsHero />
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-6 rounded-xl border bg-red-50 text-red-700 p-4 ">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <DoctorsHero />

      <div className="mx-auto max-w-6xl px-4  mt-6 mb-16">
        <div className="mt-6 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between ">
          <div className="flex gap-2 overflow-x-auto">
            {chips.map((c) => (
              <button
                key={c.key}
                onClick={() => setSpec(c.key)}
                className={`px-3 py-2 rounded-lg text-sm border whitespace-nowrap ${
                  spec === c.key ? "bg-cyan-600 text-white border-cyan-600" : "bg-white hover:bg-zinc-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, ciudad o especialidad…"
            className="w-full md:w-80 rounded-lg border px-3 py-2"
          />
        </div>

        <div className="mt-3 text-sm text-zinc-500">
          {filtered.length} especialista{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}
          {spec !== "todas" && (
            <span>
              {" "}• Filtro: <span className="font-medium text-zinc-700">{chips.find((c) => c.key === spec)?.label}</span>
            </span>
          )}
        </div>

        <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <DoctorCard key={d.id} d={d} />
          ))}
        </div>

        {!filtered.length && (
          <p className="text-center text-zinc-500 mt-8">
            No encontramos especialistas con esos filtros.
          </p>
        )}
      </div>
    </>
  );
}
