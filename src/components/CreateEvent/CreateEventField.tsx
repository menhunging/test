import { useState } from "react"
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

const CreateEventField = ({
  type,
  value,
  onHandleChange,
  className = "",
  error = "" || {},
  name = "",
  label = "",
  register,
}: IProps) => {
  const { t } = useTranslation()
  const [isVisiblePassword, setIsVisiblePassword] = useState(true)

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
        {...register(name, { required: t("errors.fieldRequired") })}
        name={name}
        type={type}
        value={value}
        className={addErrorClass()}
        onChange={(event) => {
          onHandleChange(event.target.value)
        }}
      />

      <label htmlFor="">{label}</label>

      {error && errorPrint()}
    </div>
  )
}

export default CreateEventField
