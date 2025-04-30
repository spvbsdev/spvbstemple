export const dynamic = 'force-static'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      {children}
    </div>
  )
} 