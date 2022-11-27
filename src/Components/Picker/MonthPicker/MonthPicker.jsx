import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const MonthPicker = ({ getData }) => {
  const [timeData, setTimeData] = useState(dayjs(new Date()));

  useEffect(() => {
    let dateString = dayjs(timeData).format("YYYY-MM");
    if (dateString !== "Invalid Date") {
      getData(dateString);
    }
  }, [timeData]);

  const onChange = (date, dateString) => {
    if (date) {
      setTimeData(date);
    }
  };

  return (
    <div>
      <DatePicker onChange={onChange} value={timeData} picker="month" />
    </div>
  );
};

export default MonthPicker;
