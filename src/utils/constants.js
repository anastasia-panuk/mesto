export const editPopup = document.querySelector('.popup_type_profile');
export const newPlacePopup = document.querySelector('.popup_type_card-add');
export const newAvatarPopup = document.querySelector('.popup_type_user-avatar');
export const deleteCardPopup = document.querySelector(
  '.popup_type_detite-card'
);

export const popupEditBtn = document.querySelector('.user__edit-button');
export const popupAddBtn = document.querySelector('.user__add-button');
export const popupAvatarEditButtn = document.querySelector(
  '.user__avatar-edit-button'
);

export const imageZoomPopup = document.querySelector('.popup_type_picture');

export const userNameInput = document.getElementById('user');
export const userProfileInput = document.getElementById('profile');

export const popupAddNewPlaceForm = document.querySelector(
  '.new-place-popup-form'
);
export const popupEditForm = document.querySelector('.edit-popup-form');

export const popupEditUserAvatarForm = document.querySelector(
  '.new-user-avatar-form'
);

export const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorSelector: (item) => `.error-${item.name}`,
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorBorderClass: 'popup__input_error',
  errorTextClass: 'popup__input-span',
};

export const userConfig = {
  userNameSelector: '.user__name',
  userProfileSelector: '.user__profile',
  userAvatarSelector: '.user__image',
}

export const cardsSelector = '.cards'
