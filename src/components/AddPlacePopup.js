import React, {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import PropTypes from 'prop-types';

const AddPlacePopup = (props) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace(name, link);
  };

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
    <label className="form__label">
      <input type="text" value={name || ''} onChange={(event) => setName(event.target.value)} className="form__item form__item_el_card-title" id="title-input" name="name" required placeholder="Название" minLength="2" maxLength="30"/>
      <span className="form__error-text title-input-error"></span>
    </label>
    <label className="form__label">
      <input type="url" value={link || ''} onChange={(event) => setLink(event.target.value)} className="form__item form__item_el_card-link" id="link-input" name="link" required placeholder="Ссылка на картинку"/>
      <span className="form__error-text link-input-error"></span>
    </label>
    </PopupWithForm>
  );
};

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAddPlace: PropTypes.func,
};

export default AddPlacePopup;
