import React from 'react';
import {api} from '../utils/api.js';
import Card from './Card';

const Main = (props) => {

  //get callbacks by destructuring buttonHandlers object
  const { handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, handleCardClick } = props.buttonsHandlers; 

  const [userData, setUserData] = React.useState({name: '', description: '', avatar: ''});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
    .then(values => {
      setUserData({...userData, name: values[0].name, description: values[0].about, avatar: values[0].avatar});
      setCards(values[1]);
    })
    .catch(err => console.log('Невозможно получить начальные данные с сервера ' + err));
  },[]);

  /*
  api.getUser()
    .then(res => {userData.name = res.name; userData.description = res.about; userData.avatar = res.avatar;})
    .catch(err => console.log('Невозможно получить начальные данные с сервера ' + err));

  api.getInitialCards()
    .then(res => setCards(res))
    .catch(err => console.log('Невозможно получить начальные данные с сервера ' + err));
  */

  return (
    <main className="content">
      <section className="profile">
          <div className="profile__avatar-container">
            <img src={`${userData.avatar}`} className="profile__avatar-picture" alt="Изображение, описывающее владельца профиля"/>
              <div className="profile__curtain">
                  <button className="profile__avatar-edit" onClick={handleEditAvatarClick} type="button" aria-label="Кнопка вызова формы редактирования картинки профиля"></button>
              </div>
          </div>
          <div className="profile__name-button">
              <h1 className="profile__name">{`${userData.name}`}</h1>
              <button className="profile__button-edit" onClick={handleEditProfileClick} type="button" aria-label="Кнопка вызова формы редактирования персональных данных"></button>
              <p className="profile__about">{`${userData.description}`}</p>
          </div>
          <button className="profile__button-add" onClick={handleAddPlaceClick} type="button" aria-label="Кнопка вызова формы добавления новых мест"></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {cards.map(card => <Card card={card} clickHandler={handleCardClick} />)}
        </ul>
      </section>
    </main>
  );
}

export default Main;

