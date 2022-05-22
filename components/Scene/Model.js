import React, { useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import getCellPosition from "./getCellPosition"

export default function Model({ url, index }) {
  const { nodes } = useGLTF(url)
  let meshes = []
  const handlePointerEnter = (e) => {
    e.srcElement.style.cursor = "pointer"
  }
  const handlePointerLeave = (e) => {
    e.srcElement.style.cursor = "auto"
  }
  meshes = nodes.Scene.children.map((mesh) => {
    return (
      <mesh
        geometry={mesh.geometry}
        castShadow
        receiveShadow
        key={mesh.geometry.uuid}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <meshStandardMaterial side={2} color="pink" />
      </mesh>
    )
  })
  //   }

  return (
    <group
      dispose={null}
      rotation={[0, -Math.PI / 4, 0]}
      scale={[0.4, 0.4, 0.4]}
      position={[getCellPosition(index).x, 0, getCellPosition(index).z]}
    >
      {meshes}
    </group>
  )
}
