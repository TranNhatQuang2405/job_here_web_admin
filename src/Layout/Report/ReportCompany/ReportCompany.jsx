import React from "react";
import { useTranslation } from "react-i18next";
import { PathTree } from "Components/Path";
import { ReportNewCompany, ReportTotalCompanyByActive } from "./Components";
import { Tab, Tabs } from "react-bootstrap";

const ReportCompany = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PathTree />
      <Tabs>
        <Tab eventKey="new" title={t("admin.report.company.new")}>
          <ReportNewCompany />
        </Tab>
        <Tab eventKey="byactive" title={t("admin.report.company.byactive")}>
          <ReportTotalCompanyByActive />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportCompany;
