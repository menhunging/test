import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Field from "./utils/Field"
import {
  registerUser,
  setError,
  setStatus,
} from "../../redux/slices/auth/authSlice"
import { useTranslation } from "react-i18next"
import LoginGoogle from "./LoginGoogle"
import { useForm } from "react-hook-form"

interface IForm {
  email: string
  firstName: string
  lastName: string
  phone: string
  password: string
  confirmPassword: string
}

const SignUp = () => {
  const { t } = useTranslation()
  const { error, status } = useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirm, setPasswordConfirm] = useState("")

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IForm>({})

  const onSubmit = () => {
    let data = {
      email,
      phone,
      first_name,
      last_name,
      password,
      password_confirm,
    }
    dispatch(registerUser(data))
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

      <Field
        name="firstName"
        type="text"
        placeholder={t("placeholder.firstName")}
        value={first_name}
        error={errors.firstName?.message || error}
        register={register}
        onHandleChange={(value) => {
          clearErrorsField()
          setFirstName(value)
        }}
      />

      <Field
        name="lastName"
        type="text"
        placeholder={t("placeholder.lastName")}
        value={last_name}
        error={errors.lastName?.message || error}
        register={register}
        onHandleChange={(value) => {
          clearErrorsField()
          setLastName(value)
        }}
      />

      <Field
        name="phone"
        type="text"
        placeholder={t("placeholder.phone")}
        value={phone}
        error={errors.phone?.message || error}
        register={register}
        onHandleChange={(value) => {
          clearErrorsField()
          setPhone(value)
        }}
      />

      <Field
        name="password"
        type="password"
        placeholder={t("placeholder.password")}
        value={password}
        error={errors.password?.message || error}
        register={register}
        onHandleChange={(value) => {
          clearErrorsField()
          setPassword(value)
        }}
      />

      <Field
        name="confirmPassword"
        type="password"
        placeholder={t("placeholder.confirmPassword")}
        value={password_confirm}
        error={errors.confirmPassword?.message || error}
        register={register}
        onHandleChange={(value) => {
          clearErrorsField()
          setPasswordConfirm(value)
        }}
      />

      <div className="login__controls mt-sm-4">
        <Button type="submit" variant="btn btn-dark w-100">
          {t("buttons.signUp")}
        </Button>
      </div>

      <span className="politic-text">
        {t("login.politic.text")}
        <Link to="/">{t("login.politic.textLink")}</Link>
      </span>

      <div className="login-text d-flex justify-content-center p-sm-4 gap-1">
        <span>{t("signUp.text")}</span>
        <Link to="/login"> {t("buttons.signIn")}</Link>
      </div>

      <div className="alternate-login">
        <div className="bl-or">
          <span>{t("base.or")}</span>
        </div>

        <Link to="/" className="link-login link-login--apple">
          <span className="link-login__text">Apple ID</span>
        </Link>

        <LoginGoogle />

        <Link to="/whatsapp" className="link-login link-login--whatsapp">
          <span className="link-login__text">WhatsApp</span>
        </Link>
      </div>
    </form>
  )
}

export default SignUp
