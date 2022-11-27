import React, { useState, useEffect } from "react";
import { reportBusiness } from "Business";
import { PieChart } from "Components/Chart";
import _ from "underscore";
import { useTranslation } from "react-i18next";

const ReportTotalCompanyByActive = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    let result = await reportBusiness.GetAllCompanyByActive();
    if (result.data.httpCode === 200) {
      let _data = result?.data?.objectData?.[0] ?? {};
      let _filterData = _.filter(
        _.map(Object.keys(_data), (item) => ({
          type: t(item),
          value: _data[item],
        })),
        (item) => item.type !== t("totalCompany")
      );

      setData(_filterData);
    }
    setLoading(false);
  };

  return (
    <div className="mt-3">
      <PieChart data={data} loading={loading} />
    </div>
  );
};

export default ReportTotalCompanyByActive;
