import { readFile } from 'fs';

const filePath = './input.txt';

let DATA;

// Read the file asynchronously
readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    console.log('File content:', '\b', data);

    DATA = modifyData(data);

    console.log('modified Data:', DATA);

    let i = 0;
    DATA.result = DATA.line2.map((item) => {
        const res = Math.abs(item - DATA.line1[i]);
        i++;
        return res;
    })

    DATA.result = DATA.result.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log('result:', DATA);
});

/**
 * @param {string} inputData 
 */
function modifyData(inputData) {
    const line1 = [];
    const line2 = [];

    const lines = inputData.split('\r\n');
    lines.forEach((l) => {
        const lm = l.split('   ');
        line1.push(Number(lm[0]));
        line2.push(Number(lm[1]));
    });

    return {
        line1: line1.sort((a, b) => a - b),
        line2: line2.sort((a, b) => a - b),
    }
}