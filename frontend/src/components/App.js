import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Chat.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import NavBar from './NavBar/NavBar';
import Signup from '../pages/SignUp.jsx';
import { ToastContainer } from 'react-toastify';

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
          <Route path="/signup" element={<Signup />}/>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;