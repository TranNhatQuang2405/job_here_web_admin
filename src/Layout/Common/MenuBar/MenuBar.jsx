import React, { memo } from "react";
import { Menu } from "antd";
import {
  BankOutlined,
  DesktopOutlined,
  UserOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import "./MenuBar.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeCurrentMenuKey } from "Config/Redux/Slice/CurrentMenuKeySlice.js";
import { useTranslation } from "react-i18next";

const MenuBar = () => {
  const { t } = useTranslation();
  const collapsed = useSelector((state) => state.Menu.show);
  const selectedKey = useSelector((state) => state.MenuKey.key);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const items = [
    getItem(t("manageCompany"), "1", <BankOutlined />),
    getItem(t("manageJob"), "2", <DesktopOutlined />),
    getItem(t("manageUser"), "3", <UserOutlined />),
    getItem(t("report"), "sub1", <PieChartOutlined />, [
      getItem(t("reportSystem"), "4"),
      getItem(t("reportCompany"), "5"),
      getItem(t("reportJob"), "6"),
      getItem(t("reportUser"), "7"),
    ]),
  ];

  const onClickItem = (e) => {
    if (e.key === "1") {
      navigate("/manageCompany");
    } else if (e.key === "2") {
      navigate("/manageJob");
    } else if (e.key === "3") {
      navigate("/manageUser");
    } else if (e.key === "4") {
      navigate("/report/reportSystem");
    } else if (e.key === "5") {
      navigate("/report/reportCompany");
    } else if (e.key === "6") {
      navigate("/report/reportJob");
    } else if (e.key === "7") {
      navigate("/report/reportUser");
    }
    dispatch(changeCurrentMenuKey(e.key));
  };

  return (
    <div className="MenuBar__bound">
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={onClickItem}
      />
    </div>
  );
};

export default memo(MenuBar);
