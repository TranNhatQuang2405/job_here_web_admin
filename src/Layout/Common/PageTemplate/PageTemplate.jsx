import React from "react";
import { Container } from "react-bootstrap";
import { Body, Footer, Header } from "../";
import "./PageTenplate.css";

const PageTemplate = ({ children }) => {
  return (
    <Container fluid className="Page__body fix_scroll">
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Container>
  );
};

export default PageTemplate;
