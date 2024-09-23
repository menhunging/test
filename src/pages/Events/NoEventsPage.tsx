import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useTranslation } from "react-i18next"
import Preloader from "../../components/utils/Preloader/Preloader"
import NotEvents from "../../components/Events/NotEvents"
import { IconBtnCreate } from "../../components/utils/Icons/CustomIcons"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import Alert from "../../components/utils/Alert/Alert"
import { setStatus } from "../../redux/slices/auth/authSlice"
import { useNavigate } from "react-router-dom"

const NoEventsPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { status, confirmed, isLoading } = useAppSelector((state) => state.auth)
  const navigator = useNavigate()

  const [isAlert, setIsAlert] = useState(false)

  const handleCloseAlert = () => {
    dispatch(setStatus(""))
    setIsAlert(false)
  }

  useEffect(() => {
    if (!confirmed) {
      setIsAlert(true)
    } else {
      setIsAlert(false)
    }
  }, [confirmed])

  return (
    <>
      {isLoading && <Preloader />}

      {isAlert && <Alert status={"CONFIRM-EMAIL"} onClose={handleCloseAlert} />}

      <div className="events-not__page">
        <NotEvents />

        <p className="event-not__text">{t("events.noEvent.text")}</p>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip className="tooltip" id="tooltip">
              {t("events.noEvent.noEventTooltip")}
            </Tooltip>
          }
        >
          <Button
            className="btn btn-dark event-create event-not__btn"
            onClick={() => navigator("/event-create")}
          >
            <IconBtnCreate />
            {t("buttons.createEvent")}
          </Button>
        </OverlayTrigger>
      </div>
    </>
  )
}

export default NoEventsPage
