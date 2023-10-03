import "./App.css"
import {
  Route,
  Routes,
} from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="body">
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<></>} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
