import { Button, Form, InputGroup } from "react-bootstrap";
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
import { useRollbar } from '@rollbar/react';

const MessageForm = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const { addNewMessage } = useChatApi();
  const { getUserName } = useAuthorization();
  const currentChannelData = useSelector(currentChannel);
  const refInput = useRef(null);

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

  useEffect(() => {
    refInput?.current?.focus();
  }, [currentChannelData?.id]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate onSubmit={formik.handleSubmit} className="py-1 rounded-2">
        <InputGroup hasValidation={!formik.dirty || !formik.isValid}>
          <Form.Control
            ref={refInput}
            id="text"
            name="text"
            aria-label={t('message.newMessage')}
            className="p-2 ps-2 form-control"
            placeholder={t('message.messageInput')}
            onChange={formik.handleChange}
            value={formik.values.text}
            disabled={formik.isSubmitting}
          />
        <Button variant="group-vertical" type="submit" disabled={!formik.dirty || !formik.isValid}>
          <TbMessage className="add-icon"/>
          <span className="visually-hidden">{t('message.sendMessage')}</span>
        </Button>
      </InputGroup>
    </Form>
  </div>
  );
};

export default MessageForm;