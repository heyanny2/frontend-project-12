import Form from "react-bootstrap/Form";
import { TbMessage } from "react-icons/tb";
import { useSelector } from "react-redux";
import {currentChannel} from "../../../selectors/selectors"
import {useFormik} from "formik";
import { useAuthorization, useChatApi } from "../../../hooks/hooks";
import { useTranslation } from "react-i18next";
import leoProfanity from 'leo-profanity';
import { useEffect, useRef } from 'react';
import messageSchema from "../../../validation/messageSchema";
import { toast } from "react-toastify";

const MessageForm = () => {

  const { addNewMessage } = useChatApi();
  const { getUserName } = useAuthorization();
  const currentChannelData = useSelector(currentChannel);
  const { t } = useTranslation(); 
  const refInput = useRef(null);

  useEffect(() => {
    refInput?.current?.focus();
  }, [currentChannelData?.id]);

  const formik = useFormik({
    initialValues: { text: '', username: getUserName() },
    validationSchema: messageSchema(t('message.requiredField')),
    onSubmit: async ({ text, username }) => {
      try {
        const message = {
          username,
          text: leoProfanity.clean(text),
          сhannelId: currentChannelData?.id,
        }
        await addNewMessage(message);
        formik.resetForm();
        refInput?.current?.focus();
      } catch {
        toast.error(t('toast.networkError'));
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 rounded-2">
          <div className="input-group has-validation">
            <Form.Control
              ref={refInput}
              id="text"
              name="text"
              aria-label={t('message.newMessage')}
              className="p-2 ps-2 form-control"
              placeholder={t('message.messageInput')}
              onChange={formik.handleChange}
              value={formik.values.text}
            />
        <button type="submit" disabled={formik.isSubmitting} className="p-0 m-2 btn border-0 position-absolute end-0 me-2 add-button">
          <TbMessage className="add-icon"/>
          <span className="visually-hidden">{t('message.sendMessage')}</span>
        </button>
      </div>
    </Form>
  </div>
  );
};

export default MessageForm;