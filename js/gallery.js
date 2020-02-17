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
  var photosArray = window.data.addNewPhoto(window.data.names, window.data.messages, window.data.descriptions, window.data.photos);
  var photoTemplate = document.querySelector('#picture').content;
  var photoList = document.querySelector('.pictures');
  var socialComments = document.querySelector('.social__comments');


  var fragment = document.createDocumentFragment();
  for (var t = 0; t < photosArray.length; t++) {
    fragment.appendChild(renderPhoto(photosArray[t], photoTemplate, t));
  }

  photoList.appendChild(fragment);

  var firstPhoto = window.data.photos[0];
  bigPictureTagImg.src = firstPhoto.url;
  likesCount.textContent = firstPhoto.likes;
  commentsCount.textContent = firstPhoto.comments.length;
  socialCaption.textContent = firstPhoto.description;

  // В задании поросят отрисовать cписок комментариев под фотографией
  // В верстке есть два li. Кол-во комментариев до 10, задаётся в функции addNewComment
  // Решил сделать логику:
  // Если комментарий один, то меняю знавчения в первом li, а во втором останутся дефолтные.
  // Если комментариев больше одного, то меняю описание обоих li на первые два
  if (firstPhoto.comments.length === 1) {
    socialComments.querySelector('.social__picture').src = firstPhoto.comments[0].avatar;
    socialComments.querySelector('.social__picture').alt = firstPhoto.comments[0].name;
    socialComments.querySelector('.social__text').textContent = firstPhoto.comments[0].message;
  } else {
    for (var n = 0; n < 2; n++) {

      var firstComment = socialComments.querySelectorAll('li')[0]; // выбираю первый li
      var secondComment = socialComments.querySelectorAll('li')[1]; // выбираю второй li

      firstComment.querySelector('.social__picture').src = firstPhoto.comments[0].avatar;
      firstComment.querySelector('.social__picture').alt = firstPhoto.comments[0].name;
      firstComment.querySelector('.social__text').textContent = firstPhoto.comments[0].message;

      secondComment.querySelector('.social__picture').src = firstPhoto.comments[1].avatar;
      secondComment.querySelector('.social__picture').alt = firstPhoto.comments[1].name;
      secondComment.querySelector('.social__text').textContent = firstPhoto.comments[1].message;
    }
  }
})();
