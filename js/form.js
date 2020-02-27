'use strict';

(function () {
  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Показываю форму обработки фото при загрузке изображения
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');

  var uploadFileChangeHandler = function () {
    imgUploadOverlay.classList.remove('hidden');
  };

  uploadFile.addEventListener('change', uploadFileChangeHandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Закрытие формы эффектов фото по крестику
  var imgUploadCancel = document.querySelector('.img-upload__cancel');

  var imgUploadCancelClickHandler = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
  };

  var documentKeydownHandler = function (evt) {
    if (evt.key === 'Escape') {
      imgUploadCancelClickHandler();
      window.preview.bigPictureCancelClickHandler();
    }
    if (evt.key === 'Enter') {
      window.preview.picturesClickHandler(evt);
    }
  };

  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
  document.addEventListener('keydown', documentKeydownHandler); // Закрытие формы по Esc

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Не закрываю форму нового изображения по Esc на инпуте хэштегов
  var textHashtags = document.querySelector('.text__hashtags');

  var textHashtagsKeydownhandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
    }
  };

  textHashtags.addEventListener('keydown', textHashtagsKeydownhandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Обнуляю значение прогресса пина
  var calculatePinProgress = function () {
    var effectLevelLine = document.querySelector('.effect-level__line');


    var coordinateLineX = effectLevelLine.getBoundingClientRect().x;
    var coordinatePinX = effectLevelPin.getBoundingClientRect().x;
    var lineLength = effectLevelLine.clientWidth;
    var pinProgress = Math.round(100 * (coordinatePinX - coordinateLineX) / lineLength);
    return pinProgress;
  };

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ */
  var effectsList = document.querySelector('.effects__list');
  var effectsListClickHandler = function (evt) {
    if (evt.target.tagName !== 'LABEL') {
      calculatePinProgress();
    }
  };

  effectsList.addEventListener('click', effectsListClickHandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Определяю прогресс пина
  var effectLevelPin = document.querySelector('.effect-level__pin');

  var effectLevelPinMouseupHandler = function () {
    calculatePinProgress();
  };

  effectLevelPin.addEventListener('mouseup', effectLevelPinMouseupHandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Валидация инпута ввода хэштегов
  var textHashtagsInputhandler = function () {
    var hashtagsValue = textHashtags.value;
    var hashtagsArray = hashtagsValue.split(/\s+/);
    var RegExpHashtags = /^#[a-zA-Z0-9а-яА-Я]{1,19}$/i;

    var getUniqueArray = function (array) { // создаю массив только с уникальными значениями
      var uniqueArray = [];
      for (var y = 0; y < array.length; y++) {
        var arrayLowCase = array[y].toLowerCase();
        if (!uniqueArray.includes(arrayLowCase)) {
          uniqueArray.push(arrayLowCase);
        }
      }
      return uniqueArray;
    };

    var uniqueHashtagsArray = getUniqueArray(hashtagsArray);

    for (var r = 0; r < hashtagsArray.length; r++) {
      if (!RegExpHashtags.test(hashtagsArray[r])) { // Проверка на регулярку
        textHashtags.setCustomValidity('Хэштег начинается с #, не содержит спецсимволы и не может состоять из #');
        return;
      }

      if (hashtagsArray.length > 5) { // Максимум 5 хэштегов
        textHashtags.setCustomValidity('Нельзя указывать больше 5 хэштегов');
        return;
      }

      if (hashtagsArray.length > uniqueHashtagsArray.length) { // Один и тот же хэштег не модет быть использолван дважды
        textHashtags.setCustomValidity('Нельзя указать одинаковые хэштеги');
        return;
      }
      textHashtags.setCustomValidity('');
    }
  };

  textHashtags.addEventListener('input', textHashtagsInputhandler);
})();
