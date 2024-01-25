import Form from "react-bootstrap/Form";
import { TbMessage } from "react-icons/tb";

const MessageForm = () => {
  return (
    <div className="mt-auto px-5 py-3">
    <Form noValidate className="py-1 border rounded-2">
        <div className="input-group has-validation">
            <Form.Control
                id="message"
                type="text"
                name="body"
                aria-label="Новое сообщение"
                className="border-0 p-0 ps-2 form-control"
                placeholder="Введите сообщение..."
            />
        </div>
    </Form>
    <button type="submit" className="btn btn-group-vertical" disabled>
        <TbMessage className="add-message-icon"/>
        <span className="visually-hidden">Отправить</span>
    </button>
</div>
  )
};

export default MessageForm;