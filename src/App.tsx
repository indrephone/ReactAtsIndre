import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import MainOutlet from './components/outlets/MainOutlet';
import Home from './components/pages/Home';


const App = () => {
  return (
    <>
     <Routes>
       <Route path="login" element={<Login />} />
       <Route path="register" element={<Register />} />
       <Route element={<MainOutlet />}>
          <Route index element={<Home />} />
       </Route>
     </Routes>
    </>
  );
}

export default App;
