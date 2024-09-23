import { useMemo } from "react"

export const useRevertEvents = (events, revert) => {
  const revertEvents = useMemo(() => {
    if (revert) {
      return [...events].reverse()
    }
    return events
  }, [events, revert])

  return revertEvents
}

export const useSortedEvents = (events, sort, revert) => {
  const revertEvents = useRevertEvents(events, revert)
  const sortedEvents = useMemo(() => {
    if (sort.length > 0) {
      console.log(sort)
      return revertEvents.filter((event) => {
        return sort.includes(event.status.toLowerCase())
      })
    }
    return revertEvents
  }, [sort, events, revert])

  return sortedEvents
}

export const useEvents = (events, sort, searchValue, revert) => {
  const sortedEvents = useSortedEvents(events, sort, revert)

  const searchEvents = useMemo(() => {
    return sortedEvents.filter((event) =>
      event.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }, [searchValue, sortedEvents])

  return searchEvents
}
