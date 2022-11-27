import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { useTranslation } from "react-i18next";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3 LoadingSpinner__container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{t("jh-loading")}</span>
      </Spinner>
      <p>{t("jh-loading")}</p>
    </div>
  );
};

export default LoadingSpinner;
