import React, { useState, useRef } from "react"
import styles from "../../styles/Navigation/MobileNavigation.module.css"
import useNavigationState from "../../state/NavigationState"
import Link from "next/link"

const MobileNavigation = () => {
  const state = useNavigationState()

  const currentPage = () => {
    if (state.currentPage == "contact") {
      return state.currentLanguage == "cn" ? "联系" : "Contact"
    }
    if (state.currentPage == "team") {
      return state.currentLanguage == "cn" ? "团队成员" : "Team"
    }
    if (state.currentPage == "studio") {
      return state.currentLanguage == "cn" ? "工作室" : "Studio"
    }
    if (state.currentPage == "award") {
      return state.currentLanguage == "cn" ? "奖项" : "Award"
    }
    if (state.currentPage == "press") {
      return state.currentLanguage == "cn" ? "媒体" : "Press"
    }
    if (state.currentPage == "all") {
      return state.currentLanguage == "cn" ? "全部" : "All"
    }
    if (state.currentPage == "exhibition") {
      return state.currentLanguage == "cn" ? "展览" : "Exhibition"
    }
    if (state.currentPage == "interior") {
      return state.currentLanguage == "cn" ? "室内" : "Interior"
    }
    if (state.currentPage == "architecture") {
      return state.currentLanguage == "cn" ? "建筑" : "Architecture"
    }
    if (state.currentPage == "urban design") {
      return state.currentLanguage == "cn" ? "城市规划" : "Urban Design"
    }
    if (state.currentPage == "research & publication") {
      return state.currentLanguage == "cn"
        ? "学术研究 & 出版"
        : "Research & Publication"
    }
  }

  const handleMenuToggle = () => {
    state.setIsMenuOpen(!state.isMenuOpen)
  }
  const handleProjectsMenuToggle = () => {
    state.setIsProjectsMenuOpen(!state.isProjectsMenuOpen)
  }

  const handleAboutMenuToggle = () => {
    state.setIsAboutMenuOpen(!state.isAboutMenuOpen)
  }

  const handleAPMenuToggle = () => {
    state.setIsAPMenuOpen(!state.isAPMenuOpen)
  }

  const handleContactClick = () => {
    state.setCurrentCategory("contact")

    state.setCurrentPage("contact")
    state.setCurrentSorting("")
    closeMenu()
  }

  const closeMenu = () => {
    // MAIN
    state.closeAll()
  }

  const handleAwardClick = () => {
    state.setCurrentCategory("award & press")

    state.setCurrentPage("award")
    state.setCurrentSorting("random")
    closeMenu()
  }
  const handlePressClick = () => {
    state.setCurrentCategory("award & press")

    state.setCurrentPage("press")
    state.setCurrentSorting("random")
    closeMenu()
  }

  const handleAllClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("all")
    state.setCurrentSorting("random")
    closeMenu()
  }
  const handleExhibitionClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("exhibition")
    state.setCurrentSorting("random")
    closeMenu()
  }

  const handleInteriorClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("interior")
    state.setCurrentSorting("random")
    closeMenu()
  }

  const handleArchitectureClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("architecture")
    state.setCurrentSorting("random")
    closeMenu()
  }

  const handleUrbanDesignClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("urban design")
    state.setCurrentSorting("random")
    closeMenu()
  }

  const handleResearchPublicationClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("research & publication")
    state.setCurrentSorting("random")
    closeMenu()
  }

  const handleStudioClick = () => {
    state.setCurrentCategory("about")
    state.setCurrentPage("studio")
    state.setCurrentSorting("")
    closeMenu()
  }

  const handleTeamClick = () => {
    state.setCurrentCategory("about")
    state.setCurrentPage("team")
    state.setCurrentSorting("random")
    closeMenu()
  }

  const handleLanguageToggle = () => {
    if (state.currentLanguage == "cn") {
      state.setCurrentLanguage("en")
    }
    if (state.currentLanguage == "en") {
      state.setCurrentLanguage("cn")
    }
    closeMenu()
  }
  const [touchStart, setTouchStart] = useState(0)
  const [scroll, setScroll] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)
  const lastItem = useRef()
  const handleTouchStart = (e) => {
    // console.log(e.nativeEvent.touches[0].clientY)
    setTouchStart(e.nativeEvent.touches[0].clientY)
  }
  const handleTouchMove = (e) => {
    const step = window.innerHeight / 7.75
    const currentTouch = e.nativeEvent.touches[0].clientY
    const delta = Math.floor((currentTouch - touchStart) / step) * step
    const newScroll = delta + scrollStart
    const rect = lastItem.current.getBoundingClientRect()
    if (delta > 0 && newScroll <= 0) {
      setScroll(newScroll)
    }
    if (delta < 0 && rect.bottom > window.innerHeight) {
      setScroll(newScroll)
    }
  }

  const handleTouchEnd = (e) => {
    setScrollStart(scroll)
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["menu-button-main"]} onClick={handleMenuToggle}>
        <span>{state.currentPage ? currentPage() : "+"}</span>
      </div>
      {state.isMenuOpen && (
        <>
          <div
            className={styles["menu-wrapper"]}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles["menu-items-wrapper"]}
              style={{ transform: `translateY(${scroll}px)` }}
            >
              {/* PROJECTS BUTTON */}
              <div
                className={styles["menu-item"]}
                onClick={handleProjectsMenuToggle}
              >
                <span className={styles["menu-item-title"]}>
                  {state.currentLanguage == "cn" ? "项目" : "Projects"}
                </span>
                <span className={styles["menu-item-toggle"]}>
                  {state.isProjectsMenuOpen ? "-" : "+"}
                </span>
              </div>
              {/* PROJECTS MENU */}
              {state.isProjectsMenuOpen && (
                <>
                  {" "}
                  <Link href="/projects/all">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleAllClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {state.currentLanguage == "cn" ? "全部" : "All"}
                      </span>
                    </div>
                  </Link>
                  <Link href="/projects/exhibition">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleExhibitionClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {" "}
                        {state.currentLanguage == "cn" ? "展览" : "Exhibition"}
                      </span>
                    </div>
                  </Link>
                  <Link href="/projects/interior">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleInteriorClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {" "}
                        {state.currentLanguage == "cn" ? "室内" : "Interior"}
                      </span>
                    </div>
                  </Link>
                  <Link href="/projects/architecture">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleArchitectureClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {state.currentLanguage == "cn"
                          ? "建筑"
                          : "Architecture"}
                      </span>
                    </div>
                  </Link>
                  <Link href="/projects/urban_design">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleUrbanDesignClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {state.currentLanguage == "cn"
                          ? "城市规划"
                          : "Urban Design"}
                      </span>
                    </div>
                  </Link>
                  <Link href="/projects/research_publication">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleResearchPublicationClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {state.currentLanguage == "cn"
                          ? "学术研究 & 出版"
                          : "Research & Publication"}
                      </span>
                    </div>
                  </Link>
                </>
              )}

              {/* ABOUT BUTTON */}

              <div
                className={styles["menu-item"]}
                onClick={handleAboutMenuToggle}
              >
                <span className={styles["menu-item-title"]}>
                  {state.currentLanguage == "cn" ? "关于" : "About"}
                </span>
                <span className={styles["menu-item-toggle"]}>
                  {state.isAboutMenuOpen ? "-" : "+"}
                </span>
              </div>
              {/* ABOUT MENU */}
              {state.isAboutMenuOpen && (
                <>
                  <Link href="/about/studio">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleStudioClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {state.currentLanguage == "cn" ? "工作室" : "Studio"}
                      </span>
                    </div>
                  </Link>
                  <Link href="/about/team">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleTeamClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {state.currentLanguage == "cn" ? "团队成员" : "Team"}
                      </span>
                    </div>
                  </Link>
                </>
              )}

              {/* AP BUTTON */}
              <div className={styles["menu-item"]} onClick={handleAPMenuToggle}>
                <span className={styles["menu-item-title"]}>
                  {state.currentLanguage == "cn"
                    ? "奖项 & 媒体"
                    : "Award & Press"}
                </span>
                <span className={styles["menu-item-toggle"]}>
                  {state.isAPMenuOpen ? "-" : "+"}
                </span>
              </div>
              {/* AP MENU */}
              {state.isAPMenuOpen && (
                <>
                  <Link href="/award">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handleAwardClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {state.currentLanguage == "cn" ? "奖项 " : "Award"}
                      </span>
                    </div>
                  </Link>
                  <Link href="/press">
                    <div
                      className={styles["menu-sub-item"]}
                      onClick={handlePressClick}
                    >
                      <span className={styles["menu-item-title"]}>
                        {state.currentLanguage == "cn" ? "媒体" : "Press"}
                      </span>
                    </div>
                  </Link>
                </>
              )}
              {/* CONTACT BUTTON */}
              <Link href="/contact">
                <div
                  className={styles["menu-item"]}
                  onClick={handleContactClick}
                >
                  <span className={styles["menu-item-title"]}>
                    {state.currentLanguage == "cn" ? "联系" : "Contact"}
                  </span>
                </div>
              </Link>

              {/* LANGUAGE BUTTON */}
              <div
                className={styles["menu-item"]}
                onClick={handleLanguageToggle}
              >
                <span className={styles["menu-item-title"]} ref={lastItem}>
                  {state.currentLanguage == "cn" ? "EN" : "中文"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MobileNavigation
