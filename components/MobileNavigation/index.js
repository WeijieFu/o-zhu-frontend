import React, { useState, useRef } from "react"
import styles from "../../styles/Navigation/MobileNavigation.module.css"
import useNavigationState from "../../state/NavigationState"
import Link from "next/link"

const MobileNavigation = ({ isPersonDescriptionShown }) => {
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

  const handleSortingMenuToggle = () => {
    if (state.currentPage === "team") {
      handleTeamSortingMenuToggle()
    }

    if (state.currentCategory === "award & press") {
      handleAPSortingMenuToggle()
    }

    if (state.currentCategory === "projects") {
      handleProjectsSortingMenuToggle()
    }
  }

  const handleTeamSortingMenuToggle = () => {
    state.setIsTeamSortingMenuOpen(!state.isTeamSortingMenuOpen)
  }

  const handleAPSortingMenuToggle = () => {
    state.setIsAPSortingMenuOpen(!state.isAPSortingMenuOpen)
  }

  const handleProjectsSortingMenuToggle = () => {
    state.setIsProjectsSortingMenuOpen(!state.isProjectsSortingMenuOpen)
  }

  const handleSorting = (method) => {
    state.setCurrentSorting(method)
    closeMenu()
  }

  const currentSorting = () => {
    if (state.currentSorting == "random") {
      return state.currentLanguage == "cn" ? "随机" : "Random"
    }

    if (state.currentSorting == "name") {
      return state.currentLanguage == "cn" ? "名字" : "Name"
    }

    if (state.currentSorting == "date") {
      return state.currentLanguage == "cn" ? "日期" : "Date"
    }
    if (state.currentSorting == "size") {
      return state.currentLanguage == "cn" ? "面积" : "Size"
    }
    if (state.currentSorting == "year") {
      return state.currentLanguage == "cn" ? "年份" : "Year"
    }
    if (state.currentSorting == "location") {
      return state.currentLanguage == "cn" ? "地点" : "Location"
    }
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
      <div
        className={styles["menu-button-main"]}
        onClick={handleMenuToggle}
        style={
          state.isMenuOpen ||
          state.isTeamSortingMenuOpen ||
          state.isAPSortingMenuOpen ||
          state.isProjectsSortingMenuOpen
            ? { borderWidth: `${0}px` }
            : {}
        }
      >
        <span>{state.currentPage ? currentPage() : "+"}</span>
      </div>
      {!isPersonDescriptionShown && (
        <div
          className={`${styles["menu-button-text"]} ${
            state.currentSorting ? "" : styles["menu-button-hidden"]
          } ${styles["menu-button-tertiary"]}`}
          onClick={handleSortingMenuToggle}
          style={
            state.isMenuOpen ||
            state.isTeamSortingMenuOpen ||
            state.isAPSortingMenuOpen ||
            state.isProjectsSortingMenuOpen
              ? { borderWidth: `${0}px` }
              : {}
          }
        >
          <span>{currentSorting()}</span>
        </div>
      )}

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

      {/* TEAM SORTING MENU */}
      <div
        className={`${styles["menu-wrapper"]} ${
          state.isTeamSortingMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-tertiary"]}`}
      >
        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("name")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "名字" : "Name"}
          </span>
        </div>

        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("random")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "随机" : "Random"}
          </span>
        </div>
      </div>
      {/* AWARD AND PRESS SORTING MENU */}
      <div
        className={`${styles["menu-wrapper"]} ${
          state.isAPSortingMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-tertiary"]}`}
      >
        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("date")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "日期" : "Date"}
          </span>
        </div>

        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("random")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "随机" : "Random"}
          </span>
        </div>
      </div>
      {/* PROJECTS SORTING MENU */}
      <div
        className={`${styles["menu-wrapper"]} ${
          state.isProjectsSortingMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-tertiary"]}`}
      >
        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("size")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "面积" : "Size"}
          </span>
        </div>

        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("name")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "名字" : "Name"}
          </span>
        </div>

        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("year")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "年份" : "Year"}
          </span>
        </div>

        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("location")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "地点" : "Location"}
          </span>
        </div>
        <div
          className={styles["menu-item"]}
          onClick={() => {
            handleSorting("random")
          }}
        >
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "随机" : "Random"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MobileNavigation
