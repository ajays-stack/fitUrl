import { Routes, Route, BrowserRouter } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

import Imagetourl from "./pages/Imagetourl";
import ImageConverter from "./pages/ImageConverter";
const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/image" element={<ImageConverter></ImageConverter>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
