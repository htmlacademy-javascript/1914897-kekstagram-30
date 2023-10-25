import { generateId, getRandomArrayElement, getRandomInteger } from './util';

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
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message.trim(),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `img/${getRandomInteger(1, 25)}.svg`,
    likes: getRandomInteger(15, 200),
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComment)
  };
};

Array.from({ length: 25 }, createPhoto);

export {createPhoto};
