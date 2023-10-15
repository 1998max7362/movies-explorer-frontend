import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HeaderLayout } from './components/HeaderLayout/HeaderLayout';
import { Profile } from './components/Profile/Profile';
import { FooterLayout } from './components/FooterLayout/FooterLayout';
import { Main } from './components/Main/Main';
import { Movies } from './components/Movies/Movies';
import { Sign } from './components/Sign/Sign';
import { Error404 } from './components/Error404/Error404';
import { useCurrentUser } from './contexts/currentUser';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { mainApi } from './utils/MainApi';
import ProtectedRouteElement from './components/ProtectedRouteElement/ProtectedRouteElement';
import Preloader from './components/Preloader/Preloader';

function App() {
  const { currentUser, setCurrentUserInfo } = useCurrentUser((state) => state);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // debugger

  useEffect(() => {
    document.documentElement.lang = 'ru';
  }, []);

  const updateUser = useCallback(async () => {
    setIsFetching(true)
    try {
      const userData = await mainApi.getCurrentUserInfo();
      setLoggedIn(true);
      setCurrentUserInfo(userData);
    } catch (err) {
      console.log(err);
    }
    finally{
      setIsFetching(false)
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
          <Route path='/' element={<HeaderLayout loggedIn={loggedIn} />}>
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
                    <Movies saved />
                  </ProtectedRouteElement>
                }
              />
              <Route
                path='movies'
                element={
                  <ProtectedRouteElement loggedIn={loggedIn}>
                    <Movies />
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
