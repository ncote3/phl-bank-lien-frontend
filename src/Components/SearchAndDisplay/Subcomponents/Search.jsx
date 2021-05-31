import React, { useCallback, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Search = (props) => {
  const {
    handleSubmit,
    handleInputChange,
    propertyAddresses,
    cyclePlaceholder,
    placeholder,
  } = props;

  const [sampleAddress, setSampleAddress] = useState(
    propertyAddresses[Math.floor(Math.random() * propertyAddresses.length)]
  );

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * propertyAddresses.length);
    setSampleAddress(propertyAddresses[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 2000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <div className="SearchFormContainer">
      <Container>
        <h1>Owner Search Form</h1>
        <Form inline onSubmit={handleSubmit}>
          <Row className="SearchFormFormRow">
            <Col lg={10} noGutters={true}>
              <Form.Control
                id="OwnerSearchForm"
                placeholder={
                  !cyclePlaceholder && placeholder ? placeholder : sampleAddress
                }
                onChange={handleInputChange}
                className="SearchFormForm"
              />
              <Form.Text className="text-muted">
                We respect your privacy, this search will not be recorded.
              </Form.Text>
            </Col>
            <Col lg={2}>
              <Button type="submit" variant="dark" className="SearchFormButton">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Search;
