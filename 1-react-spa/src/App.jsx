import { useState } from 'react'

/* Shared option data (same fields used across all three projects) */
const QUALIFICATIONS = ['Matriculation', 'Intermediate', "Bachelor's", "Master's", 'PhD']
const SKILLS = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'UI / UX']
const MAX_CV_MB = 5

/* --- validation rules (plain functions, easy to reason about) --- */
function validate(data) {
  const e = {}
  if (!data.fullName.trim()) e.fullName = 'Please enter your full name.'
  else if (data.fullName.trim().length < 3) e.fullName = 'Name must be at least 3 characters.'

  if (!data.email.trim()) e.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email address.'

  if (!data.phone.trim()) e.phone = 'Please enter your phone number.'
  else if (!/^[+]?[\d\s-]{7,15}$/.test(data.phone)) e.phone = 'Enter a valid phone number (7–15 digits).'

  if (!data.gender) e.gender = 'Please select your gender.'
  if (!data.qualification) e.qualification = 'Please choose a qualification.'

  if (data.experience === '') e.experience = 'Please enter your experience.'
  else if (Number(data.experience) < 0) e.experience = 'Experience cannot be negative.'

  if (data.skills.length === 0) e.skills = 'Select at least one skill.'

  if (!data.cv) e.cv = 'Please upload your CV.'
  else if (!/\.(pdf|doc|docx)$/i.test(data.cv.name)) e.cv = 'CV must be a .pdf, .doc or .docx file.'
  else if (data.cv.size > MAX_CV_MB * 1024 * 1024) e.cv = `CV must be under ${MAX_CV_MB} MB.`
  return e
}

const EMPTY = {
  fullName: '', email: '', phone: '', gender: '',
  qualification: '', experience: '', skills: [], cv: null,
}

export default function App() {
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const set = (key, value) => setData((d) => ({ ...d, [key]: value }))

  const toggleSkill = (skill) =>
    setData((d) => ({
      ...d,
      skills: d.skills.includes(skill)
        ? d.skills.filter((s) => s !== skill)
        : [...d.skills, skill],
    }))

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const e = validate(data)
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setSubmitted({ ...data, cvName: data.cv?.name })
    }
  }

  const reset = () => {
    setData(EMPTY)
    setErrors({})
    setSubmitted(null)
  }

  return (
    <div className="page">
      <div className="card">
        <BrandPanel />
        <div className="form-wrap">
          {submitted
            ? <Success data={submitted} onReset={reset} />
            : (
              <>
                <div className="form-head">
                  <h2>Apply for a role</h2>
                  <p>Tell us about yourself. Fields marked with a dot are required.</p>
                </div>
                <FormBody
                  data={data} errors={errors}
                  set={set} toggleSkill={toggleSkill}
                  onSubmit={handleSubmit}
                />
              </>
            )}
        </div>
      </div>
    </div>
  )
}

/* ---------- presentational pieces ---------- */

function BrandPanel() {
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

function FormBody({ data, errors, set, toggleSkill, onSubmit }) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="row">
        <Field label="Full name" error={errors.fullName} required>
          <input type="text" value={data.fullName}
            className={errors.fullName ? 'invalid' : ''}
            onChange={(e) => set('fullName', e.target.value)}
            placeholder="e.g. Ayesha Khan" />
        </Field>
        <Field label="Email address" error={errors.email} required>
          <input type="email" value={data.email}
            className={errors.email ? 'invalid' : ''}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com" />
        </Field>
      </div>

      <div className="row">
        <Field label="Phone number" error={errors.phone} required>
          <input type="tel" value={data.phone}
            className={errors.phone ? 'invalid' : ''}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="+92 300 1234567" />
        </Field>
        <Field label="Experience (years)" error={errors.experience} required>
          <input type="number" min="0" value={data.experience}
            className={errors.experience ? 'invalid' : ''}
            onChange={(e) => set('experience', e.target.value)}
            placeholder="e.g. 3" />
        </Field>
      </div>

      <Field label="Gender" error={errors.gender} required>
        <div className="choice-group">
          {['Male', 'Female', 'Other'].map((g) => (
            <label key={g} className={'choice' + (data.gender === g ? ' on' : '')}>
              <input type="radio" name="gender" checked={data.gender === g}
                onChange={() => set('gender', g)} />
              {g}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Highest qualification" error={errors.qualification} required>
        <select value={data.qualification}
          className={errors.qualification ? 'invalid' : ''}
          onChange={(e) => set('qualification', e.target.value)}>
          <option value="">Select qualification…</option>
          {QUALIFICATIONS.map((q) => <option key={q} value={q}>{q}</option>)}
        </select>
      </Field>

      <Field label="Skills" error={errors.skills} required>
        <div className="choice-group">
          {SKILLS.map((s) => (
            <label key={s} className={'choice' + (data.skills.includes(s) ? ' on' : '')}>
              <input type="checkbox" checked={data.skills.includes(s)}
                onChange={() => toggleSkill(s)} />
              {s}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Upload CV" error={errors.cv} required>
        <label className="file">
          <input type="file" accept=".pdf,.doc,.docx"
            onChange={(e) => set('cv', e.target.files[0] || null)} />
          {data.cv
            ? <span className="name">{data.cv.name}</span>
            : <span className="hint">Click to upload — PDF, DOC or DOCX, up to {MAX_CV_MB} MB</span>}
        </label>
      </Field>

      <button type="submit" className="btn">Submit application</button>
    </form>
  )
}

function Field({ label, error, required, children }) {
  return (
    <div className="field">
      <label>{label} {required && <span className="req">•</span>}</label>
      {children}
      {error && <span className="err">{error}</span>}
    </div>
  )
}

function Success({ data, onReset }) {
  return (
    <div className="success">
      <div className="tick"><BigCheck /></div>
      <h2>Application received</h2>
      <p>Thanks, {data.fullName.split(' ')[0]}. We&rsquo;ve logged your details and will be in touch soon.</p>
      <div className="summary">
        <div><span>Email</span><span>{data.email}</span></div>
        <div><span>Phone</span><span>{data.phone}</span></div>
        <div><span>Qualification</span><span>{data.qualification}</span></div>
        <div><span>Experience</span><span>{data.experience} yr(s)</span></div>
        <div><span>Skills</span><span>{data.skills.join(', ')}</span></div>
        <div><span>CV</span><span>{data.cvName}</span></div>
      </div>
      <button className="link-btn" onClick={onReset}>Submit another application</button>
    </div>
  )
}

/* icons */
function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12a594" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
function BigCheck() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
