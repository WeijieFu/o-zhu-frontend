import React, { forwardRef, Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"

import styles from "../../styles/Scene/Scene.module.css"

import Model from "./Model"

import GUI from "lil-gui"

const position = [0, 10, 10 * Math.sqrt(2)]
const zoom = 1
const top = 7.75
const bottom = -7.75
const left = -4
const right = 4

const MobileProjectScene = ({
  data,
  router,
  category,
  handleScroll,
  scroll,
}) => {
  const [params, setParams] = useState({
    directionalLightIntensity: 2,
    ambientLightIntensity: 0.1,
    shadowOpacity: 1,
    objectColor: "#ffffff",
    edgeWidth: 1,
  })

  // useEffect(() => {
  //   console.log(scroll)
  // }, [])

  return (
    <div className={styles["canvas"]} onWheel={handleScroll}>
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
        {/* <color attach="background" args={["lightgrey"]} /> */}
        <Light params={params} />

        <Suspense>
          {data.map((value, index) => {
            if (value.index > -1) {
              return (
                <Model
                  url={value.Model}
                  index={value.index}
                  length={data.length}
                  key={index}
                  router={router}
                  target={value._id}
                  root={"/project"}
                  params={params}
                  scroll={scroll}
                />
              )
            }
          })}
        </Suspense>
        <GroundPlage params={params} />
      </Canvas>
    </div>
  )
}

const GroundPlage = ({ params }) => {
  const { camera } = useThree()
  const shadowMaterial = useRef()
  useFrame(() => {
    shadowMaterial.current.opacity = params.shadowOpacity
  })
  useEffect(() => {
    window.addEventListener("resize", resizeCamera)
    return () => {
      window.removeEventListener("resize", resizeCamera)
    }
  }, [])
  const resizeCamera = () => {
    camera.top = top
    camera.bottom = bottom
    camera.left = left
    camera.right = right
    camera.updateProjectionMatrix()
  }
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry args={[right * 2, right * 2 * 1.414]} />
      <shadowMaterial
        attach="material"
        transparent
        opacity={params.shadowOpacity}
        ref={shadowMaterial}
      />
    </mesh>
  )
}

const Light = (props) => {
  const directionalLight = useRef()
  const ambientLight = useRef()
  useFrame((state) => {
    directionalLight.current.position.set(
      30 * state.pointer.x,
      40,
      -30 * state.pointer.y
    )
    // directionalLight.current.intensity = props.params.directionalLightIntensity
    // ambientLight.current.intensity = props.params.ambientLightIntensity
    directionalLight.current.shadow.bias = -0.0005
  })
  return (
    <>
      <ambientLight
        intensity={props.params.ambientLightIntensity}
        ref={ambientLight}
      />
      <directionalLight
        castShadow
        position={[0, 10, 10]}
        intensity={props.params.directionalLightIntensity}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-near={0}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        ref={directionalLight}
      />
    </>
  )
}

export default MobileProjectScene
