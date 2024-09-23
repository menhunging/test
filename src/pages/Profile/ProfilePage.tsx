import { useState } from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import {
  IconBalance,
  IconBtnCreate,
  IconChange,
  IconCheck,
  IconProfileInfo,
  IconUpgrade,
} from "../../components/utils/Icons/CustomIcons"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import ProfileField from "../../components/Profile/ProfileField"
import { useForm } from "react-hook-form"
import { authentication } from "../../redux/slices/auth/authSlice"

interface IForm {
  first_name: string
  last_name: string
  email: string
  phone: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ProfilePage = () => {
  const { t } = useTranslation()
  const { balance, first_name, last_name, email, phone, error } =
    useAppSelector((state) => state.auth)

  const dispatch = useAppDispatch()

  let defaultPersonal = {
    first_name: first_name || "",
    last_name: last_name || "",
    email: email || "",
    phone: phone || "",
  }

  let defaultSecurity = {
    old_password: "",
    password: "",
    confirmPassword: "",
  }

  const checkEmptyInput = (value: string) => {
    if (!!!value) {
      return "empty"
    }
  }

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<IForm>({})

  const [isChangePersonal, setIsChangePersonal] = useState(true)
  const [isChangeSecurity, setIsChangeSecurity] = useState(true)

  const [personal, setPersonal] = useState(defaultPersonal)
  const [security, setSecurity] = useState(defaultSecurity)

  return (
    <div className="profile-section">
      <div className="container">
        <div className="title-page">
          <h2 className="caption-two">{t("profile.titlePageProfile")}</h2>
        </div>

        <div className="profile-row">
          <div className="profile-col profile-col--balance bl-default">
            <div className="profile-left">
              <h2 className="caption caption-three">
                {t("profile.availableBalance")}
              </h2>

              <div className="profile-info">
                <IconBalance />
                <span className="profile-balance__value">
                  {balance} {t("profile.credits")}
                </span>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip className="profile-tooltip" id="tooltipCredits">
                      {t("profile.tooltip.credits")}
                    </Tooltip>
                  }
                >
                  <div className="profile-tooltip__content">
                    <IconProfileInfo color="dark" />
                  </div>
                </OverlayTrigger>
              </div>
            </div>

            <Button className="btn btn-dark">
              <IconBtnCreate />
              {t("buttons.topUP")}
            </Button>
          </div>

          <div className="profile-col profile-col--plan bl-default">
            <div className="profile-left">
              <h2 className="caption caption-three">
                {t("profile.membershipPlan")}
              </h2>

              <div className="profile-info">
                <IconCheck />

                <span className="profile-balance__value">Free</span>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip className="profile-tooltip" id="tooltipPlan">
                      {t("profile.tooltip.plan")}
                    </Tooltip>
                  }
                >
                  <div className="profile-tooltip__content">
                    <IconProfileInfo />
                  </div>
                </OverlayTrigger>
              </div>
            </div>

            <Button className="btn btn-dark">
              <IconUpgrade color="dark" />
              {t("buttons.upgrade")}
            </Button>
          </div>

