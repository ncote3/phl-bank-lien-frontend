import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import SubmitToSheet from "../../../utils/SubmitToSheet";
import GetDate from "../../../utils/GetDate";
import * as styles from "../styles";

const ContactUs = (props: any) => {
  const { propertyObject } = props;
  const { propertyAddress, zip5, legalName, wasSold } = propertyObject;

  const defaultFormState = {
    name: "",
    organization: "",
    email: "",
    propertyShare: "",
    ownerLegalName: legalName,
    zipCode: zip5,
    propertyAddress: propertyAddress,
    phone: "",
    wasSold,
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(true);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { name, value } = target;

    setSubmitted(false);
    setFormState({ ...formState, [name]: value });
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
          <Form.Text className="text-muted">Not Required</Form.Text>
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
        </Form.Group>,
        <Form.Group controlId="formEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="215-123-4567"
            onChange={changeHandler}
            name="phone"
          />
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
          <Form.Text className="text-muted">Not Required</Form.Text>
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

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmitted(true);

    const dataToSubmit = {
      ...formState,
      submissionTime: GetDate(),
    };

    const success: Promise<boolean> = SubmitToSheet(
      Object.values(dataToSubmit)
    );

    setSuccess(success as unknown as boolean);
  };

  const renderFormHead = (formHead: any) => {
    const { formTitle, formDescriptions } = formHead;

    const formDescriptionParagraphs = formDescriptions.map(
      (formDescription: string, i: number) => {
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

  const renderFormColumn = (formColJSXArray: any) => {
    const formColumns = formColJSXArray.map((formColJSX: any, i: number) => {
      return <Col key={`formCol${i}`}>{formColJSX}</Col>;
    });

    return formColumns;
  };

  const renderFormRow = (formRowsArray: any) => {
    const formRows = formRowsArray.map((formRow: any, i: number) => {
      return <Row key={`formRow ${i}`}>{renderFormColumn(formRow)}</Row>;
    });

    return formRows;
  };

  const renderFormButton = () => {
    return (
      <>
        <Col>
          <Button variant="dark" type="submit" onClick={submitHandler}>
            Submit
          </Button>
          <p>{submitted && success ? "Success" : ""}</p>
        </Col>
        <Col />
      </>
    );
  };

  const renderFormRows = (formRowsArray: any) => {
    const formRows = formRowsArray.map((formRow: any) => {
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
