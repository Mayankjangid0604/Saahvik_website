/* ============================================================
   BACKEND INTEGRATION LAYER (placeholder)
   ------------------------------------------------------------
   These functions are the single seam between the UI and a
   future backend. Today they resolve locally (and persist to
   localStorage so nothing is lost) — swap the bodies for real
   `fetch()` calls when the API is ready. The component contracts
   never have to change.
   ============================================================ */

export type EarlyAccessPayload = {
  name?: string;
  hostelName?: string;
  email?: string;
  phone?: string;
  source?: string;
};

export type FeatureSuggestionPayload = {
  // Step 1 — Basic details
  name: string;
  hostelName: string;
  role: string;
  city: string;
  phone: string;
  email?: string;
  // Step 2 — Hostel details
  hostelType: string;
  students: string;
  rooms: string;
  currentMethod: string;
  // Step 3 — Challenges
  challenges: string[];
  // Step 4 / 5 — Free text
  dreamFeatures: string;
  missingFeatures: string;
  // Step 6 — Priority ranking (ordered most → least important)
  priority: string[];
  // Step 7 — Demo interest
  demoInterest: "Yes" | "Maybe" | "No" | "";
  // meta
  submittedAt?: string;
};

export type ApiResult = { ok: boolean; id?: string; message?: string };

const FAKE_LATENCY = 1100;

function persist(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(value);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    /* storage unavailable — fail silently */
  }
}

function genId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

/**
 * Submit an early-access waiting-list entry.
 *
 * TODO(backend): replace with
 *   await fetch("/api/early-access", { method: "POST", body: JSON.stringify(payload) })
 */
export async function submitEarlyAccess(
  payload: EarlyAccessPayload
): Promise<ApiResult> {
  const record = { ...payload, submittedAt: new Date().toISOString() };
  persist("saahvik_early_access", record);
  await new Promise((r) => setTimeout(r, FAKE_LATENCY));
  return { ok: true, id: genId("ea"), message: "You're on the list." };
}

/**
 * Submit a full feature-suggestion wizard payload.
 *
 * TODO(backend): replace with
 *   await fetch("/api/feature-suggestions", { method: "POST", body: JSON.stringify(payload) })
 *
 * The payload shape is intentionally flat + serialisable so it maps
 * 1:1 to a spreadsheet row or a database record.
 */
export async function submitFeatureSuggestion(
  payload: FeatureSuggestionPayload
): Promise<ApiResult> {
  const record = { ...payload, submittedAt: new Date().toISOString() };
  persist("saahvik_feature_suggestions", record);
  // eslint-disable-next-line no-console
  console.info("[SAAHVIK] Feature suggestion captured:", record);
  await new Promise((r) => setTimeout(r, FAKE_LATENCY));
  return { ok: true, id: genId("fs"), message: "Suggestion received." };
}
