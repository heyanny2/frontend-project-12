import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import './App.css';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import NavBar from './NavBar/NavBar';

const App = () =>{
    const ChatPage = () => {
    if (localStorage.getItem('user') === null) {
      return <Navigate to="/login" />
    } else {
      return <Home />
    }
  };

  const LoginPage = () => {
    if (localStorage.getItem('user') !== null) {
      return <Navigate to="/" />
    } else {
      return <Login />
    }
  };

  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<ChatPage />}/>
          <Route path="/login" element={<LoginPage />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;