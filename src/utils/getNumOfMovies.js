import {
  STARTROWNUM1280PX,
  STARTROWNUM768PX,
  STARTROWNUM480PX,
  EXTRANUMOFMOVIES480PX,
} from './constants';

export const getNumOfMovies = ({ windowSize }) => {
  if (windowSize >= 1176) {
    return { startNumOfMovies: 4 * STARTROWNUM1280PX, extraNumOfMovies: 4 };
  }
  if (windowSize >= 859) {
    return { startNumOfMovies: 3 * STARTROWNUM768PX, extraNumOfMovies: 3 };
  }
  if (windowSize >= 541) {
    return { startNumOfMovies: 2 * STARTROWNUM768PX, extraNumOfMovies: 2 };
  }
  if (windowSize < 541) {
    return {
      startNumOfMovies: STARTROWNUM480PX,
      extraNumOfMovies: EXTRANUMOFMOVIES480PX,
    };
  }
};
