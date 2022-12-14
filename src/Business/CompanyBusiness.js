import Service from "Config/Api/Service";
import {
  getListCompanyURL,
  activeCompanyURL,
  deactiveCompanyURL,
  getCompanyInfoURL,
  getAllJobOfCompanyURL,
} from "Config/Api/ConfigURL";

class CompanyBusiness extends Service {
  GetListCompany = async (page, size, sortCreatedDate, sortIsActice) => {
    let result = await this.get(
      `${getListCompanyURL}?page=${page}&size=${size}${
        sortCreatedDate !== null ? `&sortCreatedDate=${sortCreatedDate}` : ""
      }${sortIsActice !== null ? `&sortIsActice=${sortIsActice}` : ""}`
    );
    return result;
  };

  ActiveCompany = async (companyId) => {
    let result = await this.post(`${activeCompanyURL}/${companyId}`);
    return result;
  };

  DeactiveCompany = async (companyId) => {
    let result = await this.post(`${deactiveCompanyURL}/${companyId}`);
    return result;
  };

  GetCompanyInfo = async (id) => {
    let result = await this.get(`${getCompanyInfoURL}/${id}`);
    return result;
  };

  GetAllJobOfCompany = async (id) => {
    let result = await this.get(`${getAllJobOfCompanyURL}/${id}`);
    return result;
  };
}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
