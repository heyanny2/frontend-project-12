import Form from "react-bootstrap/Form";
import { TbMessage } from "react-icons/tb";
import {ChatContext} from "../../../context/ChatContext";
import {useContext} from "react";
import {useFormik} from "formik";
import { useAuthorization, useChatApi } from "../../../hooks/hooks";

const MessageForm = () => {

  const { addNewMessage } = useChatApi();
  const { getUserName } = useAuthorization();

  const formik = useFormik({
    initialValues: { text: "", username: getUserName },
    onSubmit: (values,  { resetForm }) => {
      const { message, username } = values;
      console.log(values)
      try {
        addNewMessage(values);
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
    <button type="submit" className="btn btn-group-vertical">
        <TbMessage className="add-icon"/>
        <span className="visually-hidden">Отправить</span>
    </button>
    </div>
    </Form>
</div>
  )
};

export default MessageForm;