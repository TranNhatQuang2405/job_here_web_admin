import React from "react";
import { Container } from "react-bootstrap";
import { Body, Footer, Header, MenuBar } from "../";
import "./PageTenplate.css";
import { useSelector } from "react-redux";

const PageTemplate = ({ children }) => {
  const showMenu = useSelector((state) => state.Menu.visible);

  return (
    <Container fluid className="Page__body fix_scroll">
      <Header />
      <div className="Page__body-content">
        {showMenu ? <MenuBar  /> : <></>} 
        <Body>
          {children}
        </Body>
      </div>
      <Footer />
    </Container>
  );
};

export default PageTemplate;
