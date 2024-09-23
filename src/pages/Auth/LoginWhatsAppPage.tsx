import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginWhatsAppStep1 from "../../components/Auth/LoginWhatsAppStep1"
import LoginWhatsAppStep2 from "../../components/Auth/LoginWhatsAppStep2"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import {
  setError,
  setLoginPhoneStepOne,
} from "../../redux/slices/auth/authSlice"
import { BsFillCaretLeftFill } from "react-icons/bs"
import { useTranslation } from "react-i18next"

const LoginWhatsAppPage = () => {
  const { t } = useTranslation()
  const { status, error, phone, accessToken } = useAppSelector(
    (state) => state.auth,
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const hidePhone = (phone: string | null): string => {
    const visibleNumber = [0, 1, phone.length - 2, phone.length - 1]
    let hidePhone = ""

    for (let i = 0; i < phone.length; i++) {
      if (visibleNumber.includes(i)) {
        hidePhone = `${hidePhone}${phone[i]}`
      } else {
        hidePhone = hidePhone + "*"
      }
    }
    return hidePhone
  }

  useEffect(() => {
    if (status === "LOGIN-SUCCESS") {
      navigate("/")
    }

    return () => {
      if (error) {
        dispatch(setError(""))
      }
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
    <>
      {status === "PHONE-STEP-TWO" ? (
        <div className="login w-100 p-sm-4 px-2 py-3 mx-auto">
          <button
            className="login-back px-2"
            onClick={() => {
              dispatch(setLoginPhoneStepOne())
            }}
          >
            <BsFillCaretLeftFill size="14px" />
            {t("loginWhatApp.back")}
          </button>

          <div className="login-head">
            <h2 className="login__title w-100 text-center">
              {t("loginWhatApp.titleTwo")}
            </h2>
            <span className="login-desc w-100 text-center text-body-tertiary d-block mt-3">
              {t("loginWhatApp.descTwo")} + {hidePhone(phone)}
            </span>
          </div>
          <LoginWhatsAppStep2 />
        </div>
      ) : (
        <div className="login w-100 p-sm-4 px-2 py-3 mx-auto">
          <div className="login-head">
            <h2 className="login__title w-100 text-center">
              {t("loginWhatApp.title")}
            </h2>
            <span className="login-desc w-100 text-center text-body-tertiary d-block mt-3">
              {t("loginWhatApp.desc")}
            </span>
          </div>
          <LoginWhatsAppStep1 />
        </div>
      )}
    </>
  )
}

export default LoginWhatsAppPage
