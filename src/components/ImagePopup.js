import React from 'react';
import PropTypes from 'prop-types';

const ImagePopup = ( {isOpen, card, onClose} ) => {
  return (
    <div className={`popup fullszimg-popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="fullszimg-popup__container">
        <img className="fullszimg-popup__image" src={`${card.src}`} alt={`Изображение ${card.title}`} />
        <button className="popup__close popup__close_full-sz-img" onClick={onClose}></button>
        <h2 className="fullszimg-popup__title">{card.title}</h2>
      </div>
    </div>
  );
};

ImagePopup.propTypes = {
  isOpen: PropTypes.bool,
  card: PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
  }),
  onClose: PropTypes.func,
};

export default ImagePopup;
