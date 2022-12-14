import Service from "Config/Api/Service";
import { getListUserURL, activeUserURL, deactiveUserURL } from "Config/Api/ConfigURL";

class UserBusiness extends Service {
  GetListUser = async (page, size, roleId, sortCreatedDate, sortIsActice) => {
    let result = await this.get(
      `${getListUserURL}?page=${page}&size=${size}${
        sortCreatedDate !== null ? `&sortCreatedDate=${sortCreatedDate}` : ""
      }${!!roleId ? "&roleId=" + roleId : ""}${
        sortIsActice !== null ? `&sortIsActice=${sortIsActice}` : ""
      }`
    );
    return result;
  };

  ActiveUser = async (userId) => {
    let result = await this.post(`${activeUserURL}/${userId}`);
    return result;
  };

  DeactiveUser = async (userId) => {
    let result = await this.post(`${deactiveUserURL}/${userId}`);
    return result;
  };
}

const userBusiness = new UserBusiness();

export default userBusiness;
