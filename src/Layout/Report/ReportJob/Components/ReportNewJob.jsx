import React, { useState } from "react";
import { MonthPicker } from "Components/Picker";
import { reportBusiness } from "Business";
import { LineChart } from "Components/Chart";

const ReportNewJob = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async (month) => {
    setLoading(true);
    let result = await reportBusiness.GetNewJobByMonth(month);
    if (result.data.httpCode === 200) {
      setData(result.data.objectData);
    }
    setLoading(false);
  };

  return (
    <div className="mt-3">
      <div className="ms-3 mb-3">
        <MonthPicker getData={getData} />
      </div>
      <LineChart
        data={data}
        loading={loading}
        fieldLabel={{ xField: "date", yField: "totalNewJob" }}
      />
    </div>
  );
};

export default ReportNewJob;
