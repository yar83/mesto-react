import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

const App = () => {

  // Image popup visibility state and its content is separated intentionally to implement smooth closing
  const [isPopupOpen, setPopupState] = React.useState({profile: false, addPlace: false, avatar: false, bigPic: false});
  const [selectedCard, setSelectedCardData] = React.useState({src: '', title: ''});

  const closeAllPopups = () => {
    setPopupState({...isPopupOpen, avatar: false, profile: false, addPlace: false, bigPic: false});
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

    handleCardClick: ( {link, name } ) => {
      setPopupState({...isPopupOpen, bigPic: true});
      setSelectedCardData({...selectedCard, src:link, title: name});
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
      <ImagePopup isOpen={isPopupOpen.bigPic} card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
