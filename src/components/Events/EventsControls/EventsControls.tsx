import { Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { IconBtnCreate } from "../../utils/Icons/CustomIcons"
import EventsFilter from "./EventsFilter"
import { IFilter } from "../types"
import EventsSort from "./EventsSort"
import EventsSearch from "./EventsSearch"
import { useNavigate } from "react-router-dom"

const EventsControls = ({ filter, setFilter }: IFilter) => {
  const { t } = useTranslation()
  const navigator = useNavigate()

  return (
    <div className="events-controls">
      <h2 className="caption-two">{t("events.caption")}</h2>

      <EventsSearch filter={filter} setFilter={setFilter} />
      <EventsFilter filter={filter} setFilter={setFilter} />
      <EventsSort filter={filter} setFilter={setFilter} />

      <Button
        className="btn btn-dark event-create"
        onClick={() => navigator("/event-create")}
      >
        <IconBtnCreate />
        {t("buttons.createEvent")}
      </Button>
    </div>
  )
}

export default EventsControls
