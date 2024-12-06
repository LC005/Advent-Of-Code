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
        let mistakes = 0;
        const result = line.every((element, index, array) => {
            function checkMistakes() {
                console.log('Check mistake', mistakes)
                if (mistakes === 0) {
                    mistakes++;
                    console.log('forgive 1 error');
                    return true; 
                }

                console.log('mistakes is not 0', mistakes);
                return false;
            }

            console.log('status', element, index, array)

            if (index === array.length - 1) return true;
            if (Math.abs(element - array[index + 1]) === 0) return checkMistakes();

            if (index === 0) {
                const diff = element - array[index + 1];

                directionUp = diff < 0 ? true : false;
            }

            if (directionUp) {
                const res = (element - array[index + 1] > -4 && element - array[index + 1] < 0);
                console.log('dirUp', res);
    
                if (!res) checkMistakes();
                return (res);
            } else {
                const res = (element - array[index + 1] < 4 && element - array[index + 1] > 0);
                console.log('dirDown', res);
    
                if (!res) checkMistakes();
                return (res);
            }
        });

        console.log('result:', result, mistakes);
        return result;
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