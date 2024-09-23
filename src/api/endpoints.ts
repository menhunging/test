const endpoints = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT: "/user/password/forgot",
    PHONESTEP1: "/user/phone-number-login",
    PHONESTEP2: "/user/phone-number-check-otp",
    PROFILE: "/profile",
    GOOGLE: "/auth/google",
    CONFIRMED: "/events/user-confirmed",
    LOGOUT: "/logout",
  },
  EVENTS: {
    GET: "/events",
    UPDATE: "/events",
    LOAD_IMG: "/upload",
    PREVIEW: "/event-preview",
    DESIGN: "/events/design",
  },
  CONTACTS: {
    GET: "/contacts",
    UP: "/contacts/",
    CREATE: "/create-contact",
    IMPORT: "/contacts-import",
  },
}

export default endpoints
