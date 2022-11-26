import React from "react";
import { Container } from "react-bootstrap";
import { Body, Footer, Header, MenuBar } from "../";
import "./PageTenplate.css";

const PageTemplate = ({ children }) => {
  return (
    <Container fluid className="Page__body fix_scroll">
      <Header />
      <div className="d-flex">
        <MenuBar />
        <Body>
          {children}
        </Body>
      </div>
      <Footer />
    </Container>
  );
};

export default PageTemplate;
