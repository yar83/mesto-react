import avatar from '../images/avatar.png';

const Main = () => {
  return (
    <main className="content">
      <section className="profile">
          <div className="profile__avatar-container">
            <img src={avatar} className="profile__avatar-picture" alt="Изображение, описывающее владельца профиля"/>
              <div className="profile__curtain">
                  <button className="profile__avatar-edit" type="button" aria-label="Кнопка вызова формы редактирования картинки профиля"></button>
              </div>
          </div>
          <div className="profile__name-button">
              <h1 className="profile__name"></h1>
              <button className="profile__button-edit" type="button" aria-label="Кнопка вызова формы редактирования персональных данных"></button>
              <p className="profile__about"></p>
          </div>
          <button className="profile__button-add" type="button" aria-label="Кнопка вызова формы добавления новых мест"></button>
      </section>
      <section className="places">
        <ul className="places__list">
        </ul>
      </section>
    </main>
  );
}

export default Main;

