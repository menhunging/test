import Select from "react-select"
import { useTranslation } from "react-i18next"

const eventType = [
  { value: "WEDDING", label: "wedding", id: 0 },
  { value: "ENGAGEMENT", label: "engagement", id: 1 },
  { value: "GRADUATION", label: "graduation", id: 2 },
  { value: "CORPORATE_EVENT", label: "wedcorporate eventding", id: 3 },
  { value: "OPENING", label: "opening", id: 4 },
  { value: "BIRTHDAY", label: "birthday", id: 5 },
  { value: "NEW_BORN", label: "new born", id: 6 },
  { value: "NEW_HOUSE", label: "new house", id: 7 },
  {
    value: "FAMILY_OR_FRIENDS_GATHERING",
    label: "family or friends gathering",
    id: 8,
  },
  { value: "NATIONAL_HOLIDAY_PARTY", label: "national holiday party", id: 9 },
  { value: "REUNION", label: "reunion", id: 10 },
  { value: "OTHER", label: "other", id: 11 },
]

const SelectTypeEvent = ({
  placeholder,
  event,
  setEvent,
  error,
  value,
  handleChange,
}) => {
  const { t } = useTranslation()

  return (
    <div className={error ? "select-event input-error" : "select-event"}>
      <Select
        // menuIsOpen={true}
        classNamePrefix="select-event"
        placeholder={""}
        options={eventType}
        value={eventType.find((e) => e.value === value)}
        onChange={(val) => {
          handleChange(val.value)
          setEvent({ ...event, type: val.id })
        }}
      />

      <label className={event.type >= 0 ? "active" : ""} htmlFor="">
        {placeholder}
      </label>

      {error && <span className="input-item__error error mt-1">{error}</span>}
    </div>
  )
}

export default SelectTypeEvent
