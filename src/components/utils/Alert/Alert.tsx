import { useTranslation } from "react-i18next"
import { IconAletInfo } from "../Icons/CustomIcons"

const Alert = ({ onClose, status }) => {
  const { t } = useTranslation()

  const message = {
    "FORGOT-PASSWORD-SUCCESS": t("forgot.alert"),
    "SIGNUP-SUCCESS": t("signUp.alert"),
    "CONFIRM-EMAIL": t("events.noEvent.alert"),
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="after-reset w-100 p-sm-4 p-2 mx-auto mb-sm-4 mb-3">
      <IconAletInfo />
      {status === "CONFIRM-EMAIL" ? (
        <div className="confirmEmail-text">
          <p>{t("events.noEvent.alert.text")}</p>
          <span className="confirmEmail-text__text">
            {t("events.noEvent.alert.linkText")}
            <a href="#">{t("buttons.resend")}</a>
          </span>
        </div>
      ) : (
        <p>{message[status]}</p>
      )}
      <button
        type="button"
        className="btn-close after-reset__close"
        aria-label="Close"
        onClick={handleClose}
      ></button>
    </div>
  )
}

export default Alert
