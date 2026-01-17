"use client"

export const dynamic = 'force-dynamic'

import ShaderBackground from "@/components/shader-background"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ShaderBackground>
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </ShaderBackground>
  )
}
