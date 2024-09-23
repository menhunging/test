import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CustomTimeInput from "./DateEventField"
import { IconCalendar } from "../../utils/Icons/CustomIcons"
import { useTranslation } from "react-i18next"
import moment from "moment"

const DateEvent = ({ event, setEvent, error, handleChange }) => {
  const { t } = useTranslation()

  const [startDate, setStartDate] = useState("")
  const [focus, setFocus] = useState(false)

  return (
    <div
      className={
        error
          ? "profile-input input-item input-error"
          : "profile-input input-item"
      }
    >
      <DatePicker
        autoComplete="off"
        selected={startDate}
        minDate={moment().toDate()}
        onChange={(date) => {
          handleChange(date)
          setStartDate(date)
          setEvent({ ...event, event_created_date: date })
        }}
        dateFormat={`EEEE d MMM, yyyy, HH:mm`}
        // dateFormat={`EEEE d MMM, yyyy, h:mm aa`} AM & PM
        showTimeInput={true}
        customTimeInput={<CustomTimeInput />}
        onFocus={() => {
          setFocus(true)
        }}
        onBlur={() => {
          setFocus(false)
        }}
      />

      <label className={startDate || focus ? "active" : ""} htmlFor="">
        {startDate || focus ? "Date*" : "Pick date*"}
      </label>

      <IconCalendar className="icon" />

      {error && <span className="input-item__error error mt-1">{error}</span>}
    </div>
  )
}

export default DateEvent
