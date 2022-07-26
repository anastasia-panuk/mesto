//набор переменных
const editPopup = document.querySelector(".popup_edit");
const newPlacePopup = document.querySelector(".popup_add-new-place");
const imageZoomPopup = document.querySelector(".popup_photo-view");

const popupEditBtn = document.querySelector(".user__edit-button");
const popupAddBtn = document.querySelector(".user__add-button");

const popupEditForm = document.querySelector(".edit-popup-form");
const popupAddNewPlaceForm = document.querySelector(".new-place-popup-form");

const userName = document.querySelector(".user__name");
const userProfile = document.querySelector(".user__profile");
const popupUserName = document.querySelector("#popup__user-name");
const popupUserProfile = document.querySelector("#popup__user-profile");

const popupPlaceName = document.querySelector("#popup__place-name");
const popupPlaceLink = document.querySelector("#popup__place-link");

const cardsContainer = document.querySelector(".cards");

const newPlaceSubmitButton = popupAddNewPlaceForm.querySelector(
  ".popup__submit-button"
);
const popupAddNewPlaceFormInputs = Array.from(
  popupAddNewPlaceForm.querySelectorAll(".popup__input")
);

//импорт модулей с массивом карточек и классом карточек
import { Card } from "./Card.js";
import { initialCards } from "./cardsArray.js";

//функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

//слушатели событий для открытия и закрытия попапов
popupEditBtn.addEventListener("click", () => {
  isPopupEditFormValid._resetError(); //вызов функции валидации при открытии попапа из модуля FormValidator.js
  openPopup(editPopup);
});

popupAddBtn.addEventListener("click", () => {
  isPopupAddNewPlaceFormValid._resetError(); //вызов функции валидации при открытии попапа из модуля FormValidator.js
  openPopup(newPlacePopup);
});

//набор ПКЗ карточек
const cardsConfig = {
  cardImageSelector: ".card__image",
  cardNameSelector: ".card__name",
  trashButtonSelector: ".card__trash-button",
  likeButtonSelector: ".card__like-button",
  imageZoomPopupSelector: ".popup_photo-view",
  cardBigImageSelector: ".popup__image",
  cardImageCaptionSelector: ".popup__figcaption",
};

//создание нового экземпляра класса Card
const newCard = new Card(cardsConfig, ".template-card", openPopup);

//функция отрисовки карточки
function renderCard(card) {
  const cardElement = newCard.createCard(card);
  cardsContainer.prepend(cardElement);
}

//функция обхода массива с данными карточек (отрисовывает набор карточек на странице)
initialCards.forEach((card) => {
  renderCard(card);
});

//функция добавления новой пользователем новой карточки через форму добавления
function renderNewCard(evt) {
  evt.preventDefault();
  const card = {};
  card.name = popupPlaceName.value;
  card.link = popupPlaceLink.value;
  renderCard(card);
  closePopup(newPlacePopup);
  popupAddNewPlaceForm.reset();
  isPopupEditFormValid._toggleSubmitButton(
    popupAddNewPlaceFormInputs,
    newPlaceSubmitButton
  );
}

//слушатель сабмита, добавляющего новую карточку
popupAddNewPlaceForm.addEventListener("submit", renderNewCard);

//слушатели событий для закрытия попапов
const closeEditPopupButton = editPopup.querySelector(".popup__close-button");
closeEditPopupButton.addEventListener("click", () => {
  closePopup(editPopup);
});

const closeNewPlacePopupButton = newPlacePopup.querySelector(
  ".popup__close-button"
);
closeNewPlacePopupButton.addEventListener("click", () => {
  closePopup(newPlacePopup);
});

const closeImageZoomPopupButton = imageZoomPopup.querySelector(
  ".popup__close-button"
);
closeImageZoomPopupButton.addEventListener("click", () => {
  closePopup(imageZoomPopup);
});

// функция закрытия попапа по клику на оверлей
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup")) closePopup(evt.target);
}

// слушатели событий закрытия попапов по клику на оверлей
editPopup.addEventListener("mousedown", closePopupByOverlay);
newPlacePopup.addEventListener("mousedown", closePopupByOverlay);
imageZoomPopup.addEventListener("mousedown", closePopupByOverlay);

//функция закрытия попапов по Esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//слушатель событий (передает данные пользователя на HTML страницу при открытии попапа с данными пользователя)
popupEditBtn.addEventListener("click", function submitInputValueToPopupForm() {
  popupUserName.value = userName.textContent;
  popupUserProfile.value = userProfile.textContent;
  isPopupEditFormValid._openedPopupValidation();
  openPopup(editPopup);
});

//функция передачи данных пользоваеля для последующей отправки
function submitUserDataToServer(evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userProfile.textContent = popupUserProfile.value;
  closePopup(editPopup);
}

//функция отправки полученных данных пользователя
popupEditForm.addEventListener("submit", submitUserDataToServer);

// набор ПКЗ для работы с формами
const formsConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inputErrorSelector: (item) => `.error-${item.name}`,
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorBorderClass: "popup__input_error",
  errorTextClass: "popup__input-span",
};

// импорт модуля FormValidator
import { FormValidator } from "./FormValidator.js";

//создание новых экземпляров класса FormValidator
const isPopupEditFormValid = new FormValidator(formsConfig, popupEditForm);
const isPopupAddNewPlaceFormValid = new FormValidator(
  formsConfig,
  popupAddNewPlaceForm
);

//функции включения валидации в формах
isPopupEditFormValid.enableValidation();
isPopupAddNewPlaceFormValid.enableValidation();
