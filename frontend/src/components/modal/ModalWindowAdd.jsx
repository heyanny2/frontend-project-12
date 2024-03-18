import { Modal } from "react-bootstrap";
import ModalButtton from "../Buttons/ModalButton";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow } from "../../slices/modalWindowSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import channelNameShema from "../../validation/channelNameSchema";
import { useState } from "react";
import { channelsNames } from "../../selectors/selectors";

const ModalWindow = () => {
    const { addNewChannel } = useChatApi();
    const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isInvalidChannelName, setInvalidChannelName] = useState(false);
    const channelsNamesList = useSelector(channelsNames);

    const handleCloseModalWindow = () => {
      dispatch(closeModalWindow());
  };

    const formik = useFormik({
        initialValues: { name: "" },
        validationSchema: channelNameShema(channelsNamesList, t('modal.channelNameLength'), t('modal.requiredField'), t('modal.uniqueNameError')),
        onSubmit: async (values) => {
            try {
              setInvalidChannelName(false);
                const channel = {
                    ...values,
                }
                setInvalidChannelName(false);
                await addNewChannel(values);
                handleCloseModalWindow();
              } catch(error) {
                console.log(error)
                setInvalidChannelName(true);
                console.log('error');
                toast.error(t('toast.networkError'));
            }
        },
    });


  return (
    <Modal show={isModalWindowOpen}>
      <div className="modal-header">
        <div className="modal-title h4">{t('modal.createChannel')}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalWindow}></button>
      </div>
      <div className="modal-body">
        <Form onSubmit={formik.handleSubmit} className="py-1 rounded-2">
          <div className="form-group">
            <Form.Control
            id="name"
            type="text"
            name="name"
            aria-label={t('modal.newChannelName')}
            className="p-1 ps-2 form-control"
            placeholder={t('modal.channelNameInput')}
            onChange={formik.handleChange}
            isInvalid={(formik.errors.name && formik.touched.name) || isInvalidChannelName}
            />
            <Form.Label htmlFor="name" className="form-label visually-hidden">
              {t('modal.channelNameInput')}
            </Form.Label>
            <Form.Control.Feedback type="invalid" className="invalid-feedback">
              {formik.errors.name}
            </Form.Control.Feedback>
          </div>
          <div className="d-flex justify-content-end">
            <ModalButtton title={t('modal.cancelBtn')} priority={false} onClick={handleCloseModalWindow}/>
            <ModalButtton title={t('modal.sendBtn')} priority={true} onClick={formik.handleSubmit}/>
          </div>
        </Form>
      </div>
    </Modal>
  );
}

export default ModalWindow;