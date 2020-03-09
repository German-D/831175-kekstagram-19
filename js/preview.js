'use strict';
(function () {
  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Клик по контейнеру c фотографиями
  var bigPicture = document.querySelector('.big-picture');

  var getBigImg = function (smallPicture, element) {
    element.querySelector('img').src = smallPicture.url;
    element.querySelector('.likes-count').textContent = smallPicture.likes;
    element.querySelector('.social__caption').textContent = smallPicture.description;
    element.querySelectorAll('.social__text')[0].textContent = smallPicture.comments[0].message;
    element.querySelectorAll('.social__picture')[0].src = smallPicture.comments[0].avatar;

    if (smallPicture.comments.length > 1) {
      element.querySelectorAll('.social__text')[1].textContent = smallPicture.comments[1].message;
      element.querySelectorAll('.social__picture')[1].src = smallPicture.comments[1].avatar;
    }
    element.classList.remove('hidden');
  };

  // Обрабатываю клик мышки и ентера на маленькой фотографии
  var picturesClickHandler = function (evt) {
    var domPicture = evt.target.closest('.picture');

    if (!domPicture) {
      return;
    }

    var pictureImg = domPicture.querySelector('.picture__img');
    var pictureId = pictureImg.dataset.id;
    var photoInfo = window.data.photos[pictureId];
    getBigImg(photoInfo, bigPicture);
  };

  var pictures = document.querySelector('.pictures');

  pictures.addEventListener('click', picturesClickHandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Закрытие большого фото
  var socialFooterText = document.querySelector('.social__footer-text');

  var bigPictureCancelClickHandler = function () {

    bigPicture.classList.add('hidden');
    socialFooterText.value = '';
  };

  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  bigPictureCancel.addEventListener('click', bigPictureCancelClickHandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Не закрываю форму по Enter
  var socialFooterTextKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  };

  socialFooterText.addEventListener('keydown', socialFooterTextKeydownHandler);


  window.preview = {
    bigPictureCancelClickHandler: bigPictureCancelClickHandler,
    picturesClickHandler: picturesClickHandler,
  };

})();
