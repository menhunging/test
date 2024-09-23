import { useAppDispatch, useAppSelector } from "../../redux/store"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { loginEmail, setError } from "../../redux/slices/auth/authSlice"
import Button from "react-bootstrap/Button"
import Field from "./utils/Field"
import { useTranslation } from "react-i18next"
import LoginGoogle from "./LoginGoogle"
import { useForm } from "react-hook-form"

interface IForm {
  email: string
  password: string
}

export const Login = () => {
  const { t } = useTranslation()
  const { error, status } = useAppSelector((state) => state.auth)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IForm>({})

  const dispatch = useAppDispatch()

  const onSubmit = () => {
    let data = {
      email,
      password,
    }

    dispatch(loginEmail(data))
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

      <div className="input-item__controls d-flex justify-content-end">
        <Link
          to={status !== "FORGOT-PASSWORD-SUCCESS" ? "/forgot-password" : ""}
        >
          {t("base.linkForgot")}
        </Link>
      </div>

      <div className="login__controls mt-sm-4">
        <Button type="submit" variant="btn btn-dark w-100">
          {t("buttons.signIn")}
        </Button>
      </div>

      <span className="politic-text">
        {t("login.politic.text")}
        <Link to="/">{t("login.politic.textLink")}</Link>
      </span>

      <div className="login-text d-flex justify-content-center p-sm-4 gap-1">
        <span>{t("login.text")}</span>
        <Link to={status !== "SIGNUP-SUCCESS" ? "/signup" : ""}>
          {t("buttons.signUp")}
        </Link>
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

export default Login
