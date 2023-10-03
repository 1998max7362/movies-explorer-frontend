import "./App.css"
import {
  Route,
  Routes,
} from "react-router-dom";
import { HeaderLayout } from "./components/HeaderLayout/HeaderLayout";
import { Profile } from "./components/Profile/Profile";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Rigister/Rigister";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { FooterLayout } from "./components/FooterLayout/FooterLayout";
import { Main } from "./components/Main/Main";
import { SavedMovies } from "./components/SavedMovies/SavedMovies";
import { Movies } from "./components/Movies/Movies";

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
              element={<SavedMovies />} />
            <Route
              path="movies"
              element={<Movies />} />
          </Route>
        </Route>

        <Route
          path="signin"
          element={<Login />} />
        <Route
          path="signup"
          element={<Register />} />
        <Route
          path="*"
          element={<PageNotFound />} />

      </Routes>
    </div>
  );
}

export default App;
