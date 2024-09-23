import { useAppDispatch } from "../../redux/store"
import { Link, useNavigate } from "react-router-dom"
import ChangePassword from "../../components/Auth/ChangePassword"

const ChangePasswordPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div className="login w-100 p-sm-4 px-2 py-3 m-auto">
      <div className="login-head">
        <h2 className="login__title w-100 text-center">Change password</h2>
        <span className="login-desc w-100 text-center text-body-tertiary d-block mt-2">
          Please enter the information to change your password
        </span>
      </div>
      <ChangePassword />
    </div>
  )
}

export default ChangePasswordPage
