const COMMENTS_COUNT = 5;
let commentsCountShown = 0;
let comments = [];

const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButton = bigPictureElement.querySelector('.big-picture__cancel');

const commentsListElement = document.querySelector('.social__comments');
const commentCountElement = document.querySelector('.social__comment-shown-count');
const commentsLoaderElement = document.querySelector('.social__comments-loader');
const commentsTotalCountElement = document.querySelector('.social__comment-total-count');

const createComment = ({ name, message, avatar }) => {
  const newComment = commentElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  commentsCountShown += COMMENTS_COUNT;

  if (commentsCountShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);

  commentCountElement.textContent = commentsCountShown;
  commentsTotalCountElement.textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();


const hidePicture = () => {
  commentsCountShown = 0;
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
  const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
  bigPictureImgElement.src = url;
  bigPictureImgElement.alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);

  comments = pictureData.comments;
  if (comments.length > 0) {
    renderComments();
  }

  renderPicture(pictureData);

};

closePictureButton.addEventListener('click', onClosePictureButton);

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
