
import {Routes,Route,BrowserRouter} from 'react-router'
import Home from './pages/Home';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
const App = () => {

  

  return (
    <BrowserRouter>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
