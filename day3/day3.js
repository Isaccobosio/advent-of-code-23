const fs = require("fs");
function readFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const adventOfCodeInput = readFile("./inputAmin.txt");
let rows = adventOfCodeInput.split("\n");

const hasSymbol = (s) => {
  return s.match(/([^\d.])/g);
};

const find = (row, start, end) => {
  const slice = row?.slice(
    start > 0 ? start - 1 : start,
    end < row.length ? end + 1 : end
  );
  if (slice) {
    return hasSymbol(slice)?.length > 0;
  }
  return false;
};

const checkIfIsPartNumber = (
  number,
  index,
  lastNumberIndex
): [boolean, number] => {
  const startIndex = rows[index].indexOf(number, lastNumberIndex);
  const endIndex = startIndex + String(number).length;

  const findOnTop = find(rows[index - 1], startIndex, endIndex);
  const findNear = find(rows[index], startIndex, endIndex);
  const findBottom = find(rows[index + 1], startIndex, endIndex);

  if (findOnTop || findNear || findBottom) return [true, endIndex];
  return [false, endIndex];
};

let s = 0;
const execute1 = () => {
  for (const [i, r] of rows.entries()) {
    let lastNumberIndex = 0;
    const numberList = r.match(/(\d+)/g)?.map((e) => parseInt(e, 10));
    if (numberList) {
      for (const n of numberList) {
        const [isPartNumber, currentEndNumberIndex] = checkIfIsPartNumber(
          n,
          i,
          lastNumberIndex
        );
        lastNumberIndex = currentEndNumberIndex;
        if (isPartNumber) s += n;
      }
    }
  }
};

const gearHasAdjacentPartNumber = (row, indexOfGear) => {
  const startIndex = indexOfGear > 0 ? indexOfGear - 1 : indexOfGear;
  const endIndex = indexOfGear < row?.length ? indexOfGear + 1 : indexOfGear;

  // console.log(row.slice(startIndex, endIndex));

  let realStartIndex = startIndex;
  for (let charIndex = startIndex; charIndex >= 0; charIndex--) {
    realStartIndex = charIndex;
    if (!isNaN(parseInt(row[charIndex], 10))) continue;
    break;
  }

  let realEndIndex = endIndex;
  for (let charIndex = endIndex; charIndex < row.length; charIndex++) {
    realEndIndex = charIndex;
    if (!isNaN(parseInt(row[charIndex], 10))) continue;
    break;
  }

  const slice = row.slice(realStartIndex, realEndIndex);

  // console.log(slice)

  if (slice.match(/(\d+)/g)) {
    return slice.match(/(\d+)/g);
  }
  return [];
};

let gearRatios = 0;
const execute2 = () => {
  for (const [i, r] of rows.entries()) {
    const gearList = r.match(/\*/g);
    console.log(gearList);

    if (!gearList) continue;

    let previousGearIndex = 0;
    for (const _ of gearList) {
      const indexOfGear = r.indexOf("*", previousGearIndex);

      let topNumbers = [];
      let bottomNumbers = [];
      if (rows[i - 1])
        topNumbers = gearHasAdjacentPartNumber(rows[i - 1], indexOfGear);
      const middleNumbers = gearHasAdjacentPartNumber(rows[i], indexOfGear);
      if (rows[i + 1])
        bottomNumbers = gearHasAdjacentPartNumber(rows[i + 1], indexOfGear);

      const allNumbers = [...topNumbers, ...middleNumbers, ...bottomNumbers];
      // console.log(allNumbers);
      if (allNumbers?.length === 2) {
        console.log(allNumbers);
        const multOfAllNumbers = allNumbers?.reduce(
          (acc, curr) => (acc = acc * +curr)
        );
        // console.log("allNumbers", allNumbers);
        // console.log("multOfAllNumbers", multOfAllNumbers);
        gearRatios += multOfAllNumbers;
      }

      previousGearIndex = indexOfGear + 1;

      // console.log(topNumbers, middleNumbers, bottomNumbers);
    }
  }
};

const execute3 = () => {
  result = 0
  counter = 0
  rows.forEach((row, i) => {
    const gearList = row.match(/\*/g);

    if (!gearList) return;
    
    let previousGearIndex = 0;
    for (const _ of gearList) {
      const indexOfGear = row.indexOf("*", previousGearIndex);

      const tops = !!rows[i - 1] && rows[i - 1].match(/\d+/g);
      const sides = row.match(/\d+/g);
      const bottoms = !!rows[i + 1] && rows[i + 1].match(/\d+/g);

      const numbers = [
        ...(getValidNumbers(tops, rows[i - 1], indexOfGear) || []),
        ...(getValidNumbers(sides, row, indexOfGear) || []),
        ...(getValidNumbers(bottoms, rows[i + 1], indexOfGear) || []),
      ]
      
      
      if(numbers.length === 2){
        counter++
        console.log(counter, numbers)
        result += numbers[0] * numbers[1]
      }
      previousGearIndex = indexOfGear + 1;
    }
  })
  
  return result
};

function getValidNumbers(items, row, indexOfGear) {
  if (!items) return;
  return items
    .map((item) => {
      
      let index = row.indexOf(item, indexOfGear - 3);
      // let index
      // let finish = false
      // while(!finish){
      //   let index = row.indexOf(item)
        
      // }
        
    
      let length = item.toString().length;

      let pos1 = Math.abs(index - indexOfGear);
      let pos2 = Math.abs(index + (!!index ? length - 1 : length) - indexOfGear);

      // if(item === '2')
      //   console.log(items, item, index, length, indexOfGear)
    
      if (pos1 === 0 || pos1 === 1) return item;
      if (pos2 === 0 || pos2 === 1) return item;

      return null;
    })
    .filter((v) => !!v);
}

execute1();
// execute2();
 // execute3();

console.log("soluzione", s);
console.log("soluzione", gearRatios);
