export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const editPopup = document.querySelector('.popup_type_profile');
export const newPlacePopup = document.querySelector('.popup_type_card-add');

export const popupEditBtn = document.querySelector('.user__edit-button');
export const popupAddBtn = document.querySelector('.user__add-button');
export const imageZoomPopup = document.querySelector('.popup_type_picture');

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
