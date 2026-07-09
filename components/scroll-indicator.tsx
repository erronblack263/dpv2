'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY < 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 text-muted-foreground">
      {/* vertical line */}
      <div className="w-px h-16 bg-border" />
      {/* bouncing arrows */}
      <div className="animate-bounce flex flex-col items-center">
        <ChevronDown className="size-6" />
        <ChevronDown className="size-6 -mt-3 opacity-50" />
      </div>
      {/* rotated label */}
      <span
        className="text-sm font-semibold tracking-widest uppercase mt-2"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        Scroll Down To View
      </span>
    </div>
  )
}
