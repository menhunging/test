import { Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import Preloader from "../utils/Preloader/Preloader"
import { IconBtnCreate } from "../utils/Icons/CustomIcons"

const NotEvents = ({ isLoading = false }) => {
  const { t } = useTranslation()

  return (
    <div className="event-not">
      <div className="container">
        <img
          className="event-not__picture"
          src="images/bg-not-events.png"
          alt=""
        />

        <span className="event-not__caption">
          {t("events.noEvent.noEvent")}
        </span>
      </div>
    </div>
  )
}

export default NotEvents
