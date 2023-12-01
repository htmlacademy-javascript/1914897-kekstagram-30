const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({ url, description, comments, likes, id}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const pictureImageElement = thumbnail.querySelector('.picture__img');
  pictureImageElement.src = url;
  pictureImageElement.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbmails = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export { renderThumbmails };
