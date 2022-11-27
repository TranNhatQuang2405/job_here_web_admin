import React from "react";
import { useTranslation } from "react-i18next";
import { PathTree } from "Components/Path";
import {
  ReportNewJob,
  ReportTotalJobByActive,
  ReportTotalJobByEndDate,
} from "./Components";
import { Tab, Tabs } from "react-bootstrap";

const ReportJob = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PathTree />
      <Tabs>
        <Tab eventKey="visit" title={t("admin.report.job.new")}>
          <ReportNewJob />
        </Tab>
        <Tab eventKey="byactive" title={t("admin.report.job.byactive")}>
          <ReportTotalJobByActive />
        </Tab>
        <Tab eventKey="byendate" title={t("admin.report.job.byenddate")}>
          <ReportTotalJobByEndDate />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportJob;
