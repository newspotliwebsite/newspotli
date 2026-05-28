'use client'

import { useEffect, useRef, useState } from 'react'

const MILESTONES = [
  { year: '2006', label: 'पत्रकारिता की शुरुआत', desc: 'अरविंद ने हिंदुस्तान से पत्रकारिता की शुरुआत की।' },
  { year: '2010', label: 'टीवी और प्रिंट', desc: 'अमर उजाला और TV चैनलों में ग्रामीण पत्रकारिता।' },
  { year: '2016', label: 'Gaon Connection', desc: 'गाँव कनेक्शन में Associate Editor के रूप में जुड़े।' },
  { year: '2018', label: 'News Potli की स्थापना', desc: 'News Potli की नींव — YouTube पर शुरुआत।' },
  { year: '2021', label: 'Pulitzer Grant', desc: 'Pulitzer Center Grant मिला — कृषि और जलवायु पर रिपोर्टिंग।' },
  { year: '2023', label: '2.66 लाख Subscribers', desc: '2,66,000+ YouTube subscribers — एक नया कीर्तिमान।' },
  { year: '2026', label: 'वेबसाइट लॉन्च', desc: 'न्यूज़ पोटली वेबसाइट लॉन्च — newspotli.com।' },
]

export default function JourneyTimeline() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-white py-20 md:py-28 px-4 md:px-12 lg:px-24 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="font-source text-[11px] font-black tracking-[0.25em] uppercase text-charcoal/40 block mb-3">
              Our Journey
            </span>
            <h2 className="font-noto text-4xl md:text-5xl font-bold text-charcoal">
              2006 – 2026<span className="text-gold">.</span>
            </h2>
          </div>
          <p className="font-noto text-charcoal/50 text-sm max-w-xs leading-relaxed">
            दो दशकों की यात्रा, एक मिशन के साथ — ग्रामीण भारत की सच्ची आवाज़ बनना।
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-charcoal/10 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-maroon to-gold -translate-y-1/2 transition-all duration-[2000ms] ease-out"
              style={{ width: visible ? '100%' : '0%' }}
            />

            <div className="relative flex justify-between">
              {MILESTONES.map((m, i) => {
                const above = i % 2 === 0
                return (
                  <div
                    key={m.year}
                    className={`flex flex-col items-center transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {above ? (
                      <div className="mb-3 text-center w-32">
                        <p className="font-source text-[10px] font-black tracking-wider text-maroon uppercase mb-1">{m.label}</p>
                        <p className="font-noto text-[11px] text-charcoal/50 leading-tight">{m.desc}</p>
                      </div>
                    ) : (
                      <div className="mb-3 h-14" />
                    )}

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-gold border-2 border-white shadow-md shadow-gold/30" />
                      <span className="font-source text-[10px] font-black text-charcoal mt-1.5">{m.year}</span>
                    </div>

                    {!above ? (
                      <div className="mt-3 text-center w-32">
                        <p className="font-source text-[10px] font-black tracking-wider text-maroon uppercase mb-1">{m.label}</p>
                        <p className="font-noto text-[11px] text-charcoal/50 leading-tight">{m.desc}</p>
                      </div>
                    ) : (
                      <div className="mt-3 h-14" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-charcoal/10" />
          <div
            className="absolute left-4 top-0 w-0.5 bg-gradient-to-b from-maroon to-gold transition-all duration-[2000ms] ease-out"
            style={{ height: visible ? '100%' : '0%' }}
          />

          <div className="space-y-8 pl-12">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`relative transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute -left-[36px] top-1 w-4 h-4 rounded-full bg-gold border-2 border-white shadow-sm z-10" />
                <span className="font-source text-[11px] font-black text-gold block mb-1">{m.year}</span>
                <h3 className="font-source font-black text-sm text-charcoal uppercase tracking-wide mb-1">{m.label}</h3>
                <p className="font-noto text-sm text-charcoal/55 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
