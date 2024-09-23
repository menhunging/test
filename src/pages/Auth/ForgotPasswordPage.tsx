import { useState, useEffect } from "react"
import ForgotPassword from "../../components/Auth/ForgotPassword"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const RecoverPasswordPage = () => {
  const { t } = useTranslation()
  const { isLoading, status } = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (status === "FORGOT-PASSWORD-SUCCESS") {
      navigate("/login")
    }
  }, [status])

  return (
    <div className="login w-100 p-sm-4 px-2 py-3 m-auto">
      <h2 className="login__title w-100 text-center">{t("forgot.title")}</h2>
      <ForgotPassword />
    </div>
  )
}

export default RecoverPasswordPage
