import { useState } from "react"
import Eye from "../../utils/Eye"
import { useTranslation } from "react-i18next"

interface IProps {
  type: string
  placeholder: string
  value: string
  name: String
  onHandleChange: (arg: string) => void
  register: () => void
  error: string
}

const errors = [
  "Credentials Incorrect.",
  "Invalid Input.",
  "The given data was invalid.",
  "We can't find a user with that e-mail address.",
  "Account with email provided is already registered",
]

const Field = ({
  type,
  placeholder,
  value,
  onHandleChange,
  error = "",
  name = "",
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

  return (
    <div className="input-item">
      <input
        {...register(name, { required: t("errors.required") })}
        name={name}
        type={typeInput(type)}
        placeholder={placeholder}
        value={value}
        className={`${error && "input-error"}`}
        onChange={(event) => {
          onHandleChange(event.target.value)
        }}
      />

      {type === "password" && (
        <Eye
          setIsVisiblePassword={setIsVisiblePassword}
          isVisiblePassword={isVisiblePassword}
        />
      )}

      {error && (
        <span className="input-item__error error mt-1">
          {error}
          {/* {errors[errors.indexOf(error)]} */}
        </span>
      )}
    </div>
  )
}

export default Field
