import "./App.css"
import {
  Route,
  Routes,
} from "react-router-dom";
import { HeaderLayout } from "./components/HeaderLayout/HeaderLayout";
import { Profile } from "./components/Profile/Profile";
import { FooterLayout } from "./components/FooterLayout/FooterLayout";
import { Main } from "./components/Main/Main";
import { Movies } from "./components/Movies/Movies";
import { Sign } from "./components/Sign/Sign";
import { Error404 } from "./components/Error404/Error404";
import { useCurrentUser } from "./contexts/currentUser";
import { useEffect, useState } from "react";
import { mainApi } from "./utils/MainApi";

function App() {
  const { currentUser, setCurrentUserInfo } = useCurrentUser((state) => state)
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => { document.documentElement.lang = 'ru' }, [])

  useEffect(() => {
    const initUser = async () => {
      try {
        const userData = await mainApi.getCurrentUserInfo();
        setLoggedIn(true);
        setCurrentUserInfo(userData);
      } catch (err) {
        console.log(err);
      }
    }
    initUser()
  }, [setCurrentUserInfo])

  return (
    <div className="App">
      <Routes>

        <Route
          path="/"
          element={<HeaderLayout />}>
          <Route
            path="profile"
            element={<Profile />} />

          <Route
            path=""
            element={<FooterLayout />}>
            <Route
              path=""
              element={<Main />} />
            <Route
              path="saved-movies"
              element={<Movies saved />} />
            <Route
              path="movies"
              element={<Movies />} />
          </Route>
        </Route>

        <Route
          path="signup"
          element={<Sign register />} />
        <Route
          path="signin"
          element={<Sign />} />
        <Route
          path="*"
          element={<Error404 />} />

      </Routes>
    </div>
  );
}

export default App;
