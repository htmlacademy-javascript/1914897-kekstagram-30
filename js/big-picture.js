import { initCommentsList, renderComments } from './comment.js';

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButton = bigPictureElement.querySelector('.big-picture__cancel');

const hidePicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hidePicture();
  }
}

const onClosePictureButton = () => {
  hidePicture();
};


const renderPicture = ({ url, description, likes }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  renderComments(pictureData.comments);
  initCommentsList();
  renderPicture(pictureData);

};

closePictureButton.addEventListener('click', onClosePictureButton);

export { showBigPicture };
