const fs = require("fs");

function readFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

enum numbers {
  "one" = 1,
  "two" = 2,
  "three" = 3,
  "four" = 4,
  "five" = 5,
  "six" = 6,
  "seven" = 7,
  "eight" = 8,
  "nine" = 9,
}

const validNumbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function isNumeric(num) {
  return !isNaN(num);
}

function findValidNumber(word: string) {
  let value = -1;
  for (let n of validNumbers) {
    if (word.search(n) > -1) {
      value = numbers[n];
      break;
    }
  }
  return value;
}

const firstDigit = (calibration: string) => {
  let digit = null;
  let word = "";
  for (let i = 0; i < calibration.length; i++) {
    const char = calibration[i];
    word += char;
    const numberFinded = findValidNumber(word);
    if (isNumeric(char)) {
      digit = +char;
      break;
    } else if (numberFinded > -1) {
      digit = numberFinded;
      break;
    }
  }
  return digit;
};

const lastDigit = (calibration: string) => {
  let digit = null;
  let word = "";
  for (let i = calibration.length; i >= 0; i--) {
    const char = calibration[i];
    word += char;
    let wordSplitted = word.split("");
    let wordSplittedRevered = wordSplitted.reverse();
    let wordSplittedReveredJoined = wordSplittedRevered.join("");
    const numberFinded = findValidNumber(wordSplittedReveredJoined);
    if (isNumeric(char)) {
      digit = +char;
      break;
    } else if (numberFinded > -1) {
      digit = numberFinded;
      break;
    }
  }
  return digit;
};

const execute = (calibrations) => {
  calibrationsSum = 0;
  for (let c of calibrations) {
    let fd = firstDigit(c);
    let ld = lastDigit(c);
    console.log(fd, ld);
    let calibValue = 0;
    if (fd != null && ld != null) {
      calibValue = +(fd + "" + ld);
    }
    calibrationsSum += calibValue;
  }
  return calibrationsSum;
};

const adventOfCodeInput = readFile("./inputAmin.txt");
const calibrations: string[] = adventOfCodeInput.split("\n");
// let calibrationsSum = 0;

const examples = [
  "one",
  "abctwo",
  "1xyz",
  "1one",
  "one1",
  "lastone1",
  "abcdef",
];

execute(calibrations);
// 54706
