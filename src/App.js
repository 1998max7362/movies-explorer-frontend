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

function App() {
  
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
              element={<Movies saved/>} />
            <Route
              path="movies"
              element={<Movies />} />
          </Route>
        </Route>

        <Route
          path="signin"
          element={<Sign register />} />
        <Route
          path="signup"
          element={<Sign />} />
        <Route
          path="*"
          element={<Error404 />} />

      </Routes>
    </div>
  );
}

export default App;
