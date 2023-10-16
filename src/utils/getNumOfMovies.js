export const getNumOfMovies = ({windowSize}) =>{
  if (windowSize>=1176){
    return {startNumOfMovies: 16, extraNumOfMovies: 4}
  }
  if (windowSize>=859){
    return {startNumOfMovies: 12, extraNumOfMovies: 3}
  }
  if (windowSize>=541){
    return {startNumOfMovies: 8, extraNumOfMovies: 2}
  }
  if (windowSize<541){
    return {startNumOfMovies: 5, extraNumOfMovies: 2}
  }
}