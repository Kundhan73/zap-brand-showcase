import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A soft round sprite for each bubble, drawn once to a canvas.
function makeBubbleTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(32, 26, 2, 32, 32, 30)
  g.addColorStop(0, 'rgba(255,255,255,0.95)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.5)')
  g.addColorStop(0.7, 'rgba(255,255,255,0.12)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(32, 32, 30, 0, Math.PI * 2)
  ctx.fill()
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export default function Bubbles({ count = 140, color = '#ffffff' }) {
  const points = useRef()
  const texture = useMemo(makeBubbleTexture, [])

  const { positions, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1
      speeds[i] = 0.3 + Math.random() * 0.9
      sizes[i] = 0.06 + Math.random() * 0.22
    }
    return { positions, speeds, sizes }
  }, [count])

  useFrame((_, delta) => {
    const geo = points.current?.geometry
    if (!geo) return
    const dt = Math.min(delta, 0.05)
    const arr = geo.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * dt
      arr[i * 3] += Math.sin(arr[i * 3 + 1] * 0.6 + i) * dt * 0.12
      if (arr[i * 3 + 1] > 7.5) {
        arr[i * 3 + 1] = -7.5
        arr[i * 3] = (Math.random() - 0.5) * 18
      }
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color={color}
        size={0.28}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
