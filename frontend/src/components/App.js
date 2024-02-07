import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import './App.css';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import NavBar from './NavBar/NavBar';
import UserDataContextProvider from '../context/UserDataContextProvider';

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
          <UserDataContextProvider>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<ChatPage />}/>
              <Route path="/login" element={<LoginPage />}/>
            </Routes>
          </UserDataContextProvider>
    </BrowserRouter>
  );
}

export default App;