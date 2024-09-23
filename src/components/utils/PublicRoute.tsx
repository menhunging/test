import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAppSelector } from "../../redux/store"
import Preloader from "./Preloader/Preloader"

const PublicRoute = () => {
  const { isAuth, isLoading } = useAppSelector((state) => state.auth)
  const location = useLocation()

  if (isLoading) {
    return <Preloader />
  } else {
    return isAuth === false ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  }
}

export default PublicRoute
