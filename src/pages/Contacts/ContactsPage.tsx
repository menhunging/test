import ContactsHead from "../../components/Contacts/ContactsHead"
import ContactsBody from "../../components/Contacts/ContactsBody"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import {
  getContacts,
  deleteContacts,
  setLoading,
  setCurrentPage,
} from "../../redux/slices/contacts/contactsSlices"
import Preloader from "../../components/utils/Preloader/Preloader"
import { IFilter } from "../../components/Contacts/types"

const ContactsPage = () => {
  const { data, isLoading, current_page, limit, total_pages, error } =
    useAppSelector((state) => state.contacts)
  const dispatch = useAppDispatch()

  const [dataLoadMore, setDataLoadMore] = useState([])
  const [addShow, setAddShow] = useState(false)
  const [importShow, setImportShow] = useState(false)

  const [filter, setFilter] = useState<IFilter>({
    sort: "",
    searchValue: "",
  })

  const deleteQuest = (id: number) => {
    dispatch(deleteContacts(id))
  }

  useEffect(() => {
    console.log(data)
    dispatch(setLoading())
    dispatch(getContacts(filter))
  }, [])

  // useEffect(() => {
  //   setDataLoadMore([...dataLoadMore, ...data]) // мобильную кнопку надо доделать. LoadMore 
  // }, [data])

  useEffect(() => {
    dispatch(setCurrentPage(1))
    dispatch(getContacts(filter))
  }, [filter.sort, filter.searchValue])

  return (
    <>
      {!isLoading ? (
        <div className="contacts-page">
          <div className="container">
            <ContactsHead
              filter={filter}
              setFilter={setFilter}
              setAddShow={setAddShow}
              setImportShow={setImportShow}
            />

            <ContactsBody
              guests={data}
              limit={limit}
              current_page={current_page}
              total_pages={total_pages}
              filter={filter}
              setFilter={setFilter}
              deleteQuest={deleteQuest}
              dataLoadMore={dataLoadMore}
              setDataLoadMore={setDataLoadMore}
              addShow={addShow}
              setAddShow={setAddShow}
              importShow={importShow}
              setImportShow={setImportShow}
            />
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </>
  )
}

export default ContactsPage
