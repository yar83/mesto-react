import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import PropTypes from 'prop-types';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  };

  return (
          <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
          >
          <label className="form__label">
            <input type="text" value={name || ''} onChange={(event) => setName(event.target.value)} className="form__item form__item_el_name" id="name-input" name="name" required placeholder="Представьтесь" minLength="2" maxLength="40" />
            <span className="form__error-text name-input-error"></span>
          </label>
          <label className="form__label">
            <input type="text" value={description || ''} onChange={(event) => setDescription(event.target.value)} className="form__item form__item_el_about" id="about-input" name="about" required placeholder="Напишите немного о себе" minLength="2" maxLength="200" />
            <span className="form__error-text about-input-error"></span>
        </label>
        </PopupWithForm>
  );
};

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdateUser: PropTypes.func,
};

export default EditProfilePopup;
