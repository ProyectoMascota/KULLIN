import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Kulliñ — Cuida a tu compañero';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f4ede0 0%, #e8d4b0 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Top: brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontSize: 32,
            fontWeight: 800,
            color: '#2d4127',
            letterSpacing: -1,
            fontFamily: 'serif',
          }}>
            kulli<span style={{ color: '#c4623a' }}>ñ</span>
          </span>
        </div>

        {/* Center: tagline + emoji */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{
              width: 140, height: 140, borderRadius: 70,
              background: 'linear-gradient(135deg, #e8d4b0, #d4a843)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 96,
              boxShadow: '0 8px 24px rgba(196, 98, 58, 0.3)',
            }}>
              🐕
            </div>
            <div style={{
              width: 140, height: 140, borderRadius: 70,
              background: 'linear-gradient(135deg, #e8d4b0, #d4a843)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 96,
              marginLeft: -20,
              boxShadow: '0 8px 24px rgba(196, 98, 58, 0.3)',
            }}>
              🐈
            </div>
          </div>

          <h1 style={{
            fontSize: 80,
            color: '#2a2418',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: -2,
            fontFamily: 'serif',
            fontWeight: 500,
            maxWidth: 1000,
          }}>
            Calcula la ración exacta de <span style={{ color: '#c4623a', fontStyle: 'italic' }}>tu compañero</span>.
          </h1>

          <p style={{
            fontSize: 28,
            color: '#6b5e4a',
            margin: 0,
            maxWidth: 900,
          }}>
            Recomendaciones basadas en fórmulas veterinarias NRC 2006. Gratis.
          </p>
        </div>

        {/* Bottom: URL */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 26, color: '#2d4127', fontWeight: 600 }}>
            kullin.app
          </span>
          <span style={{ fontSize: 18, color: '#6b5e4a' }}>
            Hecho en Chile · Para América Latina
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
