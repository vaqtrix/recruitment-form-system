/* Presentational pieces shared across pages. No hooks,
   so they can be used from server or client components. */

export function BrandPanel() {
  return (
    <aside className="panel">
      <div className="brand"><span className="dot">N</span> Nova Talent</div>
      <div>
        <h1>Join a team building what&rsquo;s next.</h1>
        <p className="lede">
          We hire for curiosity and craft. Share your details and our team
          will get back to you within a few working days.
        </p>
      </div>
      <ul>
        <li><Check /> Remote-friendly, flexible hours</li>
        <li><Check /> Learning budget every quarter</li>
        <li><Check /> Real ownership from day one</li>
      </ul>
    </aside>
  )
}

export function Field({ label, error, required, children }) {
  return (
    <div className="field">
      <label>{label} {required && <span className="req">•</span>}</label>
      {children}
      {error && <span className="err">{error}</span>}
    </div>
  )
}

export function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12a594" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function BigCheck() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
