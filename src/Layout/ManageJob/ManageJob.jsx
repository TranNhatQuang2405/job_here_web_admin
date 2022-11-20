import React, { memo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import _ from "underscore";

const ManageJob = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h4>{t("admin.nav.company")}</h4>
    </div>
  );
};

export default memo(ManageJob);
