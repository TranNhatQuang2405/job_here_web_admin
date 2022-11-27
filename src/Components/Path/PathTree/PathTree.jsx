import React, { useEffect, useState } from "react";
import "./PathTree.css";
import _ from "underscore";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PathTree = ({ lastPath = "", activeCenter, activeStart }) => {
  const location = useLocation();
  const [paths, setPaths] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    let stringPath = location.pathname;
    let tmpPathString = stringPath.split("/");
    let tmpPath = [];
    tmpPathString = tmpPathString.filter((a) => a && a.length > 0);
    tmpPathString.forEach((x) => tmpPath.push({ pathName: x, pathId: x }));
    if (tmpPath && tmpPath.length > 0) {
      let lastVar = tmpPath[tmpPath.length - 1].pathName;
      let isNumeric =
        typeof lastVar === "number" ||
        (typeof lastVar === "string" && lastVar.trim() !== "" && !isNaN(lastVar));
      if (isNumeric) {
        tmpPath[tmpPath.length - 1].pathName = lastPath || tmpPath[tmpPath.length - 1];
      }
    }
    setPaths(tmpPath);
  }, [lastPath, location.pathname]);
  const creatUrl = (child, index) => {
    let url = "";
    if (!activeCenter && index !== paths.length - 1 && index > 0)
      return location.pathname;
    if (!activeStart && index !== paths.length - 1 && index === 0)
      return location.pathname;
    for (let i = 0; i < paths.length; i++) {
      if (paths[i] !== child) {
        url += "/" + paths[i].pathId;
      } else {
        url += "/" + paths[i].pathId;
        break;
      }
    }
    return url;
  };

  return (
    <div className="d-flex mt-3 mb-3 PathTree">
      <div className="PathTree__path">
        <Link to="/Home">{t("admin.homepage")}</Link>
      </div>
      {_.map(paths, (ele, index) => (
        <div
          key={index}
          className={
            index === paths.length - 1 ? "PathTree__last-path" : "PathTree__path"
          }
        >
          <i className="bi bi-chevron-right" />
          <Link to={creatUrl(ele, index)} disabled={index === paths.length - 1}>
            {t(ele.pathName)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PathTree;
