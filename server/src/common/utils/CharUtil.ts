export default class CharUtils {
  static removeEscapeChars = (str: string) => {
    return String(str).replace(/\r/g, '');
  };

  static convertSnakeToCamelCase = (str: string) => {
    let convertedStr = '';
    let count = 0;
    let isSnake = false;

    for (const char of str) {
      if (!count) {
        convertedStr += char.toLowerCase();
      } else {
        if (char === '_') {
          isSnake = true;
          continue;
        }
        if (isSnake) {
          convertedStr += char.toUpperCase();
          isSnake = false;
        } else {
          convertedStr += char.toLowerCase();
        }
      }
      count++;
    }
    return convertedStr;
  };

  static convertCamelToSnakeCase = (str: string) => {
    let convertedStr = '';
    let isSnake = false;

    for (const char of str) {
      if (char !== '_') {
        convertedStr += isSnake === true ? char.toUpperCase() : char.toLowerCase();
        isSnake = false;
      } else {
        isSnake = true;
        continue;
      }
    }
    return convertedStr;
  };
}
