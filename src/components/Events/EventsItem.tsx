import { Link } from "react-router-dom"
import { IEvent } from "./types"
import { useTranslation } from "react-i18next"
import {
  IconEventNumber1,
  IconEventNumber2,
  IconEventNumber3,
  IconEventNumber4,
} from "../utils/Icons/CustomIcons"
import moment from "moment"

const EventsItem = ({
  event_id,
  status,
  name,
  event_created_date,
  pattern,
  count_all_contacts,
  count_contacts_ignore,
  count_contacts_going,
  count_contacts_decline,
}: IEvent) => {
  const { t } = useTranslation()
  const nameStatus = [
    { draft: t("events.filter.status.draft") },
    { approved: t("events.filter.status.approved") },
    { all: t("events.filter.status.all") },
    { updated: t("events.filter.status.updated") },
  ]

  return (
    <div className="event-item">
      <div className="event-left">
        <div className="event-picture">
          <img src={pattern ? pattern : "/vector/no-foto.svg" } alt={name} />
        </div>
        <div className="event-info">
          <Link to="/" className="event-item__caption caption-three">
            {name}
          </Link>
          <span className="event-item__date">
            {moment(event_created_date).format("dddd, D MMMM YYYY")}
          </span>
          <span
            className={`event-item__status status ${Object.keys(
              nameStatus[status],
            )}`}
          >
            {Object.values(nameStatus[status])}
          </span>
        </div>
      </div>
      <div className="event-right">
        <ul className="event-num">
          <li>
            <IconEventNumber1 />
            <span>{count_all_contacts}</span>
          </li>
          <li>
            <IconEventNumber2 />
            <span>{count_contacts_ignore}</span>
          </li>
          <li>
            <IconEventNumber3 />
            <span>{count_contacts_going}</span>
          </li>
          <li>
            <IconEventNumber4 />
            <span>{count_contacts_decline}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default EventsItem
