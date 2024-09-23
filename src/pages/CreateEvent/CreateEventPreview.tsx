import { useState, useEffect, useCallback } from "react"
import { useTranslation } from "react-i18next"
import {
  IconArrowPreview,
  IconArrowRight,
  IconCrown,
} from "../../components/utils/Icons/CustomIcons"
import { Tab, Tabs } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const CreateEventPreview = ({
  event,
  new_event_img,
  loadPreview,
  language,
}) => {
  const { t } = useTranslation()
  const navigator = useNavigate()

  const [preview, setPreview] = useState(loadPreview)

  // tabs
  const [key, setKey] = useState("tab1")
  const [opened, setOpened] = useState(false)

  const handleLanguage = () => {
    if (language == "English" || language == "en") {
      setPreview(loadPreview.en)
    }

    if (language == "Arabic" || language == "ar") {
      setPreview(loadPreview.ar)
    }
  }

  useEffect(() => {
    handleLanguage()
  }, [])

  useEffect(() => {
    handleLanguage()
  }, [loadPreview, language])

  return (
    <div className="createEventForm__right">
      <div className="preview">
        <h3
          className={`caption caption-three ${opened && "opened"}`}
          onClick={() => {
            setOpened(!opened)
          }}
        >
          Preview
          <IconArrowPreview />
        </h3>
        <div className={`preview-controls ${opened && "opened"}`}>
          {event.invitation_show_qr_code && (
            <span
              onClick={() => {
                navigator("/edit-design")
              }}
              className="editTextQR"
            >
              <IconCrown /> Edit QR code design
            </span>
          )}
          <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab
              className="preview-controls__line"
              eventKey="tab1"
              title={
                <div className="preview-name">
                  <span>Invitation</span>
                  <IconArrowRight />
                </div>
              }
            >
              <div className="preview-phone">
                <div className="preview-content">
                  <div className="preview-content__wrap">
                    <div className="preview-content__inner">
                      <picture className="picture">
                        <img
                          src={
                            new_event_img.file_path
                              ? new_event_img.file_path
                              : "/vector/no-foto.svg"
                          }
                          alt=""
                        />
                      </picture>
                      <p>
                        {(language == "English" || language == "en") &&
                          "Mr John Doe We are pleased to invite you to"}

                        {(language == "Arabic" || language == "ar") &&
                          "فلان الفلاني نحن سعداء بدعوتك إلى"}
                        {event.name}
                      </p>
                      <a href="#">www.mazoom.sa</a>
                      <span className="date">11.14 AM</span>
                    </div>
                    <div className="preview-invitation__controls">
                      <button className="btn" disabled>
                        {preview?.invitation?.decline_button_text}
                      </button>
                      <button className="btn">
                        {preview?.invitation?.accept_button_text}
                      </button>
                      <button className="btn">
                        {preview?.invitation?.location_button_text}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              className="preview-controls__line"
              eventKey="tab2"
              title={
                <div className="preview-name">
                  <span>Confirm</span>
                  <IconArrowRight />
                </div>
              }
            >
              <div className="preview-phone">
                <div className="preview-content">
                  <div className="preview-content__wrap">
                    <div className="preview-content__inner">
                      <picture className="picture">
                        <img src="/images/oq-code.png" alt="" />
                      </picture>
                      <p>
                        {
                          preview?.confirm_with_qr
                            ?.with_add_qr_to_wallet_body_text
                        }
                      </p>
                      <a href="#">www.mazoom.sa</a>
                      <span className="date">11.14 AM</span>
                    </div>
                    {event.qr_wallet && (
                      <div className="preview-invitation__controls">
                        <button className="btn btn--full">
                          Add to my wallet
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              className="preview-controls__line"
              eventKey="tab3"
              title={
                <div className="preview-name">
                  <span>Location</span>
                  <IconArrowRight />
                </div>
              }
            >
              <div className="preview-phone">
                <div className="preview-content">
                  <div className="preview-content__wrap">
                    <div className="preview-content__inner">
                      <picture className="picture">
                        <img src="/images/pic-google-map.png" alt="" />
                      </picture>
                      <a href="#" className="link-addres">
                        {/* {preview.location?.location_not_set_text} */}
                        {event.address.address
                          ? event.address.address
                          : preview?.location?.location_not_set_text}
                        <p></p>
                      </a>
                      <a href="#">www.mazoom.sa</a>
                      <span className="date">11.14 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              className="preview-controls__line"
              eventKey="tab4"
              title={
                <div className="preview-name">
                  <span>Decline</span>
                  <IconArrowRight />
                </div>
              }
            >
              <div className="preview-phone">
                <div className="preview-content">
                  <div className="preview-content__wrap answer">
                    <div className="preview-content__inner">
                      <div className="preview-answer">
                        <span className="preview-answer__name">Mazoom</span>
                        <div className="preview-answer__info">
                          <span className="caption">Samsons Wedding</span>
                          <p>We are plesed to invite you</p>
                          <picture className="picture">
                            <img src="/images/pic-google-map.png" alt="" />
                          </picture>
                        </div>
                      </div>
                      <p>Decline</p>
                      <span className="date">11.14 AM</span>
                    </div>
                  </div>

                  <div className="preview-content__wrap">
                    <div className="preview-content__inner">
                      <p>{preview?.decline?.reply_sent_body_text}</p>
                      <a href="#">www.mazoom.sa</a>
                      <span className="date">11.14 AM</span>
                    </div>
                    <div className="preview-invitation__controls">
                      <button className="btn">
                        {preview?.decline?.reply_sent_button_yes}
                      </button>
                      <button className="btn" disabled>
                        {preview?.decline?.reply_sent_button_no}
                      </button>
                    </div>
                  </div>

                  <div className="preview-content__wrap answer">
                    <div className="preview-content__inner">
                      <div className="preview-answer">
                        <span className="preview-answer__name">Mazoom</span>
                        <p>{preview?.decline?.reply_sent_body_text}</p>
                      </div>
                      <p>{preview?.decline?.reply_sent_button_no}</p>
                      <span className="date">11.14 AM</span>
                    </div>
                  </div>

                  <div className="preview-content__wrap">
                    <div className="preview-content__inner">
                      <p>
                        {
                          preview?.decline
                            ?.send_message_question_accept_reply_text
                        }
                      </p>
                      <a href="#">www.mazoom.sa</a>
                      <span className="date">11.14 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CreateEventPreview
