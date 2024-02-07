import i18next from "i18next";
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ru from './locales/ru';
import io from 'socket.io-client';
import ChatContext from "./context/ChatContext";
import store from "./slices";
import {Provider} from "react-redux";
import App from './components/App';

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

  const socket = io ("/");

  return (
    <ChatContext socket={socket}>
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <App />
            </Provider>
        </I18nextProvider>
    </ChatContext>
  );  
}

export default init;
