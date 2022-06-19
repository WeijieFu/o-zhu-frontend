import React, { forwardRef, Suspense, useEffect, useRef, useState } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"

import styles from "../../styles/Scene/Scene.module.css"

import Model from "./Model"

import GUI from "lil-gui"

const position = [0, 10, 10]
const zoom = 1
const top = 8
const bottom = -8
const left = -11
const right = 11

const ProjectScene = ({ data, router, category }) => {
  const [params, setParams] = useState({
    directionalLightIntensity: 1.5,
    ambientLightIntensity: 0.5,
    shadowOpacity: 0.5,
    objectColor: "#ffffff",
    edgeWidth: 1,
  })

  useEffect(() => {
    const gui = new GUI()

    const light = gui.addFolder("Light")
    light.add(params, "directionalLightIntensity", 0, 10, 0.1)
    light.add(params, "ambientLightIntensity", 0, 3, 0.1)

    const shadow = gui.addFolder("Shadow")
    shadow.add(params, "shadowOpacity", 0, 1, 0.05)

    // const object = gui.addFolder("Object")
    // object.addColor(params, "objectColor")
    // object.add(params, "edgeWidth", 0, 10, 0.1)
  }, [])

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
        <Light params={params} />

        <Suspense>
          {data.map((value, index) => {
            if (value.index > -1) {
              return (
                <Model
                  url={value.Model}
                  index={value.index}
                  key={index}
                  router={router}
                  target={value._id}
                  root={category}
                  params={params}
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

const GroundPlage = (props) => {
  const { camera } = useThree()
  const shadowMaterial = useRef()
  useFrame(() => {
    shadowMaterial.current.opacity = props.params.shadowOpacity
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
        opacity={props.params.shadowOpacity}
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
      20 * state.pointer.x,
      40,
      -20 * state.pointer.y
    )
    directionalLight.current.intensity = props.params.directionalLightIntensity
    ambientLight.current.intensity = props.params.ambientLightIntensity
  })
  return (
    <>
      <ambientLight intensity={0.5} ref={ambientLight} />
      <directionalLight
        castShadow
        position={[0, 5, 5]}
        intensity={props.params.directionalLightIntensity}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={200}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        ref={directionalLight}
      />
    </>
  )
}

export default ProjectScene
