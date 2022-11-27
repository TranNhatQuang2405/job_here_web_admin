import React, { useEffect, useState } from "react";
import { Avatar } from "Components/Image";
import { PathTree } from "Components/Path";
import { Row, Col, Container } from "react-bootstrap";
import background from "Assets/Images/background.jpg";
import "./CompanyInfo.css";
import { Link45deg, Building, GeoAltFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { companyBusiness } from "Business";
import { useLocation } from "react-router-dom";
import { ListJob } from "./Component";
import { LoadingSpinner } from "Components/Loading";

const CompanyInfo = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [companyInfo, setCompanyInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    const first = async () => {
      let stringPath = location.pathname;
      let tmpPath = stringPath.split("/");
      let companyId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0;
      let result = await companyBusiness.GetCompanyInfo(companyId);
      if (result.data.httpCode === 200) {
        setCompanyInfo(result.data.objectData);
      } else {
        setCompanyInfo({});
      }
      setLoading(false);
    };
    if (isSubscribed) first();
    return () => {
      isSubscribed = false;
    };
  }, [location.pathname]);

  return (
    <div>
      <PathTree lastPath={companyInfo.companyName || t("admin.company.info.about")} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="companyInfo__header">
            <img
              src={companyInfo.backgroundUrl || `${background}`}
              alt="BACKGROUND"
              className="companyInfo__header-background"
            ></img>
            <div className="companyInfo__header-content-bound">
              <Avatar
                width="150px"
                url={companyInfo.avatarUrl}
                className="companyInfo__header-avatar"
              />
              <Row className="companyInfo__header-content">
                <Col lg={12} className="companyInfo__header-companyName">
                  {companyInfo.companyName}
                </Col>
                {!!companyInfo.urlCompany && (
                  <Col lg={4} xs={12} className="companyInfo__header-text">
                    <Link45deg size={20} className="me-2" />
                    <span>{companyInfo.urlCompany}</span>
                  </Col>
                )}
                {!!companyInfo.size && (
                  <Col lg={4} xs={12} className="companyInfo__header-text">
                    <Building size={20} className="me-2" />
                    <span>{companyInfo.size}</span>
                  </Col>
                )}
                {!!companyInfo.address && (
                  <Col lg={12} xs={12} className="companyInfo__header-text">
                    <GeoAltFill size={20} className="me-2" />
                    <span>{companyInfo.address}</span>
                  </Col>
                )}
              </Row>
            </div>
          </div>
          <Container className="companyInfo__body mb-3" fluid>
            <Row>
              <Col lg={8} className="companyInfo__body-left">
                <div>
                  <div className="companyInfo__body-title">
                    <span className="companyInfo__body-title-line"></span>
                    {t("admin.company.info.about")}
                  </div>
                  <div
                    className="companyInfo__body-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        companyInfo.description || t("admin.company.info.noDescription"),
                    }}
                  ></div>
                </div>
              </Col>
              <Col lg={4} className="companyInfo__body-right-bound">
                <Row>
                  <Col className="companyInfo__body-right">
                    <div className="companyInfo__body-title">
                      <span className="companyInfo__body-title-line"></span>
                      {t("admin.company.info.job")}
                    </div>
                    <div className="companyInfo__body-content">
                      <ListJob companyId={companyInfo.companyId} />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;
