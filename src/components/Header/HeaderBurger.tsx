import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useAppDispatch } from "../../redux/store"
import { logoutUser } from "../../redux/slices/auth/authSlice"
import { IconBalance, IconDownload } from "../utils/Icons/CustomIcons"

const HeaderBurger = ({ isOpenMenu, setIsOpenMenu }) => {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()

  const onClick = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <Navbar
      expand="lg"
      className="header-toggle d-lg-none"
      expanded={isOpenMenu}
      onToggle={onClick}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <div className="burger">
          <span className="burger__line"></span>
          <span className="burger__line"></span>
          <span className="burger__line"></span>
        </div>
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="container">
          <Nav className="header-nav">
            <Link to="/events" className="header-nav__link" onClick={onClick}>
              <span className="header-nav__text">{t("header.nav.events")}</span>
            </Link>
            <Link to="/contacts" className="header-nav__link" onClick={onClick}>
              <span className="header-nav__text">{t("header.nav.contacts")}</span>
            </Link>
            <Link to="/messages" className="header-nav__link" onClick={onClick}>
              <span className="header-nav__text">
                {t("header.nav.messages")}
              </span>
              <span className="header-nav__info">
                {t("header.nav.premium")}
              </span>
            </Link>
            <Link to="/profile" className="header-nav__link" onClick={onClick}>
              <span className="header-nav__text">
                {" "}
                {t("header.nav.profile")}
              </span>
            </Link>
            <span
              className="header-nav__link"
              onClick={() => {
                onClick()
                dispatch(logoutUser())
              }}
            >
              <span className="header-nav__text">{t("buttons.exit")}</span>
            </span>
          </Nav>

          <div className="header-toggle__balance">
            <span className="d-block text-center mb-1">
              {t("header.textBalance")}:
            </span>

            <div className="header-balance">
              <IconBalance />
              <span className="header-balance__value">1000</span>
            </div>

            <a href="/" className="btn btn-simple mt-3">
              <IconDownload />
              {t("buttons.downloadApp")}
            </a>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default HeaderBurger
