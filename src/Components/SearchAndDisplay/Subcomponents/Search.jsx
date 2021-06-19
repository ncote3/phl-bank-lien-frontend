import React, { useCallback, useState, useEffect } from "react";
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

  const [sampleAddress, setSampleAddress] = useState("3301-15 N 19TH ST");

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * propertyAddresses.length);
    setSampleAddress(propertyAddresses[index].propertyAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 5000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  return (
    <div className="SearchFormContainer">
      <>
        <Form onSubmit={handleSubmit} className="align-items-center">
          <Row>
            <Col sm={10}>
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
            <Col>
              <Button type="submit" variant="dark" className="SearchFormButton">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    </div>
  );
};

export default Search;
