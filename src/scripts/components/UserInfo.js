export default class UserInfo {
  constructor({ userNameSelector, userProfileSelector }) {
    this._userNameSelector = userNameSelector;
    this._userProfileSelector = userProfileSelector;

    this._nameInput = document.querySelector('#popup__user-name');
    this._profileInput = document.querySelector('#popup__user-profile');
  }

  getUserInfo() {
    this._nameInput.value = this._userNameSelector.textContent;
    this._profileInput.value = this._userProfileSelector.textContent;
  }

  setUserInfo(evt) {
    evt.preventDefault();
    this._userNameSelector.textContent = this._nameInput.value;
    this._userProfileSelector.textContent = this._profileInput.value;
  }
}
