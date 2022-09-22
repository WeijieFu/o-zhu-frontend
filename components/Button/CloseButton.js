import React from "react"
import useGridState from "../../state/GridState"
const CloseButton = () => {
  const grid = useGridState()
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={
        grid.layout === "web"
          ? { transform: `scale(${window.innerWidth / 1600})` }
          : {}
      }
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.29171 5.99882L0.000623136 11.2899L0.707731 11.997L5.99882 6.70593L11.2899 11.997L11.997 11.2899L6.70593 5.99882L11.9976 0.707107L11.2905 0L5.99882 5.29171L0.707107 1.54832e-08L0 0.707107L5.29171 5.99882Z"
        fill="black"
      />
    </svg>
  )
}

export default CloseButton
