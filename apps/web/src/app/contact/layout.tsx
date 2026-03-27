import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'संपर्क करें — News Potli',
  description: 'News Potli से संपर्क करें। विज्ञापन, साझेदारी, या कोई सवाल — हम आपकी मदद के लिए तैयार हैं।',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
