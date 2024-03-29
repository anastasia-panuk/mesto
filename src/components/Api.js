export default class Api {
  constructor(data) {
    this._serverUrl = data.serverUrl;
    this._token = data.token;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
    }
  }

  getUserInfoFromServer() {
    return fetch(`${this._serverUrl}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }

  getCardsFromServer() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._requestResult(res));
  }

  editUserInfo(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: data.user,
        about: data.profile,
      }),
    }).then((res) => this._requestResult(res));
  }

  editUserAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._requestResult(res));
  }

  addNewCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._requestResult(res));
  }

  addCardLike(data) {
    return fetch(`${this._serverUrl}/cards/${data}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._requestResult(res));
  }

  deleteCardLike(data) {
    return fetch(`${this._serverUrl}/cards/${data}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._requestResult(res));
  }

  deleteCard(data) {
    return fetch(`${this._serverUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._requestResult(res));
  }
}
