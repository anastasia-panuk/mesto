export default class UserInfo {
  constructor({ userNameSelector, userProfileSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userProfileSelector = document.querySelector(userProfileSelector);
  }

  getUserInfo() {
    this._user = {}

    this._user.user = this._userNameSelector.textContent;
    this._user.profile = this._userProfileSelector.textContent;

    return this._user;
  }

  setUserInfo(userData) {
    this._userNameSelector.textContent = userData.user;
    this._userProfileSelector.textContent = userData.profile;
  }
}
