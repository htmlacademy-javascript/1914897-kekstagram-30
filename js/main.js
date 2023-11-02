import { getPictures } from './data.js';
import { renderThumbmails } from './thumbnail.js';

const pictures = getPictures();
renderThumbmails(pictures);
