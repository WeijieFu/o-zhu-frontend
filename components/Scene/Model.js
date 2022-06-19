import React, { useEffect, useRef } from "react"
import { useGLTF, Edges } from "@react-three/drei"
import getCellPosition from "./getCellPosition"
import useNavigationState from "../../state/NavigationState"
import GUI from "lil-gui"
import { useFrame } from "@react-three/fiber"

export default function Model({ url, index, router, target, root, params }) {
  const state = useNavigationState()
  const { nodes } = useGLTF(url)
  const ref = useRef()
  console.log(nodes)
  let meshes = []
  const handlePointerEnter = (e) => {
    e.srcElement.style.cursor = "pointer"
  }
  const handlePointerLeave = (e) => {
    e.srcElement.style.cursor = "auto"
  }
  const handleClick = (e) => {
    state.setCurrentSorting("")
    router.push(`${root}/${target.toLowerCase()}`)
  }
  meshes = nodes.Scene.children.map((mesh) => {
    console.log(mesh)
    return (
      <mesh
        geometry={mesh.geometry}
        castShadow
        receiveShadow
        key={mesh.geometry.uuid}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        <meshStandardMaterial side={2} color={params.objectColor} />
        <Edges scale={1.0} />
      </mesh>
    )
  })
  //   }

  return (
    <group
      dispose={null}
      rotation={[Math.PI / 2, 0, -Math.PI / 4]}
      scale={[1.2, 1.2, 1.2]}
      position={[getCellPosition(index).x, 0, getCellPosition(index).z]}
      ref={ref}
    >
      {meshes}
    </group>
  )
}
