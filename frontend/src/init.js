import i18next from "i18next";
import { I18nextProvider, initReactI18next } from 'react-i18next';
import io from 'socket.io-client';
import ChatContextProvider from "./context/ChatContext";
import store from "./slices";
import {Provider} from "react-redux";
import App from './components/App';
import UserDataContextProvider from "./context/UserDataContextProvider";
import resources from './locales/index.js';

const defaultLanguage = 'ru';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: defaultLanguage,
      debug: true,
      resources,
      interpolation: {
        escapeValue: false,
      },
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
