  //импорт статичных переменных
import { cardBigImage, cardImageCaption } from './variablesAndFunctions.js';

class Card {
  //конструктор карточки
  constructor(data, cardTemplateSelector, openPopup) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._card = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__name');
    this._cardLikeBtn = this._card.querySelector('.card__like-button');
    this._cardTrashBtn = this._card.querySelector('.card__trash-button');
    this._cardName = data.name;
    this._cardLink = data.link;
    this._openPopup = openPopup;
  }

  //функция, возвращающая карточку для дальнейшей работы
  _getTemplateCard() {
    return this._card;
  }

  //функция создания новой карточки
  createCard() {
    this._card = this._getTemplateCard();
    this._setEventListener();

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;

    return this._card;
  }

  //функция переключения состояния кнопки лайка
  _handlerLikeButton() {
    this._cardLikeBtn.classList.toggle('card__like-button_active');
  }
  // функция удаления карточки по клику на кнопку "Корзина"
  _deleteCardByButton() {
    this._card.remove();
    this._card = null;
  }

  //установка слушателей события на кнопки "Лайк", "Корзина" и фото картчки
  _setEventListener() {
    this._cardLikeBtn.addEventListener('click', () => {
      this._handlerLikeButton();
    });

    this._cardTrashBtn.addEventListener('click', () => {
        this._deleteCardByButton();
      });

    this._cardImage.addEventListener('click', () => {
      cardBigImage.src = this._cardLink;
      cardBigImage.alt = this._cardName;
      cardImageCaption.textContent = this._cardName;
      this._openPopup();
    });
  }
}

// экспорт класса Card
export { Card };
