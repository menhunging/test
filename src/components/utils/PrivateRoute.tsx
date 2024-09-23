import { useEffect } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/store"

const PrivateRoute = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // navigate(JSON.parse(window.sessionStorage.getItem("lastRoute") || "{}"))
    // window.onbeforeunload = () => {
    //   window.sessionStorage.setItem(
    //     "lastRoute",
    //     JSON.stringify(window.location.pathname),
    //   )
    // }
  }, [])

  return isAuth === true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default PrivateRoute
