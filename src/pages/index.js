import './index.css';

import Section from '../components/Section.js';
import {
  editPopup,
  newPlacePopup,
  newAvatarPopup,
  deleteCardPopup,
  popupAvatarEditButtn,
  popupEditBtn,
  popupAddBtn,
  imageZoomPopup,
  popupAddNewPlaceForm,
  popupEditForm,
  popupEditUserAvatarForm,
  formsConfig,
  userNameInput,
  userProfileInput,
} from '../utils/constants.js';

import { setSpinner,
         removeSpinner
} from '../utils/utils.js'

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConformation from '../components/PopupConformation.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  token: '628877ed-b851-464f-b36a-d22d6951fc4a',
});

const initialData = [api.getUserInfoFromServer(), api.getCardsFromServer()];

function deleteCard(data) {
  deleteCardPopupСonfirmation.data = data;
  deleteCardPopupСonfirmation.open();
}

const userInfo = new UserInfo({
  userNameSelector: '.user__name',
  userProfileSelector: '.user__profile',
  userAvatarSelector: '.user__image',
});

const editUserInfoPopup = new PopupWithForm(editPopup, {
  handleFormSubmit: (formData, btn) => {
    setSpinner(btn);
    api
      .editUserInfo(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => console.log(err))
      .finally(() => removeSpinner(btn))
  },
});

const userAvatarPopup = new PopupWithForm(newAvatarPopup, {
  handleFormSubmit: (formData, btn) => {
    setSpinner(btn);
    api
      .editUserAvatar(formData)
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch((err) => console.log(err))
      .finally(() => removeSpinner(btn))
  },
});

const deleteCardPopupСonfirmation = new PopupConformation(deleteCardPopup, {
  handleFormSubmit: (data) => {
    api
      .deleteCard(data.cardId)
      .then(() => {
        data.card.remove();
        data = null;
      })
      .catch((err) => console.log(err))
  },
});

const addNewPlacePopup = new PopupWithForm(newPlacePopup, {
  handleFormSubmit: (formData, btn) => {
    setSpinner(btn);
    api
      .addNewCard(formData)
      .then((res) => {
        createNewCard(res);
      })
      .catch((err) => console.log(err))
      .finally(() => removeSpinner(btn))
  },
});

const imageViewPopup = new PopupWithImage(imageZoomPopup);

function createNewCard(data) {
  const newCard = new Card(data, {
    handleCardClick: () => {
      imageViewPopup.open(data);
      imageViewPopup.setEventListeners();
    },
    cardTemplateSelector: '.template-card',
    userId: userId,
    addLike: (data) => {
      return api.addCardLike(data);
    },
    deleteLike: (data) => {
      return api.deleteCardLike(data);
    },
    deleteCard: deleteCard,
  });
  const cardElement = newCard.createCard();
  cardsList.addCardToContainer(cardElement);
}

const cardsList = new Section(
  {
    renderer: (card) => {
      createNewCard(card);
    },
  },
  '.cards'
);

const isPopupEditFormValid = new FormValidator(formsConfig, popupEditForm);
const isPopupAddNewPlaceFormValid = new FormValidator(
  formsConfig,
  popupAddNewPlaceForm
);
const isPopupEditUserAvatarFormValid = new FormValidator(
  formsConfig,
  popupEditUserAvatarForm
);

popupEditBtn.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  userNameInput.value = data.user;
  userProfileInput.value = data.profile;
  isPopupEditFormValid.resetError();
  editUserInfoPopup.open();
});

popupAddBtn.addEventListener('click', () => {
  isPopupAddNewPlaceFormValid.resetError();
  addNewPlacePopup.open();
});

popupAvatarEditButtn.addEventListener('click', () => {
  isPopupEditUserAvatarFormValid.resetError();
  userAvatarPopup.open();
});

editUserInfoPopup.setEventListeners();
addNewPlacePopup.setEventListeners();
userAvatarPopup.setEventListeners();
deleteCardPopupСonfirmation.setEventListeners();

isPopupEditFormValid.enableValidation();
isPopupAddNewPlaceFormValid.enableValidation();
isPopupEditUserAvatarFormValid.enableValidation();

let userId;

Promise.all(initialData)
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;
    cardsList.renderCards(cards.reverse());
  })
  .catch((err) => console.log(err));