          <div className="profile-col bl-default">
            <div className="profile-col__head">
              <h2 className="caption caption-three">
                {t("profile.personalTitle")}
              </h2>
              <div className="profile-controls">
                {isChangePersonal ? (
                  <button
                    className="btn btn-simple"
                    onClick={() => {
                      setIsChangePersonal(false)
                    }}
                  >
                    <IconChange />
                    {t("buttons.edit")}
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-simple"
                      onClick={() => {
                        setPersonal(defaultPersonal)
                        setIsChangePersonal(true)
                      }}
                    >
                      {t("buttons.cancel")}
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        let params = {}

                        for (let property in personal) {
                          if (
                            personal[property] !== defaultPersonal[property]
                          ) {
                            params[property] = personal[property]
                          }
                        }

                        setIsChangePersonal(true)
                        dispatch(authentication(params))
                      }}
                    >
                      {t("buttons.save")}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="profile-col__body">
              <form className="profile-form profile-form--personal">
                <ProfileField
                  name={"first_name"}
                  type="text"
                  label={t("placeholder.firstName")}
                  disabled={isChangePersonal}
                  value={personal.first_name}
                  register={register}
                  error={errors.first_name?.message || error}
                  className={checkEmptyInput(personal.first_name)}
                  onHandleChange={(value) => {
                    setPersonal({
                      ...personal,
                      first_name: value,
                    })
                  }}
                />
                <ProfileField
                  name={"last_name"}
                  type="text"
                  label={t("placeholder.lastNameText")}
                  disabled={isChangePersonal}
                  value={personal.last_name}
                  error={errors.last_name?.message || error}
                  register={register}
                  className={checkEmptyInput(personal.last_name)}
                  onHandleChange={(value) => {
                    setPersonal({
                      ...personal,
                      last_name: value,
                    })
                  }}
                />
                <ProfileField
                  name={"email"}
                  type="email"
                  label={t("placeholder.email")}
                  disabled={isChangePersonal}
                  value={personal.email}
                  error={errors.email?.message || error}
                  register={register}
                  className={checkEmptyInput(personal.email)}
                  onHandleChange={(value) => {
                    setPersonal({
                      ...personal,
                      email: value,
                    })
                  }}
                />
                <ProfileField
                  name={"phone"}
                  type="text"
                  label={t("placeholder.number")}
                  disabled={isChangePersonal}
                  value={personal.phone}
                  error={errors.phone?.message || error}
                  register={register}
                  className={checkEmptyInput(personal.phone)}
                  onHandleChange={(value) => {
                    setPersonal({
                      ...personal,
                      phone: value,
                    })
                  }}
                />
              </form>
            </div>
            <div className="profile-controls profile-controls--mobile">
              {isChangePersonal ? (
                <button
                  className="btn btn-simple"
                  onClick={() => {
                    setIsChangePersonal(false)
                  }}
                >
                  <IconChange />
                  {t("buttons.edit")}
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-simple"
                    onClick={() => {
                      setPersonal(defaultPersonal)
                      setIsChangePersonal(true)
                    }}
                  >
                    {t("buttons.cancel")}
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setIsChangePersonal(true)
                    }}
                  >
                    {t("buttons.save")}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="profile-col bl-default">
            <div className="profile-col__head">
              <h2 className="caption caption-three">
                {t("profile.passwordTitle")}
              </h2>
              <div className="profile-controls">
                {isChangeSecurity ? (
                  <button
                    className="btn btn-simple"
                    onClick={() => {
                      setIsChangeSecurity(false)
                    }}
                  >
                    <IconChange />
                    {t("buttons.change")}
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-simple"
                      onClick={() => {
                        setSecurity(defaultSecurity)
                        setIsChangeSecurity(true)
                      }}
                    >
                      {t("buttons.cancel")}
                    </button>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        let params = {}

                        for (let property in security) {
                          if (
                            security[property] !== defaultSecurity[property]
                          ) {
                            params[property] = security[property]
                          }
                        }

                        console.log(params)

                        setIsChangeSecurity(true)
                        dispatch(authentication(params))
                        setSecurity(defaultSecurity)
                      }}
                    >
                      {t("buttons.save")}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="profile-col__body">
              <form className="profile-form profile-form--password">
                <ProfileField
                  name={"old_password"}
                  type="password"
                  label={t("placeholder.currentPassword")}
                  disabled={isChangeSecurity}
                  value={security.old_password}
                  error={errors.old_password?.message || error}
                  register={register}
                  className={checkEmptyInput(security.old_password)}
                  onHandleChange={(value) => {
                    setSecurity({
                      ...security,
                      old_password: value,
                    })
                  }}
                />
                <ProfileField
                  name={"password"}
                  type="password"
                  label={t("placeholder.newPassword")}
                  disabled={isChangeSecurity}
                  value={security.password}
                  error={errors.password?.message || error}
                  register={register}
                  className={checkEmptyInput(security.password)}
                  onHandleChange={(value) => {
                    setSecurity({
                      ...security,
                      password: value,
                    })
                  }}
                />
                <ProfileField
                  name={"confirmPassword"}
                  type="password"
                  label={t("placeholder.confirmPassword")}
                  disabled={isChangeSecurity}
                  value={security.confirmPassword}
                  error={errors.password?.message || error}
                  register={register}
                  className={checkEmptyInput(security.confirmPassword)}
                  onHandleChange={(value) => {
                    setSecurity({
                      ...security,
                      confirmPassword: value,
                    })
                  }}
                />
              </form>
            </div>

            <div className="profile-controls profile-controls--mobile">
              {isChangeSecurity ? (
                <button
                  className="btn btn-simple"
                  onClick={() => {
                    setIsChangeSecurity(false)
                  }}
                >
                  <IconChange />
                  {t("buttons.change")}
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-simple"
                    onClick={() => {
                      setSecurity(defaultSecurity)
                      setIsChangeSecurity(true)
                    }}
                  >
                    {t("buttons.cancel")}
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setIsChangeSecurity(true)
                    }}
                  >
                    {t("buttons.save")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
