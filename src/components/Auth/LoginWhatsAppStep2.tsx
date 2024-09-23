import { useAppDispatch, useAppSelector } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  loginPhoneStepOne,
  loginPhoneStepTwo,
  setError,
} from "../../redux/slices/auth/authSlice"
import CodeInputs from "./utils/CodeInputs"
import Timer from "./utils/Timer"
import { useTranslation } from "react-i18next"

export const LoginWhatsAppStep2 = () => {
  const { t } = useTranslation()
  const { phone, error } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const onResetCode = (event) => {
    event.preventDefault()
    dispatch(loginPhoneStepOne({ phone }))
  }

  const onSubmit = (pinCode: string) => {
    if (pinCode) {
      let data = {
        phone,
        otp: pinCode,
      }

      dispatch(loginPhoneStepTwo(data))
    }
  }

  return (
    <div className="login-form">
      <CodeInputs onSubmit={onSubmit} error={error} />

      <div className="login-text text-center text-body-tertiary">
        {t("loginWhatApp.timer")} <Timer hours={3} />
      </div>

      <div className="login-text text-center text-body-tertiary d-flex gap-1 justify-content-center">
        {t("loginWhatApp.text")}
        <a href="#" onClick={onResetCode}>
          {t("loginWhatApp.textLink")}
        </a>
      </div>
    </div>
  )
}

export default LoginWhatsAppStep2
