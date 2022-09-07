import create from "zustand"

const useGridState = create((set) => ({
  layout: "web",
  row: 6,
  column: 11,
  blinkTimes: 10,
  interval: 200,

  setGridToWeb: () =>
    set(() => ({
      layout: "web",
      row: 6,
      column: 11,
      horizontal: 8,
    })),
  setGridToMobile: () =>
    set(() => ({
      layout: "mobile",
      row: 6,
      column: 4,
    })),
}))

export default useGridState
