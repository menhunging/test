import { useState, useEffect, useRef } from "react"
import { useAppSelector } from "../../../redux/store"
import Select from "react-select"
import { BsSearch } from "react-icons/bs"
import Field from "./Field"
import { useTranslation } from "react-i18next"
import { Button } from "react-bootstrap"

const options = [
  {
    label: "Abkhazia",
    img: "abkhazia.webp",
    value: 7840,
  },
  {
    label: "Afghanistan",
    img: "afghanistan.webp",
    value: 93,
  },
  {
    label: "Albania",
    img: "albania.webp",
    value: 355,
  },
  {
    label: "Algeria",
    img: "algeria.webp",
    value: 213,
  },
  {
    label: "American Samoa",
    img: "americansamoa.webp",
    value: 1684,
  },
  {
    label: "Angola",
    img: "angola.webp",
    value: 244,
  },
  {
    label: "Anguilla",
    img: "anguilla.webp",
    value: 1264,
  },
  {
    label: "Antigua and Barbuda",
    img: "antigua_and_barbuda.webp",
    value: 1268,
  },
  {
    label: "Argentina",
    img: "ar.webp",
    value: 54,
  },
  {
    label: "Armenia",
    img: "armenia.webp",
    value: 374,
  },
  {
    label: "Aruba",
    img: "aruba.webp",
    value: 297,
  },
  {
    label: "Ascension",
    img: "ascension.webp",
    value: 247,
  },
  {
    label: "Australia",
    img: "australia.webp",
    value: 61,
  },
  {
    label: "Australian External Territories",
    img: "australia.webp",
    value: 672,
  },
  {
    label: "Austria",
    img: "austria.webp",
    value: 43,
  },
  {
    label: "Azerbaijan",
    img: "azerbaijan.webp",
    value: 994,
  },
  {
    label: "Bahamas",
    img: "bahamas.webp",
    value: 1242,
  },
  {
    label: "Bahrain",
    img: "bahrain.webp",
    value: 973,
  },
  {
    label: "Bangladesh",
    img: "bangladesh.webp",
    value: 880,
  },
  {
    label: "Barbados",
    img: "barbados.webp",
    value: 1246,
  },
  {
    label: "Barbuda",
    img: "barbuda.webp",
    value: 1268,
  },
  {
    label: "Belarus",
    img: "by.webp",
    value: 375,
  },
  {
    label: "Belgium",
    img: "belgium.webp",
    value: 32,
  },
  {
    label: "Belize",
    img: "belize.webp",
    value: 501,
  },
  {
    label: "Benin",
    img: "benin.webp",
    value: 229,
  },
  {
    label: "Bermuda",
    img: "bermuda.webp",
    value: 1441,
  },
  {
    label: "Bhutan",
    img: "bhutan.webp",
    value: 975,
  },
  {
    label: "Bolivia",
    img: "bolivia.webp",
    value: 591,
  },
  {
    label: "Bosnia and Herzegovina",
    img: "bosnia.webp",
    value: 387,
  },
  {
    label: "Botswana",
    img: "botswana.webp",
    value: 267,
  },
  {
    label: "Brazil",
    img: "brazil.webp",
    value: 55,
  },
  {
    label: "British Indian Ocean Territory",
    img: "britishindianoceanterritory.webp",
    value: 246,
  },
  {
    label: "British Virgin Islands",
    img: "britishvirginislands.webp",
    value: 1284,
  },
  {
    label: "Brunei",
    img: "brunei.webp",
    value: 673,
  },
  {
    label: "Bulgaria",
    img: "bulgaria.webp",
    value: 359,
  },
  {
    label: "Burkina Faso",
    img: "burkinafaso.webp",
    value: 226,
  },
  {
    label: "Burundi",
    img: "burundi.webp",
    value: 257,
  },
  {
    label: "Cambodia",
    img: "cambodia.webp",
    value: 855,
  },
  {
    label: "Cameroon",
    img: "cameroon.webp",
    value: 237,
  },
  {
    label: "Canada",
    img: "canada.webp",
    value: 1,
  },
  {
    label: "Cape Verde",
    img: "capeverde.webp",
    value: 238,
  },
  {
    label: "Cayman Islands",
    img: "caymanislands.webp",
    value: 345,
  },
  {
    label: "Central African Republic",
    img: "centralafricanrepublic.webp",
    value: 236,
  },
  {
    label: "Chad",
    img: "chad.webp",
    value: 235,
  },
  {
    label: "Chile",
    img: "chile.webp",
    value: 56,
  },
  {
    label: "China",
    img: "china.webp",
    value: 86,
  },
  {
    label: "Christmas Island",
    img: "christmasisland.webp",
    value: 61,
  },
  {
    label: "Cocos-Keeling Islands",
    img: "cocos-keeling.webp",
    value: 61,
  },
  {
    label: "Colombia",
    img: "colombia.webp",
    value: 57,
  },
  {
    label: "Comoros",
    img: "comoros.webp",
    value: 269,
  },
  {
    label: "Congo",
    img: "congo.webp",
    value: 242,
  },
  {
    label: "Congo, Dem. Rep. oZaire",
    img: "congo.webp",
    value: 243,
  },
  {
    label: "Cook Islands",
    img: "cookislands.webp",
    value: 682,
  },
  {
    label: "Costa Rica",
    img: "costarica.webp",
    value: 506,
  },
  {
    label: "Croatia",
    img: "croatia.webp",
    value: 385,
  },
  {
    label: "Cuba",
    img: "cuba.webp",
    value: 53,
  },
  {
    label: "Curacao",
    img: "curacao.webp",
    value: 599,
  },
  {
    label: "Cyprus",
    img: "cyprus.webp",
    value: 537,
  },
  {
    label: "Czech Republic",
    img: "czechrepublic.webp",
    value: 420,
  },
  {
    label: "Denmark",
    img: "denmark.webp",
    value: 45,
  },
  {
    label: "Diego Garcia",
    img: "diegogarcia.webp",
    value: 246,
  },
  {
    label: "Djibouti",
    img: "djibouti.webp",
    value: 253,
  },
  {
    label: "Dominica",
    img: "dominica.webp",
    value: 1767,
  },
  {
    label: "Dominican Republic",
    img: "dominicanrepublic.webp",
    value: 1809,
  },
  {
    label: "East Timor",
    img: "easttimor.webp",
    value: 670,
  },
  {
    label: "Easter Island",
    img: "easterisland.webp",
    value: 56,
  },
  {
    label: "Ecuador",
    img: "ecuador.webp",
    value: 593,
  },
  {
    label: "Egypt",
    img: "egypt.webp",
    value: 20,
  },
  {
    label: "El Salvador",
    img: "salvador.webp",
    value: 503,
  },
  {
    label: "Equatorial Guinea",
    img: "equatorialguinea.webp",
    value: 240,
  },
  {
    label: "Eritrea",
    img: "eritrea.webp",
    value: 291,
  },
  {
    label: "Estonia",
    img: "estonia.webp",
    value: 372,
  },
  {
    label: "Ethiopia",
    img: "ethiopia.webp",
    value: 251,
  },
  {
    label: "Falkland Islands",
    img: "falklandislands.webp",
    value: 500,
  },
  {
    label: "Faroe Islands",
    img: "faroeislands.webp",
    value: 298,
  },
  {
    label: "Fiji",
    img: "fiji.webp",
    value: 2679,
  },
  {
    label: "Finland",
    img: "finland.webp",
    value: 358,
  },
  {
    label: "France",
    img: "france.webp",
    value: 33,
  },
  {
    label: "French Antilles",
    img: "frenchantilles.webp",
    value: 596,
  },
  {
    label: "French Guiana",
    img: "frenchguiana.webp",
    value: 594,
  },
  {
    label: "French Polynesia",
    img: "frenchpolynesia.webp",
    value: 689,
  },
  {
    label: "Gabon",
    img: "gabon.webp",
    value: 241,
  },
  {
    label: "Gambia",
    img: "gambia.webp",
    value: 220,
  },
  {
    label: "Georgia",
    img: "georgia.webp",
    value: 995,
  },
  {
    label: "Germany",
    img: "germany.webp",
    value: 49,
  },
  {
    label: "Ghana",
    img: "ghana.webp",
    value: 233,
  },
  {
    label: "Gibraltar",
    img: "gibraltar.webp",
    value: 350,
  },
  {
    label: "Greece",
    img: "greece.webp",
    value: 30,
  },
  {
    label: "Greenland",
    img: "greenland.webp",
    value: 299,
  },
  {
    label: "Grenada",
    img: "grenada.webp",
    value: 1473,
  },
  {
    label: "Guadeloupe",
    img: "guadeloupe.webp",
    value: 590,
  },
  {
    label: "Guam",
    img: "guam.webp",
    value: 1671,
  },
  {
    label: "Guatemala",
    img: "guatemala.webp",
    value: 502,
  },
  {
    label: "Guinea",
    img: "guinea.webp",
    value: 224,
  },
  {
    label: "Guinea-Bissau",
    img: "guinea-bissau.webp",
    value: 245,
  },
  {
    label: "Guyana",
    img: "guyana.webp",
    value: 595,
  },
  {
    label: "Haiti",
    img: "haiti.webp",
    value: 509,
  },
  {
    label: "Honduras",
    img: "honduras.webp",
    value: 504,
  },
  {
    label: "Hong Kong SAR China",
    img: "hongkong.webp",
    value: 852,
  },
  {
    label: "Hungary",
    img: "hungary.webp",
    value: 36,
  },
  {
    label: "Iceland",
    img: "iceland.webp",
    value: 354,
  },
  {
    label: "India",
    img: "india.webp",
    value: 91,
  },
  {
    label: "Indonesia",
    img: "indonesia.webp",
    value: 62,
  },
  {
    label: "Iran",
    img: "iran.webp",
    value: 98,
  },
  {
    label: "Iraq",
    img: "iraq.webp",
    value: 964,
  },
  {
    label: "Ireland",
    img: "ireland.webp",
    value: 353,
  },
  {
    label: "Israel",
    img: "israel.webp",
    value: 972,
  },
  {
    label: "Italy",
    img: "italy.webp",
    value: 39,
  },
  {
    label: "Ivory Coast",
    img: "ivorycoast.webp",
    value: 39,
  },
  {
    label: "Jamaica",
    img: "jamaica.webp",
    value: 1876,
  },
  {
    label: "Japan",
    img: "japan.webp",
    value: 81,
  },
  {
    label: "Jordan",
    img: "jordan.webp",
    value: 962,
  },
  {
    label: "kazakhstan",
    img: "kz.webp",
    value: 7,
  },
  {
    label: "Kenya",
    img: "kenya.webp",
    value: 254,
  },
  {
    label: "Kiribati",
    img: "kiribati.webp",
    value: 686,
  },
  {
    label: "Kuwait",
    img: "kuwait.webp",
    value: 965,
  },
  {
    label: "Kyrgyzstan",
    img: "kyrgyzstan.webp",
    value: 996,
  },
  {
    label: "Laos",
    img: "laos.webp",
    value: 856,
  },
  {
    label: "Latvia",
    img: "latvia.webp",
    value: 371,
  },
  {
    label: "Lebanon",
    img: "lebanon.webp",
    value: 961,
  },
  {
    label: "Lesotho",
    img: "lesotho.webp",
    value: 266,
  },
  {
    label: "Liberia",
    img: "liberia.webp",
    value: 231,
  },
  {
    label: "Libya",
    img: "libya.webp",
    value: 218,
  },
  {
    label: "Liechtenstein",
    img: "liechtenstein.webp",
    value: 423,
  },
  {
    label: "Lithuania",
    img: "lithuania.webp",
    value: 370,
  },
  {
    label: "Luxembourg",
    img: "luxembourg.webp",
    value: 352,
  },
  {
    label: "Macau SAR China",
    img: "macau.webp",
    value: 853,
  },
  {
    label: "Macedonia",
    img: "macedonia.webp",
    value: 389,
  },
  {
    label: "Madagascar",
    img: "madagascar.webp",
    value: 261,
  },
  {
    label: "Malawi",
    img: "malawi.webp",
    value: 265,
  },
  {
    label: "Malaysia",
    img: "malaysia.webp",
    value: 60,
  },
  {
    label: "Maldives",
    img: "maldives.webp",
    value: 960,
  },
  {
    label: "Mali",
    img: "mali.webp",
    value: 223,
  },
  {
    label: "Malta",
    img: "malta.webp",
    value: 356,
  },
  {
    label: "Marshall Islands",
    img: "marshallislands.webp",
    value: 692,
  },
  {
    label: "Martinique",
    img: "martinique.webp",
    value: 596,
  },
  {
    label: "Mauritania",
    img: "mauritania.webp",
    value: 222,
  },
  {
    label: "Mauritius",
    img: "mauritius.webp",
    value: 230,
  },
  {
    label: "Mayotte",
    img: "mayotte.webp",
    value: 262,
  },
  {
    label: "Mexico",
    img: "mexico.webp",
    value: 52,
  },
  {
    label: "Micronesia",
    img: "micronesia.webp",
    value: 691,
  },
  {
    label: "Midway Island",
    img: "midway.webp",
    value: 1808,
  },
  {
    label: "Moldova",
    img: "moldova.webp",
    value: 373,
  },
  {
    label: "Monaco",
    img: "monaco.webp",
    value: 377,
  },
  {
    label: "Mongolia",
    img: "mongolia.webp",
    value: 976,
  },
  {
    label: "Montenegro",
    img: "montenegro.webp",
    value: 382,
  },
  {
    label: "Montserrat",
    img: "montserrat.webp",
    value: 1664,
  },
  {
    label: "Morocco",
    img: "morocco.webp",
    value: 212,
  },
  {
    label: "Myanmar",
    img: "myanmar.webp",
    value: 95,
  },
  {
    label: "Namibia",
    img: "namibia.webp",
    value: 264,
  },
  {
    label: "Nauru",
    img: "nauru.webp",
    value: 674,
  },
  {
    label: "Nepal",
    img: "nepal.webp",
    value: 977,
  },
  {
    label: "Netherlands",
    img: "netherlands.webp",
    value: 31,
  },
  {
    label: "Netherlands Antilles",
    img: "netherlandsantilles.webp",
    value: 599,
  },
  {
    label: "Nevis",
    img: "nevis.webp",
    value: 1869,
  },
  {
    label: "New Caledonia",
    img: "newcaledonia.webp",
    value: 687,
  },
  {
    label: "New Zealand",
    img: "newzealand.webp",
    value: 64,
  },
  {
    label: "Nicaragua",
    img: "nicaragua.webp",
    value: 505,
  },
  {
    label: "Niger",
    img: "niger.webp",
    value: 227,
  },
  {
    label: "Nigeria",
    img: "nigeria.webp",
    value: 234,
  },
  {
    label: "Niue",
    img: "niue.webp",
    value: 683,
  },
  {
    label: "Norfolk Island",
    img: "norfolkisland.webp",
    value: 672,
  },
  {
    label: "North Korea",
    img: "northkorea.webp",
    value: 850,
  },
  {
    label: "Northern Mariana Islands",
    img: "northernmarianaislands.webp",
    value: 1670,
  },
  {
    label: "Norway",
    img: "norway.webp",
    value: 47,
  },
  {
    label: "Oman",
    img: "oman.webp",
    value: 968,
  },
  {
    label: "Pakistan",
    img: "pakistan.webp",
    value: 92,
  },
  {
    label: "Palau",
    img: "palau.webp",
    value: 680,
  },
  {
    label: "Palestinian Territory",
    img: "palestinianterritory.webp",
    value: 970,
  },
  {
    label: "Panama",
    img: "panama.webp",
    value: 507,
  },
  {
    label: "Papua New Guinea",
    img: "papuanewguinea.webp",
    value: 675,
  },
  {
    label: "Paraguay",
    img: "paraguay.webp",
    value: 595,
  },
  {
    label: "Peru",
    img: "peru.webp",
    value: 51,
  },
  {
    label: "Philippines",
    img: "philippines.webp",
    value: 51,
  },
  {
    label: "Poland",
    img: "poland.webp",
    value: 48,
  },
  {
    label: "Portugal",
    img: "portugal.webp",
    value: 351,
  },
  {
    label: "Puerto Rico",
    img: "puertrico.webp",
    value: 1787,
  },
  {
    label: "Qatar",
    img: "qatar.webp",
    value: 974,
  },
  {
    label: "Reunion",
    img: "reunion.webp",
    value: 262,
  },
  {
    label: "Romania",
    img: "romania.webp",
    value: 40,
  },
  {
    label: "Russia",
    img: "ru.webp",
    value: 7,
  },
  {
    label: "Rwanda",
    img: "rwanda.webp",
    value: 250,
  },
  {
    label: "Samoa",
    img: "samoa.webp",
    value: 685,
  },
  {
    label: "San Marino",
    img: "sanmarino.webp",
    value: 378,
  },
  {
    label: "Saudi Arabia",
    img: "ae.webp",
    value: 966,
  },
  {
    label: "Senegal",
    img: "senegal.webp",
    value: 221,
  },
  {
    label: "Serbia",
    img: "serbia.webp",
    value: 381,
  },
  {
    label: "Seychelles",
    img: "seychelles.webp",
    value: 248,
  },
  {
    label: "Sierra Leone",
    img: "sierraleone.webp",
    value: 232,
  },
  {
    label: "Singapore",
    img: "singapore.webp",
    value: 65,
  },
  {
    label: "Slovakia",
    img: "slovakia.webp",
    value: 421,
  },
  {
    label: "Slovenia",
    img: "slovenia.webp",
    value: 386,
  },
  {
    label: "Solomon Islands",
    img: "solomonislands.webp",
    value: 677,
  },
  {
    label: "South Africa",
    img: "southafrica.webp",
    value: 27,
  },
  {
    label: "South Georgia and the South Sandwich Islands",
    img: "southg.webp",
    value: 500,
  },
  {
    label: "South Korea",
    img: "southkorea.webp",
    value: 82,
  },
  {
    label: "Spain",
    img: "spain.webp",
    value: 34,
  },
  {
    label: "Sri Lanka",
    img: "srilanka.webp",
    value: 94,
  },
  {
    label: "Sudan",
    img: "sudan.webp",
    value: 249,
  },
  {
    label: "Suriname",
    img: "suriname.webp",
    value: 597,
  },
  {
    label: "Swaziland",
    img: "swaziland.webp",
    value: 268,
  },
  {
    label: "Sweden",
    img: "sweden.webp",
    value: 46,
  },
  {
    label: "Switzerland",
    img: "switzerland.webp",
    value: 41,
  },
  {
    label: "Syria",
    img: "syria.webp",
    value: 963,
  },
  {
    label: "Taiwan",
    img: "taiwan.webp",
    value: 886,
  },
  {
    label: "Tajikistan",
    img: "tajikistan.webp",
    value: 992,
  },
  {
    label: "Tanzania",
    img: "tanzania.webp",
    value: 255,
  },
  {
    label: "Thailand",
    img: "thailand.webp",
    value: 66,
  },
  {
    label: "Timor Leste",
    img: "timorleste.webp",
    value: 670,
  },
  {
    label: "Togo",
    img: "togo.webp",
    value: 228,
  },
  {
    label: "Tokelau",
    img: "tokelau.webp",
    value: 690,
  },
  {
    label: "Tonga",
    img: "tonga.webp",
    value: 676,
  },
  {
    label: "Trinidad and Tobago",
    img: "trinidadtobago.webp",
    value: 1868,
  },
  {
    label: "Tunisia",
    img: "tunisia.webp",
    value: 216,
  },
  {
    label: "Turkey",
    img: "turkey.webp",
    value: 90,
  },
  {
    label: "Turkmenistan",
    img: "turkmenistan.webp",
    value: 993,
  },
  {
    label: "Turks and Caicos Islands",
    img: "turkscaicosislands.webp",
    value: 1649,
  },
  {
    label: "Tuvalu",
    img: "tuvalu.webp",
    value: 688,
  },
  {
    label: "U.S. Virgin Islands",
    img: "virginislands.webp",
    value: 1348,
  },
  {
    label: "Uganda",
    img: "uganda.webp",
    value: 256,
  },
  {
    label: "Ukraine",
    img: "ukraine.webp",
    value: 380,
  },
  {
    label: "United Arab Emirates",
    img: "unitedarabemirates.webp",
    value: 971,
  },
  {
    label: "United Kingdom",
    img: "unk.webp",
    value: 44,
  },
  {
    label: "United States",
    img: "usa.webp",
    value: 1,
  },
  {
    label: "Uruguay",
    img: "uruguay.webp",
    value: 598,
  },
  {
    label: "Uzbekistan",
    img: "uzbekistan.webp",
    value: 998,
  },
  {
    label: "Vanuatu",
    img: "vanuatu.webp",
    value: 678,
  },
  {
    label: "Venezuela",
    img: "venezuela.webp",
    value: 58,
  },
  {
    label: "Vietnam",
    img: "vietnam.webp",
    value: 84,
  },
  {
    label: "Wake Island",
    img: "wakeisland.webp",
    value: 1808,
  },
  {
    label: "Wallis and Futuna",
    img: "wallisfutuna.webp",
    value: 681,
  },
  {
    label: "Yemen",
    img: "yemen.webp",
    value: 967,
  },
  {
    label: "Zambia",
    img: "zambia.webp",
    value: 260,
  },
  {
    label: "Zanzibar",
    img: "zanzibar.webp",
    value: 255,
  },
  {
    label: "Zimbabwe",
    img: "zimbabwe.webp",
    value: 263,
  },
]

