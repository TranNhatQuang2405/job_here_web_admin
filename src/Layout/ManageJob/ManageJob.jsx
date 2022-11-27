import React, { memo, useState, useEffect } from "react";
import "./ManageJob.css";
import { useTranslation } from "react-i18next";
import { Form, Table, FormCheck } from "react-bootstrap";
import { PathTree } from "Components/Path";
import { LoadingSpinner } from "Components/Loading";
import { companyBusiness, jobBusiness } from "Business";
import _ from "underscore";
import Pagination from "react-bootstrap/Pagination";
import { AlertModal, ConfirmModal } from "Components/Modal";
import { Link } from "react-router-dom";
import Moment from "moment";

const ManageJob = () => {
  const { t } = useTranslation();
  const [listJob, setListJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    title: t("admin.manage.job.active"),
    httpCode: 200,
  });
  const [listCompany, setListCompany] = useState([]);
  const [filterData, setFilterData] = useState({
    company: 0,
    isActive: true,
    createDate: true,
  });
  const [currentJob, setCurrentJob] = useState({});
  const [activePage, setActivePage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageSize = 16;

  useEffect(() => {
    const getFilterData = async () => {
      setLoading(true);
      let results = await companyBusiness.GetListCompany(0, 100);
      if (results.data.httpCode === 200) {
        let companyListData = results.data?.objectData?.pageData ?? [];
        companyListData.unshift({
          companyId: 0,
          companyName: t("admin.manage.job.allcompany"),
        });
        setListCompany(companyListData);
      }
      setLoading(false);
    };
    getFilterData();
  }, []);

  useEffect(() => {
    getData();
  }, [activePage, filterData]);

  const getData = async () => {
    setLoading(true);
    let { company, isActive, createDate } = filterData;
    let results = await jobBusiness.GetListJob(
      activePage,
      pageSize,
      company,
      createDate,
      isActive
    );
    if (results.data.httpCode === 200) {
      let companyListData = results.data?.objectData?.pageData ?? [];
      if (totalPage !== results.data.objectData.totalPage) {
        let newTotalPage = results.data.objectData.totalPage;
        setTotalPage(newTotalPage);
      }
      setListJob(companyListData);
    }
    setLoading(false);
  };

  const onChangeFilterCompany = (e) => {
    setActivePage(0);
    setFilterData((prev) => ({ ...prev, company: e.target.value }));
  };

  const onChangeFilterIsActive = (e) => {
    setFilterData((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  const onChangeFilterCreateDate = (e) => {
    setFilterData((prev) => ({ ...prev, createDate: e.target.checked }));
  };

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setActivePage(page);
    }
  };

  const onShowActiveConfirm = (jobId, isActive, jobName) => () => {
    setCurrentJob({
      jobId,
      isActive,
      jobName,
    });
    setShowConfirm(true);
  };

  const onActiveJob = async () => {
    let result = null;
    if (currentJob.isActive) {
      result = await jobBusiness.DeativeJob(currentJob.jobId);
    } else {
      result = await jobBusiness.ActiveJob(currentJob.jobId);
    }
    if (result) {
      setShowAlert({
        show: true,
        message: result.data.message,
        title: currentJob.isActive
          ? t("admin.manage.job.deactive")
          : t("admin.manage.job.active"),
        httpCode: result.data.httpCode,
      });
    } else {
      setShowAlert({
        show: true,
        message: currentJob.isActive
          ? t("admin.manage.job.deactive.fail")
          : t("admin.manage.job.active.fail"),
        title: currentJob.isActive
          ? t("admin.manage.job.deactive")
          : t("admin.manage.job.active"),
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
      title: currentJob.isActive
        ? t("admin.manage.job.deactive")
        : t("admin.manage.job.active"),
      httpCode: 200,
    });
  };

  return (
    <div>
      <ConfirmModal
        show={showConfirm}
        title={
          currentJob.isActive
            ? t("admin.manage.job.deactive")
            : t("admin.manage.job.active")
        }
        content={
          (currentJob.isActive
            ? t("admin.manage.job.deactive.content")
            : t("admin.manage.job.active.content")) +
          " " +
          currentJob.jobName +
          "?"
        }
        handleClose={() => setShowConfirm(false)}
        handleSuccess={onActiveJob}
      />
      <AlertModal data={showAlert} onHide={onCloseAlert} />
      <PathTree />
      <div className="d-flex align-items-center flex-wrap">
        <Form.Select
          onChange={onChangeFilterCompany}
          value={filterData.company}
          className="mt-2 mb-2"
        >
          {_.map(listCompany, (x, index) => (
            <option key={index} value={x.companyId}>
              {x.companyName}
            </option>
          ))}
        </Form.Select>
        <FormCheck
          className="m-2"
          type="checkbox"
          label={t("admin.manage.job.sort.isactive")}
          checked={filterData.isActive}
          onChange={onChangeFilterIsActive}
        />
        <FormCheck
          className="m-2"
          type="checkbox"
          label={t("admin.manage.job.sort.createdate")}
          checked={filterData.createDate}
          onChange={onChangeFilterCreateDate}
        />
      </div>
      <Table striped bordered hover size="lg" responsive="sm">
        <thead>
          <tr>
            <th className="text-center listJob__item-center">#</th>
            <th className="text-center listJob__item-center">
              {t("admin.manage.job.table.avatar")}
            </th>
            <th className="text-center listJob__item-center">
              {t("admin.manage.job.table.name")}
            </th>
            <th className="text-center listJob__item-center">
              {t("admin.manage.job.table.createdDate")}
            </th>
            <th className="text-center listJob__item-center">
              {t("admin.manage.job.table.endDate")}
            </th>
            <th className="text-center listJob__item-center">
              {t("admin.manage.job.table.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && listJob.length > 0 ? (
            _.map(listJob, (ele, index) => (
              <tr key={index}>
                <td className="text-center align-self-center listJob__item-center">
                  <div>{activePage * pageSize + index + 1}</div>
                </td>
                <td className="text-center listJob__item-center">
                  <Link
                    to={`/companyInfo/${ele.companyId}`}
                    className="listJob__item-link"
                    target="_blank"
                  >
                    {ele.companyName}
                  </Link>
                </td>
                <td className="listJob__item-center">
                  <Link
                    to={`/jobInfo/${ele.jobId}`}
                    className="listJob__item-link"
                    target="_blank"
                  >
                    {ele.jobName}
                  </Link>
                </td>
                <td className="text-center listJob__item-center">
                  <div>{Moment(ele.createDate).format("DD/MM/YYYY")}</div>
                </td>
                <td className="text-center listJob__item-center">
                  <div>{Moment(ele.endDate).format("DD/MM/YYYY")}</div>
                </td>
                <td className="text-center listJob__item-center">
                  <FormCheck
                    type="switch"
                    checked={ele.isActive}
                    onChange={onShowActiveConfirm(ele.jobId, ele.isActive, ele.jobName)}
                  />
                </td>
              </tr>
            ))
          ) : !loading && listJob.length === 0 ? (
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

export default memo(ManageJob);
