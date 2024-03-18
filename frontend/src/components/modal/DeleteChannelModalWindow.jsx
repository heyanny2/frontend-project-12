import { Modal } from "react-bootstrap";
import ModalButtton from "../Buttons/ModalButton";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow, setCurrentModalType, setRelevantChannel } from "../../slices/modalWindowSlice";
import { useTranslation } from "react-i18next";
import { useChatApi } from "../../hooks/hooks";


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
        dispatch(closeModalWindow());
        dispatch(setCurrentModalType(null));
        dispatch(setRelevantChannel(null));
    };

    return (
    <Modal show={isModalWindowOpen}>
        <div className="modal-header">
            <div className="modal-title h4">{t('modal.removeChannel')}</div>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalWindow}></button>
        </div>

        <div className="modal-body">
        <p className="lead">{t('modal.sure')}</p>
        <div className="d-flex justify-content-end">
            <ModalButtton title={t('modal.cancelBtn')} priority={false} onClick={handleCloseModalWindow}/>
            <ModalButtton title={t('modal.removeBtn')} priority={true} onClick={() => handleDeleteChannel(relevantChannelId)}/>
        </div>        
        </div>
    </Modal>
    );
}

export default DeleteChannelModalWindow;