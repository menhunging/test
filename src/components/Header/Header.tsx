import "./Header.scss"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { logoutUser, setLanguage } from "../../redux/slices/auth/authSlice"
import { IconBalance, IconDownload } from "../utils/Icons/CustomIcons"
import HeaderBurger from "./HeaderBurger"
import HeaderControls from "./HeaderControls"
import OverlayBurger from "./overlayBurger"

const Header = () => {
  const { t, i18n } = useTranslation()
  const [lang, setLang] = useState(t("header.language2"))
  const dispatch = useAppDispatch()
  const { isAuth, first_name, balance } = useAppSelector((state) => state.auth)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const changeLanguage = (language: string) => {
    let html = document.querySelector("html") || null
    i18n.changeLanguage(language)

    switch (language) {
      case "ar":
        html?.setAttribute("dir", "rtl")
        break
      default:
        html?.setAttribute("dir", "ltl")
        break
    }

    dispatch(setLanguage(language))
    setLang(language)
  }

  return (
    <>
      <OverlayBurger isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />

      <header className="header py-sm-4 py-3">
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <Link to="/"></Link>
              <img src="./vector/logo.svg" alt="logo" />
            </div>

            <div className="header-inner__right">
              {isAuth && (
                <HeaderControls balance={balance} first_name={first_name} />
              )}

              <Dropdown className="dropdown-block">
                <Dropdown.Toggle className="dropdown-block-text border-0 bg-transparent">
                  {lang === "ar"
                    ? t("header.language1")
                    : t("header.language2")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    active={lang.toLowerCase() === "ar"}
                    onClick={() => changeLanguage("ar")}
                  >
                    {t("header.language1")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={lang.toLowerCase() === "en"}
                    onClick={() => changeLanguage("en")}
                  >
                    {t("header.language2")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {isAuth && (
              <HeaderBurger
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
              />
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
