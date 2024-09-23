import { PaginationControl } from "react-bootstrap-pagination-control"

const Paginator = ({ total_pages, current_page, onPageChanged }) => {
  return (
    <PaginationControl
      page={current_page}
      total={total_pages}
      between={3}
      limit={1}
      ellipsis={1}
      changePage={(page) => {
        onPageChanged(page)
      }}
    />
  )
}

export default Paginator
