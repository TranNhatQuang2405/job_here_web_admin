import Service from "Config/Api/Service";
import {
  getVisitByMonth,
  getNewUserByMonth,
  getNewJobByMonth,
  getNewCompanyByMonth,
  getTotalJobByActive,
  getTotalJobByEndDate,
  getTotalCompanyByActive,
} from "Config/Api/ConfigURL";

class ReportBusiness extends Service {
  GetVisitByMonth = async (month) => {
    let result = await this.get(`${getVisitByMonth}/${month}`);
    return result;
  };

  GetNewUserByMonth = async (month) => {
    let result = await this.get(`${getNewUserByMonth}/${month}`);
    return result;
  };

  GetNewJobByMonth = async (month) => {
    let result = await this.get(`${getNewJobByMonth}/${month}`);
    return result;
  };

  GetTotalJobByActive = async () => {
    let result = await this.get(getTotalJobByActive);
    return result;
  };

  GetTotalJobByEndDate = async () => {
    let result = await this.get(getTotalJobByEndDate);
    return result;
  };

  GetNewCompanyByMonth = async (month) => {
    let result = await this.get(`${getNewCompanyByMonth}/${month}`);
    return result;
  };

  GetAllCompanyByActive = async () => {
    let result = await this.get(getTotalCompanyByActive);
    return result;
  };
}

const reportBusiness = new ReportBusiness();

export default reportBusiness;
