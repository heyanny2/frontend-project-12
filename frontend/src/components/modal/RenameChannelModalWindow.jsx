import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRef, useEffect } from 'react';
import leoProfanity from 'leo-profanity';
import channelNameShema from '../../validation/channelNameSchema';
import { channelsSelector, channelsNames } from '../../selectors/selectors';
import { closeModalWindow } from '../../slices/modalWindowSlice';
import { useChatApi } from '../../hooks/hooks';
import ModalButtton from '../Buttons/ModalButton';

const RenameChannelModalWindow = () => {
  const { renameSelectedChannel } = useChatApi();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
  const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);
  const channelsNamesList = useSelector(channelsNames);
  const channels = useSelector(channelsSelector.selectAll);
  const relevantChannelName = channels.find(({ id }) => id === relevantChannelId).name;
  const refModalInput = useRef(null);

  useEffect(() => {
    if (refModalInput.current) {
      refModalInput.current.focus();
      refModalInput.current.select();
    }
  }, []);

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow({ type: null, relevantChannel: null }));
  };

  const formik = useFormik({
    initialValues: { name: relevantChannelName },
    validationSchema:
    channelNameShema(
      channelsNamesList,
      t('modal.channelNameLength'),
      t('modal.requiredField'),
      t('modal.uniqueNameError'),
    ),
    onSubmit: async (values) => {
      const { name } = values;
      const filteredRename = leoProfanity.clean(name);
      try {
        await renameSelectedChannel({ id: relevantChannelId, name: filteredRename });
        handleCloseModalWindow();
        toast.success(t('toast.channelRenaming'));
      } catch {
        toast.error(t('toast.networkError'));
      }
    },
  });

  return (
    <Modal show={isModalWindowOpen} onHide={handleCloseModalWindow}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
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
              placeholder={t('modal.channelNameInput')}
              onChange={formik.handleChange}
              isInvalid={(formik.errors.name && formik.touched.name)}
              value={formik.values.name}
            />
            <Form.Label visuallyHidden>{t('modal.channelNameInput')}</Form.Label>
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

export default RenameChannelModalWindow;
