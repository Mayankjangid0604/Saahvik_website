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

/* ============================================================
   EMAIL DELIVERY (Web3Forms)
   ------------------------------------------------------------
   To receive submissions in your inbox, set the build-time env
   var NEXT_PUBLIC_WEB3FORMS_KEY to your Web3Forms access key.
   Get a free key in 30s at https://web3forms.com (just enter
   the email you want submissions delivered to). When the key is
   absent (e.g. local dev), submissions still save to
   localStorage so nothing is lost.
   ============================================================ */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

function flatten(obj: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = Array.isArray(v) ? v.join(", ") : v == null ? "" : String(v);
  }
  return out;
}

async function sendEmail(
  subject: string,
  record: Record<string, unknown>
): Promise<boolean> {
  if (!WEB3FORMS_KEY) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject,
        from_name: "SAAHVIK Website",
        ...flatten(record),
      }),
    });
    const json = await res.json();
    return Boolean(json?.success);
  } catch {
    return false;
  }
}

/* ============================================================
   GOOGLE SHEETS LOGGING (Apps Script Web App)
   ------------------------------------------------------------
   To also log every submission as a row in a Google Sheet, set
   NEXT_PUBLIC_GAS_ENDPOINT to your deployed Apps Script Web App
   URL (see README for the one-time setup script + steps). Sent
   as a no-preflight "simple request" (text/plain body) since
   Apps Script Web Apps don't handle CORS preflight OPTIONS.
   ============================================================ */
const GAS_ENDPOINT = process.env.NEXT_PUBLIC_GAS_ENDPOINT || "";

async function logToSheet(
  sheetName: "Early Access" | "Feature Suggestions",
  record: Record<string, unknown>
): Promise<boolean> {
  if (!GAS_ENDPOINT) return false;
  try {
    await fetch(GAS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ sheetName, ...flatten(record) }),
      mode: "no-cors", // Apps Script response is opaque; fire-and-forget is fine here
    });
    return true;
  } catch {
    return false;
  }
}

/** Submit an early-access waiting-list entry. */
export async function submitEarlyAccess(
  payload: EarlyAccessPayload
): Promise<ApiResult> {
  const record = { ...payload, submittedAt: new Date().toISOString() };
  persist("saahvik_early_access", record);
  const [sent] = await Promise.all([
    sendEmail("New SAAHVIK early-access signup", record),
    logToSheet("Early Access", record),
  ]);
  if (!sent) await new Promise((r) => setTimeout(r, FAKE_LATENCY));
  return { ok: true, id: genId("ea"), message: "You're on the list." };
}

/** Submit a feature-suggestion payload. */
export async function submitFeatureSuggestion(
  payload: FeatureSuggestionPayload
): Promise<ApiResult> {
  const record = { ...payload, submittedAt: new Date().toISOString() };
  persist("saahvik_feature_suggestions", record);
  const [sent] = await Promise.all([
    sendEmail("New SAAHVIK feature suggestion", record),
    logToSheet("Feature Suggestions", record),
  ]);
  if (!sent) await new Promise((r) => setTimeout(r, FAKE_LATENCY));
  return { ok: true, id: genId("fs"), message: "Suggestion received." };
}
