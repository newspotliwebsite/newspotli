/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'News Potli'
  const category = searchParams.get('category') || ''
  const author = searchParams.get('author') || 'News Potli'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #1A1A1A 0%, #2a0e0e 50%, #8B1A1A 100%)',
          fontFamily: 'serif',
        }}
      >
        {/* Top row: logo + category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#8B1A1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '22px',
                fontWeight: 900,
                fontStyle: 'italic',
              }}
            >
              NP
            </div>
            <span style={{ color: '#FAF6EE', fontSize: '28px', fontWeight: 700 }}>
              News Potli
            </span>
          </div>
          {category && (
            <div
              style={{
                background: '#C8860A',
                color: 'white',
                padding: '8px 24px',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              {category}
            </div>
          )}
        </div>

        {/* Title center */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '4px',
              background: '#C8860A',
            }}
          />
          <h1
            style={{
              color: '#FAF6EE',
              fontSize: title.length > 60 ? '42px' : '52px',
              fontWeight: 900,
              fontStyle: 'italic',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom row: author + watermark */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(250, 246, 238, 0.15)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#5C0F0F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {author
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <span style={{ color: 'rgba(250, 246, 238, 0.7)', fontSize: '18px' }}>
              {author}
            </span>
          </div>
          <span
            style={{
              color: 'rgba(250, 246, 238, 0.4)',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            newspotli.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
