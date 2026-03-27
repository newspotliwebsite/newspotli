import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'न्यूज़लेटर — News Potli',
  description: 'हर सुबह एक potli भर जानकारी — खेती, मौसम, मंडी भाव और सरकारी योजनाएं सीधे आपके inbox में। मुफ़्त सब्सक्राइब करें।',
}

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children
}
