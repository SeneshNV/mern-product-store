import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import CreatePage from "../pages/CreatePage/CreatePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
    </Routes>
  );
}

export default AppRoutes;
