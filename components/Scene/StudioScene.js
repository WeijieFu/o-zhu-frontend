import React, { Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"

import styles from "../../styles/Scene/Scene.module.css"

import getCellPosition from "./getCellPosition"

import Model from "./Model"

const position = [0, 10, 10]
const zoom = 1
const top = 8
const bottom = -8
const left = -11
const right = 11

const StudioScene = ({ data, router }) => {
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
        <ambientLight intensity={0.5} />
        {/* <pointLight
          position={[10, 10, 10]}
          castShadow
          intensity={1.0}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        /> */}
        <Light />
        <Suspense>
          {data.map((value, index) => {
            return (
              <Model
                url={value.Model.data.attributes.url}
                index={index}
                key={index}
                router={router}
                location={value.Location}
              />
            )
          })}
        </Suspense>
        <GroundPlage />
      </Canvas>
    </div>
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
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry args={[right * 2, right * 2 * 1.414]} />
      <shadowMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  )
}

const Light = () => {
  const light = useRef()
  useFrame((state) => {
    light.current.position.set(20 * state.pointer.x, 40, -20 * state.pointer.y)
  })
  return (
    <directionalLight
      castShadow
      position={[0, 5, 5]}
      intensity={1.5}
      shadow-mapSize-width={4096}
      shadow-mapSize-height={4096}
      shadow-camera-far={200}
      shadow-camera-left={-15}
      shadow-camera-right={15}
      shadow-camera-top={15}
      shadow-camera-bottom={-15}
      ref={light}
    />
  )
}

export default StudioScene
