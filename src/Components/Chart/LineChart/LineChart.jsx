import React from "react";
import { Line } from "@ant-design/plots";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";

const LineChart = ({ data = [], loading = false, fieldLabel = {} }) => {
  const { t } = useTranslation();

  const config = {
    data,
    height: 300,
    padding: "auto",
    xField: fieldLabel.xField,
    yField: fieldLabel.yField,
    xAxis: {
      tickCount: 5,
    },
    lineStyle: {
      lineWidth: 4,
    },
    meta: {
      [fieldLabel.yField]: {
        alias: fieldLabel.alias,
      },
    },
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : data.length > 0 ? (
        <div className="p-3 plots__container">
          <Line {...config} />
        </div>
      ) : (
        <div className="ps-3">
          <p>{t("admin.report.nodata")}</p>
        </div>
      )}
    </div>
  );
};

export default LineChart;
