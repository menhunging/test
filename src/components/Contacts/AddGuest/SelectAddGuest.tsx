import Select from "react-select"

const options = [
  { value: "Mr", label: "Mr", id: 0 },
  { value: "Mrs", label: "Mrs", id: 1 },
  { value: "Dr", label: "Dr", id: 2 },
  { value: "المكرمة", label: "المكرمة", id: 3 },
  { value: "المكرم", label: "المكرم", id: 4 },
  { value: "الاستاذ", label: "الاستاذ", id: 5 },
]

const SelectAddGuest = ({ placeholder, validation, value, handeInput }) => {
  return (
    <div
      className={validation.suffix ? "select-row input-error" : "select-row"}
    >
      <Select
        // menuIsOpen={true}
        classNamePrefix="select-guest"
        placeholder={placeholder}
        options={options}
        value={options.find((e) => e.value === value)}
        onChange={(val) => {
          handeInput("suffix", val?.value)
        }}
      />

      <label className={"active"} htmlFor="">
        {placeholder}
      </label>

      {validation.suffix && (
        <span className="input-item__error error mt-1">
          {validation.suffix}
        </span>
      )}
    </div>
  )
}

export default SelectAddGuest
