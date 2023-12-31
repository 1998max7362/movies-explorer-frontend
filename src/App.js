import './App.css';
import { Route, Routes } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { HeaderLayout } from './components/HeaderLayout/HeaderLayout';
import { Profile } from './components/Profile/Profile';
import { FooterLayout } from './components/FooterLayout/FooterLayout';
import { Main } from './components/Main/Main';
import { Sign } from './components/Sign/Sign';
import { Error404 } from './components/Error404/Error404';
import { CurrentUserContext } from './contexts/currentUser';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { mainApi } from './utils/MainApi';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import Preloader from './components/Preloader/Preloader';
import { Movies } from './components/Movies/Movies';
import { SavedMovies } from './components/Movies/SavedMovies';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 100);

  const setCurrentUserInfo = useCallback(
    (newUserInfo) => {
      setCurrentUser((currentUser) => {
        return { ...currentUser, ...newUserInfo };
      });
    },
    [setCurrentUser]
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    document.documentElement.lang = 'ru';
  }, []);

  const updateUser = useCallback(async () => {
    setIsFetching(true);
    try {
      const userData = await mainApi.getCurrentUserInfo();
      setLoggedIn(true);
      setCurrentUserInfo(userData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }, [setCurrentUserInfo, setLoggedIn]);

  useMemo(() => {
    updateUser();
  }, [updateUser]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUserInfo }}>
      <div className='App'>
        {isFetching ? (
          <Preloader />
        ) : (
          <Routes>
            <Route
              path='/'
              element={
                <HeaderLayout loggedIn={loggedIn} windowSize={windowSize} />
              }
            >
              <Route
                path='profile'
                element={
                  <ProtectedRouteElement loggedIn={loggedIn}>
                    <Profile
                      currentUser={currentUser}
                      setCurrentUserInfo={setCurrentUserInfo}
                      setLoggedIn={setLoggedIn}
                    />
                  </ProtectedRouteElement>
                }
              />

              <Route path='' element={<FooterLayout />}>
                <Route path='' element={<Main />} />
                <Route
                  path='saved-movies'
                  element={
                    <ProtectedRouteElement loggedIn={loggedIn}>
                      <SavedMovies />
                    </ProtectedRouteElement>
                  }
                />
                <Route
                  path='movies'
                  element={
                    <ProtectedRouteElement loggedIn={loggedIn}>
                      <Movies windowSize={windowSize} />
                    </ProtectedRouteElement>
                  }
                />
              </Route>
            </Route>

            <Route
              path='signup'
              element={
                <Sign register updateUser={updateUser} loggedIn={loggedIn} />
              }
            />
            <Route
              path='signin'
              element={<Sign updateUser={updateUser} loggedIn={loggedIn} />}
            />
            <Route path='*' element={<Error404 />} />
          </Routes>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
