import React from "react";
import { Avatar } from "Components/Image";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./ListJobItem.css";

const ListJobItem = ({ data }) => {
  const { t } = useTranslation();

  const timeCreate = () => {
    let today = new Date();
    let endDay = new Date(data.endDate);
    const diffTime = Math.abs(endDay - today);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const moneyCreate = () => {
    let max = data.salaryMax;
    let min = data.salaryMin;
    if (max && min && max !== min) {
      return `${min} - ${max} ${data.unitName}`;
    } else if (max && min) {
      return `${max} ${data.unitName}`;
    } else if (max && !min) {
      return `${t("business.job.unit.max")} ${max} ${data.unitName}`;
    } else if (!max && min) {
      return `${t("business.job.unit.min")} ${min} ${data.unitName}`;
    } else {
      return `${t("business.job.unit.not")}`;
    }
  };

  return (
    <div className="ListJobItem__bound">
      <Avatar src={data.avatarUrl} width="80px" />
      <div className="ListJobItem__content">
        <div className="ListJobItem__jobName">
          <Link
            to={`/manageJob/jobInfo/${data.jobId}`}
            className="ListJobItem__jobName-link"
          >
            {data.jobName}
          </Link>
        </div>
        <div className="ListJobItem__info">
          <div className="ListJobItem__info-item">{moneyCreate()}</div>
          <div className="ListJobItem__info-item">{data.city.cityName}</div>
        </div>
      </div>
      <div className="ListJobItem__jobTime">
        {`${timeCreate()} ${t("business.company.info.jobDate")}`}
      </div>
    </div>
  );
};

export default React.memo(ListJobItem);
