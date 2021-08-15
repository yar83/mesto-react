import {apiCredits} from './constants.js';

class Api {
  #baseApiUrl;
  #token;

  constructor( {baseApiUrl, token} ) {
    this.#baseApiUrl = baseApiUrl;
    this.#token = token;
  }

  #checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getInitialCards() {
    return fetch(`${this.#baseApiUrl}cards`, {
      headers: {
        authorization: this.#token,
      },
    })
      .then(this.#checkResponse);
  }

  getUser() {
    return fetch(`${this.#baseApiUrl}users/me`, {
      headers: {
        authorization: this.#token,
      },
    })
      .then(this.#checkResponse);
  }

  updateUserInfo(userData) {
    return fetch(`${this.#baseApiUrl}users/me`, {
      method: 'PATCH',
      headers: {
        'authorization': this.#token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
      .then(this.#checkResponse);
  }

  updateUserAvatar(avatarSrc) {
    return fetch(`${this.#baseApiUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'authorization': this.#token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatarSrc,
      }),
    })
      .then(this.#checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this.#baseApiUrl}cards`, {
      method: 'POST',
      headers: {
        'authorization': this.#token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this.#checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this.#baseApiUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        'authorization': this.#token,
      },
    })
      .then(this.#checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this.#baseApiUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        'authorization': this.#token,
      },
    })
      .then(this.#checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.#baseApiUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'authorization': this.#token,
      },
    })
      .then(this.#checkResponse);
  }
}

export const api = new Api(apiCredits);
