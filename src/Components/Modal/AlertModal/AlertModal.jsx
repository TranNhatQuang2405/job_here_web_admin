import React from "react";
import { Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./AlertModal.css";

const AlertModal = ({ data, onHide }) => {
  const listHttpCode = [
    {
      httpCode: 200,
      className: "success",
      variant: "primary",
    },
    {
      httpCode: 400,
      className: "fail",
      variant: "danger",
    },
    {
      httpCode: 401,
      className: "warn",
      variant: "warning",
    },
    {
      httpCode: 403,
      className: "warn",
      variant: "warning",
    },
    {
      httpCode: 406,
      className: "fail",
      variant: "danger",
    },
  ];

  const { variant } = listHttpCode.find((x) => x.httpCode === data.httpCode);
  return (
    <Modal centered show={data.show} onHide={onHide} dialogClassName="modal-90w">
      <Alert
        key={variant}
        variant={variant}
        onClose={onHide}
        className="AlertModal__bound"
        dismissible
      >
        <Alert.Heading>{data.title}</Alert.Heading>
        {data.message}
      </Alert>
    </Modal>
  );
};

export default AlertModal;
