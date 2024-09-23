import ChooseFileEvent from "../../components/CreateEvent/ChooseFileEvent"
import { IconCrown } from "../../components/utils/Icons/CustomIcons"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import ImageEditor from "../../components/ImageEditor/ImageEditor"

const EditDesign = () => {
  const { t } = useTranslation()
  const { new_event_img } = useAppSelector((state) => state.events)
  const dispatch = useAppDispatch()

  console.log(new_event_img)

  return (
    <div className="editDesign">
      <div className="container">
        <div className="editDesign-head">
          <span className="editTextQR">
            <IconCrown /> Edit QR code design
          </span>
        </div>
        <div className="editDesign-body">
          <h2 className="caption caption-three">QR Code Design</h2>
          <div className="input-item">
            <input type="text" placeholder="Name of QR design" />
          </div>

          <div className="editDesign-body__drag">
            <ImageEditor />
            {/* {new_event_img.file_path ? <ImageEditor /> : <ChooseFileEvent />} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDesign
