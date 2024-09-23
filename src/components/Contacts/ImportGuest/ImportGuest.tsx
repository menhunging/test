import { Modal } from "react-bootstrap"
import styles from "./ImportGuest.module.scss"
import ChooseFileImport from "./ChooseFileImport"
import {
  IconArrowDownSmall,
  IconLoadSmall,
} from "../../utils/Icons/CustomIcons"
import { useState } from "react"
import { useTranslation } from "react-i18next"

interface IProps {
  file: File | null
  show: boolean
  setFile: (file: File | null) => void
  handleClose: () => void
}

const ImportGuest = ({ file, setFile, show, handleClose }: IProps) => {
  const { t } = useTranslation()
  const [showExample, setShowExample] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <Modal className={styles.importGuest} show={show} onHide={handleClose}>
      <Modal.Header className={styles.close} closeButton></Modal.Header>
      <Modal.Body>
        <div className={styles.body}>
          <h2 className={`caption ${styles.caption}`}>
            {t("contacts.importGuestPopup.title")}
          </h2>

          <div className={styles.choose}>
            <ChooseFileImport
              progress={progress}
              setProgress={setProgress}
              file={file}
              setFile={setFile}
            />
            {progress >= 100 && (
              <button
                onClick={handleClose}
                className={`btn btn-dark ${styles.choose__btn}`}
              >
                {t("buttons.goToContacts")}
              </button>
            )}
          </div>

          {!file && (
            <div className={styles.templateTable}>
              <div className={styles.templateTable__line}>
                <span className={styles.templateTable__text}>
                  {t("contacts.example.text")}
                </span>
                <a href="#" className={styles.templateTable__link}>
                  {t("contacts.example.linkDownload")} <IconLoadSmall />
                </a>
              </div>

              <div className={styles.or}>
                <span className={styles.or__text}>
                  {t("contacts.example.or")}
                </span>
              </div>

              <div className={styles.templateTable__line}>
                <span className={styles.templateTable__text}>
                  {t("contacts.example.text2")}
                </span>
                <span
                  className={
                    showExample
                      ? `${styles.templateTable__link} ${styles.templateTable__link_show}`
                      : `${styles.templateTable__link}`
                  }
                  onClick={() => {
                    setShowExample(!showExample)
                  }}
                >
                  {t("contacts.example.seeExample")} <IconArrowDownSmall />
                </span>
              </div>

              {showExample && (
                <div className={styles.importGuest__image}>
                  <img src="./images/pic-example.jpg" alt="" />
                </div>
              )}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ImportGuest
