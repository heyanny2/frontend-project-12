import Form from "react-bootstrap/Form";
import { TbMessage } from "react-icons/tb";
import { useSelector } from "react-redux";
import {currentChannelSelector} from "../../../selectors/selectors"
import {useFormik} from "formik";
import { useAuthorization, useChatApi } from "../../../hooks/hooks";

const MessageForm = () => {

  const { addNewMessage } = useChatApi();
  const { getUserName } = useAuthorization();
  const currentChannel = useSelector(currentChannelSelector);

  const formik = useFormik({
    initialValues: { text: "", username: getUserName },
    onSubmit: (values,  { resetForm }) => {
      const { message, username } = values;
      console.log(values)
      try {
        const message = {
          ...values,
          сhannelId: currentChannel.id ?? null,
        }
        addNewMessage(message);
        resetForm();
      } catch {
        console.log('error');
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <div className="input-group has-validation">
            <Form.Control
                id="text"
                name="text"
                aria-label="Новое сообщение"
                className="border-0 p-0 ps-2 form-control"
                placeholder="Введите сообщение..."
                onChange={formik.handleChange}
                value={formik.values.text}
            />
    <button type="button" className="p-0 btn btn-link btn-group-vertical add-message-button">
        <TbMessage className="add-icon"/>
        <span className="visually-hidden">Отправить</span>
    </button>
    </div>
    </Form>
</div>
  )
};

export default MessageForm;