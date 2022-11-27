import React from "react";
import { useTranslation } from "react-i18next";
import { PathTree } from "Components/Path";
import { ReportNewCompany } from "./Components";
import { Tab, Tabs } from "react-bootstrap";

const ReportCompany = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PathTree />
      <Tabs>
        <Tab eventKey="visit" title={t("admin.report.company.new")}>
          <ReportNewCompany />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportCompany;
