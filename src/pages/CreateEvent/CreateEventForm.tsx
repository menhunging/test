import { useState, useEffect, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import CreateEventField from "../../components/CreateEvent/CreateEventField"
import ChooseFileEvent from "../../components/CreateEvent/ChooseFileEvent"
import SelectTypeEvent from "../../components/CreateEvent/SelectTypeEvent"
import SelectLanguageEvent from "../../components/CreateEvent/SelectLanguageEvent"
import DateEvent from "../../components/CreateEvent/DateEvent/DateEvent"
import { Controller, useForm } from "react-hook-form"
import { createEvent, eventDesign } from "../../redux/slices/events/eventsSlice"
import Location from "../../components/CreateEvent/location/Location"
import AutocompleteField from "../../components/CreateEvent/location/AutocompleteField"
import { useJsApiLoader } from "@react-google-maps/api"
import { getGeocode, getLatLng } from "use-places-autocomplete"
import { IconCrown } from "../../components/utils/Icons/CustomIcons"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

interface IForm {
  name: string
  address: string
  eventType: string
  event_created_date: string
  language: string
}

// google map
const API_KEY = "AIzaSyABYx4Z-FcV-fgMYr4lPAXBRnbEbr2SMnw"

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
}

const CreateEventForm = ({
  setEvent,
  event,
  new_event_img,
  error,
  onCancelHandle,
  language,
  setLanguage,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isOpenLocationPopup, setIsOpenLocationPopup] = useState(false)

  // google map
  const [center, setCenter] = useState(defaultCenter)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  })

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IForm>({})

  const checkEmptyInput = (value: string) => {
    if (!!!value) {
      return "empty"
    }
  }

  const onSubmit = () => {
    new Promise((resolve, reject) => {
      const res = dispatch(createEvent(event))
      resolve(res)
    })
      .then((data) => {
        let eventD = {
          event_id: data.payload.data.event_id,
          pattern_id: new_event_img.id,
        }

        dispatch(eventDesign(eventD))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onPlaceSelect = (address, coordinates) => {
    setEvent({
      ...event,
      address: {
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
    })

    setCenter(coordinates)
  }

  const onClickSaveMap = (location) => {
    const latlng = {
      lat: location.lat,
      lng: location.lng,
    }

    getGeocode({ location: latlng }).then((results) => {
      setEvent({
        ...event,
        address: {
          address: results[0].formatted_address,
        },
      })
    })
  }

  const onClickMap = (location) => {
    const latlng = {
      lat: location.latLng.lat(),
      lng: location.latLng.lng(),
    }

    setCenter(latlng)
  }

  const locationPopupOpen = () => {
    setIsOpenLocationPopup(true)
  }

  const locationPopupClose = () => {
    setIsOpenLocationPopup(false)
    onClickSaveMap(center)
  }

  return (
    <div className="createEventForm__left">
      <form action="" className="create-form" onSubmit={handleSubmit(onSubmit)}>
        <ChooseFileEvent />

        <CreateEventField
          name={"name"}
          type="text"
          label={"Enter event name*"}
          value={event.name}
          register={register}
          error={errors.name?.message || error}
          className={checkEmptyInput(event.name)}
          onHandleChange={(value) => {
            setEvent({
              ...event,
              name: value,
            })
          }}
        />

        <Controller
          name="address"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <AutocompleteField
              event={event}
              setEvent={setEvent}
              onSelect={onPlaceSelect}
              locationPopupOpen={locationPopupOpen}
              isLoaded={isLoaded}
              error={errors.address?.message}
              handleChange={(val) => {
                onChange(val)
              }}
            />
          )}
          rules={{ required: t("errors.fieldRequired") }}
        ></Controller>

        {isLoaded && (
          <Location
            isOpenLocationPopup={isOpenLocationPopup}
            handleClose={locationPopupClose}
            event={event}
            onClickMap={onClickMap}
            center={center}
            isLoaded={isLoaded}
          />
        )}

        <Controller
          name="eventType"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <SelectTypeEvent
              event={event}
              setEvent={setEvent}
              placeholder={"Choose event type"}
              value={value || event.type}
              error={errors.eventType?.message}
              handleChange={(val) => {
                onChange(val)
              }}
              // error={errors.eventType?.message || error}
            />
          )}
          rules={{ required: t("errors.fieldRequired") }}
        ></Controller>

        <Controller
          name="event_created_date"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <DateEvent
              event={event}
              setEvent={setEvent}
              error={errors.event_created_date?.message}
              handleChange={(val) => {
                onChange(val)
              }}
            />
          )}
          rules={{ required: t("errors.fieldRequired") }}
        ></Controller>

        <Controller
          name="language"
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <SelectLanguageEvent
              event={event}
              setEvent={setEvent}
              placeholder={"invitation text language"}
              value={event.language}
              error={errors.language?.message}
              language={language}
              setLanguage={setLanguage}
              handleChange={(val) => {
                onChange(val)
              }}
            />
          )}
          rules={{ required: t("errors.fieldRequired") }}
        ></Controller>

        <div className="checkbox-list">
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="qr-confirm"
              checked={event.invitation_show_qr_code}
              onChange={() => {
                setEvent({
                  ...event,
                  invitation_show_qr_code: !event.invitation_show_qr_code,
                })
              }}
            />
            <label htmlFor="qr-confirm">Send QR code on confirm</label>
          </div>
          <div className="checkbox-item">
            <input
              type="checkbox"
              id="qr-wallet"
              checked={event.qr_wallet}
              disabled={true}
              onChange={() => {
                setEvent({
                  ...event,
                  qr_wallet: !event.qr_wallet,
                })
              }}
            />
            <label htmlFor="qr-wallet">
              Add QR to Apple Wallet and Google Pay
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip className="header-tooltip" id="tooltip">
                    This feature is only available for premium users. Purchase
                    premium subscription to get this and many other features
                  </Tooltip>
                }
              >
                <span>
                  <IconCrown />
                </span>
              </OverlayTrigger>
            </label>
          </div>
        </div>

        <div className="create-form__controls">
          <span className="btn btn-simple" onClick={onCancelHandle}>
            {t("buttons.cancel")}
          </span>
          <button type="submit" className="btn btn-dark">
            {t("buttons.save")}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEventForm
