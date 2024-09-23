import styles from "./EditGuest.module.scss"
import { Modal } from "react-bootstrap"
import SelectGuest from "./SelectGuest"
import { useTranslation } from "react-i18next"

const EditGuest = ({
  guest,
  setGuest,
  show,
  handleClose,
  saveEditGuest,
  validation,
}) => {
  const { t } = useTranslation()
  const isEmpty = (val) => {
    if (!val) {
      return "empty"
    }
  }

  const handeInput = (input, value) => {
    setGuest({ ...guest, [input]: value })
  }

  return (
    <Modal className={styles.editPopup} show={show} onHide={handleClose}>
      <Modal.Header className={styles.close} closeButton></Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <h2 className={`caption ${styles.caption}`}>
            {t("contacts.editGuestPopup.title")}
          </h2>
          <span className={styles.text}>
            {t("contacts.editGuestPopup.text")}
          </span>

          <form action="" className={styles.form} onSubmit={saveEditGuest}>
            <SelectGuest
              placeholder={t("placeholder.suffix")}
              value={guest.suffix}
              validation={validation}
              handeInput={handeInput}
            />

            <div className={`profile-input ${styles.input}`}>
              <input
                type="text"
                value={guest.first_name}
                onChange={(event) => {
                  handeInput("first_name", event.target.value)
                }}
                className={isEmpty(guest.first_name)}
              />
              <label htmlFor="" className={styles.label}>
                {t("placeholder.firstName")}
              </label>

              {validation.first_name && (
                <span className="input-item__error error mt-1">
                  {validation.first_name}
                </span>
              )}
            </div>

            <div className={`profile-input ${styles.input}`}>
              <input
                type="text"
                value={guest.last_name}
                onChange={(event) => {
                  handeInput("last_name", event.target.value)
                }}
                className={isEmpty(guest.last_name)}
              />
              <label htmlFor="" className={styles.label}>
                {t("placeholder.lastName")}
              </label>

              {validation.last_name && (
                <span className="input-item__error error mt-1">
                  {validation.last_name}
                </span>
              )}
            </div>

            <div className={`profile-input ${styles.input}`}>
              <input
                type="text"
                value={guest.email}
                className={isEmpty(guest.email)}
                onChange={(event) => {
                  handeInput("email", event.target.value)
                }}
              />
              <label htmlFor="" className={styles.label}>
                {t("placeholder.email")}
              </label>

              {validation.email && (
                <span className="input-item__error error mt-1">
                  {validation.email}
                </span>
              )}
            </div>

            <div className={`profile-input ${styles.input}`}>
              <input
                type="text"
                value={guest.phone}
                onChange={(event) => {
                  handeInput("phone", event.target.value)
                }}
                className={isEmpty(guest.phone)}
              />
              <label htmlFor="" className={styles.label}>
                {t("placeholder.phoneNumber")}
              </label>

              {validation.phone && (
                <span className="input-item__error error mt-1">
                  {validation.phone}
                </span>
              )}
            </div>

            <div className={styles.controls}>
              <span className="btn btn-simple" onClick={handleClose}>
                {t("buttons.cancel")}
              </span>
              <button type="submit" className="btn btn-dark">
                {t("buttons.save")}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default EditGuest
