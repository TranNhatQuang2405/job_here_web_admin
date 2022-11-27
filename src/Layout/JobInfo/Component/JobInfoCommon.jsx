import React from "react";
import { Row, Col } from "react-bootstrap/";
import experience from "Assets/Icons/experience.png";
import salary from "Assets/Icons/salary.png";
import level from "Assets/Icons/level.png";
import gender from "Assets/Icons/gender.png";
import group from "Assets/Icons/group.png";
import work from "Assets/Icons/work.png";
import map from "Assets/Icons/map.png";
import suitcase from "Assets/Icons/suitcase.png";
import { Icon } from "Components/Image";
import { useTranslation } from "react-i18next";

const JobInfoCommon = ({ data }) => {
  const { t } = useTranslation();

  const moneyCreate = () => {
    let max = data.salaryMax;
    let min = data.salaryMin;
    if (max && min && max !== min) {
      return `${min} - ${max} ${data.unitName}`;
    } else if (max && min) {
      return `${max} ${data.unitName}`;
    } else if (max && !min) {
      return `${t("admin.job.unit.max")} ${max} ${data.unitName}`;
    } else if (!max && min) {
      return `${t("admin.job.unit.min")} ${min} ${data.unitName}`;
    } else {
      return `${t("admin.job.unit.not")}`;
    }
  };

  return (
    <div className="jobInfo__body-info-common">
      <div className="jobInfo__body-info-common-title">
        {t("admin.job.info.common")}
      </div>
      <div className="jobInfo__body-info-common-body">
        <div className="flex-grow-1">
          <Row>
            <Col lg={6} className="mb-3">
              <div className="jobInfo__common-item">
                <div>
                  <Icon url={salary} width="40px" />
                </div>
                <div className="d-flex-column">
                  <div className="jobInfo__common-item-title">
                    {t("admin.job.info.salary")}
                  </div>
                  <div className="jobInfo__common-item-content">{moneyCreate()}</div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="mb-3">
              <div className="jobInfo__common-item">
                <div>
                  <Icon url={group} width="40px" />
                </div>
                <div className="d-flex-column">
                  <div className="jobInfo__common-item-title">
                    {t("admin.job.info.amount")}
                  </div>
                  <div className="jobInfo__common-item-content">{data.amount}</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="mb-3">
              <div className="jobInfo__common-item">
                <div>
                  <Icon url={work} width="40px" />
                </div>
                <div className="d-flex-column">
                  <div className="jobInfo__common-item-title mb-1">
                    {t("admin.job.info.jobType")}
                  </div>
                  <div className="jobInfo__common-item-content">
                    <div className="jobInfo__common-item-skill">
                      {data.jobTypeNames.map((e, index) => (
                        <div className="jobInfo__body-info-text-border" key={index}>
                          {e.jobTypeName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="mb-3">
              <div className="jobInfo__common-item">
                <div>
                  <Icon url={level} width="40px" />
                </div>
                <div className="d-flex-column">
                  <div className="jobInfo__common-item-title">
                    {t("admin.job.info.level")}
                  </div>
                  <div className="jobInfo__common-item-content">{data.titleName}</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="mb-3">
              <div className="jobInfo__common-item">
                <div>
                  <Icon url={gender} width="40px" />
                </div>
                <div className="d-flex-column">
                  <div className="jobInfo__common-item-title">
                    {t("admin.job.info.gender")}
                  </div>
                  <div className="jobInfo__common-item-content">{data.genderName}</div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="mb-3">
              <div className="jobInfo__common-item">
                <div>
                  <Icon url={experience} width="40px" />
                </div>
                <div className="d-flex-column">
                  <div className="jobInfo__common-item-title mb-1">
                    {t("admin.job.info.experience")}
                  </div>
                  <div className="jobInfo__common-item-content">
                    <div className="jobInfo__common-item-skill">
                      {data.experienceNames.map((e, index) => (
                        <div className="jobInfo__body-info-text-border" key={index}>
                          {e.experienceName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="mb-3">
              <div className="jobInfo__common-item">
                <div>
                  <Icon url={suitcase} width="40px" />
                </div>
                <div className="d-flex-column">
                  <div className="jobInfo__common-item-title mb-1">
                    {t("admin.job.info.skill")}
                  </div>
                  <div className="jobInfo__common-item-skill">
                    {data.jobSkills.map((e, index) => (
                      <div className="jobInfo__body-info-text-border" key={index}>
                        {e.skillName}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="mb-3">
              <div className="jobInfo__common-item">
                <div>
                  <Icon url={map} width="40px" />
                </div>
                <div className="d-flex-column">
                  <div className="jobInfo__common-item-title mb-1">
                    {t("admin.job.info.city")}
                  </div>
                  <div className="jobInfo__common-item-content">{data.cityName}</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default JobInfoCommon;
