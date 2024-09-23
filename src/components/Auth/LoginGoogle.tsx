import { loginGoogle } from "../../redux/slices/auth/authSlice"
import { useAppDispatch } from "../../redux/store"
import { useGoogleLogin } from "@react-oauth/google"

const LoginGoogle = () => {
  const dispatch = useAppDispatch()

  const authGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      let data = {
        code: tokenResponse.access_token,
      }

      dispatch(loginGoogle(data))
    },
  })

  return (
    <span
      onClick={() => authGoogle()}
      className="link-login link-login--google"
    >
      <span className="link-login__text">Google</span>
    </span>
  )
}

export default LoginGoogle
