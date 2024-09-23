import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

const Message = () => {
  const navigate = useNavigate()


  return (
    <div className="login login--message w-100 p-sm-4 px-2 py-3 m-auto">
      <div className="login-head">
        <h2 className="login__title w-100 text-center">
          Password changed successfully
        </h2>
        <span className="login-desc w-100 text-center text-body-tertiary d-block mt-3">
          Sign-in to your account with a new password
        </span>
      </div>
      <Button
        className="btn btn-dark w-100 py-2"
        onClick={() => {
          navigate("/login")
        }}
      >
        Sign-in
      </Button>
    </div>
  )
}

export default Message
