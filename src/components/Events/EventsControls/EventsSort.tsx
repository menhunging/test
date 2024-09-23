import { Dropdown } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { IFilter } from "../types"

const EventsSort = ({ filter, setFilter }: IFilter) => {
  const { t } = useTranslation()

  return (
    <Dropdown className="dropdown-block">
      <Dropdown.Toggle className="dropdown-block-text border-0 bg-transparent">
        {filter.sort === "orderBy" || ""
          ? t("events.sort.MostRecent")
          : t("events.sort.TheOldest")}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          active={filter.sort === "orderBy"}
          onClick={() => {
            setFilter({ ...filter, sort: "orderBy" })
          }}
        >
          {t("events.sort.MostRecent")}
        </Dropdown.Item>
        <Dropdown.Item
          active={filter.sort === "sortedBy"}
          onClick={() => {
            setFilter({ ...filter, sort: "sortedBy" })
          }}
        >
          {t("events.sort.TheOldest")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default EventsSort
