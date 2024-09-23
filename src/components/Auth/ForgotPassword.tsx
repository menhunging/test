import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Field from "./utils/Field"
import { forgotPassword, setError } from "../../redux/slices/auth/authSlice"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"

interface IForm {
  email: string
}

export const ForgotPassword = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const { error, status } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IForm>({})

  const dispatch = useAppDispatch()

  const onSubmit = () => {
    dispatch(forgotPassword(email))
  }

  const clearErrorsField = () => {
    if (error) {
      dispatch(setError(""))
    }

    clearErrors()
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="email"
        type="email"
        placeholder={t("placeholder.email")}
        value={email}
        error={errors.email?.message || error}
        register={register}
        onHandleChange={(value) => {
          clearErrorsField()
          setEmail(value)
        }}
      />

      <div className="login__controls mt-sm-4">
        <Button type="submit" variant="btn btn-dark w-100">
          {t("buttons.resetPassword")}
        </Button>
      </div>

      <div className="login-text d-flex justify-content-center p-sm-4 gap-1">
        <span>{t("signUp.text")}</span>
        <Link to="/login">{t("buttons.signIn")}</Link>
      </div>
    </form>
  )
}

export default ForgotPassword
