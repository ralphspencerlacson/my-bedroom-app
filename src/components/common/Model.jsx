import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

export default function Model({ path, align = 'floor', castShadow = true, receiveShadow = true, onLoad, ...props }) {
  const { scene } = useGLTF(path)

  // clone the scene for this component instance so multiple instances don't share the same object
  const clonedScene = useMemo(() => (scene ? scene.clone(true) : null), [scene])
  const primitiveRef = useRef()
  const groupRef = useRef()

  useEffect(() => {
    const obj = primitiveRef.current
    if (!obj) return

    // enable shadows on meshes
    obj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
      }
    })

    // compute bounding box to center/align the model
    const box = new Box3().setFromObject(obj)
    const center = new Vector3()
    const size = new Vector3()
    box.getCenter(center)
    box.getSize(size)

    // compute local offset so model is centered on X/Z and aligned vertically
    const offset = [ -center.x, align === 'floor' ? -box.min.y : -center.y, -center.z ]

    // apply local offset to primitive (don't mutate original scene positions)
    obj.position.set(offset[0], offset[1], offset[2])

    // optional callback with useful info
    if (typeof onLoad === 'function') {
      onLoad({ scene: obj, bounds: box, size, center, offset })
    }
  }, [clonedScene, castShadow, receiveShadow, align, onLoad])

  return (
    <group ref={groupRef} {...props}>
      {clonedScene ? <primitive ref={primitiveRef} object={clonedScene} /> : null}
    </group>
  )
}

export function preload(path) {
  // Preload a model so it starts fetching early
  useGLTF.preload(path)
}
