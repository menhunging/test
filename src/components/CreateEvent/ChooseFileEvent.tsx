import { useState, useEffect } from "react"
import { FileUploader } from "react-drag-drop-files"
import {
  IconCompletedFile,
  IconDeleteFile,
  IconLoadFile,
  IconisLoadingFile,
} from "../utils/Icons/CustomIcons"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import {
  deleteFileEvent,
  loadFileEvent,
} from "../../redux/slices/events/eventsSlice"

interface iFile {
  name: string
  size: number
  type: string
}

const ChooseFileEvent = ({ isButton = false }) => {
  const { t } = useTranslation()
  const { new_event_img } = useAppSelector((state) => state.events)
  const dispatch = useAppDispatch()

  let timer = null
  const [file, setFile] = useState<iFile | null>(null)
  const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)

  const clearFile = (id) => {
    dispatch(deleteFileEvent(id))
    clearInterval(timer)
    setProgress(0)
    setFile(null)
    setError(false)
    setLoading(false)
  }

  const handleError = () => {
    clearInterval(timer)
    setProgress(0)
    setError(true)
    setLoading(false)
  }

  const handleChange = (file: iFile) => {
    const formData = new FormData()
    let { name, size, type } = file

    size = Number((size / 1024).toFixed(0))
    formData.append("file", file)

    setLoading(true)

    timer =
      !timer &&
      setInterval(() => {
        setProgress((prevProgress) => prevProgress + 10)
      }, Number((size / 10).toFixed(0)))

    setTimeout(() => {
      clearInterval(timer)
      setProgress(100)
      setLoading(false)
    }, size)

    dispatch(loadFileEvent(formData))

    setError(false)
    setFile(file)
  }

  return (
    <>
      {!file ? (
        <div className="loadFile">
          <FileUploader
            name="file"
            maxSize={5}
            types={["JPEG", "JPG", "PNG"]}
            multiple={false}
            handleChange={handleChange}
            onTypeError={handleError}
            onSizeError={handleError}
            required={true}
          >
            <div className="loadFile-text">
              <IconLoadFile />
              <span className="title">
                Drag and Drop or choose file to upload event image
              </span>
              <span className="desc">
                Allowed image formats are JPG, PNG, JPEG. Up to 5 Mb
              </span>
              <span className="text-required">Need to upload a file</span>
              {error && (
                <span className="error">
                  The format and size of the uploaded file exceeds the
                  permissible value
                </span>
              )}

              {isButton && <span className="btn btn-dark">Upload File</span>}
            </div>
          </FileUploader>
        </div>
      ) : (
        <div className="loadFileComplated">
          {loading ? (
            <IconisLoadingFile />
          ) : (
            <button
              className="btn-detele-file"
              onClick={() => {
                console.log(new_event_img.id)
                clearFile(new_event_img.id)
              }}
            >
              <IconDeleteFile />
            </button>
          )}
          <div className="loadFileComplated__left">
            <span className="name">{file?.name}</span>
            <span className="size">{(file?.size / 1024).toFixed(0)}KB</span>
            <span className="file-status">
              {loading
                ? `${(
                    Number((file.size / 1024 / 1024).toFixed(0)) -
                    progress / 100
                  ).toFixed(0)} seconds left`
                : "Done"}
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

export default ChooseFileEvent
