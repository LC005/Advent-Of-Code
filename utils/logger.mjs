const args = process.argv.slice(2);

/**
 * 
 * @param {string} message 
 * @param  {unknown[]} data 
 */
export function logItem(message, ...data) {
    if (args[0] === 'verbose') {
        console.log(message, ...data);
    }
}

/**
 * 
 * @param {string} message 
 * @param  {unknown[]} data 
 */
export function debugItem(message, ...data) {
    if (args[0] === 'veryVerbose') {
        console.log(message, ...data);
    }
}

/**
 * @param {any} result 
 */
export function logResult (result) {
    console.log('#####################################');
    console.log('');
    console.log('Result:', result);
    console.log('');
    console.log('#####################################');
}