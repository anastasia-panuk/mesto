export const editPopup = document.querySelector('.popup_edit');
export const newPlacePopup = document.querySelector('.popup_add-new-place');

export const popupEditBtn = document.querySelector('.user__edit-button');
export const popupAddBtn = document.querySelector('.user__add-button');
export const imageZoomPopup = document.querySelector('.popup_photo-view');

export const userNameInput = document.querySelector('#user');
export const userProfileInput = document.querySelector('#profile')

export const popupAddNewPlaceForm = document.querySelector(
  '.new-place-popup-form'
);
export const popupEditForm = document.querySelector('.edit-popup-form');

export const cardBigImage = document.querySelector('.popup__image');
export const cardImageCaption = document.querySelector('.popup__figcaption');

export const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorSelector: (item) => `.error-${item.name}`,
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorBorderClass: 'popup__input_error',
  errorTextClass: 'popup__input-span',
};
