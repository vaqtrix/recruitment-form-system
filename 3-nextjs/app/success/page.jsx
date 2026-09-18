import { redirect } from 'next/navigation'
import { BrandPanel, BigCheck } from '../components/ui.jsx'

/* Server component. In Next.js 15 `searchParams` is async. */
export default async function SuccessPage({ searchParams }) {
  const sp = await searchParams

  // Opened directly without a submission? Send back to the form.
  if (!sp?.name) redirect('/apply')

  const firstName = sp.name.split(' ')[0]

  return (
    <div className="page">
      <div className="card">
        <BrandPanel />
        <div className="form-wrap">
          <div className="success">
            <div className="tick"><BigCheck /></div>
            <h2>Application received</h2>
            <p>Thanks, {firstName}. We&rsquo;ve logged your details and will be in touch soon.</p>
            <div className="summary">
              <div><span>Email</span><span>{sp.email}</span></div>
              <div><span>Phone</span><span>{sp.phone}</span></div>
              <div><span>Qualification</span><span>{sp.qualification}</span></div>
              <div><span>Experience</span><span>{sp.experience} yr(s)</span></div>
              <div><span>Skills</span><span>{sp.skills}</span></div>
              <div><span>CV</span><span>{sp.cv}</span></div>
            </div>
            <a className="link-btn" href="/apply">Submit another application</a>
          </div>
        </div>
      </div>
    </div>
  )
}
