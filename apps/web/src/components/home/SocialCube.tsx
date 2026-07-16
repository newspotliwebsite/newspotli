import Link from 'next/link'

// One face per platform. `face` carries the 3D transform that positions it on
// the cube; Tailwind has no 3D-transform utilities, so these use arbitrary
// properties rather than inline styles (see CLAUDE.md rule 2).
const FACES = [
  {
    name: 'YouTube',
    icon: '▶',
    url: 'https://www.youtube.com/@newspotli',
    bg: 'bg-[#FF0000]',
    face: '[transform:translateZ(60px)]',
  },
  {
    name: 'Instagram',
    icon: '📷',
    url: 'https://www.instagram.com/newspotli/',
    bg: 'bg-[#E4405F]',
    face: '[transform:rotateY(180deg)_translateZ(60px)]',
  },
  {
    name: 'Facebook',
    icon: 'f',
    url: 'https://www.facebook.com/Potlinews/',
    bg: 'bg-[#1877F2]',
    face: '[transform:rotateY(90deg)_translateZ(60px)]',
  },
  {
    name: 'X',
    icon: '𝕏',
    url: 'https://x.com/PotliNews',
    bg: 'bg-black',
    face: '[transform:rotateY(-90deg)_translateZ(60px)]',
  },
  {
    name: 'LinkedIn',
    icon: 'in',
    url: 'https://www.linkedin.com/in/potlinews/',
    bg: 'bg-[#0A66C2]',
    face: '[transform:rotateX(90deg)_translateZ(60px)]',
  },
  {
    name: 'News Potli',
    icon: 'NP',
    url: 'https://newspotli.com',
    bg: 'bg-[#5C0F0F]',
    face: '[transform:rotateX(-90deg)_translateZ(60px)]',
  },
] as const

export default function SocialCube() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <p className="font-source text-xs text-charcoal/40 uppercase tracking-widest mb-4">
        Follow Us
      </p>

      <div className="w-[120px] h-[120px] [perspective:600px]">
        {/* motion-reduce halts the spin for users who ask for less motion —
            a 12s perpetual rotation is exactly what that setting is for. */}
        <div className="relative w-[120px] h-[120px] [transform-style:preserve-3d] animate-cubeRotate motion-reduce:animate-none">
          {FACES.map((f) => (
            <Link
              key={f.name}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={f.name}
              className={`absolute w-[120px] h-[120px] flex items-center justify-center rounded-2xl text-white text-[32px] font-bold ${f.bg} ${f.face}`}
            >
              <span aria-hidden="true">{f.icon}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
