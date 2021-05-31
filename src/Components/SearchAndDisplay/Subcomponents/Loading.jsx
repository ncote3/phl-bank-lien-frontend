import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div style={{ marginTop: "10vh" }}>
      <Container
        className="SearchFormContainer"
        style={{ padding: "2vw", textAlign: "center" }}
      >
        <Spinner animation="border" variant="light" size={"lg"}>
          <span className="sr-only">Getting Search Data From Server...</span>
        </Spinner>
        <p>Getting Search Data From Server...</p>
      </Container>
    </div>
  );
};

export default Loading;
