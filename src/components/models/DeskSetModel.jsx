import React from 'react'
import Model, { preload as modelPreload } from '../common/Model'
import { desk_set } from '../../models/index.js'

export default function DeskSetModel(props) {
  return (
    <Model
      path={desk_set}
      align="floor"
      scale={68}
      rotation={[0, 0, 0]}
      {...props}
    />
  )
}

export function preload() {
  modelPreload(desk_set)
}
