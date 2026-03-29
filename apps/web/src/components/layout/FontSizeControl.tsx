'use client'

import { useState, useEffect } from 'react'

const SIZES = [
  { label: 'A', value: 'normal', css: '17px' },
  { label: 'A+', value: 'large', css: '20px' },
  { label: 'A++', value: 'xlarge', css: '23px' },
] as const

type FontSize = typeof SIZES[number]['value']

const STORAGE_KEY = 'np-font-size'

export default function FontSizeControl() {
  const [size, setSize] = useState<FontSize>('normal')

  // Load saved preference
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as FontSize | null
    if (saved && SIZES.some((s) => s.value === saved)) {
      setSize(saved)
      applySize(saved)
    }
  }, [])

  function applySize(value: FontSize) {
    const sizeConfig = SIZES.find((s) => s.value === value)
    if (sizeConfig) {
      document.documentElement.style.setProperty('--article-font-size', sizeConfig.css)
    }
  }

  function handleChange(value: FontSize) {
    setSize(value)
    applySize(value)
    localStorage.setItem(STORAGE_KEY, value)
  }

  return (
    <div className="flex items-center gap-0.5 border border-white/10 rounded-sm overflow-hidden">
      {SIZES.map((s) => (
        <button
          key={s.value}
          onClick={() => handleChange(s.value)}
          className={`px-1.5 py-0.5 text-[10px] font-source font-bold transition-colors ${
            size === s.value
              ? 'bg-gold text-white'
              : 'text-cream/50 hover:text-cream/80'
          }`}
          aria-label={`Font size ${s.label}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
