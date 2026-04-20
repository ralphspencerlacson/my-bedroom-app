import React from 'react'
import Model, { preload as modelPreload } from '../common/Model'
import { dual_sense } from '../../models/index.js'

export default function DualSenseModel2(props) {
  return (
    <Model
      path={dual_sense}
      align="floor"
      scale={4}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}

export function preload() {
  modelPreload(dual_sense)
}
