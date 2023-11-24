import { Outlet, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import Home from "./pages/Home/Home";
import Surah from "./pages/Surah/Surah";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path='/:surahNumber' element={<Surah />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
