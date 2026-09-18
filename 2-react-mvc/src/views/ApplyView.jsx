/* ================= VIEW: Apply =================
   Renders the form. All behaviour comes from the
   controller; option lists come from the model.
   =============================================== */

import { useRecruitmentController } from '../controllers/RecruitmentController.js'
import { QUALIFICATIONS, SKILLS, MAX_CV_MB } from '../models/ApplicantModel.js'
import { BrandPanel, Field } from './Shared.jsx'

export default function ApplyView() {
  const { data, errors, setField, toggleSkill, submit } = useRecruitmentController()

  return (
    <div className="page">
      <div className="card">
        <BrandPanel />
        <div className="form-wrap">
          <div className="form-head">
            <h2>Apply for a role</h2>
            <p>Tell us about yourself. Fields marked with a dot are required.</p>
          </div>

          <form onSubmit={submit} noValidate>
            <div className="row">
              <Field label="Full name" error={errors.fullName} required>
                <input type="text" value={data.fullName}
                  className={errors.fullName ? 'invalid' : ''}
                  onChange={(e) => setField('fullName', e.target.value)}
                  placeholder="e.g. Ayesha Khan" />
              </Field>
              <Field label="Email address" error={errors.email} required>
                <input type="email" value={data.email}
                  className={errors.email ? 'invalid' : ''}
                  onChange={(e) => setField('email', e.target.value)}
                  placeholder="you@example.com" />
              </Field>
            </div>

            <div className="row">
              <Field label="Phone number" error={errors.phone} required>
                <input type="tel" value={data.phone}
                  className={errors.phone ? 'invalid' : ''}
                  onChange={(e) => setField('phone', e.target.value)}
                  placeholder="+92 300 1234567" />
              </Field>
              <Field label="Experience (years)" error={errors.experience} required>
                <input type="number" min="0" value={data.experience}
                  className={errors.experience ? 'invalid' : ''}
                  onChange={(e) => setField('experience', e.target.value)}
                  placeholder="e.g. 3" />
              </Field>
            </div>

            <Field label="Gender" error={errors.gender} required>
              <div className="choice-group">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label key={g} className={'choice' + (data.gender === g ? ' on' : '')}>
                    <input type="radio" name="gender" checked={data.gender === g}
                      onChange={() => setField('gender', g)} />
                    {g}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Highest qualification" error={errors.qualification} required>
              <select value={data.qualification}
                className={errors.qualification ? 'invalid' : ''}
                onChange={(e) => setField('qualification', e.target.value)}>
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
                  onChange={(e) => setField('cv', e.target.files[0] || null)} />
                {data.cv
                  ? <span className="name">{data.cv.name}</span>
                  : <span className="hint">Click to upload — PDF, DOC or DOCX, up to {MAX_CV_MB} MB</span>}
              </label>
            </Field>

            <button type="submit" className="btn">Submit application</button>
          </form>
        </div>
      </div>
    </div>
  )
}
