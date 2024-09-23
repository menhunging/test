const OverlayBurger = ({ isOpenMenu, setIsOpenMenu }) => {
  return (
    <div
      className={
        isOpenMenu ? "overlay-burger overlay-burger--opened" : "overlay-burger"
      }
      onClick={() => {
        setIsOpenMenu(!isOpenMenu)
      }}
    ></div>
  )
}

export default OverlayBurger
