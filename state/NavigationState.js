import create from "zustand"

const useNavigationState = create((set) => ({
  currentPage: "",
  currentCategory: "",
  currentSorting: "",
  isMenuOpen: false,
  isProjectsMenuOpen: false,
  isAboutMenuOpen: false,
  isAPMenuOpen: false,
  isTeamSortingMenuOpen: false,
  isAPSortingMenuOpen: false,
  setCurrentPage: (page) => set((state) => ({ currentPage: page })),
  setCurrentCategory: (category) =>
    set((state) => ({ currentCategory: category })),
  setCurrentSorting: (sorting) => set((state) => ({ currentSorting: sorting })),
  setIsMenuOpen: (bool) => set((state) => ({ isMenuOpen: bool })),
  setIsProjectsMenuOpen: (bool) =>
    set((state) => ({ isProjectsMenuOpen: bool })),
  setIsAboutMenuOpen: (bool) => set((state) => ({ isAboutMenuOpen: bool })),
  setIsAPMenuOpen: (bool) => set((state) => ({ isAPMenuOpen: bool })),
  setIsTeamSortingMenuOpen: (bool) =>
    set((state) => ({ isTeamSortingMenuOpen: bool })),
  setIsAPSortingMenuOpen: (bool) =>
    set((state) => ({ isAPSortingMenuOpen: bool })),
}))

export default useNavigationState
