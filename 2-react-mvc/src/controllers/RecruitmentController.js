/* ================= CONTROLLER =================
   Owns state, wires user events to the model, and
   decides navigation. Views call these handlers;
   they never touch validation logic directly.
   ============================================== */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { emptyApplicant, validateApplicant } from '../models/ApplicantModel.js'

export function useRecruitmentController() {
  const navigate = useNavigate()
  const [data, setData] = useState(emptyApplicant())
  const [errors, setErrors] = useState({})

  const setField = (key, value) => setData((d) => ({ ...d, [key]: value }))

  const toggleSkill = (skill) =>
    setData((d) => ({
      ...d,
      skills: d.skills.includes(skill)
        ? d.skills.filter((s) => s !== skill)
        : [...d.skills, skill],
    }))

  const submit = (ev) => {
    ev.preventDefault()
    const { errors, isValid } = validateApplicant(data)
    setErrors(errors)
    if (isValid) {
      // hand a serialisable summary to the success route
      navigate('/success', {
        state: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          qualification: data.qualification,
          experience: data.experience,
          skills: data.skills,
          cvName: data.cv?.name,
        },
      })
    }
  }

  return { data, errors, setField, toggleSkill, submit }
}
