const popup = document.querySelector('.popup'); //получаем доступ к блоку '.popup'
const editButton = document.querySelector('.user__edit-button'); //получаем доступ к кнопке редактирования профиля
const popupCloseButton = document.querySelector('.popup__close-button'); //получаем доступ к кнопке закрытия попапа

const popupForm = document.querySelector('.popup__form');//получаем доступ к форме попапа

const userName = document.querySelector('.user__name'); //получаем доступ к элементу с именем пользователя
const userProfile = document.querySelector('.user__profile'); //получаем доступ к элементу с профием пользователя
const popupUserName = document.querySelector('#popup__user-name'); //получаем доступ к полю с именем пользователя
const popupUserProfile =document.querySelector('#popup__user-profile'); //получаем доступ к полю профиля пользователя в попапе

function togglePopup() {
  popup.classList.toggle('popup_opened');
} //функция вызова попапа

function submitInputValueToPopupForm() {
  popupUserName.value = userName.textContent;
  popupUserProfile.value = userProfile.textContent;
  togglePopup();
}//функция передачи значений из профиля текстовым полям (открывает попап)


function submitUserDataToServer(evt) {
  evt.preventDefault();
  userName.textContent = popupUserName.value;
  userProfile.textContent = popupUserProfile.value;
  togglePopup();
} //функция редактирования и отправки данных пользователя на сервер (закрывает попап)

function closePopupByOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    togglePopup();
 }
 }//функция закрытия попапа по клику на оверлей

editButton.addEventListener('click', submitInputValueToPopupForm);//"навешиваем" обрабочик событий по клику на кнопку редактирования профиля (открывает попап)
popupCloseButton.addEventListener('click', togglePopup);//"навешиваем" обрабочик событий по клику на кнопку закрытия попапа (закрывает попап)
popupForm.addEventListener('submit', submitUserDataToServer);//"навешиваем" обрабочик событий на форму, сохраняющий и отправляющий данные пользователя
popup.addEventListener('click', closePopupByOverlay);//"навешиваем" обрабочик событий по клику на попап, закрывающий попап по щелчку на оверлей (закрывает попап)
