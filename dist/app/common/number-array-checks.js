"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllIncreasing = checkAllIncreasing;
exports.checkAllDecreasing = checkAllDecreasing;
exports.checkDeltaNotOver = checkDeltaNotOver;
function checkAllIncreasing(arr) {
    return arr.every((value, index) => {
        if (index === 0)
            return true;
        return value > arr[index - 1];
    });
}
function checkAllDecreasing(arr) {
    return arr.every((value, index) => {
        if (index === 0)
            return true;
        return value < arr[index - 1];
    });
}
function checkDeltaNotOver(arr, targetDelta) {
    for (let i = 1; i < arr.length; i++) {
        const delta = Math.abs(arr[i] - arr[i - 1]);
        if (delta > targetDelta || delta === 0) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=number-array-checks.js.map