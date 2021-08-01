const Card = ( {card} ) => {
  return (
      <li className="card" key={`${card._id}`}>
      <img className="card__picture" src={`${card.link}`} alt={`Изображение ${card.name}`} />
      <button type="button" className="card__trashbin"></button>
      <div className="card__text-heart">
      <h2 className="card__place">{card.name}</h2>
      <div className="card__likes">
        <button type="button" className="card__heart"></button>
        <span className="card__likes-number">{card.likes.length}</span>
      </div>
      </div>
    </li>
  );
}

export default Card;
