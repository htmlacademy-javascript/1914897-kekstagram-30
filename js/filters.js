import { renderGallery } from './gallery.js';
import { debounce } from './util';

const MAX_RANDOM_FILTER = 10;
const MIN_RANDOM_FILTER = 0;

const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filtersEl = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultBtn = filterForm.querySelector('#filter-default');
const randomBtn = filterForm.querySelector('#filter-random');
const discussedBtn = filterForm.querySelector('#filter-discussed');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const FiltersHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,
  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(MIN_RANDOM_FILTER, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length),
};

let currentFilter = FilterEnum.DEFAULT;

const repaint = (filter, data) => {
  if (currentFilter !== filter) {
    const filteredData = FiltersHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderGallery(filteredData);
    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint);
const switchActiveClass = (evt) => {
  const currentActiveEl = filterForm.querySelector('.img-filters__button--active');
  currentActiveEl.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const initFilter = (data) => {
  filtersEl.classList.remove('img-filters--inactive');

  defaultBtn.addEventListener('click', (evt) => {
    switchActiveClass(evt);
    debouncedRepaint(FilterEnum.DEFAULT, data);
  });
  randomBtn.addEventListener('click', (evt) => {
    switchActiveClass(evt);
    debouncedRepaint(FilterEnum.RANDOM, data);
  });
  discussedBtn.addEventListener('click', (evt) => {
    switchActiveClass(evt);
    debouncedRepaint(FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
