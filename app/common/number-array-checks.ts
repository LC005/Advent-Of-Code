export function checkAllIncreasing(arr: number[]): boolean {
  return arr.every((value, index) => {
    if (index === 0) return true;
    return value > arr[index - 1];
  });
}

export function checkAllDecreasing(arr: number[]): boolean {
  return arr.every((value, index) => {
    if (index === 0) return true;
    return value < arr[index - 1];
  });
}

export function checkDeltaNotOver(arr: number[], targetDelta: number): boolean {
  for (let i = 1; i < arr.length; i++) {
    const delta = Math.abs(arr[i] - arr[i - 1]);
    if (delta > targetDelta || delta === 0) {
      return false;
    }
  }
  return true;
}
