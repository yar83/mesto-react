import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {

  const [isPopupOpen, setPopupState] = React.useState({profile: false, addPlace: false, avatar: false});

  const closeAllPopups = () => {
    setPopupState({...isPopupOpen, avatar: false, profile: false, addPlace: false});
  }

  const buttonsHandlers = {
    handleEditAvatarClick: () => {
      setPopupState({...isPopupOpen, avatar: true});
    },

    handleEditProfileClick: () => {
      setPopupState({...isPopupOpen, profile: true});
    },

    handleAddPlaceClick: () => {
      setPopupState({...isPopupOpen, addPlace: true});
    },
  }


  return (
    <div className="page">
      <Header />
      <Main buttonsHandlers={buttonsHandlers}/>
      <Footer />
      <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isPopupOpen.profile} onClose={closeAllPopups} />
      <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isPopupOpen.avatar} onClose={closeAllPopups} />
      <PopupWithForm name="add-place" title="Новое место" isOpen={isPopupOpen.addPlace} onClose={closeAllPopups} />
      <PopupWithForm name="confirm-action" title="Вы уверены?" />
      <ImagePopup />
    </div>
  );
}

export default App;
