import { withTranslation } from "react-i18next";
import vi_icon from "Assets/Images/vi_icon.png";
import en_icon from "Assets/Images/en_icon.png";
import { changeAcceptLanguage } from "Config/Redux/Slice/HeaderRequestSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangeLanguageButton = (props) => {
  const { i18n } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("vn");
      dispatch(changeAcceptLanguage("vi"));
    } else {
      i18n.changeLanguage("en");
      dispatch(changeAcceptLanguage("en"));
    }
    navigate(0);
  };

  return (
    <div onClick={changeLanguage} style={{ width: 40, alignSelf: "center" }}>
      <img
        alt={i18n.language === "en" ? "Tiếng Việt" : "English"}
        src={i18n.language === "en" ? vi_icon : en_icon}
        className="d-inline-block"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default withTranslation("translations")(ChangeLanguageButton);
