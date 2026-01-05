"use client";

import { useMemo, useState } from "react";
import { Link as LinkIcon, CheckCircle2 } from "lucide-react";

type RoleLoose = "doctor" | "patient" | "DOCTOR" | "PATIENT";

function normalizeRole(r: RoleLoose): "doctor" | "patient" {
  const v = String(r).toLowerCase();
  return v === "doctor" ? "doctor" : "patient";
}

export default function CallLinkPanel(props: {
  role: RoleLoose;
  callLink: string | null;
  patientReady: boolean;
  onSendLink: (url: string) => void;
  onReady: () => void;
}) {
  const role = useMemo(() => normalizeRole(props.role), [props.role]);
  const [linkInput, setLinkInput] = useState("");

  return (
    <section className="rounded-xl border bg-card p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-medium">Link alterno de videollamada</div>

        {props.patientReady && (
          <div className="text-xs inline-flex items-center gap-1 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            Paciente listo
          </div>
        )}
      </div>

      {role === "doctor" ? (
        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          <input
            value={linkInput}
            onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Pega aquí el link (Zoom/Meet/etc)"
            className="flex-1 rounded-lg border px-3 py-2 text-sm bg-white"
          />
          <button
            className="px-3 py-2 rounded-lg bg-cyan-700 text-white text-sm hover:bg-cyan-800"
            onClick={() => {
              props.onSendLink(linkInput);
              setLinkInput("");
            }}
          >
            Enviar link
          </button>
        </div>
      ) : (
        <div className="mt-2 flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
          <div className="text-sm">
            {props.callLink ? (
              <a
                href={props.callLink}
                target="_blank"
                className="inline-flex items-center gap-2 underline"
                rel="noreferrer"
              >
                <LinkIcon className="w-4 h-4" />
                Abrir link de videollamada
              </a>
            ) : (
              <span className="text-muted-foreground">
                El doctor aún no ha enviado un link.
              </span>
            )}
          </div>

          <button
            className="px-3 py-2 rounded-lg border text-sm hover:bg-zinc-50"
            onClick={props.onReady}
          >
            Listo
          </button>
        </div>
      )}
    </section>
  );
}
