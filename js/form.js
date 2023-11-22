import { initEffect } from './effect.js' ;
import { reset as resetEffects } from './effect.js';
import { resetScale } from './scale.js';

const HASHTAG_MAX_COUNT = 5;
const VALYD_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_TEXT = {
  INVALID_COUNT: `Максимум ${HASHTAG_MAX_COUNT} хештегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_HASHTAG: 'Неправильный хэштег'
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const imgField = form.querySelector('.img-upload__input');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const normalizeTags = (tags) => tags.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALYD_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= HASHTAG_MAX_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isTextFieldFocused = () => document.activeElement === hashtagInput || document.activeElement === commentInput;

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  resetEffects();
  resetScale();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onFileInputChange = () => {
  showModal();
};

const onCancelButtonClick = () => {
  hideModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  hideModal();
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

pristine.addValidator(
  hashtagInput,
  hasValidCount,
  ERROR_TEXT.INVALID_COUNT,
  true
);

pristine.addValidator(
  hashtagInput,
  hasUniqueTags,
  ERROR_TEXT.NOT_UNIQUE,
  true
);

pristine.addValidator(
  hashtagInput,
  hasValidTags,
  ERROR_TEXT.INVALID_HASHTAG,
  true
);

imgField.addEventListener('click', onFileInputChange);
cancelButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
initEffect();
