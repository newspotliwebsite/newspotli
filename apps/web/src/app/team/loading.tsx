import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TeamLoading() {
  return (
    <>
      <Header />
      <main className="bg-cream">
        {/* Hero skeleton */}
        <section className="bg-cream border-b border-charcoal/8 py-12 md:py-16 px-4 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mx-auto h-10 w-48 rounded-lg bg-charcoal/10 animate-pulse" />
            <div className="mx-auto mt-6 h-[2px] w-16 bg-gold/40" />
          </div>
        </section>

        {/* Grid skeleton */}
        <section className="py-16 md:py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <div className="aspect-[4/5] bg-charcoal/10 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-3/4 rounded bg-charcoal/10 animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-charcoal/10 animate-pulse" />
                    <div className="h-3 w-full rounded bg-charcoal/10 animate-pulse" />
                    <div className="h-3 w-5/6 rounded bg-charcoal/10 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
