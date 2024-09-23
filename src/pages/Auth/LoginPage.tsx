import { useState, useEffect } from "react"
import Login from "../../components/Auth/Login"
import Alert from "../../components/utils/Alert/Alert"
import { setError, setStatus } from "../../redux/slices/auth/authSlice"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const statusesAlert = ["FORGOT-PASSWORD-SUCCESS", "SIGNUP-SUCCESS"]

const LoginPage = () => {
  const { t } = useTranslation()
  const { status, error, accessToken } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (accessToken) {
  //     navigate("/")
  //   }

  //   return () => {
  //     if (error) {
  //       dispatch(setError(""))
  //     }
  //   }
  // }, [accessToken, error])

  return (
    <>
      {statusesAlert.includes(status) && (
        <Alert
          status={status}
          onClose={() => {
            dispatch(setStatus(""))
          }}
        />
      )}

      <div className="login w-100 p-sm-4 px-2 py-3 mx-auto">
        <h2 className="login__title w-100 text-center">{t("login.title")}</h2>
        <Login />
      </div>
    </>
  )
}

export default LoginPage
