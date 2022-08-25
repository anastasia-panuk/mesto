export default class UserInfo {
  constructor({ userNameSelector, userProfileSelector, userAvatarSelector }) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userProfileSelector = document.querySelector(userProfileSelector);
    this._userAvatarSelector = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      user: this._userNameSelector.textContent,
      profile: this._userProfileSelector.textContent,
      avatar: this._userAvatarSelector.src,
    };
  }

  setUserAvatar(userData) {
    if(userData.avatar) {
      this._userAvatarSelector.src = userData.avatar;
    }
  }

  setUserInfo(userData) {
    if(userData.name && userData.about) {
    this._userNameSelector.textContent = userData.name;
    this._userProfileSelector.textContent = userData.about;
    }
  }
}
