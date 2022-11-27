import Service from "Config/Api/Service";
import {
  getListJobURL,
  activeJobURL,
  deactiveJobURL,
  getJobInfoURL,
} from "Config/Api/ConfigURL";

class JobBusiness extends Service {
  GetListJob = async (page, size, companyId, sortCreatedDate, sortIsActice) => {
    let result = await this.get(
      `${getListJobURL}?page=${page}&size=${size}${
        sortCreatedDate ? "&sortCreatedDate=true" : ""
      }${!!companyId ? "&companyId=" + companyId : ""}${
        sortIsActice ? "&sortIsActice=true" : ""
      }`
    );
    return result;
  };

  ActiveJob = async (jobId) => {
    let result = await this.post(`${activeJobURL}/${jobId}`);
    return result;
  };

  DeativeJob = async (jobId) => {
    let result = await this.post(`${deactiveJobURL}/${jobId}`);
    return result;
  };

  GetJobInfo = async (jobId) => {
    let result = await this.get(`${getJobInfoURL}/${jobId}`);
    return result;
  };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
