import { useState } from "react"
import Eye from "../utils/Eye"
import { useTranslation } from "react-i18next"

interface IProps {
  type: string
  value: string
  name: string
  disabled: boolean
  className: string | null | undefined
  label: string
  onHandleChange: (arg: string) => void
  register: () => void
  error: string | {}
}

const ProfileField = ({
  type,
  value,
  onHandleChange,
  disabled = true,
  className = "",
  error = "" || {},
  name = "",
  label = "",
  register,
}: IProps) => {
  const { t } = useTranslation()
  const [isVisiblePassword, setIsVisiblePassword] = useState(true)

  const typeInput = (type: string) => {
    if (type === "password") {
      return isVisiblePassword ? "password" : "text"
    }

    return type
  }

  const errorPrint = () => {
    if (typeof error === "string") {
      return <span className="input-item__error error mt-1">{error}</span>
    } else {
      return (
        <span className="input-item__error error mt-1">{handleErrors()}</span>
      )
    }
  }

  const handleErrors = () => {
    if (error?.errors.hasOwnProperty(name)) {
      return error.errors[name]
    }
  }

  const handleErrors2 = () => {
    if (error?.errors.hasOwnProperty(name)) {
      return true
    }
  }

  const addErrorClass = () => {
    if (typeof error === "string") {
      return `${className} ${error && "input-error"}`
    } else {
      return `${className} ${handleErrors2() && "input-error"}`
    }
  }

  return (
    <div className="profile-input input-item">
      <input
        {...register(name, { required: t("errors.required") })}
        name={name}
        disabled={disabled}
        type={typeInput(type)}
        value={value}
        className={addErrorClass()}
        onChange={(event) => {
          onHandleChange(event.target.value)
        }}
      />

      <label htmlFor="">{label}</label>

      {type === "password" && (
        <Eye
          setIsVisiblePassword={setIsVisiblePassword}
          isVisiblePassword={isVisiblePassword}
        />
      )}

      {error && errorPrint()}
    </div>
  )
}

export default ProfileField
