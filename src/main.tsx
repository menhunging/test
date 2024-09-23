import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

import "./18n"

import "~/bootstrap/dist/css/bootstrap.css"
import "@/assets/scss/index.scss"
import Preloader from "./components/utils/Preloader/Preloader"
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="716530169287-itmidnrn3d0s82hhqh5p8pcua95holkj">
      <BrowserRouter>
        <Suspense fallback={<Preloader />}>
          <Provider store={store}>
            <App />
          </Provider>
        </Suspense>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
