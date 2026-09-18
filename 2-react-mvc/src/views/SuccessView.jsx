/* ================= VIEW: Success =================
   Shown after a valid submit. Reads the summary that
   the controller passed through the router state.
   ================================================= */

import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { BrandPanel, BigCheck } from './Shared.jsx'

export default function SuccessView() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // If someone opens /success directly, send them back to the form.
  if (!state) return <Navigate to="/apply" replace />

  return (
    <div className="page">
      <div className="card">
        <BrandPanel />
        <div className="form-wrap">
          <div className="success">
            <div className="tick"><BigCheck /></div>
            <h2>Application received</h2>
            <p>Thanks, {state.fullName.split(' ')[0]}. We&rsquo;ve logged your details and will be in touch soon.</p>
            <div className="summary">
              <div><span>Email</span><span>{state.email}</span></div>
              <div><span>Phone</span><span>{state.phone}</span></div>
              <div><span>Qualification</span><span>{state.qualification}</span></div>
              <div><span>Experience</span><span>{state.experience} yr(s)</span></div>
              <div><span>Skills</span><span>{state.skills.join(', ')}</span></div>
              <div><span>CV</span><span>{state.cvName}</span></div>
            </div>
            <button className="link-btn" onClick={() => navigate('/apply')}>
              Submit another application
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
