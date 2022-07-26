class Card {
  //конструктор карточки
  constructor(config, cardTemplateSelector, openPopup) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._config = config;
    this._openPopup = () => {
      openPopup(document.querySelector(this._config.imageZoomPopupSelector));
    };
  }

  //функция, возвращающая карточку для дальнейшей работы
  _getTemplateCard() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  //функция создания новой карточки
  createCard(card) {
    this._card = this._getTemplateCard();

    this._card.querySelector(this._config.cardImageSelector).src = card.link;
    this._card.querySelector(this._config.cardImageSelector).alt = card.name;
    this._card.querySelector(this._config.cardNameSelector).textContent =
      card.name;

    this._setEventListener();

    return this._card;
  }

  //функция переключения состояния кнопки лайка
  _handlerLikeButton(btn) {
    btn.classList.toggle("card__like-button_active");
  }
  // функция удаления карточки по клику на кнопку "Корзина"
  _deleteCardByButton(card) {
    card.remove();
  }

  //установка слушателей события на кнопки "Лайк", "Корзина" и фото картчки
  _setEventListener() {
    const card = this._card;
    const likeBtn = this._card.querySelector(this._config.likeButtonSelector);
    const trashButton = this._card.querySelector(
      this._config.trashButtonSelector
    );
    const cardImage = this._card.querySelector(this._config.cardImageSelector);

    likeBtn.addEventListener("click", () => {
      this._handlerLikeButton(likeBtn);
    });

    trashButton.addEventListener("click", () => {
      this._deleteCardByButton(card);
    });

    cardImage.addEventListener("click", () => {
      document.querySelector(this._config.cardBigImageSelector).src =
        this._card.querySelector(this._config.cardImageSelector).src;
      document.querySelector(this._config.cardImageCaptionSelector).alt =
        this._card.querySelector(this._config.cardImageSelector).alt;
      document.querySelector(
        this._config.cardImageCaptionSelector
      ).textContent = this._card.querySelector(
        this._config.cardNameSelector
      ).textContent;
      this._openPopup();
    });
  }
}

// экспорт класса Card
export { Card };
