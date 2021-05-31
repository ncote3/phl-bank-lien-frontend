import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const PropertyList = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [ownerToDisplay, setOwnerToDisplay] = useState("");

  const { stringMatches } = props;

  const handleMapButton = (e) => {
    e.preventDefault();
    setOwnerToDisplay(e.target.value);
  };

  return (
    <div className="resultsSection">
      <h3>Results</h3>
      {stringMatches.length > 0 ? (
        <div>
          <ListGroup>
            {stringMatches.map((property) => {
              return (
                <ListGroup.Item className="OwnerSearchFormListGroup">
                  <Container fluid>
                    <Row>
                      <Col lg={6} md={6} xs={12}>
                        <p>{property.item}</p>
                      </Col>
                      <Col lg={2} md={2} xs={12}>
                        <Badge variant="secondary">
                          Score: {(100 - property.score * 100).toFixed(2)}
                        </Badge>
                      </Col>
                      <Col lg={2} md={2} xs={12}>
                        <Button
                          onClick={handleMapButton}
                          value={property.item}
                          variant="secondary"
                        >
                          Select
                        </Button>
                      </Col>
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
