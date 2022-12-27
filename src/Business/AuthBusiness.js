import Service from "Config/Api/Service";
import { signInURL, getSessionURL } from "Config/Api/ConfigURL";

class AuthBusiness extends Service {
  SignIn = async (email, password) => {
    let params = {
      email: email,
      password: password,
    };
    let result = await this.post(signInURL, params);
    return result;
  };

  GetSession = async () => {
    let result = await this.get(getSessionURL);
    return result;
  };
}

const authBusiness = new AuthBusiness();

export default authBusiness;
