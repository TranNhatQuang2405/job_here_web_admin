import Service from "Config/Api/Service";
import {
  genderDropdownURL,
  industryDropdownURL,
  skillDropdownURL,
  experienceDropdownURL,
  titleDropdownURL,
  jobtypeDropdownURL,
  cityDropdownURL,
  unitDropdownURL,
} from "Config/Api/ConfigURL";

class DropdownBusiness extends Service {
  GenderDropdown = async () => {
    let result = await this.get(genderDropdownURL);
    return result;
  };
  IndustryDropdown = async () => {
    let result = await this.get(industryDropdownURL);
    return result;
  };
  ExperienceDropdown = async () => {
    let result = await this.get(experienceDropdownURL);
    return result;
  };
  TitleDropdown = async () => {
    let result = await this.get(titleDropdownURL);
    return result;
  };
  JobtypeDropdown = async () => {
    let result = await this.get(jobtypeDropdownURL);
    return result;
  };
  CityDropdown = async () => {
    let result = await this.get(cityDropdownURL);
    return result;
  };
  UnitDropdown = async () => {
    let result = await this.get(unitDropdownURL);
    return result;
  };
  SkillDropdown = async (id) => {
    let result = await this.get(`${skillDropdownURL}/${id}`);
    return result;
  };
}

const dropdownBusiness = new DropdownBusiness();

export default dropdownBusiness;
