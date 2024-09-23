import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useTranslation } from "react-i18next"
import EventsControls from "../../components/Events/EventsControls/EventsControls"
import Events from "../../components/Events/Events"
import {
  clearEvents,
  getEvents,
  setCurrentPage,
} from "../../redux/slices/events/eventsSlice"
import Paginator from "../../components/utils/Pagination/Pagination"
import Preloader from "../../components/utils/Preloader/Preloader"
import { IEvent } from "../../components/Events/types"
import NotEvents from "../../components/Events/NotEvents"
import NoEventsPage from "./NoEventsPage"

const EventsPage = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { data, total_pages, current_page, isLoading, total } = useAppSelector(
    (state) => state.events,
  )

  const [eventsLoadMore, setEventsLoadMore] = useState<IEvent[]>([])
  const [events, setEvents] = useState<IEvent[]>([])
  const [filter, setFilter] = useState({
    sort: "orderBy",
    searchValue: "",
    status: "",
  })

  const onPageChanged = (page: number) => {
    dispatch(setCurrentPage(page))
    dispatch(getEvents(filter))
  }

  useEffect(() => {
    dispatch(getEvents(filter))
    return () => {
      dispatch(clearEvents())
    }
  }, [])

  useEffect(() => {
    if (eventsLoadMore.length > 0) {
      setEvents([...eventsLoadMore, ...data])
      setEventsLoadMore([])
    } else {
      setEvents(data)
    }
  }, [data])

  useEffect(() => {
    dispatch(setCurrentPage(1))
    dispatch(getEvents(filter))
  }, [filter.sort, filter.searchValue, filter.status])

  if (data.length <= 0) {
    return <NoEventsPage />
  }

  return (
    <>
      {isLoading && <Preloader />}

      <div className="events-section">
        <div className="container">
          <EventsControls filter={filter} setFilter={setFilter} />

          {events.length > 0 ? (
            <>
              <Events events={events} />

              <Button
                onClick={() => {
                  setEventsLoadMore(events)
                  dispatch(
                    setCurrentPage(
                      current_page === total_pages ? 1 : current_page + 1,
                    ),
                  )
                  dispatch(getEvents(filter))
                }}
                className={
                  total > events.length
                    ? "btn btnloadMore d-lg-none d-sm-flex"
                    : "d-none"
                }
              >
                {t("buttons.loadMore")}
              </Button>

              <Paginator
                total_pages={total_pages}
                current_page={current_page}
                onPageChanged={onPageChanged}
              />
            </>
          ) : (
            <div className="filtered-none">
              <NotEvents />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default EventsPage
