import './App.css';
import { Route, Routes } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { HeaderLayout } from './components/HeaderLayout/HeaderLayout';
import { Profile } from './components/Profile/Profile';
import { FooterLayout } from './components/FooterLayout/FooterLayout';
import { Main } from './components/Main/Main';
// import { Movies } from './components/Movies/Movies';
import { Sign } from './components/Sign/Sign';
import { Error404 } from './components/Error404/Error404';
import { useCurrentUser } from './contexts/currentUser';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { mainApi } from './utils/MainApi';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import Preloader from './components/Preloader/Preloader';
import { AllMoviesLayout } from './components/Movies/AllMoviesLayout';
import { SavedMoviesLayout } from './components/Movies/SavedMoviesLayout';

function App() {
  const { currentUser, setCurrentUserInfo } = useCurrentUser((state) => state);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = debounce(() => {
    setWindowSize(window.innerWidth);
  }, 100);

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
                    {/* <Movies saved windowSize={windowSize} /> */}
                    <SavedMoviesLayout windowSize={windowSize}/>
                  </ProtectedRouteElement>
                }
              />
              <Route
                path='movies'
                element={
                  <ProtectedRouteElement loggedIn={loggedIn}>
                    {/* <Movies windowSize={windowSize} /> */}
                    <AllMoviesLayout windowSize={windowSize}/>
                  </ProtectedRouteElement>
                }
              />
            </Route>
          </Route>

          <Route
            path='signup'
            element={<Sign register updateUser={updateUser} />}
          />
          <Route path='signin' element={<Sign updateUser={updateUser} />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
