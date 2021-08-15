import React, {useState, useEffect} from 'react';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    api.getUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Невозможно получить данные с сервера ${err}`);
      });
  }, []);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Невозможно получить начальные данные с сервера ${err}`);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLikedByCurrUser = card.likes.some((like) => like._id === currentUser._id);
    if (!isLikedByCurrUser) {
      api.likeCard(card._id)
        .then((updatedCard) => {
          setCards((cards) => cards.map((currCard) => currCard._id === card._id ? updatedCard : currCard));
        })
        .catch((err) => {
          console.log(`Ошибка связи с сервером: ${err}`);
        });
    } else {
      api.dislikeCard(card._id)
        .then((updatedCard) => {
          setCards((cards) => cards.map((currCard) => currCard._id === card._id ? updatedCard : currCard));
        })
        .catch((err) => {
          console.log(`Ошибка связи с сервером: ${err}`);
        });
    }
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((currCard) => currCard._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка связи с сервером: ${err}`);
      });
  };

  const handleUpdateUser = (userData) => {
    api.updateUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно соединиться с сервером ${err}`);
      });
  };

  const handleUpdateAvatar = (avatarSrc) => {
    api.updateUserAvatar(avatarSrc)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно соединиться с сервером ${err}`);
      });
  };

  const handleAddPlace = (name, link) => {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно соединиться с сервером ${err}`);
      });
  };

  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isBigPicPopupOpen, setBigPicPopupState] = useState(false);
  const [selectedCard, setSelectedCardData] = useState({src: '', title: ''});

  const closeAllPopups = () => {
    setEditProfilePopupState(false);
    setAddPlacePopupState(false);
    setEditAvatarPopupState(false);
    setBigPicPopupState(false);
  };

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

    handleCardClick: ( {link, name} ) => {
      setBigPicPopupState(true);
      setSelectedCardData({...selectedCard, src: link, title: name});
    },
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          buttonsHandlers={buttonsHandlers}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          currentCards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm
          name="confirm-action"
          title="Вы уверены?" />
        <ImagePopup
          isOpen={isBigPicPopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
