//импорт CSS
import './index.css'

//импорт переменных
import Section from '../scripts/components/Section.js';
import {
  initialCards,
  cardsContainer,
  editPopup,
  newPlacePopup,
  popupEditBtn,
  popupAddBtn,
  imageZoomPopup,
  popupAddNewPlaceForm,
  popupEditForm,
  userName,
  userProfile,
  formsConfig,
} from '../scripts/utils/constants.js';

//импорт модулей
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

//создание экземпляров классов
const editUserInfo = new Popup(editPopup);
const userInfo = new UserInfo({
  userNameSelector: userName,
  userProfileSelector: userProfile,
});
const newPlaceCard = new Popup(newPlacePopup);
const addNewPlaceForm = new PopupWithForm(newPlacePopup, {
  handleFormSubmit: (formData) => {
    const newCard = new Card(formData, {
      handleCardClick: () => {
        const popupOpenCard = new PopupWithImage(imageZoomPopup, formData);
        popupOpenCard.open();
        popupOpenCard.setEventListeners();
      },
      cardTemplateSelector: '.template-card',
    });
    const cardElement = newCard.createCard();
    cardsList.addCardToContainer(cardElement);
  },
});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      const newCard = new Card(card, {
        handleCardClick: () => {
          const popup = new PopupWithImage(imageZoomPopup, card);
          popup.open();
          popup.setEventListeners();
        },
        cardTemplateSelector: '.template-card',
      });
      const cardElement = newCard.createCard();
      cardsList.addCardToContainer(cardElement);
    },
  },
  cardsContainer
);

const isPopupEditFormValid = new FormValidator(formsConfig, popupEditForm);
const isPopupAddNewPlaceFormValid = new FormValidator(
  formsConfig,
  popupAddNewPlaceForm
);

//слушатели событий
popupEditBtn.addEventListener('click', () => {
  userInfo.getUserInfo();
  isPopupEditFormValid.resetError();
  editUserInfo.open();
});

popupEditForm.addEventListener('submit', (evt) => {
  userInfo.setUserInfo(evt);
  editUserInfo.close();
});

popupAddBtn.addEventListener('click', () => {
  isPopupAddNewPlaceFormValid.resetError();
  newPlaceCard.open();
});

//вызов функций установки слушателей для экземпляров классов
editUserInfo.setEventListeners();
newPlaceCard.setEventListeners();
addNewPlaceForm.setEventListeners();

//вызовы функции включения валидации в формах
isPopupEditFormValid.enableValidation();
isPopupAddNewPlaceFormValid.enableValidation();

//вызов функции открисовки карточек
cardsList.renderCards();
