import React from "react";
import { useTranslation } from "react-i18next";
const JobInfoDetail = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="jobInfo__body-detail">
      <div className="jobInfo__body-info-common-title mb-2">
        {t("admin.job.info.description")}
      </div>
      <div
        className="jobInfo__body-detail-text"
        dangerouslySetInnerHTML={{
          __html: data.description || t("admin.job.info.noDescription"),
        }}
      ></div>
      <div className="jobInfo__body-info-common-title mb-2">
        {t("admin.job.info.require")}
      </div>
      <div
        className="jobInfo__body-detail-text"
        dangerouslySetInnerHTML={{
          __html: data.require || t("admin.job.info.noRequire"),
        }}
      ></div>
      <div className="jobInfo__body-info-common-title mb-2">
        {t("admin.job.info.benefit")}
      </div>
      <div
        className="jobInfo__body-detail-text"
        dangerouslySetInnerHTML={{
          __html: data.benefit || t("admin.job.info.noBenefit"),
        }}
      ></div>
    </div>
  );
};

export default JobInfoDetail;
