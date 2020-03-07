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
  // Вычисляю значение прогресса пина
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var calculatePinProgress = function () {

    var coordinateLineX = effectLevelLine.getBoundingClientRect().x;
    var coordinatePinX = effectLevelPin.getBoundingClientRect().x;
    var lineLength = effectLevelLine.clientWidth;
    var pinProgress = Math.round(100 * (coordinatePinX - coordinateLineX) / lineLength);
    // console.log(pinProgress);
    return pinProgress;
  };

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Меняю эффект большой картинки в зависимости от класса при передвижении Пина
  var effectLevelPinMouseupHandler = function () {
    var effectProgress = calculatePinProgress();
    var proportionValue = effectProgress / 100;
    if (mainImg.classList.contains('effects__preview--chrome')) {
      mainImg.style.filter = 'grayscale(' + proportionValue + ')';
    }

    if (mainImg.classList.contains('effects__preview--sepia')) {
      proportionValue = effectProgress / 100;
      mainImg.style.filter = 'sepia(' + proportionValue + ')';
    }

    if (mainImg.classList.contains('effects__preview--marvin')) {
      mainImg.style.filter = 'invert(' + effectProgress + '%)';
    }

    if (mainImg.classList.contains('effects__preview--phobos')) {
      proportionValue = effectProgress * 3 / 100;
      mainImg.style.filter = 'blur(' + proportionValue + 'px)';
    }

    if (mainImg.classList.contains('effects__preview--heat')) {
      proportionValue = effectProgress * 2 / 100 + 1;
      mainImg.style.filter = 'brightness(' + proportionValue + ')';
    }
  };
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  var effectLevelPinMousedownHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    var levelLineElement = document.querySelector('.effect-level__line');
    var levelLineElementLeft = levelLineElement.getBoundingClientRect().x;
    var levelLineElementRight = levelLineElementLeft + levelLineElement.getBoundingClientRect().width;

    var documentMouseMovehandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      var offsetLeft = effectLevelPin.offsetLeft;

      startCoords = {
        x: moveEvt.clientX,
      };

      if (moveEvt.clientX >= levelLineElementRight) {
        return;
      }

      if (moveEvt.clientX <= levelLineElementLeft) {
        return;
      }

      var newWidth = (offsetLeft - shift.x) + 'px';
      effectLevelPin.style.left = newWidth;
      effectLevelDepth.style.width = newWidth;
    };

    var documentMouseUpHandler = function () {

      document.removeEventListener('mousemove', documentMouseMovehandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMovehandler);
    document.addEventListener('mouseup', documentMouseUpHandler);

  };

  effectLevelPin.addEventListener('mouseup', effectLevelPinMouseupHandler);
  effectLevelPin.addEventListener('mousedown', effectLevelPinMousedownHandler);

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

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // Обрабатываю клик по фильтру
  var allFilters = document.querySelectorAll('.effects__radio');
  var mainImgWrapper = document.querySelector('.img-upload__preview');
  var mainImg = mainImgWrapper.querySelector('img');
  var effectLine = document.querySelector('.img-upload__effect-level');

  var allFiltersOnchangeHandler = function (evt) {
    var effect = evt.target.value;
    var className = 'effects__preview--' + effect;

    mainImg.className = '';
    mainImg.style.filter = '';
    // Обнуляю пин и полосу прогресса
    effectLevelPin.style.left = 448 + 'px';
    effectLevelDepth.style.width = 448 + 'px';

    // Логика скрытия слайдера
    if (evt.target.id !== 'effect-none') {
      effectLine.classList.remove('visually-hidden');
    } else {
      effectLine.classList.add('visually-hidden');
    }
    // Логика добавления css стиля
    mainImg.classList.add(className);
  };

  for (var j = 0; j < allFilters.length; j++) {
    allFilters[j].addEventListener('change', allFiltersOnchangeHandler);
  }
})();
