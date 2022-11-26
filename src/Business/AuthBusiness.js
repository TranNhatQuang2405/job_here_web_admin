import Service from "Config/Api/Service";
import { signInURL, getSessionURL, signUpURL } from "Config/Api/ConfigURL";

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

  SignUp = async (email, password, fullname, dateOfBirth, phone) => {
    let params = {
      email: email,
      password: password,
      fullname: fullname,
      dateOfBirth: dateOfBirth,
      phone: phone,
    };
    let result = await this.post(signUpURL, params);
    return result;
  };
}

const authBusiness = new AuthBusiness();

export default authBusiness;
