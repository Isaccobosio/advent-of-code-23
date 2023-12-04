const fs = require("fs");
function readFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const RED_AMOUNT = 12;
const GREEN_AMOUNT = 13;
const BLUE_AMOUNT = 14;

enum colors {
  RED = "red",
}

const adventOfCodeInput = readFile("./day2.txt");
const games = adventOfCodeInput.split("\n");

const getGameID = (gameName: string): number => {
  return gameName.split(" ")[1];
};

const readGrab = (grab: string): [number, string] => {
  const n = +grab.split(" ")[0];
  const color = grab.split(" ")[1];
  return [n, color];
};

let gamesObject = [];

for (const g of games) {
  let gameObj = [];
  const gameNumber = g.split(": ")[0];
  const gameSets = g.split(": ")[1];
  const gameID = getGameID(gameNumber);
  const setsArray = gameSets.split("; ");
  for (const set of setsArray) {
    let setObject = {
      gameID: 0,
      red: 0,
      green: 0,
      blue: 0,
    };
    const grabs = set.split(", ");
    for (const grab of grabs) {
      const [value, color] = readGrab(grab);
      setObject[color] = setObject[color] + value;
    }
    gameObj.push(setObject);
  }
  gamesObject.push(gameObj);
}

let sum = 0;

for (const [index, setOfGrabs] of gamesObject.entries()) {
  let rMax = 0;
  let gMax = 0;
  let bMax = 0;
  for (const grab of setOfGrabs) {
    if (grab.red > rMax) rMax = grab.red;
    if (grab.green > gMax) gMax = grab.green;
    if (grab.blue > bMax) bMax = grab.blue;
  }
  const p = rMax * gMax * bMax;
  sum += p;
}
console.log("solution", sum);
