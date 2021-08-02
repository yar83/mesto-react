import React from 'react';
import {api} from '../utils/api.js';
import Card from './Card';

const Main = (props) => {

  //get callbacks by destructuring buttonHandlers object
  const { handleEditAvatarClick, handleEditProfileClick, handleAddPlaceClick, handleCardClick } = props.buttonsHandlers; 

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
    .then(values => {
      setUserName(values[0].name);
      setUserDescription(values[0].about);
      setUserAvatar(values[0].avatar);
      setCards(values[1]);
    })
    .catch(err => console.log('Невозможно получить начальные данные с сервера ' + err));
  },[]);

  return (
    <main className="content">
      <section className="profile">
          <div className="profile__avatar-container">
            <img src={`${userAvatar}`} className="profile__avatar-picture" alt="Изображение, описывающее владельца профиля"/>
              <div className="profile__curtain">
                  <button className="profile__avatar-edit" onClick={handleEditAvatarClick} type="button" aria-label="Кнопка вызова формы редактирования картинки профиля"></button>
              </div>
          </div>
          <div className="profile__name-button">
              <h1 className="profile__name">{`${userName}`}</h1>
              <button className="profile__button-edit" onClick={handleEditProfileClick} type="button" aria-label="Кнопка вызова формы редактирования персональных данных"></button>
              <p className="profile__about">{`${userDescription}`}</p>
          </div>
          <button className="profile__button-add" onClick={handleAddPlaceClick} type="button" aria-label="Кнопка вызова формы добавления новых мест"></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {cards.map(card => <Card card={card} clickHandler={handleCardClick} key={card._id} />)}
        </ul>
      </section>
    </main>
  );
}

export default Main;

