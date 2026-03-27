import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'वीडियो — News Potli',
  description: 'ग्रामीण भारत की सच्ची कहानियाँ वीडियो में। खेती, किसान, मौसम, सरकारी योजना और बाजार — News Potli YouTube चैनल।',
}

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return children
}
