import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'खोजें — News Potli',
  description: 'News Potli पर खेती, किसान, मौसम, सरकारी योजना और बाजार की खबरें खोजें।',
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
