//импорт CSS
import './index.css'

//импорт переменных
import Section from '../components/Section.js';
import {
  initialCards,
  editPopup,
  newPlacePopup,
  popupEditBtn,
  popupAddBtn,
  imageZoomPopup,
  popupAddNewPlaceForm,
  popupEditForm,
  formsConfig,
  userNameInput,
  userProfileInput
} from '../utils/constants.js';

//импорт модулей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({
  userNameSelector: '.user__name',
  userProfileSelector: '.user__profile',
});

const editUserInfoPopup = new PopupWithForm(editPopup, {
  handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData)
}
});

const addNewPlacePopup = new PopupWithForm(newPlacePopup, {
    handleFormSubmit: (formData) => {
      createNewCard(formData)
    },
  });

  const imageViewPopup = new PopupWithImage(imageZoomPopup);

  function createNewCard(data) {
    const newCard = new Card(data, {
      handleCardClick: () => {
        imageViewPopup.open(data)
        imageViewPopup.setEventListeners();
      },
      cardTemplateSelector: '.template-card',
    });
    const cardElement = newCard.createCard();
    cardsList.addCardToContainer(cardElement);
  }


  const cardsList = new Section(
      {
        items: initialCards,
        renderer: (card) => {
          createNewCard(card)
        },
      },
      '.cards'
    );

    //вызов функции открисовки карточек
cardsList.renderCards();


const isPopupEditFormValid = new FormValidator(formsConfig, popupEditForm);
const isPopupAddNewPlaceFormValid = new FormValidator(
  formsConfig,
  popupAddNewPlaceForm
);

//слушатели событий
popupEditBtn.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  userNameInput.value = data.user;
  userProfileInput.value = data.profile;
  isPopupEditFormValid.resetError();
  editUserInfoPopup.open();
});

popupAddBtn.addEventListener('click', () => {
  isPopupAddNewPlaceFormValid.resetError();
  addNewPlacePopup.open();
});

//вызов функций установки слушателей для экземпляров классов
editUserInfoPopup.setEventListeners();
addNewPlacePopup.setEventListeners();

//вызовы функции включения валидации в формах
isPopupEditFormValid.enableValidation();
isPopupAddNewPlaceFormValid.enableValidation();


