import React, { useState, useEffect } from "react";
import "./ManageUser.css";
import _ from "underscore";
import { userBusiness } from "Business";
import { Avatar } from "Components/Image";
import Pagination from "react-bootstrap/Pagination";
import { AlertModal, ConfirmModal } from "Components/Modal";
import { PathTree } from "Components/Path";
import { LoadingSpinner } from "Components/Loading";
import { Form, Table, FormCheck } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ManageUser = () => {
  const { t } = useTranslation();
  const [listUser, setListUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    title: t("admin.manage.user.active"),
    httpCode: 200,
  });
  const [currentUser, setCurrentUser] = useState({});
  const listRole = [
    { roleId: 1, roleName: t("admin.manage.user.role.user") },
    { roleId: 2, roleName: t("admin.manage.user.role.recruiter") },
  ];
  const [filterData, setFilterData] = useState({
    role: 1,
    isActive: null,
    createDate: true,
  });
  const [activePage, setActivePage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageSize = 16;
  const sortFilter = [
    { value: 1, label: t("admin.manage.increase") },
    { value: 0, label: t("admin.manage.decrease") },
  ];

  useEffect(() => {
    getData();
  }, [activePage, filterData]);

  const getData = async () => {
    setLoading(true);
    let { role, isActive, createDate } = filterData;
    let results = await userBusiness.GetListUser(
      activePage,
      pageSize,
      role,
      createDate,
      isActive
    );
    if (results.data.httpCode === 200) {
      let userListData = results.data?.objectData?.pageData ?? [];
      if (totalPage !== results.data.objectData.totalPage) {
        let newTotalPage = results.data.objectData.totalPage;
        setTotalPage(newTotalPage);
      }
      setListUser(userListData);
    }
    setLoading(false);
  };

  const onChangeFilterRole = (e) => {
    setActivePage(0);
    setFilterData((prev) => ({ ...prev, role: e.target.value }));
  };

  const onChangeFilterIsActive = (e) => {
    let _inc = filterData.createDate;
    setFilterData((prev) => ({
      ...prev,
      isActive: _inc,
      createDate: null,
    }));
  };

  const onChangeFilterCreateDate = (e) => {
    let _inc = filterData.isActive;
    setFilterData((prev) => ({
      ...prev,
      isActive: null,
      createDate: _inc,
    }));
  };

  const onChangeSort = (e) => {
    let _sort = e.target.value === "1";
    setFilterData((prev) => ({
      ...prev,
      isActive: filterData.isActive !== null ? _sort : null,
      createDate: filterData.createDate !== null ? _sort : null,
    }));
  };

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setActivePage(page);
    }
  };

  const onShowActiveConfirm = (userId, enable, email) => () => {
    setCurrentUser({
      userId,
      enable,
      email,
    });
    setShowConfirm(true);
  };

  const onActiveUser = async () => {
    let result = null;
    if (currentUser.enable) {
      result = await userBusiness.DeactiveUser(currentUser.userId);
    } else {
      result = await userBusiness.ActiveUser(currentUser.userId);
    }
    if (result) {
      setShowAlert({
        show: true,
        message: result.data.message,
        title: currentUser.enable
          ? t("admin.manage.user.deactive")
          : t("admin.manage.user.active"),
        httpCode: result.data.httpCode,
      });
    } else {
      setShowAlert({
        show: true,
        message: currentUser.enable
          ? t("admin.manage.user.deactive.fail")
          : t("admin.manage.user.active.fail"),
        title: currentUser.enable
          ? t("admin.manage.user.deactive")
          : t("admin.manage.user.active"),
        httpCode: 400,
      });
    }
    setShowConfirm(false);
    if (result.data.httpCode === 200) {
      getData();
    }
  };

  const onCloseAlert = () => {
    setShowAlert({
      show: false,
      message: "",
      title: currentUser.enable
        ? t("admin.manage.user.deactive")
        : t("admin.manage.user.active"),
      httpCode: 200,
    });
  };

  return (
    <div>
      <ConfirmModal
        show={showConfirm}
        title={
          currentUser.enable
            ? t("admin.manage.user.deactive")
            : t("admin.manage.user.active")
        }
        content={
          (currentUser.enable
            ? t("admin.manage.user.deactive.content")
            : t("admin.manage.user.active.content")) +
          " " +
          currentUser.email +
          "?"
        }
        handleClose={() => setShowConfirm(false)}
        handleSuccess={onActiveUser}
      />
      <AlertModal data={showAlert} onHide={onCloseAlert} />
      <PathTree />
      <div className="d-flex align-items-center flex-wrap">
        <Form.Select
          onChange={onChangeFilterRole}
          value={filterData.role}
          className="mt-2 mb-2"
        >
          {_.map(listRole, (x, index) => (
            <option key={index} value={x.roleId}>
              {x.roleName}
            </option>
          ))}
        </Form.Select>
        <Form.Check
          className="m-2"
          type="radio"
          name="filter"
          label={t("admin.manage.user.sort.isactive")}
          checked={filterData.isActive !== null}
          onChange={onChangeFilterIsActive}
        />
        <Form.Check
          className="m-2"
          type="radio"
          name="filter"
          label={t("admin.manage.user.sort.createdate")}
          checked={filterData.createDate !== null}
          onChange={onChangeFilterCreateDate}
        />
        <Form.Select onChange={onChangeSort} className="m-2 ManageUser__sort-select">
          {_.map(sortFilter, (x, index) => (
            <option key={index} value={x.value}>
              {x.label}
            </option>
          ))}
        </Form.Select>
      </div>
      <Table striped bordered hover size="lg" responsive="sm">
        <thead>
          <tr>
            <th className="text-center listUser__item-center">#</th>
            <th className="text-center listUser__item-center">
              {t("admin.manage.user.table.avatar")}
            </th>
            <th className="text-center listUser__item-center">
              {t("admin.manage.user.table.fullname")}
            </th>
            <th className="text-center listUser__item-center">
              {t("admin.manage.user.table.email")}
            </th>
            <th className="text-center listUser__item-center">
              {t("admin.manage.user.table.phone")}
            </th>
            <th className="text-center listUser__item-center">
              {t("admin.manage.user.table.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && listUser.length > 0 ? (
            _.map(listUser, (ele, index) => (
              <tr key={index}>
                <td className="text-center align-self-center listUser__item-center">
                  <div>{activePage * pageSize + index + 1}</div>
                </td>
                <td className="text-center listUser__item-center">
                  <Avatar url={ele.imageUrl} width="80px" className="mx-auto" />
                </td>
                <td className="listUser__item-center">
                  <div>{ele.fullname}</div>
                </td>
                <td className="listUser__item-center">
                  <div>{ele.email}</div>
                </td>
                <td className="text-center listUser__item-center">
                  <div>{ele.phone}</div>
                </td>
                <td className="text-center listUser__item-center">
                  <FormCheck
                    type="switch"
                    checked={ele.enable}
                    onChange={onShowActiveConfirm(ele.userId, ele.enable, ele.email)}
                  />
                </td>
              </tr>
            ))
          ) : !loading && listUser.length === 0 ? (
            <tr className="text-center">
              <td colSpan={100}>
                <div>{t("admin.manage.company.table.nothing")}</div>
              </td>
            </tr>
          ) : (
            <tr className="text-center">
              <td colSpan={100}>
                {" "}
                <LoadingSpinner />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center">
        {totalPage > 0 && (
          <Pagination>
            <Pagination.First onClick={onChangePage(0)} />
            <Pagination.Prev onClick={onChangePage(activePage - 1)} />
            {_.map([...Array(totalPage)], (item, index) => (
              <Pagination.Item
                key={index}
                active={index === activePage}
                onClick={onChangePage(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={onChangePage(activePage + 1)} />
            <Pagination.Last onClick={onChangePage(totalPage - 1)} />
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
