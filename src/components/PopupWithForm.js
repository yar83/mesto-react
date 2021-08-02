const PopupWithForm = (props) => {

  return ( 
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className={`popup__close popup__close_${props.name}`} onClick={props.onClose} type="button" aria-label="Кнопка, чтобы закрыть попап"></button>
        <div className="form">
          <form className={`form__entity form__entity_${props.name}`} noValidate name={`${props.name}`}>
            <h2 className="form__title">{props.title}</h2>
            <fieldset className="form__items">
              {props.children} 
            </fieldset>
            <fieldset className="form__buttons">
              <button type="submit" className="form__button form__button_el_button-save">{props.buttonText}</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
