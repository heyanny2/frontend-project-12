import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from '../pages/Chat.jsx';
import Login from '../pages/Login.jsx';
import NotFound from '../pages/NotFound.jsx';
import NavBar from './NavBar/NavBar';
import Signup from '../pages/SignUp.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthorization } from '../hooks/hooks.js';
import { ToastContainer } from 'react-toastify';
import { appRoutes } from '../routes/index.js';

const ChatPage = () => {
  if (!useAuthorization().userData) {
    return <Navigate to={appRoutes.loginPagePath()} />
  } else {
    return <Chat />
  }
};

const LoginPage = () => {
  if (useAuthorization().userData) {
    return <Navigate to={appRoutes.chatPagePath()} />
  } else {
    return <Login />
  }
};

const App = () =>{

  return (
    <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path={appRoutes.chatPagePath()} element={<ChatPage />}/>
          <Route path={appRoutes.loginPagePath()} element={<LoginPage />}/>
          <Route path={appRoutes.signupPagePath()} element={<Signup />}/>
        </Routes>
        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;