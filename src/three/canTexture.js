import * as THREE from 'three'

/**
 * Draws a wrap-around soda-can label onto a canvas and returns a CanvasTexture.
 * The canvas is sized to the cylinder's circumference:height ratio so the
 * artwork wraps cleanly with no external image assets.
 */
export function createCanLabel(flavor) {
  const w = 1024
  const h = 512
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')

  // Base flavor field with a soft vertical sheen.
  const grad = ctx.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, shade(flavor.color, 18))
  grad.addColorStop(0.5, flavor.color)
  grad.addColorStop(1, shade(flavor.color, -22))
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)

  // Top + bottom rails.
  ctx.fillStyle = flavor.text
  ctx.globalAlpha = 0.9
  ctx.fillRect(0, 0, w, 46)
  ctx.fillRect(0, h - 46, w, 46)
  ctx.globalAlpha = 1

  // Tiny repeated brand text on rails.
  ctx.fillStyle = flavor.color
  ctx.font = '700 22px "Space Mono", monospace'
  ctx.textBaseline = 'middle'
  const railText = '• ZAP • ELECTRIC CRAFT SODA '
  let rx = -40
  while (rx < w) {
    ctx.fillText(railText, rx, 24)
    ctx.fillText(railText, rx, h - 22)
    rx += ctx.measureText(railText).width
  }

  // Big wordmark, repeated twice so it reads on a rotating can.
  ctx.fillStyle = flavor.text
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < 2; i++) {
    const cx = w * (0.25 + i * 0.5)
    ctx.save()
    ctx.translate(cx, h * 0.42)
    // lightning accent disc behind the wordmark
    ctx.fillStyle = flavor.accent
    roundedRect(ctx, -150, -70, 300, 140, 22)
    ctx.fill()
    ctx.fillStyle = flavor.text
    ctx.font = '900 120px "Unbounded", system-ui, sans-serif'
    ctx.fillText('ZAP', 0, 6)
    ctx.restore()

    // flavor name below
    ctx.fillStyle = flavor.text
    ctx.font = '700 30px "Space Mono", monospace'
    ctx.fillText(flavor.name.toUpperCase(), cx, h * 0.72)
  }

  ctx.textAlign = 'left'

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

// Lighten (amt > 0) or darken (amt < 0) a hex color by a percentage.
function shade(hex, amt) {
  const c = hex.replace('#', '')
  const num = parseInt(c, 16)
  let r = (num >> 16) + Math.round((255 * amt) / 100)
  let g = ((num >> 8) & 0xff) + Math.round((255 * amt) / 100)
  let b = (num & 0xff) + Math.round((255 * amt) / 100)
  r = Math.max(0, Math.min(255, r))
  g = Math.max(0, Math.min(255, g))
  b = Math.max(0, Math.min(255, b))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}
