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

    DATA.result = DATA.line1.map((item) => {
        console.log('item1', item);
        console.log('item2', DATA.line2.filter((fi) => item === fi))
        return DATA.line2.filter((fi) => item === fi).length * item;
    })

    DATA.result = DATA.result.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    console.log('result:', DATA);
});

/**
 * @param {string} inputData 
 * @returns {{ line1: number[], line2: number[] }}
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
        line1,
        line2,
    }
}