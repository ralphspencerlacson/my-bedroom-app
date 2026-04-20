import React, { useState } from 'react'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function CameraTools({ presets = [{ name: 'Iso', pos: [220,180,220] }, { name: 'Top', pos: [0,300,0] }] }) {
  const { camera } = useThree()
  const [inputs, setInputs] = useState({
    x: camera.position.x.toFixed(2),
    y: camera.position.y.toFixed(2),
    z: camera.position.z.toFixed(2)
  })

  function snap(pos) {
    camera.position.set(pos[0], pos[1], pos[2])
    camera.lookAt(0, 0, 0)
    // If using OrbitControls, also update its target (see note)
    setInputs({ x: pos[0].toFixed(2), y: pos[1].toFixed(2), z: pos[2].toFixed(2) })
  }

  function applyInputs() {
    const nx = parseFloat(inputs.x) || 0
    const ny = parseFloat(inputs.y) || 0
    const nz = parseFloat(inputs.z) || 0
    camera.position.set(nx, ny, nz)
    camera.lookAt(0, 0, 0)
  }

  return (
    <Html fullscreen>
      <div style={{
        position: 'fixed',
        right: 12,
        top: 12,
        background: 'rgba(255,255,255,0.85)',
        color: '#111',
        padding: 8,
        borderRadius: 6,
        fontSize: 12,
        zIndex: 9999
      }}>
        <div style={{ marginBottom: 6 }}>
          {presets.map(p => (
            <button key={p.name} onClick={() => snap(p.pos)} style={{ marginRight: 6 }}>{p.name}</button>
          ))}
        </div>
        <div>
          <input style={{ width: 60 }} value={inputs.x} onChange={e => setInputs(v => ({ ...v, x: e.target.value }))} />{' '}
          <input style={{ width: 60 }} value={inputs.y} onChange={e => setInputs(v => ({ ...v, y: e.target.value }))} />{' '}
          <input style={{ width: 60 }} value={inputs.z} onChange={e => setInputs(v => ({ ...v, z: e.target.value }))} />{' '}
          <button onClick={applyInputs}>Set</button>
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: '#666' }}>
          Note: if you use OrbitControls, update its target/ref after snapping.
        </div>
      </div>
    </Html>
  )
}