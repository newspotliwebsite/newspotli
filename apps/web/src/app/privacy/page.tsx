import { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — News Potli',
  description: 'News Potli is committed to protecting the privacy of our audience, contributors, partners, and visitors.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <h1 className="font-noto text-4xl md:text-5xl font-bold text-charcoal mb-10">
            Privacy Policy
          </h1>

          <div className="font-source text-charcoal text-base leading-relaxed space-y-6">
            <p>
              News Potli is committed to protecting the privacy of our audience, contributors, partners, and visitors. We may collect basic information such as your name, email address, phone number, and location when you subscribe, fill out forms, or interact with our platform.
            </p>

            <h2 className="font-noto text-2xl font-bold text-charcoal mt-10">
              How We Use Your Information
            </h2>
            <p>We use this information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide newsletters, updates, and editorial content</li>
              <li>Share information about our stories, campaigns, events, and publications</li>
              <li>Improve user experience and tailor content to audience interests</li>
              <li>Analyze engagement to strengthen our content and outreach</li>
            </ul>
            <p>
              We do not sell, rent, or share your personal data with third parties without your consent. Any payments are processed through secure third-party providers, and we do not store financial information.
            </p>
            <p>
              You can opt out of emails at any time using the unsubscribe link or by contacting us at{' '}
              <a href="mailto:newspotlioffice@gmail.com" className="text-maroon font-bold hover:text-gold transition-colors">
                newspotlioffice@gmail.com
              </a>
              . You may also request correction or deletion of your data.
            </p>

            <h2 className="font-noto text-2xl font-bold text-charcoal mt-10">
              Legal Compliance
            </h2>
            <p>
              We may disclose personal information if required by law. Wherever possible, we will notify you in advance unless legally restricted.
            </p>

            <h2 className="font-noto text-2xl font-bold text-charcoal mt-10">
              Policy Updates
            </h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page, and continued use of our platform indicates your acceptance.
            </p>
            <p>
              We take reasonable steps to protect your information, though no system is completely secure.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
