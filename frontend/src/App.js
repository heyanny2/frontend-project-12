import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import NavBar from './components/NavBar/NavBar';
import UserDataContextProvider from './components/context/Provider';

const App = () => {
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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserDataContextProvider>
    </BrowserRouter>
  );  
}

export default App;
