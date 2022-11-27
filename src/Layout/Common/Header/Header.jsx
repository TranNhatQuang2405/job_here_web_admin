import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ChangeLanguageButton } from "Components/Button";
import { useNavigate } from "react-router-dom";
import user_img from "Assets/Images/user.png";
import "./Header.css";
import { Logo } from "..";
import { Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPage } from "Config/Redux/Slice/CurrentPageSlice";
import { toggleMenu } from "Config/Redux/Slice/MenuSlice";
import { LogOut } from "Config/Redux/Slice/UserSlice";
import { changeToken } from "Config/Redux/Slice/HeaderRequestSlice";
import { memo } from "react";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.User.sessionInfo);
  const collapsed = useSelector((state) => state.Menu.show);

  const onLogout = () => {
    dispatch(changeToken(""));
    dispatch(LogOut());
    dispatch(changeCurrentPage(1));
    navigate("/SignIn");
  };

  const onToggleMenu = () => {
    dispatch(toggleMenu());
  };
  return (
    <Row className="sticky-nav m-0">
      <Col className="bg-app-dark d-flex">
        <div className="Header__toggleMenu-layout">
          <Button
            type="primary"
            onClick={onToggleMenu}
            className="Header__toggleMenu-btn"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <Navbar expand="lg" variant="dark" className="Header__layout">
          <Navbar.Brand href="/" className="d-flex flex-row align-items-center">
            <Logo isDark />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {/* <Nav className="me-auto">
              <Link className="nav-link" to="/manageCompany">
                {t("admin.nav.company")}
              </Link>
              <Link className="nav-link" to="/manageJob">
                {t("admin.nav.job")}
              </Link>
              <Link className="nav-link" to="/manageUser">
                {t("admin.nav.user")}
              </Link>
            </Nav> */}
            <Nav className="justify-content-end">
              {userInfo ? (
                <NavDropdown
                  title={
                    <div className="d-flex flex-row align-items-center">
                      <img
                        alt=""
                        src={user_img}
                        width="40"
                        height="40"
                        className="d-inline-block rounded-circle"
                      />
                      <p className="mb-0 ms-2 Header__layout-text">
                        {(userInfo && userInfo.fullname) || t("Your Profile")}
                      </p>
                    </div>
                  }
                  id="basic-nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item onClick={onLogout}>{t("Logout")}</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <></>
              )}
              <Nav className="justify-content-end">
                <ChangeLanguageButton />
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    </Row>
  );
};

export default memo(Header);
