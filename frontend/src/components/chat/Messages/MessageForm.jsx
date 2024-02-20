import Form from "react-bootstrap/Form";
import { TbMessage } from "react-icons/tb";
import {SocketContext} from "../../../context/ChatContext";
import {useContext} from "react";
import {useFormik} from "formik";
import {UserDataContext} from "../../../context/UserDataContextProvider";

const MessageForm = () => {

  const { addNewMessage } = useContext(SocketContext);
  const { userData } = useContext(UserDataContext);

  const formik = useFormik({
    initialValues: { message: "", username: userData.username },
    onSubmit: (values,  { resetForm }) => {
      const { message, username } = values;
      console.log(values)
      try {
        addNewMessage(message, username);
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
                id="message"
                type="text"
                name="message"
                aria-label="Новое сообщение"
                className="border-0 p-0 ps-2 form-control"
                placeholder="Введите сообщение..."
                onChange={formik.handleChange}
                value={formik.values.message}
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