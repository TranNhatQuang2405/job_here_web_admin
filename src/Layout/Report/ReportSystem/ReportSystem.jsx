import React from "react";
import { useTranslation } from "react-i18next";
import { PathTree } from "Components/Path";
import { ReportSystemVisit } from "./Components";
import { Tab, Tabs } from "react-bootstrap";

const ReportSystem = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PathTree />
      <Tabs>
        <Tab eventKey="visit" title={t("admin.report.system.visit")}>
          <ReportSystemVisit />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportSystem;
