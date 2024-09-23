import { useTranslation } from "react-i18next"
import {
  IconBtnCreate,
  IconImport,
} from "../../components/utils/Icons/CustomIcons"

const NotContacts = ({ setAddShow, setImportShow }) => {
  const { t } = useTranslation()

  return (
    <div className="contacts-not">
      <img
        className="contacts-not__picture"
        src="images/pic-no-contacts.png"
        alt=""
      />

      <h2 className="caption">{t("notcontacts.title")}</h2>
      <p>{t("notcontacts.text")}</p>

      <div className="contacts-not__controls">
        <a
          href="#"
          className="btn btn-simple"
          onClick={() => {
            setImportShow(true)
          }}
        >
          <IconImport />
          {t("notcontacts.import")}
        </a>
        <a
          href="#"
          className="btn btn-dark"
          onClick={() => {
            setAddShow(true)
          }}
        >
          <IconBtnCreate />
          {t("notcontacts.add")}
        </a>
      </div>
    </div>
  )
}

export default NotContacts
