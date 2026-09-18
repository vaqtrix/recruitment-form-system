import './globals.css'

export const metadata = {
  title: 'Recruitment Form · Next.js',
  description: 'Recruitment application form built with Next.js (App Router).',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
