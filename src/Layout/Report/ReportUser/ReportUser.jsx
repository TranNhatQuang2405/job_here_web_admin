import React from "react";
import { useTranslation } from "react-i18next";
import { PathTree } from "Components/Path";
import { ReportNewUser } from "./Components";
import { Tab, Tabs } from "react-bootstrap";

const ReportUser = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PathTree />
      <Tabs>
        <Tab eventKey="visit" title={t("admin.report.user.new")}>
          <ReportNewUser />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReportUser;
