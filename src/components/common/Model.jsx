import React, { useMemo, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

export default function Model({ path, align = 'floor', castShadow = true, receiveShadow = true, onLoad, ...props }) {
  const { scene } = useGLTF(path)

  // clone once per instance — prevents mutating the shared cached scene
  const clone = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    if (!clone) return

    // setup shadows
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
      }
    })

    // compute bounding box on the clone
    const box = new Box3().setFromObject(clone)
    const center = new Vector3()
    const size = new Vector3()
    box.getCenter(center)
    box.getSize(size)

    // apply a local centering offset to the clone only (not the shared scene)
    const offsetY = align === 'floor' ? -box.min.y : -center.y
    clone.position.set(-center.x, offsetY, -center.z)

    if (typeof onLoad === 'function') {
      onLoad({ size, center, box })
    }
  }, [clone, align, castShadow, receiveShadow, onLoad])

  // pass position/rotation/scale directly to the outer group via ...props
  return (
    <group {...props}>
      <primitive object={clone} />
    </group>
  )
}

export function preload(path) {
  useGLTF.preload(path)
}