import Select from "react-select"
import { useTranslation } from "react-i18next"

const SelectLanguageEvent = ({
  placeholder,
  event,
  setEvent,
  error,
  value,
  handleChange,
  setLanguage,
}) => {
  const { t } = useTranslation()

  const eventLanguage = [
    { value: "en", label: "English", id: 0 },
    { value: "ar", label: "Arabic", id: 1 },
  ]

  return (
    <div className={error ? "select-event input-error" : "select-event"}>
      <Select
        classNamePrefix="select-event"
        defaultValue={() => {
          handleChange(eventLanguage.find((obj) => obj.value === value))
          return eventLanguage.find((obj) => obj.value === event.language)
        }}
        onChange={(val) => {
          handleChange(val.label)
          setLanguage(val.label)
          setEvent({ ...event, language: val.label })
        }}
        options={eventLanguage}
      />

      <label className={"active"} htmlFor="">
        {placeholder}
      </label>

      {error && <span className="input-item__error error mt-1">{error}</span>}
    </div>
  )
}

export default SelectLanguageEvent