const formatOptionLabel = ({ value, label, img }) => (
  <div className="d-flex gap-2 align align-items-center">
    <img className="coutry-flag" src={"./images/flags/" + img} alt="" />
    <span>{label}</span>
    <span className="code">+{value}</span>
  </div>
)

const FieldPhone = ({ setPhone, clearErrorsField, register, errors }) => {
  const { error } = useAppSelector((state) => state.auth)
  const { t } = useTranslation()
  const rootEl = useRef(null)

  const [number, setNumber] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [option, setOption] = useState({
    value: "966",
    label: "Saudi Arabia",
    img: "ae.webp",
  })

  const onChangeSelect = (newOption) => {
    setOption(newOption)
    setIsOpen(false)

    let phone = newOption.value + number
    setPhone(phone)
  }

  const onCnangeInput = (newNumber) => {
    setNumber(newNumber)

    let phone = option.value + newNumber
    setPhone(phone)
  }

  useEffect(() => {
    const onClick = (event) => {
      if (!rootEl.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return (
    <div className="phone-field" ref={rootEl}>
      <div
        className={
          !isOpen ? "coutry-field" : "coutry-field coutry-field--opened"
        }
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <img
          className="coutry-flag"
          src={"./images/flags/" + option.img}
          alt={option.label}
        />

        <span className="coutry-code">+{option.value}</span>

        <svg
          className="coutry-field__arrow"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.79004 6L7.58004 10L11.37 6"
            stroke="#0B0C0E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <Field
        name={"phone"}
        type="number"
        placeholder="999-99-99"
        value={number}
        error={errors.phone?.message || error}
        register={register}
        onHandleChange={(value) => {
          clearErrorsField()
          onCnangeInput(value)
        }}
      />

      {isOpen && (
        <div className="phone-select">
          <Select
            classNamePrefix="select-country"
            placeholder={t("placeholder.search")}
            onChange={onChangeSelect}
            formatOptionLabel={formatOptionLabel}
            // defaultValue={option.value}
            options={options}
            unstyled={true}
            closeMenuOnScroll={true}
            autoFocus={true}
            menuIsOpen={true}
          />

          <BsSearch className="phone-select__icon" size="14px" />
        </div>
      )}
    </div>
  )
}

export default FieldPhone
