import { Link } from "react-router-dom"
import { IEvent, IEvents } from "./types"
import EventsItem from "./EventsItem"

const Events = ({ events }: IEvents) => {
  return (
    <div className="event-list">
      {events.map((event: IEvent) => {
        return <EventsItem key={event.event_id} {...event} />
      })}
    </div>
  )
}

export default Events
