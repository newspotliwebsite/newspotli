import Image from 'next/image'

export default function OrganizationSection() {
  return (
    <section className="bg-cream py-16 md:py-20 px-4 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="flex flex-col items-center text-center lg:sticky lg:top-24">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <Image
                src="/images/logos/logo-hindi.png"
                alt="News Potli logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 224px, 288px"
              />
            </div>
            <h2 className="font-noto text-2xl font-bold text-charcoal mt-6">
              न्यूज़ पोटली
            </h2>
            <p className="font-source text-sm text-charcoal/50 uppercase tracking-wide mt-1">
              Independent Media House
            </p>
          </div>

          <div className="space-y-5 font-source text-base text-charcoal/80 leading-relaxed">
            <p>
              News Potli is one of India&apos;s fastest-growing multi-digital platforms focused on rural India, bringing stories from the ground to the national conversation. Founded by rural journalist and Pulitzer Fellow Arvind Shukla, the platform is rooted in credible, on-ground journalism that highlights the realities, challenges, and innovations of Rural India.
            </p>
            <p>
              We report from where India is often unseen: villages, farms, and tribal regions. Our work focuses on agriculture, women&apos;s empowerment, climate change, and grassroots innovation, capturing a side of India that is real, urgent, and deeply consequential.
            </p>
            <p>
              At a time when narratives are often driven from studios, News Potli stands firmly in the field. Our journalism is impact-driven, aimed not just at informing but at influencing policy, sparking dialogue, and inspiring change. We don&apos;t just tell stories; we ensure they are heard where it matters.
            </p>
            <p>
              What truly sets us apart is our independence. News Potli is not backed by corporations, investors, or institutions. It is an independent media house. This allows us to stay honest, fearless, and accountable only to the people whose stories we tell.
            </p>
            <p>
              Beyond journalism, News Potli is also a full-scale production house creating powerful, purpose-led content. From documentaries and branded films to digital campaigns, music videos, and advertisements, we collaborate with organisations and brands to craft narratives that connect with real India, not as a market, but as a lived experience.
            </p>
            <p>
              Every piece of content we create carries one commitment: authenticity. Because for us, storytelling is not just about content – it&apos;s about impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
