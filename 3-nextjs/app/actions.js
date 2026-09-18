'use server'

/* ================= SERVER ACTION =================
   Runs on the server. Even if the browser is bypassed,
   this re-validates every submission before it is
   "accepted". In a real app you would persist to a
   database or send an email here.
   ================================================= */

import { validateApplicant } from './lib/model.js'

export async function submitApplication(payload) {
  const { errors, isValid } = validateApplicant(payload)

  if (!isValid) {
    return { ok: false, errors }
  }

  // --- persistence would go here (DB insert, email, file store) ---
  // await db.applicants.insert(payload)

  return { ok: true }
}
