import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import SodaCan from './SodaCan.jsx'
import Bubbles from './Bubbles.jsx'

/** Group that eases toward the pointer for a parallax / look-at effect. */
function ParallaxRig({ children, enabled = true }) {
  const group = useRef()
  const target = useRef({ x: 0, y: 0 })
  const { gl } = useThree()

  useEffect(() => {
    if (!enabled) return
    const el = gl.domElement
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      target.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      target.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [gl, enabled])

  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target.current.x * 0.28, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, target.current.y * 0.18, 0.05)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, target.current.x * 0.4, 0.05)
  })

  return <group ref={group}>{children}</group>
}

function Lights({ a = '#ff2d8e', b = '#46e6ff' }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-6, 2, 4]} intensity={60} distance={30} color={a} />
      <pointLight position={[6, -3, 2]} intensity={50} distance={30} color={b} />
      <pointLight position={[0, 4, -4]} intensity={30} distance={30} color="#ffffff" />
    </>
  )
}

export default function Scene3D({
  cans = [],
  bubbleColor = '#ffffff',
  lightA,
  lightB,
  parallax = true,
  bubbles = 140,
  dpr = [1, 1.8],
  className = '',
  onGrab,
  frameloop = 'always',
}) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      frameloop={frameloop}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      style={{ touchAction: 'pan-y' }}
    >
      <Suspense fallback={null}>
        <Lights a={lightA} b={lightB} />
        <ParallaxRig enabled={parallax}>
          {cans.map((c, i) => (
            <SodaCan
              key={c.key ?? i}
              flavor={c.flavor}
              home={c.home}
              scale={c.scale ?? 1}
              spin={c.spin ?? 0.3}
              draggable={c.draggable ?? true}
              onGrab={onGrab}
            />
          ))}
          <Bubbles count={bubbles} color={bubbleColor} />
        </ParallaxRig>
      </Suspense>
    </Canvas>
  )
}
