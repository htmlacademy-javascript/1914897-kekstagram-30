const EFFECTS = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectToFilter = {
  [EFFECTS.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [EFFECTS.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [EFFECTS.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [EFFECTS.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [EFFECTS.HEAT]: {
    style: 'brightness',
    unit: '',
  }
};

const effectToSliderOptions = {
  [EFFECTS.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [EFFECTS.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EFFECTS.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [EFFECTS.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [EFFECTS.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [EFFECTS.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const modalElement = document.querySelector('.img-upload');
const imageElement = modalElement.querySelector('.img-upload__preview img');
const effectsElement = modalElement.querySelector('.effects');
const sliderElement = modalElement.querySelector('.effect-level__slider');
const sliderContainerElement = modalElement.querySelector('.img-upload__effect-level');
const effectLevelElement = modalElement.querySelector('.effect-level__value');

let chosenEffect = EFFECTS.DEFAULT;

const isDefault = () => chosenEffect === EFFECTS.DEFAULT;

const setImageStyle = () => {
  if(isDefault()) {
    imageElement.style.filter = null;
    return;
  }

  const { value } = effectLevelElement;
  const { style, unit } = effectToFilter[chosenEffect];
  imageElement.style.filter = `${style}(${value}${unit})`;

};

const showSlider = () => {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    start: max,
    range: { min, max },
    step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};


const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if(isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(EFFECTS.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const initEffect = () => {
  createSlider(effectToSliderOptions[chosenEffect]);
  effectsElement.addEventListener('change', onEffectsChange);
};

export { reset, initEffect };
