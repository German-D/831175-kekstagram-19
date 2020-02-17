'use strict';
(function () {
  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Клик по контейнеру c фотографиями
  var bigPicture = document.querySelector('.big-picture');
  var picturesClickHandler = function (evt) {
    var getBigImg = function (smallPicture) {
      bigPicture.querySelector('img').src = smallPicture.url;
      bigPicture.querySelector('.likes-count').textContent = smallPicture.likes;
      bigPicture.querySelector('.social__caption').textContent = smallPicture.description;
      bigPicture.querySelectorAll('.social__text')[0].textContent = smallPicture.comments[0].message;
      bigPicture.querySelectorAll('.social__picture')[0].src = smallPicture.comments[0].avatar;

      if (smallPicture.comments.length > 1) {
        bigPicture.querySelectorAll('.social__text')[1].textContent = smallPicture.comments[1].message;
        bigPicture.querySelectorAll('.social__picture')[1].src = smallPicture.comments[1].avatar;
      }
      bigPicture.classList.remove('hidden');
    };

    // Если клик был клавишой Ентер
    if (evt.target.classList.contains('picture')) {
      var photoInfo1 = window.data.photos[evt.target.querySelector('.picture__img').dataset.id];
      getBigImg(photoInfo1);
      return;
    }

    // Если клик был мышкой
    if (evt.target.classList.contains('picture__img')) {
      var photoInfo = window.data.photos[evt.target.dataset.id];
      getBigImg(photoInfo);
    }
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
  // Валидация комментария
  var socialFooterTextInputHandler = function (evt) {
    var socialFooterTextValue = evt.target.value;
    if (socialFooterTextValue.length > 140) {
      socialFooterText.setCustomValidity('Длина комментария не должна привышать 140 символов');
      return;
    }
    socialFooterText.setCustomValidity('');
  };

  socialFooterText.addEventListener('input', socialFooterTextInputHandler);

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
    picturesClickHandler: picturesClickHandler
  };

})();
