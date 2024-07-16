import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import AmbulatePage from "./components/AmbulatePage/AmbulatePage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/ambulatePage"} element={<AmbulatePage />} />
      </Routes>
    </BrowserRouter>
  );
};
