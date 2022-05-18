import React, { useEffect, useRef, useState } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"

import styles from "../../styles/Scene/Scene.module.css"

import getCellPosition from "./getCellPosition"

const position = [0, 10, 10]
const zoom = 1
const top = 8
const bottom = -8
const left = -11
const right = 11

const StudioScene = () => {
  useEffect(() => {
    console.log(getCellPosition(0).x)
    console.log(getCellPosition(0).z)
  })
  return (
    <div className={styles["canvas"]}>
      <Canvas
        onCreated={(state) => {
          state.camera.top = top
          state.camera.bottom = bottom
          state.camera.left = left
          state.camera.right = right
          state.camera.updateProjectionMatrix()
        }}
        shadows
        orthographic
        camera={{
          position: position,
          zoom: zoom,
        }}
        flat
      >
        {/* <gridHelper /> */}
        {/* <color attach="background" args={["lightgrey"]} /> */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box
          position={[getCellPosition(0).x, 0.5, getCellPosition(0).z]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <Box
          position={[getCellPosition(1).x, 0.5, getCellPosition(1).z]}
          rotation={[0, -Math.PI / 4, 0]}
        />

        <GroundPlage />
      </Canvas>
    </div>
  )
}

function Box(props) {
  const ref = useRef()
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  )
}

function GroundPlage() {
  const { camera } = useThree()
  useEffect(() => {
    window.addEventListener("resize", resizeCamera)
    return () => {
      window.removeEventListener("resize", resizeCamera)
    }
  }, [])
  const resizeCamera = () => {
    console.log("resize")
    camera.top = top
    camera.bottom = bottom
    camera.left = left
    camera.right = right
    camera.updateProjectionMatrix()
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[right * 2, right * 2 * 1.414]} />
      <meshBasicMaterial color="white" />
    </mesh>
  )
}

export default StudioScene
