const ImagePopup = () => {
  return (
    <div className="popup fullszimg-popup">
      <div className="fullszimg-popup__container">
        <img className="fullszimg-popup__image" src="https://upload.wikimedia.org/wikipedia/ru/thumb/f/f6/MP-Palpatine.webp/454px-MP-Palpatine.webp" alt="Изображение mesto" />
        <button className="popup__close popup__close_full-sz-img"></button>
        <h2 className="fullszimg-popup__title"></h2>
      </div>
    </div>
  );
}

export default ImagePopup;
