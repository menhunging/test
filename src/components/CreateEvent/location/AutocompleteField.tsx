import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import { useTranslation } from "react-i18next"
import useOnclickOutside from "react-cool-onclickoutside"
import { useEffect } from "react"
import { IconClose } from "../../utils/Icons/CustomIcons"

const AutocompleteField = ({
  name,
  handleChange,
  isLoaded,
  onSelect,
  event,
  setEvent,
  locationPopupOpen,
  error,
}) => {
  const {
    ready,
    suggestions: { status, data },
    value,
    setValue,
    init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  })

  const { t } = useTranslation()

  const ref = useOnclickOutside(() => {
    clearSuggestions()
  })

  const handleInput = (e) => {
    handleChange(e.target.value)
    setValue(e.target.value)

    setEvent({
      ...event,
      address: {
        address: e.target.value,
      },
    })
  }

  const clearInput = () => {
    handleChange("")
    setValue("")

    setEvent({
      ...event,
      address: {
        address: "",
      },
    })
  }

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false)
      clearSuggestions()

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0])
        onSelect(description, { lat, lng })
      })
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li
          className="select-event__option"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  const setClassName = () => {
    let inputClassName = !event.address.address
      ? "autoComplate-input input-item"
      : "autoComplate-input input-item active"

    inputClassName = `${inputClassName} ${error && "input-error"}`

    return inputClassName
  }

  useEffect(() => {
    if (isLoaded) {
      init()
    }
  }, [isLoaded, init])

  return (
    <>
      <div className={setClassName()} ref={ref}>
        <input
          autoComplete="false"
          name={name}
          type={"text"}
          value={event.address.address}
          onChange={handleInput}
          disabled={!ready}
          // {...register(name, { required: t("errors.fieldRequired") })}
        />

        {event.address.address && (
          <button className="btn-input-clear" onClick={clearInput}>
            <IconClose />
          </button>
        )}

        <label htmlFor="">Enter event location</label>

        {error && <span className="input-item__error error mt-1">{error}</span>}

        {status === "OK" && (
          <ul className="select-event__menu autoComplete">
            {renderSuggestions()}
            <li
              className="select-event__option popup-map"
              onClick={() => {
                locationPopupOpen(true)
              }}
            >
              indicate a point on the map
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.32099 14.3703L7.92593 14.6666L7.53086 14.3703C3.8642 11.6203 2 9.29004 2 7.25918C2 4.03453 4.47617 1.33325 7.92593 1.33325C11.3757 1.33325 13.8519 4.03453 13.8519 7.25918C13.8519 9.29004 11.9877 11.6203 8.32099 14.3703ZM3.31687 7.25918C3.31687 8.68067 4.83502 10.6353 7.92593 13.0165C11.0168 10.6353 12.535 8.68067 12.535 7.25918C12.535 4.73747 10.6216 2.65012 7.92593 2.65012C5.23028 2.65012 3.31687 4.73747 3.31687 7.25918ZM7.92593 8.57605C7.19864 8.57605 6.60905 7.98647 6.60905 7.25918C6.60905 6.53189 7.19864 5.94231 7.92593 5.94231C8.65321 5.94231 9.2428 6.53189 9.2428 7.25918C9.2428 7.98647 8.65321 8.57605 7.92593 8.57605Z"
                  fill="#0B0C0E"
                />
              </svg>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}

export default AutocompleteField
