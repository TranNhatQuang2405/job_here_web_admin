import React, { memo, useState, useEffect } from "react";
import "./ManageCompany.css";
import { Table, Form, FormCheck } from "react-bootstrap";
import { Avatar } from "Components/Image";
import { PathTree } from "Components/Path";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { companyBusiness } from "Business";
import Moment from "moment";
import { Link } from "react-router-dom";
import _ from "underscore";
import Pagination from "react-bootstrap/Pagination";
import { AlertModal, ConfirmModal } from "Components/Modal";

const ManageCompany = () => {
  const { t } = useTranslation();
  const [listCompany, setListCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    title: t("admin.manage.company.active"),
    httpCode: 200,
  });
  const [filterData, setFilterData] = useState({
    isActive: false,
    createDate: true,
  });
  const [currentCompany, setCurrentCompany] = useState({});
  const [activePage, setActivePage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    getData();
  }, [activePage, filterData]);

  const getData = async () => {
    setLoading(true);
    let results = await companyBusiness.GetListCompany(
      activePage,
      pageSize,
      filterData.createDate,
      filterData.isActive
    );
    if (results.data.httpCode === 200) {
      let companyListData = results.data?.objectData?.pageData ?? [];
      if (totalPage !== results.data.objectData.totalPage) {
        let newTotalPage = results.data.objectData.totalPage;
        setTotalPage(newTotalPage);
      }
      setListCompany(companyListData);
    }
    setLoading(false);
  };

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setActivePage(page);
    }
  };

  const onChangeFilterIsActive = (e) => {
    setFilterData((prev) => ({
      ...prev,
      isActive: e.target.checked,
      createDate: !e.target.checked,
    }));
  };

  const onChangeFilterCreateDate = (e) => {
    setFilterData((prev) => ({
      ...prev,
      createDate: e.target.checked,
      isActive: !e.target.checked,
    }));
  };

  const onShowActiveConfirm = (companyId, isActive, companyName) => () => {
    setCurrentCompany({
      companyId,
      isActive,
      companyName,
    });
    setShowConfirm(true);
  };

  const onActiveCompany = async () => {
    let result = null;
    if (currentCompany.isActive) {
      result = await companyBusiness.DeactiveCompany(currentCompany.companyId);
    } else {
      result = await companyBusiness.ActiveCompany(currentCompany.companyId);
    }
    if (result) {
      setShowAlert({
        show: true,
        message: result.data.message,
        title: currentCompany.isActive
          ? t("admin.manage.company.deactive")
          : t("admin.manage.company.active"),
        httpCode: result.data.httpCode,
      });
    } else {
      setShowAlert({
        show: true,
        message: currentCompany.isActive
          ? t("admin.manage.company.deactive.fail")
          : t("admin.manage.company.active.fail"),
        title: currentCompany.isActive
          ? t("admin.manage.company.deactive")
          : t("admin.manage.company.active"),
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
      title: currentCompany.isActive
        ? t("admin.manage.company.deactive")
        : t("admin.manage.company.active"),
      httpCode: 200,
    });
  };

  return (
    <div>
      <ConfirmModal
        show={showConfirm}
        title={
          currentCompany.isActive
            ? t("admin.manage.company.deactive")
            : t("admin.manage.company.active")
        }
        content={
          (currentCompany.isActive
            ? t("admin.manage.company.deactive.content")
            : t("admin.manage.company.active.content")) +
          " " +
          currentCompany.companyName +
          "?"
        }
        handleClose={() => setShowConfirm(false)}
        handleSuccess={onActiveCompany}
      />
      <AlertModal data={showAlert} onHide={onCloseAlert} />
      <PathTree />
      <div className="d-flex align-items-center flex-wrap">
        <Form.Check
          className="m-2"
          type="radio"
          name="filter"
          label={t("admin.manage.company.sort.isactive")}
          checked={filterData.isActive}
          onChange={onChangeFilterIsActive}
        />
        <Form.Check
          className="m-2"
          type="radio"
          name="filter"
          label={t("admin.manage.company.sort.createdate")}
          checked={filterData.createDate}
          onChange={onChangeFilterCreateDate}
        />
      </div>
      <Table striped bordered hover size="lg" responsive="sm">
        <thead>
          <tr>
            <th className="text-center listCompany__item-center">#</th>
            <th className="text-center listCompany__item-center">
              {t("admin.manage.company.table.avatar")}
            </th>
            <th className="text-center listCompany__item-center">
              {t("admin.manage.company.table.name")}
            </th>
            <th className="text-center listCompany__item-center">
              {t("admin.manage.company.table.createdDate")}
            </th>
            <th className="text-center listCompany__item-center">
              {t("admin.manage.company.table.size")}
            </th>
            <th className="text-center listCompany__item-center">
              {t("admin.manage.company.table.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && listCompany.length > 0 ? (
            _.map(listCompany, (ele, index) => (
              <tr key={index}>
                <td className="text-center align-self-center listCompany__item-center">
                  <div>{activePage * pageSize + index + 1}</div>
                </td>
                <td className="text-center listCompany__item-center">
                  <Avatar url={ele.avatarUrl} width="80px" className="mx-auto" />
                </td>
                <td className="listCompany__item-center">
                  <Link
                    to={`/companyInfo/${ele.companyId}`}
                    className="listCompany__item-link"
                    target="_blank"
                  >
                    {ele.companyName}
                  </Link>
                </td>
                <td className="text-center listCompany__item-center">
                  <div>{Moment(ele.createdDate).format("DD/MM/YYYY")}</div>
                </td>
                <td className="text-center listCompany__item-center">
                  <div>{ele.size}</div>
                </td>
                <td className="text-center listCompany__item-center">
                  <FormCheck
                    type="switch"
                    checked={ele.isActive}
                    onChange={onShowActiveConfirm(
                      ele.companyId,
                      ele.isActive,
                      ele.companyName
                    )}
                  />
                </td>
              </tr>
            ))
          ) : !loading && listCompany.length === 0 ? (
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

export default memo(ManageCompany);
