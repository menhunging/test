import { useState, useEffect } from "react"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"
import { useTranslation } from "react-i18next"
import Map from "./Map"
import Preloader from "../../utils/Preloader/Preloader"
import Modal from "react-bootstrap/Modal"
import { IconAdress } from "../../utils/Icons/CustomIcons"

const Location = ({
  isLoaded,
  center,
  onClickMap,
  event,
  isOpenLocationPopup,
  handleClose,
}) => {
  const { t } = useTranslation()

  const [newAdress, setNewAdress] = useState(event.address.address)

  const changeAdress = (center) => {
    const { lat, lng } = center

    const latlng = {
      lat: lat,
      lng: lng,
    }

    getGeocode({ location: latlng }).then((results) => {
      setNewAdress(results[0].formatted_address)
    })
  }

  useEffect(() => {
    changeAdress(center)
  }, [center])

  return (
    <Modal className="location" show={isOpenLocationPopup} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="location__head">
          <h2 className="caption">Indicate a point on the map</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoaded ? (
          <Map onClickMap={onClickMap} center={center} />
        ) : (
          <Preloader />
        )}
        <span className="adress-text">
          <IconAdress />
          {newAdress}
        </span>
      </Modal.Body>
      <Modal.Footer>
        <div className="location__controls">
          <button className="btn btn-simple" onClick={handleClose}>
            {t("buttons.cancel")}
          </button>
          <button onClick={handleClose} className="btn btn-dark">
            {t("buttons.save")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default Location
