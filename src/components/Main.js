import React, {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';
import PropTypes from 'prop-types';

const Main = (props) => {
  // Непропущенный тестами лаконичный вариант деструктуризации
  // содержащего обработчики объекта из переданного пропса.
  /*
  const {
    handleEditAvatarClick,
    handleEditProfileClick,
    handleAddPlaceClick,
    handleCardClick,
  } = props.buttonsHandlers;
  */
  const handleEditAvatarClick = props.onAvatarClick;
  const handleEditProfileClick = props.onProfileClick;
  const handleAddPlaceClick = props.onAddPlaceClick;
  const handleCardClick = props.onCardClick;

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={`${currentUser.avatar}`} className="profile__avatar-picture" alt="Изображение, описывающее владельца профиля"/>
          <div className="profile__curtain">
            <button className="profile__avatar-edit" onClick={handleEditAvatarClick} type="button" aria-label="Кнопка вызова формы редактирования картинки профиля"></button>
          </div>
        </div>
        <div className="profile__name-button">
          <h1 className="profile__name">{`${currentUser.name}`}</h1>
          <button className="profile__button-edit" onClick={handleEditProfileClick} type="button" aria-label="Кнопка вызова формы редактирования персональных данных"></button>
          <p className="profile__about">{`${currentUser.about}`}</p>
        </div>
        <button className="profile__button-add" onClick={handleAddPlaceClick} type="button" aria-label="Кнопка вызова формы добавления новых мест"></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {props.cards.map((card) => {
            return (
              <Card
                card={card}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                clickHandler={handleCardClick}
                key={card._id}
              />
            ); // интересно, что линтер требует от меня здесь точку с запятой и наотрез отказывается делать сборку
          })}
        </ul>
      </section>
    </main>
  );
};

Main.propTypes = {
  onAvatarClick: PropTypes.func,
  onProfileClick: PropTypes.func,
  onAddPlaceClick: PropTypes.func,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func,
  cards: PropTypes.array,
};

export default Main;
