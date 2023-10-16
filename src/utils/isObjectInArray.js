export function isObjectInArray(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) === JSON.stringify(target)) {
      return true; // Object found in the array
    }
  }
  return false; // Object not found in the array
}
