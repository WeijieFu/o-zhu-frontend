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

  const handleSubMenuToggle = () => {
    if (state.currentCategory === "projects") {
      handleProjectsMenuToggle()
    }
    if (state.currentCategory === "about") {
      handleAboutMenuToggle()
    }
    if (state.currentCategory === "award and press") {
      handleAPMenuToggle()
    }
  }
  const handleSortingMenuToggle = () => {
    if (state.currentPage === "team") {
      handleTeamSortingMenuToggle()
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
  }
  const handleAwardClick = () => {
    state.setCurrentCategory("award & press")
    state.setCurrentPage("award")
    closeMenu()
  }
  const handlePressClick = () => {
    state.setCurrentCategory("award & press")
    state.setCurrentPage("press")
    closeMenu()
  }

  const handleContactClick = () => {
    state.setCurrentCategory("contact")
    state.setCurrentPage("")
    closeMenu()
  }

  const handleExhibitionClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("exhibition")
    closeMenu()
  }

  const handleInteriorClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("interior")
    closeMenu()
  }

  const handleArchitectureClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("architecture")
    closeMenu()
  }

  const handleUrbanDesignClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("urban design")
    closeMenu()
  }

  const handleResearchPublicationClick = () => {
    state.setCurrentCategory("projects")
    state.setCurrentPage("research & publication")
    closeMenu()
  }

  const handleStudioClick = () => {
    state.setCurrentCategory("about")
    state.setCurrentPage("studio")
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

  const handleSortingByName = () => {
    state.setCurrentSorting("name")
    closeMenu()
  }

  const handleSortingByRandom = () => {
    state.setCurrentSorting("random")
    closeMenu()
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
        <span>{state.currentCategory}</span>
      </div>
      <div
        className={`${styles["menu-button-text"]} ${
          state.currentPage ? "" : styles["menu-button-hidden"]
        } ${styles["menu-button-secondary"]}`}
        onClick={handleSubMenuToggle}
      >
        <span>{state.currentPage}</span>
      </div>
      <div
        className={`${styles["menu-button-text"]} ${
          state.currentSorting ? "" : styles["menu-button-hidden"]
        } ${styles["menu-button-tertiary"]}`}
        onClick={handleSortingMenuToggle}
      >
        <span>{state.currentSorting}</span>
      </div>
      <div
        className={`${styles["menu-button-icon"]} ${styles["menu-button-language"]}`}
      >
        <span>中文</span>
      </div>

      {/* MAIN MENU */}

      <div
        className={`${styles["menu-wrapper"]} ${
          state.isMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-primary"]}`}
      >
        <div className={styles["menu-item"]} onClick={handleProjectsMenuToggle}>
          <span className={styles["menu-item-title"]}>Projects</span>
          <span className={styles["menu-item-toggle"]}>
            {state.isProjectsMenuOpen ? "-" : "+"}
          </span>
        </div>

        <div className={styles["menu-item"]} onClick={handleAboutMenuToggle}>
          <span className={styles["menu-item-title"]}>About</span>
          <span className={styles["menu-item-toggle"]}>
            {state.isAboutMenuOpen ? "-" : "+"}
          </span>
        </div>

        <div className={styles["menu-item"]} onClick={handleAPMenuToggle}>
          <span className={styles["menu-item-title"]}>Award & Press</span>
          <span className={styles["menu-item-toggle"]}>
            {state.isAPMenuOpen ? "-" : "+"}
          </span>
        </div>

        <Link href="/contact">
          <div className={styles["menu-item"]} onClick={handleContactClick}>
            <span className={styles["menu-item-title"]}>Contact</span>
          </div>
        </Link>
      </div>
      {/* PROJECTS MENU */}
      <div
        className={`${styles["menu-wrapper"]} ${
          state.isProjectsMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-secondary"]}`}
      >
        <Link href="/projects/exhibition">
          <div className={styles["menu-item"]} onClick={handleExhibitionClick}>
            <span className={styles["menu-item-title"]}>Exhibition</span>
          </div>
        </Link>

        <Link href="/projects/interior">
          <div className={styles["menu-item"]} onClick={handleInteriorClick}>
            <span className={styles["menu-item-title"]}>Interior</span>
          </div>
        </Link>

        <Link href="/projects/architecture">
          <div
            className={styles["menu-item"]}
            onClick={handleArchitectureClick}
          >
            <span className={styles["menu-item-title"]}>Architecture</span>
          </div>
        </Link>

        <Link href="/projects/urban_design">
          <div className={styles["menu-item"]} onClick={handleUrbanDesignClick}>
            <span className={styles["menu-item-title"]}>Urban Design</span>
          </div>
        </Link>
        <Link href="/projects/research_publication">
          <div
            className={styles["menu-item"]}
            onClick={handleResearchPublicationClick}
          >
            <span className={styles["menu-item-title"]}>
              Research & Publication
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
            <span className={styles["menu-item-title"]}>Studio</span>
          </div>
        </Link>
        <Link href="/about/team">
          <div className={styles["menu-item"]} onClick={handleTeamClick}>
            <span className={styles["menu-item-title"]}>Team</span>
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
            <span className={styles["menu-item-title"]}>Award</span>
          </div>
        </Link>
        <Link href="/press">
          <div className={styles["menu-item"]} onClick={handlePressClick}>
            <span className={styles["menu-item-title"]}>Press</span>
          </div>
        </Link>
      </div>
      {/* TEAM SORTING MENU */}
      <div
        className={`${styles["menu-wrapper"]} ${
          state.isTeamSortingMenuOpen ? "" : styles["menu-wrapper-hidden"]
        } ${styles["menu-tertiary"]}`}
      >
        <div className={styles["menu-item"]} onClick={handleSortingByName}>
          <span className={styles["menu-item-title"]}>Name</span>
        </div>

        <div className={styles["menu-item"]} onClick={handleSortingByRandom}>
          <span className={styles["menu-item-title"]}>Random</span>
        </div>
      </div>
    </div>
  )
}

export default Navigation
