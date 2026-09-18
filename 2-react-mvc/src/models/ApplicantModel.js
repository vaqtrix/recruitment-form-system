/* ================= MODEL =================
   Defines the applicant data shape, the option lists,
   and all validation rules. No UI code lives here.
   ========================================= */

export const QUALIFICATIONS = ['Matriculation', 'Intermediate', "Bachelor's", "Master's", 'PhD']
export const SKILLS = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'UI / UX']
export const MAX_CV_MB = 5

export const emptyApplicant = () => ({
  fullName: '', email: '', phone: '', gender: '',
  qualification: '', experience: '', skills: [], cv: null,
})

export function validateApplicant(data) {
  const errors = {}

  if (!data.fullName.trim()) errors.fullName = 'Please enter your full name.'
  else if (data.fullName.trim().length < 3) errors.fullName = 'Name must be at least 3 characters.'

  if (!data.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.'

  if (!data.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!/^[+]?[\d\s-]{7,15}$/.test(data.phone)) errors.phone = 'Enter a valid phone number (7–15 digits).'

  if (!data.gender) errors.gender = 'Please select your gender.'
  if (!data.qualification) errors.qualification = 'Please choose a qualification.'

  if (data.experience === '') errors.experience = 'Please enter your experience.'
  else if (Number(data.experience) < 0) errors.experience = 'Experience cannot be negative.'

  if (data.skills.length === 0) errors.skills = 'Select at least one skill.'

  if (!data.cv) errors.cv = 'Please upload your CV.'
  else if (!/\.(pdf|doc|docx)$/i.test(data.cv.name)) errors.cv = 'CV must be a .pdf, .doc or .docx file.'
  else if (data.cv.size > MAX_CV_MB * 1024 * 1024) errors.cv = `CV must be under ${MAX_CV_MB} MB.`

  return { errors, isValid: Object.keys(errors).length === 0 }
}
