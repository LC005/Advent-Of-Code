import { readFileSync } from 'fs';


const DATA = readFileSync('./input.txt', 'utf8');
console.log('File content:', DATA);

// console.log('test', removeTextBetweenDontAndDo(DATA));

const regexRemove = /do\(\)[\s\S]*?don't\(\)[\s\S]*$/g;

// Replace the matched portion with an empty string
let cleanedStr = removeTextBetweenDontAndDo(DATA);

// const regexRemove2 = /don't\(\)[\s\S]*?don't\(\)/g;

// cleanedStr = cleanedStr.replace(regexRemove2, '');

// console.log('cleaned', cleanedStr);

// console.log('match', DATA === cleanedStr);


// console.log('split', DATA.split("don't()").m)
console.log('split', cleanedStr)

// const test = DATA.split('mul(')
const regex = /mul\((\d+),(\d+)\)/g;
// const regex2 = /(?:^|(?<=do\([^)]*\).*?))mul\((\d+),(\d+)\)(?<!.*don't\([^)]*\).*?)/g;

const matches = [...cleanedStr.matchAll(regex)];

let sum = 0;
const test = matches.forEach((element) => {
    sum += (Number(element[1]) * Number(element[2]));
});

console.log('responses', matches);
console.log('test', sum);

function removeTextBetweenDontAndDo(inputString) {
    // Step 1: Remove everything between `don't()` and the next `do()`
    let result = inputString.replace(/don't\(\)[\s\S]*?do\(\)/g, '');

    // Step 2: Remove everything after the last `don't()` if there's no `do()` after it
    result = result.replace(/don't\(\)[\s\S]*$/g, '');

    return result;
}
