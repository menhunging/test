import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./redux/store"
import { authentication, setLoading } from "./redux/slices/auth/authSlice"
import Header from "./components/Header/Header"
import SignUpPage from "./pages/Auth/SignUpPage"
import EventsPage from "./pages/Events/EventsPage"
import LoginPage from "./pages/Auth/LoginPage"
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage"
import ResetPasswordPage from "./pages/Auth/ChangePasswordPage"
import Message from "./pages/Auth/Message"
import LoginWhatsAppPage from "./pages/Auth/LoginWhatsAppPage"
import Preloader from "./components/utils/Preloader/Preloader"
import PrivateRoute from "./components/utils/PrivateRoute"
import PublicRoute from "./components/utils/PublicRoute"
import ProfilePage from "./pages/Profile/ProfilePage"
import CreateEventPage from "./pages/CreateEvent/CreateEventPage"
import EditDesign from "./pages/EditDesign/EditDesign"
import ContactsPage from "./pages/Contacts/ContactsPage"

const App = () => {
  const { isLoading, error, isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token") || ""

    if (token) {
      dispatch(setLoading())
      dispatch(authentication())
    }
  }, [dispatch])

  return (
    <div className="wrapper">
      {isLoading && <Preloader />}

      <Header />

      <main className="main py-sm-5 py-3">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/whatsapp" element={<LoginWhatsAppPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<EventsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/event-create" element={<CreateEventPage />} />
            <Route path="/edit-design" element={<EditDesign />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Route>

          {/* <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/password-success" element={<Message />} /> */}
        </Routes>
      </main>
    </div>
  )
}

export default App
