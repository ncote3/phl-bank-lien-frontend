import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const Error = () => {
  return (
    <Container className="SearchFormContainer" style={{ padding: "2vw" }}>
      <Alert variant="danger">Error getting search data!</Alert>
    </Container>
  );
};

export default Error;
