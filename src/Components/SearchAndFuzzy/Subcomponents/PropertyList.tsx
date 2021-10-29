import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const PropertyList = (props: any): JSX.Element => {
  const { stringMatches, setPropertyToDisplay } = props;

  const handleSelectButton = (e: any) => {
    e.preventDefault();
    setPropertyToDisplay(e.target.value);
  };

  return (
    <div style={{ marginTop: "1vw" }}>
      <h3>Results</h3>
      {stringMatches.length > 0 ? (
        <div>
          <ListGroup>
            {stringMatches.map((property: any) => {
              const renderButtonCol = () => {
                return (
                  <Col lg={2} md={2} xs={12}>
                    <Button
                      onClick={handleSelectButton}
                      value={property.item}
                      variant="secondary"
                    >
                      Select
                    </Button>
                  </Col>
                );
              };

              const renderFuzzyInfoCol = () => {
                return (
                  <Col lg={2} md={2} xs={12}>
                    <Badge variant="secondary">
                      Score: {(100 - property.score * 100).toFixed(2)}
                    </Badge>
                  </Col>
                );
              };

              const renderPropertyCol = () => {
                return (
                  <Col lg={6} md={6} xs={12}>
                    <p>{property.item}</p>
                  </Col>
                );
              };

              return (
                <ListGroup.Item
                  className="OwnerSearchFormListGroup"
                  key={property.item}
                >
                  <Container fluid>
                    <Row>
                      {renderPropertyCol()}
                      {renderFuzzyInfoCol()}
                      {renderButtonCol()}
                    </Row>
                  </Container>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      ) : (
        <h5>There were no results.</h5>
      )}
    </div>
  );
};

export default PropertyList;
