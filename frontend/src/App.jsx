import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
    </>
  );
}

export default App;
