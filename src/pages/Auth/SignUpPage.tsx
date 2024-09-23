import { useEffect } from "react"
import SignUp from "../../components/Auth/SignUp"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { setError } from "../../redux/slices/auth/authSlice"

const SignUpPage = () => {
  const { t } = useTranslation()
  const { status, error, accessToken } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (status === "SIGNUP-SUCCESS") {
      navigate("/login")
    }
  }, [status])

  useEffect(() => {
    if (accessToken) {
      navigate("/")
    }

    return () => {
      if (error) {
        dispatch(setError(""))
      }
    }
  }, [accessToken, error])

  return (
    <div className="login w-100 p-sm-4 px-2 py-3 mx-auto">
      <h2 className="login__title w-100 text-center"> {t("signUp.title")}</h2>
      <SignUp />
    </div>
  )
}

export default SignUpPage
