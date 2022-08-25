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
  userConfig,
  cardsSelector
} from '../utils/constants.js';

import { renderLoading, startButtonState } from '../utils/utils.js';

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

const userInfo = new UserInfo({
  userNameSelector: userConfig.userNameSelector,
  userProfileSelector: userConfig.userProfileSelector,
  userAvatarSelector: userConfig.userAvatarSelector,
});

const newCard = function createNewCard(data) {
  const card = new Card(data, {
    handleCardClick: () => {
      imageViewPopup.open(data);
    },
    cardTemplateSelector: '.template-card',
    userId: userId,
    addLike: (data) => {
      return api.addCardLike(data).catch((err) => console.log(err));
    },
    deleteLike: (data) => {
      return api.deleteCardLike(data).catch((err) => console.log(err));
    },
    deleteCard: deleteCard,
  });

  return card;
};

const cardsList = new Section(
  {
    renderer: (card) => {
      addCardToDOM(newCard(card));
    },
  },
  cardsSelector
);

const popupAddCard = new PopupWithForm(newPlacePopup, {
  handleFormSubmit: (formData, btn) => {
    renderLoading(formData, btn);
    api
      .addNewCard(formData)
      .then((res) => {
        addCardToDOM(newCard(res));
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => startButtonState(btn));
  },
});

const popupEditProfile = new PopupWithForm(editPopup, {
  handleFormSubmit: (formData, btn) => {
    renderLoading(formData, btn);
    api
      .editUserInfo(formData)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => startButtonState(btn));
  },
});

const userAvatarPopup = new PopupWithForm(newAvatarPopup, {
  handleFormSubmit: (formData, btn) => {
    renderLoading(formData, btn);
    api
      .editUserAvatar(formData)
      .then((res) => {
        userInfo.setUserAvatar(res);
        userAvatarPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => startButtonState(btn));
  },
});

const popupConfirm = new PopupConformation(deleteCardPopup, {
  handleFormSubmit: (data) => {
    api
      .deleteCard(data.cardId)
      .then(() => {
        data.card.remove();
        data = null;
      })
      .catch((err) => console.log(err));
  },
});

const imageViewPopup = new PopupWithImage(imageZoomPopup);

const validatorEditProfile = new FormValidator(formsConfig, popupEditForm);
const validatorAddCard = new FormValidator(formsConfig, popupAddNewPlaceForm);
const validatorEditAvatar = new FormValidator(
  formsConfig,
  popupEditUserAvatarForm
);

let userId;

function addCardToDOM(card) {
  const cardElement = card.createCard();
  cardsList.addCardToContainer(cardElement);
}

function deleteCard(data) {
  popupConfirm.data = data;
  popupConfirm.open();
}

Promise.all(initialData)
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;
    cardsList.renderCards(cards.reverse());
  })
  .catch((err) => console.log(err));

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();

imageViewPopup.setEventListeners();

popupEditBtn.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  userNameInput.value = data.user;
  userProfileInput.value = data.profile;
  validatorEditProfile.resetError();
  popupEditProfile.open();
});

popupAddBtn.addEventListener('click', () => {
  validatorAddCard.resetError();
  popupAddCard.open();
});

popupAvatarEditButtn.addEventListener('click', () => {
  validatorEditAvatar.resetError();
  userAvatarPopup.open();
});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
userAvatarPopup.setEventListeners();
popupConfirm.setEventListeners();
