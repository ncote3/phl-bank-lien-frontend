import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ContactUs from "./ContactUs";

const Property = (props) => {
  const { propertyObject } = props;
  const { propertyAddress } = propertyObject;

  const containerStyle = {
    border: "1px solid black",
    padding: "1vw",
    borderRadius: ".5%",
  };

  const rowStyle = { paddingBottom: "1vw" };

  const renderBankLienInformation = () => {
    const {
      calcInt,
      calcOther,
      calcPen,
      calcPrincipal,
      calcTotal,
      caseStatus,
      collAgCalcTotal,
      collAgCount,
      collAgMin,
      colAgMx,
      collAgPrincipal,
      countOfYears,
      currentAssessmentYear,
      lienBalance,
      maxPeriod,
      minPeriod,
      netTaxValueafterHmstd,
      payAgreement,
      returnMail,
      totalAssessment,
      totalTaxable,
    } = propertyObject;

    return (
      <Container style={containerStyle}>
        <h5>Bank Lien Information</h5>
        <Row>
          <Col>
            <p>
              <span style={{ fontWeight: 500 }}>collAgCalcTotal:</span>{" "}
              {collAgCalcTotal}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>collAgCount:</span>{" "}
              {collAgCount}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>collAgMin:</span> {collAgMin}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>calcPrincipal:</span>{" "}
              {calcPrincipal}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>calcTotal:</span> {calcTotal}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>caseStatus:</span> {caseStatus}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>calcInt:</span> {calcInt}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>calcOther:</span> {calcOther}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>calcPen:</span> {calcPen}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>totalTaxable:</span>{" "}
              {totalTaxable}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>totalAssessment:</span>{" "}
              {totalAssessment}
            </p>
          </Col>
          <Col>
            <p>
              <span style={{ fontWeight: 500 }}>colAgMx:</span> {colAgMx}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>collAgPrincipal:</span>{" "}
              {collAgPrincipal}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>countOfYears:</span>{" "}
              {countOfYears}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>currentAssessmentYear:</span>{" "}
              {currentAssessmentYear}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>lienBalance:</span>{" "}
              {lienBalance}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>maxPeriod:</span> {maxPeriod}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>minPeriod:</span> {minPeriod}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>netTaxValueafterHmstd:</span>{" "}
              {netTaxValueafterHmstd}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>payAgreement:</span>{" "}
              {payAgreement}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>returnMail:</span> {returnMail}
            </p>
          </Col>
        </Row>
      </Container>
    );
  };

  const renderPropertyInformation = () => {
    const { zip5, city, legalName, councilDistrict } = propertyObject;
    return (
      <Container style={containerStyle}>
        <h5>Property Information</h5>
        <Row>
          <Col>
            <p>
              <span style={{ fontWeight: 500 }}>Property Address:</span>{" "}
              {propertyAddress}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>City:</span> {city}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>Zip Code:</span> {zip5}
            </p>
          </Col>
          <Col>
            <p>
              <span style={{ fontWeight: 500 }}>Owner Legal Name:</span>{" "}
              {legalName}
            </p>
            <p>
              <span style={{ fontWeight: 500 }}>Council District:</span>{" "}
              {councilDistrict}
            </p>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Container className="SearchFormContainer" style={{ padding: "2vw" }}>
      <h1>{propertyAddress}</h1>
      <Row style={rowStyle}>{renderPropertyInformation()}</Row>
      <Row style={rowStyle}>{renderBankLienInformation()}</Row>
      <Row style={rowStyle}>
        <ContactUs propertyObject={propertyObject} />
      </Row>
    </Container>
  );
};

export default Property;
