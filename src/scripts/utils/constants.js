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

export const cardsContainer = document.querySelector('.cards');

export const editPopup = document.querySelector('.popup_edit');
export const newPlacePopup = document.querySelector('.popup_add-new-place');

export const popupEditBtn = document.querySelector('.user__edit-button');
export const popupAddBtn = document.querySelector('.user__add-button');
export const imageZoomPopup = document.querySelector('.popup_photo-view');

export const popupPlaceName = document.querySelector('#popup__place-name');
export const popupPlaceLink = document.querySelector('#popup__place-link');

export const popupAddNewPlaceForm = document.querySelector(
  '.new-place-popup-form'
);
export const popupEditForm = document.querySelector('.edit-popup-form');

export const cardBigImage = document.querySelector('.popup__image');
export const cardImageCaption = document.querySelector('.popup__figcaption');

export const userName = document.querySelector('.user__name');
export const userProfile = document.querySelector('.user__profile');

export const formsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inputErrorSelector: (item) => `.error-${item.name}`,
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorBorderClass: 'popup__input_error',
  errorTextClass: 'popup__input-span',
};
