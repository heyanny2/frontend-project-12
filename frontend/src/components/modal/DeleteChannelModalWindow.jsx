import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useChatApi } from '../../hooks/hooks';
import { closeModalWindow } from '../../slices/modalWindowSlice';
import ModalButtton from '../Buttons/ModalButton';

const DeleteChannelModalWindow = () => {
  const { removeSelectedChannel } = useChatApi();
  const dispatch = useDispatch();
  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
  const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);
  const { t } = useTranslation();

  const handleDeleteChannel = (id) => {
    removeSelectedChannel(id);
    dispatch(closeModalWindow());
  };

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow({ type: null, relevantChannel: null }));
  };

  return (
    <Modal show={isModalWindowOpen}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Modal.Title>{t('modal.sure')}</Modal.Title>
        <Modal.Footer>
          <ModalButtton
            title={t('modal.cancelBtn')}
            onClick={handleCloseModalWindow}
          />
          <ModalButtton
            title={t('modal.removeBtn')}
            onClick={() => handleDeleteChannel(relevantChannelId)}
            priority
          />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModalWindow;
