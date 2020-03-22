'use strict';

(function () {


  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Отрисовываю все фотографии в доме
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var socialCaption = document.querySelector('.social__caption');

  socialCommentCount.classList.add('hidden'); // Прячу блоки счётчика комментариев
  commentsLoader.classList.add('hidden'); // и загрузки новых комментариев

  function renderPhoto(photosElement, templateElement, k) {
    var photoElement = templateElement.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photosElement.url;
    photoElement.querySelector('.picture__likes').textContent = photosElement.likes;
    photoElement.querySelector('.picture__comments').textContent = photosElement.comments.length;
    photoElement.querySelector('.picture__img').dataset.id = k;

    return photoElement;
  }

  var bigPictureTagImg = document.querySelector('.big-picture__img img');
  // var photosArray = window.data.addNewPhoto(window.data.names, window.data.messages, window.data.descriptions, window.data.photos);
  var photoTemplate = document.querySelector('#picture').content;
  var photoList = document.querySelector('.pictures');
  var socialComments = document.querySelector('.social__comments');

  window.load(function (photoArray) {
    var fragment = document.createDocumentFragment();
    for (var t = 0; t < photoArray.length; t++) {
      fragment.appendChild(renderPhoto(photoArray[t], photoTemplate, t));
    }

    photoList.appendChild(fragment);
  });

  var firstPhoto = window.data.photos[0];
  bigPictureTagImg.src = firstPhoto.url;
  likesCount.textContent = firstPhoto.likes;
  commentsCount.textContent = firstPhoto.comments.length;
  socialCaption.textContent = firstPhoto.description;

  // В задании поросят отрисовать список комментариев под фотографией
  // В верстке есть два li. Кол-во комментариев до 10, задаётся в функции addNewComment
  var iterations = Math.min(2, firstPhoto.comments.length);
  var elementLi = socialComments.querySelectorAll('li');

  for (var n = 0; n < iterations; n++) {
    elementLi[n].querySelector('.social__picture').src = firstPhoto.comments[n].avatar;
    elementLi[n].querySelector('.social__picture').alt = firstPhoto.comments[n].name;
    elementLi[n].querySelector('.social__text').textContent = firstPhoto.comments[n].message;
  }
})();
