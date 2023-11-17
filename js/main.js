import { getPictures } from './data.js';
import { renderGallery } from './gallery.js';
import './form.js';

const pictures = getPictures();
renderGallery(pictures);
