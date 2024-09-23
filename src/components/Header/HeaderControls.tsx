import "./Header.scss"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { logoutUser } from "../../redux/slices/auth/authSlice"
import { IconBalance, IconDownload } from "../utils/Icons/CustomIcons"
import { IAuthInitState } from "../Auth/types"

const HeaderControls = ({ first_name, balance }) => {
  const { t, i18n } = useTranslation()

  const dispatch = useAppDispatch()
  const navigator = useNavigate()

  return (
    <div className="header-mobile-show">
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip className="header-tooltip" id="tooltip">
            {t("header.textBalance")}
          </Tooltip>
        }
      >
        <div className="header-balance">
          <IconBalance />
          <span className="header-balance__value">{balance}</span>
        </div>
      </OverlayTrigger>

      <a href="/" className="btn btn-simple">
        <IconDownload />
        {t("buttons.downloadApp")}
      </a>

      <ul className="header-nav">
        <li>
          <Link to="/events" className="header-nav__link">
            <span className="header-nav__text">{t("header.nav.events")}</span>
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="header-nav__link">
            <span className="header-nav__text">{t("header.nav.contacts")}</span>
          </Link>
        </li>
        <li>
          <Link to="/messages" className="header-nav__link">
            <span className="header-nav__text">{t("header.nav.messages")}</span>
            <span className="header-nav__info">{t("header.nav.premium")}</span>
          </Link>
        </li>
      </ul>

      <Dropdown className="dropdown-block dropdown-profile">
        <Dropdown.Toggle className="dropdown-block-text border-0 bg-transparent">
          {first_name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              navigator("/profile")
            }}
          >
            {t("header.nav.profile")}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              dispatch(logoutUser())
            }}
          >
            {t("buttons.exit")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default HeaderControls
