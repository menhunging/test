import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  IconArrowDown,
  IconArrowUp,
  IconDelete,
} from "../../utils/Icons/CustomIcons"
import moment from "moment"

const CustomTimeInput = ({ date, value, onChange }) => {
  // const hours = Number(`${value[0]}${value[1]}`)
  // const minutes = Number(`${value[3]}${value[4]}`)

  const [time, setTime] = useState({ hours: 0, minutes: 0 })

  const handleHoursChange = (value) => {
    onChange(String(value) + ":" + String(time.minutes))

    // if (val === "" || (/^\d+$/.test(val) && val >= 0 && val <= 23)) {
    //   onChange(`${val}:${minutes}`)
    // }
  }

  const handleMinutesChange = (value) => {
    onChange(String(time.hours) + ":" + String(value))
    // let val = e.target.value
    // onChange(`${hours}:${val}`)

    // if (val === "" || (/^\d+$/.test(val) && val >= 0 && val <= 59)) {
    //   onChange(`${hours}:${val}`)
    // }
  }

  return (
    <div className="timeEvent">
      <span className="title">Time</span>

      <div className="timeEvent__inputs">
        <div className="timeEvent__controls">
          <div className="arrows">
            <span
              className="arrows__up"
              onClick={() => {
                if (time.hours >= 23) {
                  setTime({ ...time, hours: 0 })
                  handleHoursChange(0)
                } else {
                  setTime({ ...time, hours: time.hours + 1 })
                  handleHoursChange(time.hours + 1)
                }
              }}
            >
              <IconArrowUp />
            </span>

            <span
              className="arrows__down"
              onClick={() => {
                if (time.hours <= 0) {
                  setTime({ ...time, hours: 23 })
                  handleHoursChange(23)
                } else {
                  setTime({ ...time, hours: time.hours - 1 })
                  handleHoursChange(time.hours - 1)
                }
              }}
            >
              <IconArrowDown />
            </span>
          </div>
          <input type="number" value={time.hours} />
        </div>
        <span className="toh">:</span>
        <div className="timeEvent__controls">
          <input type="number" value={time.minutes} />
          <div className="arrows">
            <span
              className="arrows__up"
              onClick={() => {
                if (time.minutes >= 50) {
                  setTime({ ...time, minutes: 0 })
                  handleMinutesChange(0)
                } else {
                  setTime({ ...time, minutes: time.minutes + 10 })
                  handleMinutesChange(time.minutes + 10)
                }
              }}
            >
              <IconArrowUp />
            </span>

            <span
              className="arrows__down"
              onClick={() => {
                if (time.minutes <= 0) {
                  setTime({ ...time, minutes: 50 })
                  handleMinutesChange(50)
                } else {
                  setTime({ ...time, minutes: time.minutes - 10 })
                  handleMinutesChange(time.minutes - 10)
                }
              }}
            >
              <IconArrowDown />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomTimeInput
