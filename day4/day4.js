const fs = require("fs");
function readFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("./input.txt");
let rows = adventOfCodeInput.split("\n");

const part1 = () => {
  let points = 0;
  rows.forEach((el) => {
    let data = el.split(":")[1];
    const winningNumbers = data.split("|")[0].match(/\d+/g);
    const numbersYouHave = data.split("|")[1].match(/\d+/g);
    let wins = 0;
    numbersYouHave.forEach((n) => {
      if (winningNumbers.includes(n)) wins = wins === 0 ? 1 : (wins *= 2);
    });
    points += wins;
  });
  console.log("solution", points);
};

// [1,2,4,4,2]

const part2 = () => {
  let instances = new Array(rows.length).fill(1);
  rows.forEach((r, i) => {
    let data = r.split(":")[1];
    let wins = 0;
    data.split("|")[1].match(/\d+/g).forEach((n) => {
      if (data.split("|")[0].match(/\d+/g).includes(n)) wins += 1;
    });
    if (wins > 0) {
      let affected = instances.slice(i + 1, i + 1 + wins);
      for (let [index, instance] of affected.entries()) {
        affected[index] += instances[i];
      }
      instances = [
        ...instances.slice(0, i + 1),
        ...affected,
        ...instances.slice(i + 1 + wins),
      ];
    }
  });
  console.log('solution', instances.reduce((acc, curr) => acc + curr));
};

part2();
