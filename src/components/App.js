import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {

  const PopupAvatarUniqueContent = () => { 
    return (
      <label className="form__label">
        <input type="url" value={inputContent.value} onChange={STUB_handleInputOnclick} className="form__item form__item_el_avatar-link" id="avatar-input" name="link" required placeholder="Ссылка на картинку"/>
        <span className="form__error-text avatar-input-error"></span>
      </label>
    );
  }

  const PopupAddPlaceUniqueContent = () => {
    return (
      <>
        <label className="form__label">
          <input type="text" value={inputContent.value} onChange={STUB_handleInputOnclick} className="form__item form__item_el_card-title" id="title-input" name="name" required placeholder="Название" minLength="2" maxLength="30"/>
          <span className="form__error-text title-input-error"></span>
        </label>
        <label className="form__label">
          <input type="url" value={inputContent.value} onChange={STUB_handleInputOnclick} className="form__item form__item_el_card-link" id="link-input" name="link" required placeholder="Ссылка на картинку"/>
          <span className="form__error-text link-input-error"></span>
        </label>
      </>
    );
  }

  const PopupEditProfileUniqueContent = () => {
    return (
      <>
        <label className="form__label">
          <input type="text" value={inputContent.value} onChange={STUB_handleInputOnclick} className="form__item form__item_el_name" id="name-input" name="name" required placeholder="Представьтесь" minLength="2" maxLength="40" />
          <span className="form__error-text name-input-error"></span>
        </label>
        <label className="form__label">
          <input type="text" value={inputContent.value} onChange={STUB_handleInputOnclick} className="form__item form__item_el_about" id="about-input" name="about" required placeholder="Напишите немного о себе" minLength="2" maxLength="200" />
          <span className="form__error-text about-input-error"></span>
        </label>
      </>
    );
  }

  // Image popup visibility state and its content is separated intentionally to implement smooth closing
  const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false); 
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
  const [isBigPicPopupOpen, setBigPicPopupState] = React.useState(false);

  const [selectedCard, setSelectedCardData] = React.useState({src: '', title: ''});

  const closeAllPopups = () => {
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setBigPicPopupState(false);
  }

  const buttonsHandlers = {
    handleEditProfileClick: () => {
      setEditProfilePopupState(true);
    },

    handleAddPlaceClick: () => {
      setAddPlacePopupState(true);
    },

    handleEditAvatarClick: () => {
      setEditAvatarPopupState(true);
    },
    
    handleCardClick: ( {link, name } ) => {
      setBigPicPopupState(true);
      setSelectedCardData({...selectedCard, src:link, title: name});
    },
  }
  
  /* Заглушка для обработчика полей ввода. Во всех инпутах пока выводится одно и тоже значение */
  const [inputContent, setInputContent] = React.useState({value: ''});

  const STUB_handleInputOnclick = (event) => {
    setInputContent({value: event.target.value});
  }


  return (
    <div className="page">
      <Header />
      <Main buttonsHandlers={buttonsHandlers}/>
      <Footer />
      <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        {PopupEditProfileUniqueContent()}
      </PopupWithForm>
      <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}> 
        {PopupAvatarUniqueContent()}
      </PopupWithForm>
      <PopupWithForm name="add-place" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        {PopupAddPlaceUniqueContent()}
      </PopupWithForm>
      <PopupWithForm name="confirm-action" title="Вы уверены?" />
      <ImagePopup isOpen={isBigPicPopupOpen} card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
