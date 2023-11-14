const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsListElement = document.querySelector('.social__comments');
const commentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.social__comments-loader');

const createComment = ({ name,message, avatar}) => {
  const newComment = commentElement.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = (comments) => {
  commentsListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((element)=> {
    const comment = createComment(element);
    fragment.append(comment);
  });
  commentsListElement.append(fragment);
};

const initCommentsList = () => {
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

export { renderComments, initCommentsList};
