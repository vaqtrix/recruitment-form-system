/* App = the router. It maps URLs to views, keeping the
   MVC pieces (model / view / controller) cleanly separated. */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ApplyView from './views/ApplyView.jsx'
import SuccessView from './views/SuccessView.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/apply" replace />} />
        <Route path="/apply" element={<ApplyView />} />
        <Route path="/success" element={<SuccessView />} />
        <Route path="*" element={<Navigate to="/apply" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
