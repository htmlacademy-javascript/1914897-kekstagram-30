// Функция для проверки длины строки

function checkStirngLength(string, symbols) {
  return string.length <= symbols;
}

checkStirngLength('привет', 1);

// Функция для проверки является ли слово/строка паллиндромом

function isPalindrom(str) {
  str = str.toLowerCase().replaceAll(' ', '');
  return str === str.split('').reverse().join('');
}

isPalindrom('Топот');

// Функция, возвращающая положительное число из строки
function getNumber(str) {
  let result = '';
  if (typeof str !== 'string') {
    str = str.toString();
  }
  for (let i = 0; i < str.length; i++) {
    if (!Number.isNaN(parseInt(str[i], 10))) {
      result += str[i];
    }
  }
  return Math.abs(parseInt(result, 10));
}

getNumber(('2023 год')); // 2023
getNumber(('ECMAScript 2022')); // 2022
getNumber(('1 кефир, 0.5 батона')); // 105
getNumber(('агент 007')); // 7
getNumber(('а я томат')); // NaN


