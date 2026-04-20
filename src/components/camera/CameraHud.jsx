import React, { useState, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function CameraHUD({ updateRate = 10 }) {

    const { camera } = useThree();


    const [info, setInfo] = useState({
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2),
        fov: camera.fov.toFixed(2)
    });

    
    const counter = useRef(0);
    useFrame(() => {
        counter.current = (counter.current + 1) % Math.max(1, updateRate);
        
        if (counter.current !== 0) return;
        setInfo({
            x: camera.position.x.toFixed(2),
            y: camera.position.y.toFixed(2),
            z: camera.position.z.toFixed(2),
            fov: camera.fov.toFixed(2)
        })
    })

    return (
        <Html fullscreen>
            <div className='p-4'>
                <h1>Camera Position</h1>
                <p>FOV: {info.fov}</p>
                <p>X: {info.x}</p>
                <p>Y: {info.y}</p>
                <p>Z: {info.z}</p>
            </div>
        </Html>
    )

//   return (
//     <Html fullscreen>
//       <div style={{
//         position: 'fixed',
//         left: 0,
//         top: 0,
//         background: 'rgba(0,0,0,0.6)',
//         color: '#fff',
//         padding: '6px 8px',
//         borderRadius: 6,
//         fontSize: 12,
//         pointerEvents: 'none',
//         zIndex: 9999
//       }}>
//         <div>Camera: {info.x}, {info.y}, {info.z}</div>
//         <div>FOV: {info.fov}</div>
//       </div>
//     </Html>
//   )
}