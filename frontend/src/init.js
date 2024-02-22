import i18next from "i18next";
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ru from './locales/ru';
import io from 'socket.io-client';
import ChatContextProvider from "./context/ChatContext";
import store from "./slices";
import {Provider} from "react-redux";
import App from './components/App';
import UserDataContextProvider from "./context/UserDataContextProvider";

const init = async () => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: defaultLanguage,
      debug: true,
      ru,
  });

  const socket = io('/', { autoConnect: false });

  return (
    <Provider store={store}>
      <UserDataContextProvider>
        <ChatContextProvider socket={socket}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ChatContextProvider>
      </UserDataContextProvider>
    </Provider>
  );  
}

export default init;
