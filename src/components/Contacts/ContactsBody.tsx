import { useTranslation } from "react-i18next"
import {
  IconContactDelete,
  IconContactsChange,
  IconDeleteQuest,
  IconSort,
  IconSorting,
} from "../utils/Icons/CustomIcons"
import Paginator from "../utils/Pagination/Pagination"
import { useState, useMemo, useEffect, useRef } from "react"
import { Dropdown } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import {
  setLimit,
  getContacts,
  setCurrentPage,
  changeContact,
  setLoading,
  addContact,
} from "../../redux/slices/contacts/contactsSlices"
import NotContacts from "../../pages/Contacts/NoContactsPage"
import EditGuest from "./EditGuest/EditGuest"
import AddGuest from "./AddGuest/AddGuest"
import ImportGuest from "./ImportGuest/ImportGuest"
import { IFilter, iContactsBody } from "./types"

interface iGuest {
  first_name: string
  last_name: string
  suffix: string
  phone: string
  email: string
}

const ContactsBody: React.FC<iContactsBody> = ({
  guests,
  deleteQuest,
  current_page,
  limit,
  filter,
  setFilter,
  total_pages,
  dataLoadMore,
  setDataLoadMore,
  addShow,
  setAddShow,
  importShow,
  setImportShow,
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [fileImport, setFileImport] = useState<File | null>(null)

  const [newGuest, setNewGuest] = useState<iGuest>({
    first_name: "",
    last_name: "",
    suffix: "",
    phone: "",
    email: "",
  })

  const [changeGuest, setChangeGuest] = useState({})
  const [editShow, setEditShow] = useState(false)
  const [countContacts, setCountContacts] = useState(limit)
  const [allQuestsCheked, setAllQuestsChecked] = useState([])
  const [checked, setChecked] = useState([])
  const [validation, setValidation] = useState([])

  const changeFilter = (sort: string) => {
    setFilter({ ...filter, sort: sort })
    dispatch(getContacts(filter))
  }

  const onPageChanged = (page: number) => {
    setDataLoadMore([])
    dispatch(setCurrentPage(page))
    dispatch(getContacts(filter))
  }

  const addPopupClose = () => {
    setAddShow(false)
  }

  const editPopupClose = () => {
    setValidation([])
    setEditShow(false)
  }

  const editPopupOpen = (guest) => {
    setChangeGuest(guest)
    setEditShow(true)
  }

  const importPopupClose = () => {
    setImportShow(false)

    if (fileImport) {
      dispatch(setLoading())
      dispatch(setCurrentPage(1))
      dispatch(getContacts(filter))
    }
  }

  const saveAddGuest = (event) => {
    event.preventDefault()

    dispatch(addContact(newGuest)).then((result) => {
      if (result.error) {
        setValidation(result.payload.errors)
      } else {
        dispatch(setLoading())
        setAddShow(false)
        dispatch(getContacts(filter))
      }
    })
  }

  const saveEditGuest = (event) => {
    event.preventDefault()

    dispatch(changeContact(changeGuest)).then((result) => {
      if (result.error) {
        setValidation(result.payload.errors)
      } else {
        dispatch(setLoading())
        setEditShow(false)
        dispatch(getContacts(filter))
      }
    })
  }

  return (
    <div className="contacts-body">
      <div className="contacts-body__controls">
        <Dropdown className="dropdown-block sorting-mobile">
          <Dropdown.Toggle className="dropdown-block-text border-0 bg-transparent">
            <span className="sorting-mobile__text">
              {t("contacts.sorting.title")} <IconSorting />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeFilter("orderBy=first_name")}>
              {t("contacts.sorting.name")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeFilter("orderBy=email")}>
              {t("contacts.sorting.email")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeFilter("orderBy=phone")}>
              {t("contacts.sorting.phone")}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeFilter("orderBy=id")}>
              {t("contacts.sorting.date")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {checked.length !== 0 && (
          <span
            className="delete-selected btn btn-simple"
            onClick={() => {
              console.log(checked)
            }}
          >
            <IconDeleteQuest />
            {t("buttons.deleteSelected")}
          </span>
        )}

        {guests.length > 0 && (
          <Dropdown className="dropdown-block show-count">
            <Dropdown.Toggle className="dropdown-block-text border-0 bg-transparent">
              {t("contacts.showTitle")} {countContacts}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setCountContacts(30)
                  dispatch(setLimit(30))
                  dispatch(getContacts(filter))
                }}
              >
                {t("contacts.sorting.title")} 30
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setCountContacts(60)
                  dispatch(setLimit(60))
                  dispatch(getContacts(filter))
                }}
              >
                {t("contacts.sorting.title")} 60
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      {guests.length !== 0 ? (
        <>
          <div className="contacts-table">
            <div className="contacts-table__head">
              <div className="contacts-table__checkbox">
                <input
                  type="checkbox"
                  id="all"
                  checked={allQuestsCheked.length === limit}
                  onChange={() => {
                    if (allQuestsCheked.length > 0) {
                      setAllQuestsChecked([])
                      setChecked([])
                    } else {
                      let allQuests = []
                      guests.forEach((element) => {
                        allQuests.push(element.id)
                      })
                      setAllQuestsChecked([...allQuests])
                      setChecked([...allQuests])
                    }
                  }}
                />
                <label htmlFor="all"></label>
              </div>
              <div
                className="contacts-table__col"
                onClick={() => changeFilter("orderBy=first_name")}
              >
                {t("contacts.sorting.name")}
                <span className="sort">
                  <IconSort />
                </span>
              </div>
              <div
                className="contacts-table__col"
                onClick={() => changeFilter("orderBy=email")}
              >
                {t("contacts.sorting.name")}
                <span className="sort">
                  <IconSort />
                </span>
              </div>
              <div
                className="contacts-table__col"
                onClick={() => changeFilter("orderBy=phone")}
              >
                {t("contacts.sorting.phoneNumber")}
                <span className="sort">
                  <IconSort />
                </span>
              </div>
              <div
                className="contacts-table__col"
                onClick={() => changeFilter("orderBy=id")}
              >
                {t("contacts.sorting.dateCreation")}
                <span className="sort">
                  <IconSort />
                </span>
              </div>
              <div className="contacts-table__col">
                {t("contacts.sorting.actions")}
              </div>
            </div>

            <div className="contacts-table__body">
              {guests.map((guest) => {
                return (
                  <div className="contacts-table__row" key={guest.id}>
                    <div className="contacts-table__checkbox">
                      <input
                        type="checkbox"
                        id={`guest${guest.id}`}
                        checked={
                          allQuestsCheked.includes(guest.id) ||
                          checked.includes(guest.id)
                        }
                        onChange={() => {
                          if (checked.includes(guest.id)) {
                            let newChecked = checked.filter(
                              (chk) => chk !== guest.id,
                            )
                            setAllQuestsChecked([])
                            setChecked([...newChecked])
                          } else {
                            setChecked([...checked, guest.id])
                          }
                        }}
                      />
                      <label htmlFor={`guest${guest.id}`}></label>
                    </div>
                    <div className="contacts-table__col">
                      <span className="name">{guest.first_name}</span>
                    </div>
                    <div className="contacts-table__col">
                      <a href={`mailto:${guest.email}`} className="mail">
                        {guest.email ? guest.email : "not email"}
                      </a>
                    </div>
                    <div className="contacts-table__col">
                      <span className="phone">
                        {guest.phone ? guest.phone : "not phone"}
                      </span>
                    </div>
                    <div className="contacts-table__col">
                      {/* <span className="date">01.01.2023</span> */}
                      <span className="date">{guest.id}</span>
                    </div>
                    <div className="contacts-table__col">
                      <div className="contacts-change">
                        <button
                          className="btn btn-change"
                          onClick={() => {
                            editPopupOpen(guest)
                          }}
                        >
                          <IconContactsChange />
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => {
                            deleteQuest(guest.id)
                          }}
                        >
                          <IconContactDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            className="btn btnloadMore d-lg-none d-sm-flex btn btn-primary"
            onClick={() => {
              setDataLoadMore(guests)
              dispatch(
                setCurrentPage(
                  current_page === total_pages ? 1 : current_page + 1,
                ),
              )
              dispatch(getContacts(filter))
            }}
          >
            {t("buttons.loadMore")}
          </button>

          <Paginator
            total_pages={total_pages}
            current_page={current_page}
            onPageChanged={onPageChanged}
          />
        </>
      ) : (
        <NotContacts setImportShow={setImportShow} setAddShow={setAddShow} />
      )}

      <AddGuest
        guest={newGuest}
        setGuest={setNewGuest}
        show={addShow}
        handleClose={addPopupClose}
        saveEditGuest={saveAddGuest}
        validation={validation}
      />

      <EditGuest
        guest={changeGuest}
        setGuest={setChangeGuest}
        show={editShow}
        handleClose={editPopupClose}
        saveEditGuest={saveEditGuest}
        validation={validation}
      />

      <ImportGuest
        file={fileImport}
        setFile={setFileImport}
        show={importShow}
        handleClose={importPopupClose}
      />
    </div>
  )
}

export default ContactsBody
