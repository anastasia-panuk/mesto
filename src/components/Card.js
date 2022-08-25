export default class Card {
  constructor(data, { handleCardClick, cardTemplateSelector, userId, addLike, deleteLike, deleteCard }) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._card = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__name');
    this._cardLikeBtn = this._card.querySelector('.card__like-button');
    this._cardTrashBtn = this._card.querySelector('.card__trash-button');
    this._cardLikesCounter = this._card.querySelector('.card__like-counter');
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardLike = data.likes;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._deleteCard = deleteCard;
  }

  createCard() {
    this._setEventListener();
    this._isCardCreatedByUser();

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;
    this._cardLikesCounter.textContent = this._cardLike.length;

    this._isCardLikedByUser()
    return this._card;
  }

  _handlerLikeButton() {
    if(!this._cardLikeBtn.classList.contains('card__like-button_active')) {
      this._addLike(this._cardId)
      .then((res) => {
        this._cardLikeBtn.classList.add('card__like-button_active');
        this._cardLikesCounter.textContent = res.likes.length;
       })
       .catch((err) => console.log(err))
    } else{
      this._deleteLike(this._cardId)
      .then((res) => {
        this._cardLikeBtn.classList.remove('card__like-button_active');
        this._cardLikesCounter.textContent = res.likes.length;
       })
       .catch((err) => console.log(err))
    }
  }

  _isCardLikedByUser() {
    if(this._cardLike.some(el => el._id === this._userId)) {
      this._cardLikeBtn.classList.add('card__like-button_active');
    }
  }

  _isCardCreatedByUser() {
    if(this._cardOwnerId !== this._userId) {
      this._cardTrashBtn.remove()
    }
  }

  _deleteCardByButton() {
    const data = {
      card: this._card,
      cardId: this._cardId
    }
    this._deleteCard(data);
  }

  _setEventListener() {
    this._cardLikeBtn.addEventListener('click', () => {
      this._handlerLikeButton();
    });

    this._cardTrashBtn.addEventListener('click', () => {
      this._deleteCardByButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
