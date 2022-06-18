import React, { useEffect, useRef } from "react"
import { useGLTF, Edges } from "@react-three/drei"
import getCellPosition from "./getCellPosition"
import useNavigationState from "../../state/NavigationState"

export default function Model({ url, index, router, target, root }) {
  const state = useNavigationState()
  const { nodes } = useGLTF(url)
  const ref = useRef()
  // useEffect(() => {
  //   console.log(index)
  // })
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
        <meshStandardMaterial side={2} color="lightgrey" />
        <Edges />
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
      ref={ref}
    >
      {meshes}
    </group>
  )
}
