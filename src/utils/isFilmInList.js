export function isFilmInList(savedFilms, target) {
  for (let i = 0; i < savedFilms.length; i++) {
    if (savedFilms[i].id === target.id) {
      return savedFilms[i]._id; // Object found in the array
    }
  }
  return false; // Object not found in the array
}
