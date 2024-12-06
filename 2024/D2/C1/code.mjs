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

    DATA.result = DATA.map((line) => {
        console.log('new row ----------------')
        let directionUp;
        return line.every((element, index, array) => {
            console.log('status', element, index, array)

            if (index === array.length - 1) return true;
            if (Math.abs(element - array[index + 1]) === 0) return false;

            if (index === 0) {
                const diff = element - array[index + 1];
                directionUp = diff < 0 ? true : false
            }

            if (directionUp) {
                console.log(element - array[index + 1] > -4 && element - array[index + 1] < 0);
    
                return (element - array[index + 1] > -4 && element - array[index + 1] < 0);
            } else {
                console.log(element - array[index + 1] < 4 && element - array[index + 1] > 0);
    
                return (element - array[index + 1] < 4 && element - array[index + 1] > 0);
            }
        });
    });

    console.log('result:', DATA);
    DATA.result = DATA.result.reduce((count, value) => count + (value === true ? 1 : 0), 0);
    console.log('outcome:', DATA);
});

/**
 * @param {string} inputData 
 * @returns {number[][]}
 */
function modifyData(inputData) {
    return inputData.split('\r\n').map((md) => md.split(' ').map((toNum) => Number(toNum)));
}