import React, { useState } from "react";
import { Modal, Alert, Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const ConfirmModal = ({ show, title, content, handleSuccess, handleClose }) => {
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const handleOk = async () => {
    setPending(true);
    await handleSuccess();
    setPending(false);
  };
  return (
    <Modal centered show={show} onHide={handleClose} dialogClassName="modal-90w">
      <Alert onClose={handleClose} className="AlertModal__bound" dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        {content}
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="danger" className="me-2" onClick={handleClose}>
            {t("admin.modal.confirm.no")}
          </Button>
          <Button onClick={handleOk}>
            {pending ? <Spinner animation="border" /> : t("admin.modal.confirm.ok")}
          </Button>
        </div>
      </Alert>
    </Modal>
  );
};

export default ConfirmModal;
