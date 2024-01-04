import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import NavBar from './components/NavBar/NavBar';
import UserDataContextProvider from './components/context/Provider';
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ru from './locales/ru';




const App =  () => {
  // async
  // const defaultLanguage = 'ru';
  // const i18n = i18next.createInstance();

  // await i18n
  // .use(initReactI18next)
  // .init({
  //   lng: defaultLanguage,
  //   debug: true,
  //   ru,
  // });


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
