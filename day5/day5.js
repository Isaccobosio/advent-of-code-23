const fs = require("fs");
function readFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`); 
  }
}

const adventOfCodeInput = readFile("./sample.txt");
let rows = adventOfCodeInput?.split("\n");

let almanac = {};
let groupName = "";
let mapList = [];

const getMap = (listOfNumber: number[]) => {
  const destinationRangeStart = +listOfNumber[0];
  const sourceRangeStart = +listOfNumber[1];
  const rangeLength = +listOfNumber[2];
  return {
    source: sourceRangeStart,
    destination: destinationRangeStart,
    range: rangeLength,
  };
};

const findSeedLocation = (seed: number, almanac): number => {
  let beforeValue = seed;
  for (const group in almanac) {
    const maps = almanac[group];
    const lastMap = maps.slice(-1)[0];
    if (lastMap.source + lastMap.range < beforeValue) break;
    for (const { source, destination, range } of maps) {
      if (beforeValue > source + range - 1 || beforeValue < source) {
        beforeValue = beforeValue;
        continue;
      }
      beforeValue = destination + (beforeValue - source);
      break;
    }
  }
  return beforeValue;
};

const generateAlmanac = () => {
  for (let i = 2; i < rows.length; i++) {
    let r = rows[i];
    if (r.match(/:/g)) groupName = r.split(" ")[0];
    almanac = {
      ...almanac,
      [groupName]: mapList,
    };
    if (r.match(/\d+/g)) mapList = [...mapList, getMap(r.match(/\d+/g))];
    if (r === "") {
      groupName = "";
      mapList = [];
    }
  }
  for (const group in almanac) {
    almanac[group] = [...almanac[group].sort((a, b) => a.source - b.source)];
  }
};

const part1 = () => {
  const seeds = rows[0].match(/\d+/g).map((n) => +n);
  let locationList = [];
  for (const seed of seeds) {
    locationList.push(findSeedLocation(seed, almanac));
  }
  console.log("solution 1:", Math.min(...locationList));
};

const part2 = () => {
  const seeds = rows[0].match(/\d+/g).map((n) => +n);
  let locationList = [];
  const seedRanges = [];

  for (let i = 0; i < seeds.length - 1; i += 2) {
    seedRanges.push({ from: seeds[i], range: seeds[i + 1] });
  }

  seedRanges.sort((a, b) => a.from - b.from);
  
  let iteration = 0;
  for (const { from, range } of seedRanges) {
    iteration += from + range;
    for (let seedValue = from; seedValue < from + range; seedValue+=1) {
      locationList.push(findSeedLocation(seedValue, almanac));
    }
  }
  
  // It requires too many iterations with input :(

  console.log("solution 2:", Math.min(...locationList));
};

generateAlmanac();
part1();
part2();
