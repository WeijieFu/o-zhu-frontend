import React, { useState, useRef } from "react"
import styles from "../../styles/Navigation/Navigation.module.css"

import Link from "next/link"
import useNavigationState from "../../state/NavigationState"

const Navigation = () => {
  const state = useNavigationState()

  const handleMenuToggle = () => {
    state.setIsMenuOpen(!state.isMenuOpen)
  }
  const handleProjectsMenuToggle = () => {
    state.setIsProjectsMenuOpen(!state.isProjectsMenuOpen)
    state.setIsAboutMenuOpen(false)
    state.setIsAPMenuOpen(false)
  }

  const handleAboutMenuToggle = () => {
    state.setIsAboutMenuOpen(!state.isAboutMenuOpen)
    state.setIsProjectsMenuOpen(false)
    state.setIsAPMenuOpen(false)
  }

  const handleAPMenuToggle = () => {
    state.setIsAPMenuOpen(!state.isAPMenuOpen)
    state.setIsProjectsMenuOpen(false)
    state.setIsAboutMenuOpen(false)
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

  const handleSubMenuToggle = () => {
    if (state.currentCategory === "projects") {
      handleProjectsMenuToggle()
    }
    if (state.currentCategory === "about") {
      handleAboutMenuToggle()
    }

    if (state.currentCategory === "award & press") {
      handleAPMenuToggle()
    }
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
  /*
 HANDLE LINK
 */
  const closeMenu = () => {
    // MAIN
    state.setIsMenuOpen(false)
    //SECONDARY
    state.setIsAboutMenuOpen(false)
    state.setIsProjectsMenuOpen(false)
    state.setIsAPMenuOpen(false)
    //TERIARY
    state.setIsTeamSortingMenuOpen(false)
    state.setIsAPSortingMenuOpen(false)
    state.setIsProjectsSortingMenuOpen(false)
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

  const handleContactClick = () => {
    state.setCurrentCategory("contact")

    state.setCurrentPage("")
    state.setCurrentSorting("")
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
  /* 
  HANDLE SORTING
  */

  const handleSorting = (method) => {
    state.setCurrentSorting(method)
    closeMenu()
  }

  /**
   HANDLE LANGUAGE
   */

  const handleLanguageToggle = () => {
    if (state.currentLanguage == "cn") {
      state.setCurrentLanguage("en")
    }
    if (state.currentLanguage == "en") {
      state.setCurrentLanguage("cn")
    }
  }
  const currentCategory = () => {
    if (state.currentCategory == "contact") {
      return state.currentLanguage == "cn" ? "联系" : "Contact"
    }
    if (state.currentCategory == "projects") {
      return state.currentLanguage == "cn" ? "项目" : "Projects"
    }
    if (state.currentCategory == "about") {
      return state.currentLanguage == "cn" ? "关于" : "About"
    }
    if (state.currentCategory == "award & press") {
      return state.currentLanguage == "cn" ? "奖项 & 媒体" : "Award & Press"
    }
  }

  const currentPage = () => {
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
      console.log(state.currentPage)
      return state.currentLanguage == "cn"
        ? "学术研究 & 出版"
        : "Research & Publication"
    }
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
  return (
    <div className={styles.container}>
      <div
        className={`${styles["menu-button-icon"]} ${styles["menu-button-main"]}`}
        onClick={handleMenuToggle}
      >
        <span>{state.isMenuOpen ? "-" : "+"}</span>
      </div>
      <div
        className={`${styles["menu-button-text"]} ${
          state.currentCategory ? "" : styles["menu-button-hidden"]
        } ${styles["menu-button-primary"]}`}
        onClick={handleMenuToggle}
      >
        <span>{currentCategory()}</span>
      </div>
      <div
        className={`${styles["menu-button-text"]} ${
          state.currentPage ? "" : styles["menu-button-hidden"]
        } ${styles["menu-button-secondary"]}`}
        onClick={handleSubMenuToggle}
      >
        <span>{currentPage()}</span>
      </div>
      <div
        className={`${styles["menu-button-text"]} ${
          state.currentSorting ? "" : styles["menu-button-hidden"]
        } ${styles["menu-button-tertiary"]}`}
        onClick={handleSortingMenuToggle}
      >
        <span>{currentSorting()}</span>
      </div>
      <div
        className={`${styles["menu-button-icon"]} ${styles["menu-button-language"]}`}
        onClick={handleLanguageToggle}
      >
        <span>{state.currentLanguage == "cn" ? "EN" : "中文"}</span>
      </div>

      {/* MAIN MENU */}

      <div
        className={`${styles["menu-wrapper"]} ${
          state.isMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-primary"]}`}
      >
        <div className={styles["menu-item"]} onClick={handleProjectsMenuToggle}>
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "项目" : "Projects"}
          </span>
          <span className={styles["menu-item-toggle"]}>
            {state.isProjectsMenuOpen ? "-" : "+"}
          </span>
        </div>

        <div className={styles["menu-item"]} onClick={handleAboutMenuToggle}>
          <span className={styles["menu-item-title"]}>
            {" "}
            {state.currentLanguage == "cn" ? "关于" : "About"}
          </span>
          <span className={styles["menu-item-toggle"]}>
            {state.isAboutMenuOpen ? "-" : "+"}
          </span>
        </div>

        <div className={styles["menu-item"]} onClick={handleAPMenuToggle}>
          <span className={styles["menu-item-title"]}>
            {state.currentLanguage == "cn" ? "奖项 & 媒体" : "Award & Press"}
          </span>
          <span className={styles["menu-item-toggle"]}>
            {state.isAPMenuOpen ? "-" : "+"}
          </span>
        </div>

        <Link href="/contact">
          <div className={styles["menu-item"]} onClick={handleContactClick}>
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn" ? "联系" : "Contact"}
            </span>
          </div>
        </Link>
      </div>
      {/* PROJECTS MENU */}
      <div
        className={`${styles["menu-wrapper"]} ${
          state.isProjectsMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-secondary"]}`}
      >
        <Link href="/projects/all">
          <div className={styles["menu-item"]} onClick={handleAllClick}>
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn" ? "全部" : "All"}
            </span>
          </div>
        </Link>
        <Link href="/projects/exhibition">
          <div className={styles["menu-item"]} onClick={handleExhibitionClick}>
            <span className={styles["menu-item-title"]}>
              {" "}
              {state.currentLanguage == "cn" ? "展览" : "Exhibition"}
            </span>
          </div>
        </Link>

        <Link href="/projects/interior">
          <div className={styles["menu-item"]} onClick={handleInteriorClick}>
            <span className={styles["menu-item-title"]}>
              {" "}
              {state.currentLanguage == "cn" ? "室内" : "Interior"}
            </span>
          </div>
        </Link>

        <Link href="/projects/architecture">
          <div
            className={styles["menu-item"]}
            onClick={handleArchitectureClick}
          >
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn" ? "建筑" : "Architecture"}
            </span>
          </div>
        </Link>

        <Link href="/projects/urban_design">
          <div className={styles["menu-item"]} onClick={handleUrbanDesignClick}>
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn" ? "城市规划" : "Urban Design"}
            </span>
          </div>
        </Link>
        <Link href="/projects/research_publication">
          <div
            className={styles["menu-item"]}
            onClick={handleResearchPublicationClick}
          >
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn"
                ? "学术研究 & 出版"
                : "Research & Publication"}
            </span>
          </div>
        </Link>
      </div>
      {/* ABOUT MENU */}
      <div
        className={`${styles["menu-wrapper"]} ${
          state.isAboutMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-secondary"]}`}
      >
        <Link href="/about/studio">
          <div className={styles["menu-item"]} onClick={handleStudioClick}>
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn" ? "工作室" : "Studio"}
            </span>
          </div>
        </Link>
        <Link href="/about/team">
          <div className={styles["menu-item"]} onClick={handleTeamClick}>
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn" ? "团队成员" : "Team"}
            </span>
          </div>
        </Link>
      </div>

      {/* AP MENU */}
      <div
        className={`${styles["menu-wrapper"]} ${
          state.isAPMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-secondary"]}`}
      >
        <Link href="/award">
          <div className={styles["menu-item"]} onClick={handleAwardClick}>
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn" ? "奖项 " : "Award"}
            </span>
          </div>
        </Link>
        <Link href="/press">
          <div className={styles["menu-item"]} onClick={handlePressClick}>
            <span className={styles["menu-item-title"]}>
              {state.currentLanguage == "cn" ? "媒体" : "Press"}
            </span>
          </div>
        </Link>
      </div>
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

export default Navigation
