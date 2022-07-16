import React, { useEffect, useRef } from "react"
import { useGLTF, Edges } from "@react-three/drei"
import getCellPosition from "./getCellPosition"
import useNavigationState from "../../state/NavigationState"
import GUI from "lil-gui"
import { useFrame } from "@react-three/fiber"

export default function Model({
  url,
  index,
  router,
  target,
  root,
  params,
  scale,
}) {
  const state = useNavigationState()
  const { nodes } = useGLTF(url)
  const ref = useRef()

  useEffect(() => {
    console.log(scale)
  })

  useFrame((state) => {
    const x = 1600 / state.viewport.width
    const y = ((7.75 / 11) * 1600) / state.viewport.height
    const ratio = 2 / x
    // console.log(x, y)
    ref.current.scale.set(
      ratio * x * 0.707,
      ratio * y * 0.707,
      ratio * y * 0.707
    )
    // console.log(ref.current)
    // ref.current.rotation.set(Math.PI / 2, 0, -Math.PI / 4)
  })

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
        rotation={[Math.PI / 2, 0, -Math.PI / 4]}
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
      // scale={[1.4, 1.4, 1.4]}
      position={[getCellPosition(index).x, 0, getCellPosition(index).z]}
      ref={ref}
    >
      {meshes}
    </group>
  )
}
