import { useState, useEffect } from "react"
import { Button, Dropdown } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { IFilter } from "../types"
import { IconFilter } from "../../utils/Icons/CustomIcons"

const EventsFilter = ({ filter, setFilter }: IFilter) => {
  const { t } = useTranslation()
  const [isFilterOpened, setIsFilterOpened] = useState(true)
  const [isFiltered, setFiltered] = useState(false)

  const [status, setStatus] = useState({
    draft: false,
    approved: false,
    all: true,
    updated: false,
  })

  return (
    <Dropdown
      show={!isFilterOpened}
      onToggle={() => {
        setIsFilterOpened(!isFilterOpened)
      }}
      className={
        !isFiltered
          ? "dropdown-block dropdown--not-arrow dropdown-filter"
          : "dropdown-block dropdown--not-arrow dropdown-filter dropdown-filter--filtered"
      }
    >
      <Dropdown.Toggle className="dropdown-block-text border-0 bg-transparent">
        {t("events.filter.title")}
        <IconFilter />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <span className="dropdown-filter__title">
          {t("events.filter.status.title")}
        </span>
        <div className="check-list">
          <div className="check-item">
            <input
              type="checkbox"
              id="filter-all"
              checked={status.all}
              onChange={() => {
                setStatus({
                  ...status,
                  all: !status.all,
                  approved: !status.all,
                  updated: !status.all,
                  draft: !status.all,
                })
              }}
            />
            <label htmlFor="filter-all">{t("events.filter.status.all")}</label>
          </div>
          <div className="check-item">
            <input
              type="checkbox"
              id="filter-approved"
              checked={status.approved}
              onChange={() => {
                setStatus({
                  ...status,
                  all: false,
                  approved: !status.approved,
                })
              }}
            />
            <label htmlFor="filter-approved">
              {t("events.filter.status.approved")}
            </label>
          </div>
          <div className="check-item">
            <input
              type="checkbox"
              id="filter-updated"
              checked={status.updated}
              onChange={() => {
                setStatus({ ...status, all: false, updated: !status.updated })
              }}
            />
            <label htmlFor="filter-updated">
              {t("events.filter.status.updated")}
            </label>
          </div>
          <div className="check-item">
            <input
              type="checkbox"
              id="filter-draft"
              checked={status.draft}
              onChange={() => {
                setStatus({ ...status, all: false, draft: !status.draft })
              }}
            />
            <label htmlFor="filter-draft">
              {t("events.filter.status.draft")}
            </label>
          </div>
        </div>
        <Button
          className="btn btn-dark"
          onClick={() => {
            let arrayStatus: number[] = []

            Object.values(status).filter((element, index) => {
              if (element === true) arrayStatus.push(index)
            })

            setFilter({ ...filter, status: arrayStatus.join(",") })
            setIsFilterOpened(true)

            if (arrayStatus.includes(2) || !arrayStatus.length) {
              setFiltered(false)
            } else {
              setFiltered(true)
            }
          }}
        >
          {t("buttons.apply")}
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default EventsFilter
