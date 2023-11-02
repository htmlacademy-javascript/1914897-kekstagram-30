import { generateId, getRandomArrayElement, getRandomInteger } from './util';

const AVATAR_COUNT = 6;
const COMMENTS_COUNT = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 30;
const PHOTOS_COUNT = 25;

const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'];

const NAMES = ['Евгений', 'Пётр', 'Борис', 'Яков', 'Данила', 'Джейсон', 'Артём', 'Джон'];

const PHOTO_DESCRIPTIONS = ['Мой кот', 'Осенний лес', 'Готовим дома', 'Ужин при свечах', 'Путешествую', 'В дождливом Лондоне'];

const generatePhotoId = generateId();
const generateCommentId = generateId();

const createComment = () => {
  const message = getRandomArrayElement(MESSAGES);
  const commentId = generateCommentId();
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: message.trim(),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${getRandomInteger(1, PHOTOS_COUNT)}.jpg`,
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    comments: Array.from({ length: getRandomInteger(0, COMMENTS_COUNT) }, createComment)
  };
};

const getPictures = () => Array.from({ length: PHOTOS_COUNT }, createPhoto);


export { getPictures };
