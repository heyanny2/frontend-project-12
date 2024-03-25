import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useChatApi } from '../../hooks/hooks';
import ModalButtton from '../Buttons/ModalButton';
import channelNameShema from '../../validation/channelNameSchema';
import { closeModalWindow } from '../../slices/modalWindowSlice';
import { channelsNames } from '../../selectors/selectors';

const AddModalWindow = () => {
  const { addNewChannel } = useChatApi();
  const rollbar = useRollbar();
  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsNamesList = useSelector(channelsNames);
  const refModalInput = useRef(null);

  useEffect(() => {
    if (refModalInput.current) {
      refModalInput.current.focus();
    }
  }, []);

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow());
  };

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema:
    channelNameShema(
      channelsNamesList,
      t('modal.channelNameLength'),
      t('modal.requiredField'),
      t('modal.uniqueNameError'),
    ),
    onSubmit: async (values) => {
      try {
        await addNewChannel(values);
        handleCloseModalWindow();
        toast.success(t('toast.channelCreation'));
      } catch (error) {
        toast.error(t('toast.networkError'));
        rollbar.error('AddChannel', error);
      }
    },
  });

  return (
    <Modal show={isModalWindowOpen} onHide={handleCloseModalWindow}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.createChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              ref={refModalInput}
              id="name"
              type="text"
              name="name"
              aria-label={t('modal.channelNameInput')}
              className="p-2 ps-2 form-control"
              onChange={formik.handleChange}
              isInvalid={(formik.errors.name && formik.touched.name)}
            />
            <Form.Label visuallyHidden>
              {t('modal.channelNameInput')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <Modal.Footer>
              <ModalButtton
                title={t('modal.cancelBtn')}
                onClick={handleCloseModalWindow}
              />
              <ModalButtton
                title={t('modal.sendBtn')}
                onClick={formik.handleSubmit}
                priority
              />
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModalWindow;
