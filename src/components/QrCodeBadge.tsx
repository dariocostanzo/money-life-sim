import { QRCodeSVG } from 'qrcode.react'

const DEMO_URL = 'https://money-life-sim.vercel.app'

export function QrCodeBadge() {
  return (
    <aside
      aria-label="Play on your phone"
      className="fixed bottom-4 right-4 z-30 hidden flex-col items-center gap-2 rounded-2xl border-4 border-white bg-white p-4 shadow-2xl lg:flex"
    >
      <p className="text-sm font-extrabold text-indigo-900">
        <span aria-hidden="true">📱</span> Play on your phone
      </p>
      <QRCodeSVG value={DEMO_URL} size={128} aria-hidden="true" />
      <p className="text-xs font-medium text-indigo-700">{DEMO_URL.replace('https://', '')}</p>
    </aside>
  )
}
