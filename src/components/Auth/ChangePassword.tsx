import { useAppDispatch } from "../../redux/store"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Button from "react-bootstrap/Button"
import Field from "./utils/Field"

export const ChangePassword = () => {
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const onCancel = () => {
    navigate("/login")
  }

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <Field
        type="password"
        placeholder="New password"
        value={password}
        error={error}
        onHandleChange={setPassword}
      />

      <Field
        type="password"
        placeholder="Confirm password"
        value={passwordConfirm}
        error={error}
        onHandleChange={setPasswordConfirm}
      />

      <div className="login__controls d-flex justify-content-end mt-sm-4 mt-1 gap-3">
        <Button onClick={onCancel} variant="btn btn-light px-3 py-2">
          Cancel
        </Button>

        <Button type="submit" variant="btn btn-dark px-4 py-2">
          Save
        </Button>
      </div>
    </form>
  )
}

export default ChangePassword
