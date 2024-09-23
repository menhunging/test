import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { getPreview, clearImg } from "../../redux/slices/events/eventsSlice"
import { useNavigate } from "react-router-dom"
import CreateEventForm from "./CreateEventForm"
import CreateEventPreview from "./CreateEventPreview"

const CreateEventPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { lang, error } = useAppSelector((state) => state.auth)
  const { new_event_img, preview } = useAppSelector((state) => state.events)

  const [language, setLanguage] = useState(lang)

  const defaultEvent = {
    name: "",
    address: {
      address: "",
      lat: 0,
      lng: 0,
    },
    type: -1,
    event_created_date: "",
    language: language,
    img: {
      path: new_event_img?.file_path,
      id: new_event_img?.id,
    },
    invitation_show_qr_code: false,
    qr_wallet: false,
  }

  const [event, setEvent] = useState(defaultEvent)

  const onCancelHandle = () => {
    setEvent(defaultEvent)
    navigate("/events")
  }

  useEffect(() => {
    dispatch(getPreview())

    return () => {
      dispatch(clearImg())
      setEvent(defaultEvent)
    }
  }, [])

  useEffect(() => {
    setEvent({
      ...event,
      img: {
        path: new_event_img.file_path,
        id: new_event_img.id,
      },
    })
  }, [new_event_img])

  return (
    <div className="createEventPage">
      <div className="container">
        <h2 className="caption-two">Create Event</h2>
        <div className="createEventForm bl-default">
          <CreateEventForm
            event={event}
            setEvent={setEvent}
            new_event_img={new_event_img}
            error={error}
            onCancelHandle={onCancelHandle}
            language={language}
            setLanguage={setLanguage}
          />
          <CreateEventPreview
            event={event}
            new_event_img={new_event_img}
            loadPreview={preview}
            language={language}
          />
          <div className="createEventForm__controls">
            <span className="btn btn-simple" onClick={onCancelHandle}>
              {t("buttons.cancel")}
            </span>
            <button
              type="submit"
              // onClick={handleSubmit(onSubmit)}
              className="btn btn-dark"
            >
              {t("buttons.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEventPage
