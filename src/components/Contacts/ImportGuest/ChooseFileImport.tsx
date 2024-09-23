import { useState, useEffect } from "react"
import { FileUploader } from "react-drag-drop-files"
import {
  IconCompletedFile,
  IconDeleteFile,
  IconLoadFile,
  IconisLoadingFile,
} from "../../utils/Icons/CustomIcons"
import socketio from "socket.io-client"
import Echo from "laravel-echo"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { importFile } from "../../../redux/slices/contacts/contactsSlices"

interface IProps {
  file: File | null
  progress: number
  setFile: (file: File | null) => void
  setProgress: (progress: number) => void
}

const filesType = [
  "text/csv",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]

const ChooseFileImport = ({ file, setFile, progress, setProgress }: IProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { accessToken } = useAppSelector((state) => state.auth)
  const { progress_id } = useAppSelector((state) => state.contacts)

  const clearFile = () => {
    setProgress(0)
    setFile(null)
    setError("")
    setLoading(false)
  }

  const handleError = () => {
    setError(t("contacts.dragAndDrop.error"))
    setLoading(false)
  }

  const handleChange = (file: File) => {
    const formData = new FormData()
    let { name, size, type } = file

    size = Number((size / 1024).toFixed(0))
    formData.append("file", file)

    setLoading(true)

    if (filesType.includes(type)) {
      setError("")
      setFile(file)
      dispatch(importFile(formData))
    } else {
      handleError()
      setFile(null)
    }
  }

  // socket

  useEffect(() => {
    const echo = new Echo({
      host: "https://dev-api.mazoom.sa:6001",
      broadcaster: "socket.io",
      client: socketio,
      encrypted: false,
      transports: ["websocket"],
      auth: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    })

    if (progress_id) {
      echo
        .channel(`private-file-upload-progress.${progress_id}`)
        .listen(".file-upload-progress.changed", (ev) => {
          if (!ev.messageBag) {
            setProgress(ev.fileUploadProgress.progress_pct)
            setLoading(false)
          } else {
            setFile(null)
            setError(ev.messageBag.error[0])
          }
        })
    }

    return () => {
      if (progress_id) {
        echo.leaveChannel(`private-file-upload-progress.${progress_id}`)
      }
    }
  }, [progress_id])

  // socket

  return (
    <>
      {!file || error ? (
        <div className="loadFile">
          <FileUploader
            name="file"
            maxSize={5}
            types={["csv", "xlsx", "xls"]}
            multiple={false}
            handleChange={handleChange}
            onTypeError={handleError}
            onSizeError={handleError}
            required={true}
          >
            <div className="loadFile-text">
              <IconLoadFile />
              <span className="title">{t("contacts.dragAndDrop.title")}</span>
              <span className="desc">{t("contacts.dragAndDrop.desc")}</span>
              <span className="text-required">
                {t("contacts.dragAndDrop.text")}
              </span>
              {error && <span className="error">{error}</span>}
            </div>
          </FileUploader>
        </div>
      ) : (
        <div className="loadFileComplated">
          {loading ? (
            <IconisLoadingFile />
          ) : (
            <button className="btn-detele-file" onClick={clearFile}>
              <IconDeleteFile />
            </button>
          )}
          <div className="loadFileComplated__left">
            <span className="name">{file?.name}</span>
            <span className="size">{(file?.size / 1024).toFixed(0)}KB</span>
            <span className="file-status">
              {loading ? `${progress.toFixed(0)} seconds left` : "Done"}
            </span>
          </div>
          <div className="loadFileComplated__right">
            <span className="percent">{`${progress}%`}</span>
            {!loading && <IconCompletedFile />}
          </div>
          <div className="loadFileProgress">
            <div
              className={loading ? "progress" : "progress progress--load"}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChooseFileImport
