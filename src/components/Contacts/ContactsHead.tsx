import { useTranslation } from "react-i18next"
import {
  IconBtnCreate,
  IconImport,
  IconSearch,
} from "../../components/utils/Icons/CustomIcons"
import { useEffect, useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import { getContacts } from "../../redux/slices/contacts/contactsSlices"
import { useAppDispatch } from "../../redux/store"

const ContactsHead = ({ filter, setFilter, setAddShow, setImportShow }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

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
    <div className="contacts-head">
      <h2 className="caption">{t("contacts.title")}</h2>

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

      <div className="contacts-head__controls">
        <a
          href="#"
          className="btn btn-simple"
          onClick={() => {
            setImportShow(true)
          }}
        >
          <IconImport />
          {t("buttons.importGuests")}
        </a>
        <a
          href="#"
          className="btn btn-dark"
          onClick={() => {
            setAddShow(true)
          }}
        >
          <IconBtnCreate />
          {t("buttons.addGuests")}
        </a>
      </div>
    </div>
  )
}

export default ContactsHead
