import React, {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import PropTypes from 'prop-types';

const EditAvatarPopup = (props) => {
  const avatarSrcInput = useRef(null);

  useEffect(() => {
    avatarSrcInput.current.value = '';
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar(avatarSrcInput.current.value);
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input type="url" defaultValue='' ref={avatarSrcInput} className="form__item form__item_el_avatar-link" id="avatar-input" name="link" required placeholder="Ссылка на картинку"/>
        <span className="form__error-text avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
};

EditAvatarPopup.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdateAvatar: PropTypes.func,
};

export default EditAvatarPopup;
