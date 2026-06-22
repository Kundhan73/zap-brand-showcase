import { useRef, useMemo, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createCanLabel } from './canTexture.js'

/**
 * A single procedural soda can you can grab, drag and throw. When released it
 * springs back to its home position with a toy-like bounce.
 */
export default function SodaCan({
  flavor,
  home = [0, 0, 0],
  scale = 1,
  spin = 0.3,
  draggable = true,
  onGrab,
}) {
  const group = useRef()
  const { camera, gl } = useThree()

  const homeVec = useMemo(() => new THREE.Vector3(...home), [home])
  const velocity = useRef(new THREE.Vector3())
  const dragging = useRef(false)
  const dragPlane = useRef(new THREE.Plane())
  const raycaster = useRef(new THREE.Raycaster())
  const ndc = useRef(new THREE.Vector2())
  const hit = useRef(new THREE.Vector3())
  const offset = useRef(new THREE.Vector3())
  const worldPos = useRef(new THREE.Vector3())
  const phase = useRef(Math.random() * Math.PI * 2)
  const spinSpeed = useRef(spin)

  const texture = useMemo(() => createCanLabel(flavor), [flavor])
  const capMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#d9dde3', metalness: 1, roughness: 0.28 }),
    []
  )
  const bodyMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: texture, metalness: 0.45, roughness: 0.32 }),
    [texture]
  )

  // Keep home position in sync if props change (e.g. responsive relayout).
  useEffect(() => {
    homeVec.set(...home)
  }, [home, homeVec])

  function pointerToPlane(clientX, clientY) {
    const rect = gl.domElement.getBoundingClientRect()
    ndc.current.x = ((clientX - rect.left) / rect.width) * 2 - 1
    ndc.current.y = -((clientY - rect.top) / rect.height) * 2 + 1
    raycaster.current.setFromCamera(ndc.current, camera)
    raycaster.current.ray.intersectPlane(dragPlane.current, hit.current)
    return hit.current
  }

  function handleMove(e) {
    if (!dragging.current || !group.current) return
    // World hit point -> the can's parent (parallax group) local space, so the
    // can tracks the cursor even while the parallax rig is rotated/offset.
    const world = pointerToPlane(e.clientX, e.clientY)
    const local = group.current.parent.worldToLocal(world.clone()).add(offset.current)
    velocity.current.copy(local).sub(group.current.position).multiplyScalar(10)
    group.current.position.copy(local)
  }

  function handleUp() {
    dragging.current = false
    document.body.classList.remove('grabbing')
    window.removeEventListener('pointermove', handleMove)
    window.removeEventListener('pointerup', handleUp)
  }

  function handleDown(e) {
    if (!draggable || !group.current) return
    e.stopPropagation()
    dragging.current = true
    document.body.classList.add('grabbing')
    spinSpeed.current = 1.4

    const camDir = new THREE.Vector3()
    camera.getWorldDirection(camDir)
    group.current.getWorldPosition(worldPos.current)
    // Drag plane sits at the can's depth, facing the camera (world space).
    dragPlane.current.setFromNormalAndCoplanarPoint(camDir.negate(), worldPos.current)

    const world = pointerToPlane(e.clientX, e.clientY)
    const local = group.current.parent.worldToLocal(world.clone())
    offset.current.copy(group.current.position).sub(local)
    velocity.current.set(0, 0, 0)
    onGrab?.(flavor.pitch || 1)

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
  }

  useEffect(
    () => () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    },
    []
  )

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime

    if (!dragging.current) {
      // Spring back toward home.
      const fx = (homeVec.x - g.position.x) * 60
      const fy = (homeVec.y - g.position.y) * 60
      const fz = (homeVec.z - g.position.z) * 60
      velocity.current.x += fx * dt
      velocity.current.y += fy * dt
      velocity.current.z += fz * dt
      velocity.current.multiplyScalar(0.9)
      g.position.x += velocity.current.x * dt
      g.position.y += velocity.current.y * dt + Math.sin(t * 1.1 + phase.current) * 0.0022
      g.position.z += velocity.current.z * dt
      spinSpeed.current = THREE.MathUtils.lerp(spinSpeed.current, spin, 0.04)
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, Math.sin(t * 0.7 + phase.current) * 0.12, 0.05)
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, Math.sin(t * 0.5 + phase.current) * 0.08, 0.05)
    } else {
      g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, THREE.MathUtils.clamp(velocity.current.x * 0.06, -0.5, 0.5), 0.2)
    }
    g.rotation.y += spinSpeed.current * dt
  })

  return (
    <group
      ref={group}
      position={home}
      scale={scale}
      onPointerDown={handleDown}
      onPointerOver={() => draggable && document.body.classList.add('grab-hover')}
      onPointerOut={() => document.body.classList.remove('grab-hover')}
    >
      {/* Body (open-ended cylinder carries the wrap-around label) */}
      <mesh material={bodyMat}>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 64, 1, true]} />
      </mesh>
      {/* Subtle inner shadow shell so the can does not look hollow from edges */}
      <mesh scale={[0.985, 1, 0.985]}>
        <cylinderGeometry args={[0.5, 0.5, 1.49, 48, 1, true]} />
        <meshBasicMaterial color={flavor.text} side={THREE.BackSide} />
      </mesh>
      {/* Top cap, slightly inset */}
      <mesh position={[0, 0.74, 0]} material={capMat}>
        <cylinderGeometry args={[0.46, 0.5, 0.06, 64]} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -0.74, 0]} material={capMat}>
        <cylinderGeometry args={[0.5, 0.45, 0.07, 64]} />
      </mesh>
      {/* Top rim */}
      <mesh position={[0, 0.77, 0]} rotation={[Math.PI / 2, 0, 0]} material={capMat}>
        <torusGeometry args={[0.45, 0.03, 12, 48]} />
      </mesh>
      {/* Pull tab */}
      <mesh position={[0, 0.8, 0.12]} rotation={[Math.PI / 2, 0, 0]} material={capMat}>
        <torusGeometry args={[0.12, 0.02, 8, 24]} />
      </mesh>
    </group>
  )
}
