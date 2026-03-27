import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'हमारे साझेदार — News Potli',
  description: 'News Potli के विश्वसनीय साझेदार — World Bank, BCG, Jain Irrigation, Escorts Kubota और अन्य संगठनों के साथ मिलकर ग्रामीण भारत की आवाज़ बन रहे हैं।',
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children
}
