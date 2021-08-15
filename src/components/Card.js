import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = ( {card, clickHandler, onCardLike, onCardDelete} ) => {
  function handleClick() {
    clickHandler(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleTrashbinClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isMyCard = card.owner._id === currentUser._id;
  const isLikedByCurUser = card.likes.some((like) => like._id === currentUser._id);

  return (
    <li className="card">
      <img className="card__picture" src={`${card.link}`} alt={`Изображение ${card.name}`} onClick={handleClick} />
      <button type="button" className={isMyCard ? 'card__trashbin card__trashbin_visible' : 'card__trashbin'} onClick={handleTrashbinClick}></button>
      <div className="card__text-heart">
        <h2 className="card__place">{card.name}</h2>
        <div className="card__likes">
          <button type="button" className={isLikedByCurUser ? 'card__heart card__heart_color_black' : 'card__heart'} onClick={handleLikeClick}></button>
          <span className="card__likes-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    link: PropTypes.string,
    name: PropTypes.string,
    likes: PropTypes.array,
    owner: PropTypes.object,
  }),
  clickHandler: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func,
};


export default Card;
