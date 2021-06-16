import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import SubmitToSheet from "../../../utils/SubmitToSheet";

const Property = (props) => {
  const { propertyObject } = props;
  const { propertyAddress, zip5, legalName } = propertyObject;

  const defaultFormState = {
    name: "",
    organization: "",
    email: "",
    propertyShare: "",
    personShare: "",
    formShare: "",
    ownerLegalName: legalName,
    zipCode: zip5,
    propertyAddress: propertyAddress,
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(true);

  const containerStyle = {
    border: "1px solid black",
    padding: "3vw",
    borderRadius: ".5%",
    textAlign: "left",
  };

  const changeHandler = (e) => {
    setSubmitted(false);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSuccess(await SubmitToSheet(Object.values(formState)));
  };

  return (
    <Container style={containerStyle}>
      <h5>Contact Us!</h5>
      <p>
        We may have some mutal interest, consider reaching out to us via this
        form, we only use the information for contact purposes and it will not
        be shared with undesiriables!
      </p>
      <p>
        For total transparency this is entered into a private Google Sheet
        accessible only by a trusted few. The information stored is based in
        part on what you share with us (the form below) and information about
        the property.
      </p>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                onChange={changeHandler}
                name="name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formOrganization">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Organization Name"
                onChange={changeHandler}
                name="organization"
              />
              <Form.Text className="text-muted">
                No worries if you don't have one!
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Email"
                onChange={changeHandler}
                name="email"
              />
              <Form.Text className="text-muted">
                We won't share this, just so we can follow up.
              </Form.Text>
            </Form.Group>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formPropertyShare">
              <Form.Label>Anything to Share about the Property?</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="propertyShare"
                onChange={changeHandler}
              />
              <Form.Text className="text-muted">
                Optional and Confidential.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formPersonShare">
              <Form.Label>Anything to Share about Yourself?</Form.Label>
              <Form.Control
                as="textarea"
                onChange={changeHandler}
                name="personShare"
              />
              <Form.Text className="text-muted">
                Optional and Confidential.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="formShare">
              <Form.Label>Anything else?</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Any other information you may want to share..."
                onChange={changeHandler}
                name="formShare"
              />
              <Form.Text className="text-muted">
                Optional and Confidential.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Form>
          <Col>
            <Button variant="primary" type="submit" onClick={submitHandler}>
              Submit
            </Button>
            <p>{submitted && success ? "Success" : ""}</p>
          </Col>
          <Col />
        </Form>
      </Form>
    </Container>
  );
};

export default Property;
