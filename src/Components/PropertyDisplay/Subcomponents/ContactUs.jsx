import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import SubmitToSheet from "../../../utils/SubmitToSheet";
import * as styles from "../styles";

const ContactUs = (props) => {
  const { propertyObject } = props;
  const { propertyAddress, zip5, legalName } = propertyObject;

  const defaultFormState = {
    name: "",
    organization: "",
    email: "",
    propertyShare: "",
    ownerLegalName: legalName,
    zipCode: zip5,
    propertyAddress: propertyAddress,
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(true);

  const changeHandler = (e) => {
    setSubmitted(false);
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const contactFormRows = [
    [
      [
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            onChange={changeHandler}
            name="name"
          />
        </Form.Group>,
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
        </Form.Group>,
      ],
    ],
    [
      [
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
        </Form.Group>,
      ],
      [],
    ],
    [
      [
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
        </Form.Group>,
      ],
    ],
  ];

  const contactFormHead = {
    formTitle: "Contact Us!",
    formDescriptions: [
      "We are a group of neighbors and volunteers who organize as the Iglesias Gardens, fighting to preserve and protect community land and green spaces. This year, our work has been focused on exposing and stopping the City's predatory Sheriff's Sales. The US Bank Lien properties, which are sold at Sheriff's Sales, are a tool of gentrification. Reach out and help us protect this land.",
    ],
  };

  const formInfo = {
    formHead: contactFormHead,
    formFields: contactFormRows,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setSuccess(await SubmitToSheet(Object.values(formState)));
  };

  const renderFormHead = (formHead) => {
    const { formTitle, formDescriptions } = formHead;

    const formDescriptionParagraphs = formDescriptions.map(
      (formDescription, i) => {
        return <p key={`formDescP ${i}`}>{formDescription}</p>;
      }
    );

    return (
      <>
        <h4>{formTitle}</h4>
        {formDescriptionParagraphs}
      </>
    );
  };

  const { formHead, formFields } = formInfo;

  const renderFormColumn = (formColJSXArray) => {
    const formColumns = formColJSXArray.map((formColJSX, i) => {
      return <Col key={`formCol${i}`}>{formColJSX}</Col>;
    });

    return formColumns;
  };

  const renderFormRow = (formRowsArray) => {
    const formRows = formRowsArray.map((formRow, i) => {
      return <Row key={`formRow ${i}`}>{renderFormColumn(formRow)}</Row>;
    });

    return formRows;
  };

  const renderFormButton = () => {
    return (
      <Form>
        <Col>
          <Button variant="dark" type="submit" onClick={submitHandler}>
            Submit
          </Button>
          <p>{submitted && success ? "Success" : ""}</p>
        </Col>
        <Col />
      </Form>
    );
  };

  const renderFormRows = (formRowsArray) => {
    const formRows = formRowsArray.map((formRow) => {
      return renderFormRow(formRow);
    });

    return formRows;
  };

  return (
    <Container style={styles.contactUsContainer}>
      {renderFormHead(formHead)}
      <Form>
        {renderFormRows(formFields)}
        {renderFormButton()}
      </Form>
    </Container>
  );
};

export default ContactUs;
