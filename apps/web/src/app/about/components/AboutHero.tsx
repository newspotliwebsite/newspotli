import Image from 'next/image'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5C0F0F] to-[#8B1A1A] py-12 md:py-16 px-4 md:px-12 lg:px-24">
      <Image
        src="/images/illustrations/about-journalism-field.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.10] pointer-events-none mix-blend-soft-light"
        aria-hidden="true"
      />

      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="font-noto text-4xl md:text-5xl font-bold text-white leading-[1.2] text-balance">
          भारत के किसानों और गांवों की आवाज़
        </h1>
      </div>
    </section>
  )
}
