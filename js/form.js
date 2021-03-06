'use strict';

(function () {
  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
// Показываю форму обработки фото при загрузке изображения
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var currentFilter;

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
      if (evt.target.classList.contains('text__hashtags') || evt.target.classList.contains('social__footer-text')) {
        return;
      }
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
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  // Все варианты эффектов + пропорции эффекта
  var options = {
    'chrome': {
      effect: 'grayscale',
      proportionValue: function (progress) {
        return progress / 100;
      },
    },
    'sepia': {
      effect: 'sepia',
      proportionValue: function (progress) {
        return progress / 100;
      },
    },
    'marvin': {
      effect: 'invert',
      proportionValue: function (progress) {
        return progress + '%';
      },
    },
    'phobos': {
      effect: 'blur',
      proportionValue: function (progress) {
        return progress * 3 / 100 + 'px';
      },
    },
    'heat': {
      effect: 'brightness',
      proportionValue: function (progress) {
        return progress * 2 / 100 + 1;
      },
    },
  };

  var effectLevelPinMousedownHandler = function (evt) {
    evt.preventDefault();

    var shiftX = evt.clientX - effectLevelPin.getBoundingClientRect().left;

    var documentMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var newLeft = moveEvt.clientX - shiftX - effectLevelLine.getBoundingClientRect().left;

      // курсор вышел из слайдера => оставить бегунок в его границах.
      if (newLeft < 0) {
        newLeft = 0;
      }

      var rightEdge = effectLevelLine.offsetWidth - effectLevelPin.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      effectLevelPin.style.left = newLeft + effectLevelPin.offsetWidth / 2 + 'px';
      effectLevelDepth.style.width = newLeft + effectLevelPin.offsetWidth + 'px';

      // Меняю эффект большой картинки в зависимости от класса при передвижении Пина
      var effectProgress = calculatePinProgress();

      // Меняю знаение эффекта в зависимости от Пина
      var currentOption = options[currentFilter];
      mainImg.style.filter = currentOption.effect + '(' + currentOption.proportionValue(effectProgress) + ')';
    };

    var documentMouseUpHandler = function () {

      document.removeEventListener('mousemove', documentMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  };

  effectLevelPin.ondragstart = function () {
    return false;
  };

  effectLevelPin.addEventListener('mousedown', effectLevelPinMousedownHandler);

  /* ++++++++++ ++++++++++ ++++++++++ ++++++++++ ++++++++++++++++++++ ++++++++++ */
  // создаю массив только с уникальными значениями
  var getUniqueArray = function (array) {
    var uniqueArray = [];
    for (var y = 0; y < array.length; y++) {
      var arrayLowCase = array[y].toLowerCase();
      if (!uniqueArray.includes(arrayLowCase)) {
        uniqueArray.push(arrayLowCase);
      }
    }
    return uniqueArray;
  };

  // Валидация инпута ввода хэштегов
  var textHashtags = document.querySelector('.text__hashtags');
  var textHashtagsInputhandler = function (evt) {
    var hashtagsValue = evt.target.value;
    var hashtagsArray = hashtagsValue.split(/\s+/);
    var RegExpHashtags = /^#[a-zA-Z0-9а-яА-Я]{1,19}$/i;

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

  // Обнуляю пин и полосу прогресса
  var cancelProgressBar = function (lineLength, pinLength) {
    effectLevelPin.style.left = lineLength - pinLength / 2 + 'px';
    effectLevelDepth.style.width = lineLength - pinLength / 2 + 'px';
  };

  var allFiltersOnchangeHandler = function (evt) {
    var effect = evt.target.value;
    var className = 'effects__preview--' + effect;
    currentFilter = effect;

    mainImg.className = '';
    mainImg.style.filter = '';
    cancelProgressBar(effectLevelLine.offsetWidth, effectLevelPin.offsetWidth);

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
