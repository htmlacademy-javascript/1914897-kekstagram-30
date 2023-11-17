import { renderThumbmails } from './thumbnail.js';
import { showBigPicture } from './picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const pictureData = pictures.find(({ id }) => id === thumbnailId);
    showBigPicture(pictureData);
  });
  renderThumbmails(pictures, container);
};

export { renderGallery };
