import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Link } from "react-router-dom"
import { useState } from "react"
import { loginPhoneStepOne, setError } from "../../redux/slices/auth/authSlice"
import Button from "react-bootstrap/Button"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"

import FieldPhone from "./utils/FieldPhone"
import LoginGoogle from "./LoginGoogle"

interface IForm {
  phone: string
}

export const LoginWhatsAppStep1 = () => {
  const { t } = useTranslation()
  const [phone, setPhone] = useState("")
  const { error, status } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IForm>({})

  const onSubmit = () => {
    dispatch(loginPhoneStepOne({ phone }))
  }

  const clearErrorsField = () => {
    if (error) {
      dispatch(setError(""))
    }

    clearErrors()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldPhone errors={errors} register={register} clearErrorsField={clearErrorsField} setPhone={setPhone} />

      <div className="login__controls mt-sm-4">
        <Button type="submit" variant="btn btn-dark w-100">
          {t("buttons.confirm")}
        </Button>
      </div>

      <div className="alternate-login mt-sm-4">
        <div className="bl-or">
          <span>{t("base.or")}</span>
        </div>

        <Link to="/" className="link-login link-login--apple">
          <span className="link-login__text">Apple ID</span>
        </Link>
        <LoginGoogle />
        <Link to="/login" className="link-login link-login--email">
          <span className="link-login__text">Email and password</span>
        </Link>
      </div>
    </form>
  )
}

export default LoginWhatsAppStep1
