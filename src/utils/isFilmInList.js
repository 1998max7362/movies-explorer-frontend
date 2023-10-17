export function isFilmInList(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === target.id) {
      return true; // Object found in the array
    }
  }
  return false; // Object not found in the array
}
