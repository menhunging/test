import { useEffect, useState } from "react"
import ReactCodeInput from "react-code-input"
import { useTranslation } from "react-i18next"

const inputStyleInvalid = {
  borderColor: "#eb5757",
}

const CodeInput = ({ onSubmit, error, ...props }) => {
  const { t } = useTranslation()
  const [pinCode, setPinCode] = useState("")
  const [isPinCodeValid, setIsPinCodeValid] = useState(true)

  const handlePinChange = (pinCode) => {
    setPinCode(pinCode)

    if (pinCode.length === 8) {
      onSubmit(pinCode)
      setIsPinCodeValid(true)
    }
  }

  useEffect(() => {
    if (error) {
      setIsPinCodeValid(false)
    }
  }, [error])

  return (
    <div className="w-100 mb-sm-4">
      <ReactCodeInput
        type="number"
        fields={8}
        className="code-inputs"
        name="code"
        inputMode={"numeric"}
        onChange={handlePinChange}
        value={pinCode}
        isValid={isPinCodeValid}
        inputStyleInvalid={inputStyleInvalid}
        {...props}
      />
      {!isPinCodeValid && (
        <span className="code-error error w-100 text-center d-block mt-1">
          {t("errors.codePhoneError")}
        </span>
      )}
    </div>
  )
}

export default CodeInput
