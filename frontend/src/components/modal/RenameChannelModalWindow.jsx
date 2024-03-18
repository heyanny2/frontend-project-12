import { Modal } from "react-bootstrap";
import ModalButtton from "../Buttons/ModalButton";
import Form from "react-bootstrap/Form";
import {useFormik} from "formik";
import { useChatApi } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { closeModalWindow, setCurrentModalType, setRelevantChannel } from "../../slices/modalWindowSlice";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import channelNameShema from "../../validation/channelNameSchema";
import { channelsSelector, channelsNames } from '../../selectors/selectors';

const RenameChannelModalWindow = () => {
  const { renameSelectedChannel } = useChatApi();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isModalWindowOpen = useSelector((state) => state.modalWindow.isOpen);
  const relevantChannelId = useSelector((state) => state.modalWindow.relevantChannel);
  const channelsNamesList = useSelector(channelsNames);
  const channels = useSelector(channelsSelector.selectAll);
  const relevantChannelName = channels.find(({ id }) => id === relevantChannelId).name;

  const handleCloseModalWindow = () => {
    dispatch(closeModalWindow());
    dispatch(setCurrentModalType(null));
    dispatch(setRelevantChannel(null));
  };

  const formik = useFormik({
    initialValues: { name: relevantChannelName },
    validationSchema: channelNameShema(channelsNamesList, t('modal.channelNameLength'), t('modal.requiredField'), t('modal.uniqueNameError')),
    onSubmit: async (values) => {
      const { name } = values;
      try {
        await renameSelectedChannel({ id: relevantChannelId, name });
        handleCloseModalWindow();
        toast.success(t('toast.channelRenaming'));
      } catch {
          toast.error(t('toast.networkError'));
      }
    },
  });

  return (
    <Modal show={isModalWindowOpen}>
      <div className="modal-header">
        <div className="modal-title h4">{t('modal.renameChannel')}</div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModalWindow}></button>
      </div>

      <div className="modal-body">
        <Form noValidate onSubmit={formik.handleSubmit} className="py-1 rounded-2">
            <div className="form-group">
              <Form.Control
              id="name"
              name="name"
              aria-label={t('modal.newChannelName')}
              className="p-1 ps-2 form-control"
              placeholder={t('modal.channelNameInput')}
              onChange={formik.handleChange}
              value={formik.values.channelName}
              />
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

export default RenameChannelModalWindow;