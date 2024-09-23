import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { IconSearch } from "../../utils/Icons/CustomIcons"
import { IFilter } from "../types"
import useDebounce from "../../../hooks/useDebounce"

const EventsSearch = ({ filter, setFilter }: IFilter) => {
  const { t } = useTranslation()
  const [search, setSearch] = useState("")

  const debouncedSearchTerm = useDebounce(search, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setFilter({ ...filter, searchValue: search })
    }

    if (search === "") {
      setFilter({ ...filter, searchValue: search })
    }
  }, [debouncedSearchTerm])

  return (
    <div className="input-search">
      <input
        type="text"
        placeholder={t("placeholder.search")}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <button className="input-search__btn">
        <IconSearch />
      </button>
    </div>
  )
}

export default EventsSearch
