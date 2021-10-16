import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import ContactUs from "./ContactUs";
import { constructDataSections } from "../helpers";
import * as styles from "../styles";

const Property = (props) => {
  const { propertyObject } = props;
  const { propertyAddress } = propertyObject;

  const dataSections = constructDataSections(propertyObject);

  const renderBoldType = (text) => {
    return <span style={styles.boldType}>{text}:</span>;
  };

  const renderDataColumnRow = (title, value) => {
    return (
      <p>
        {renderBoldType(title)} {value}
      </p>
    );
  };

  const renderDataColumn = (dataColumnObject, key) => {
    const [title, value] = dataColumnObject;

    return (
      <Col key={`dataColumn ${key}`}>{renderDataColumnRow(title, value)}</Col>
    );
  };

  const renderDataRow = (dataRowKeyValues, key) => {
    const dataColumns = dataRowKeyValues.map((dataRow, i) => {
      return renderDataColumn(dataRow, i);
    });

    return <Row key={`dataRow ${key}`}>{dataColumns}</Row>;
  };

  const renderDataSection = (title, dataSection) => {
    const dataRows = dataSection.map((dataColumns, i) => {
      return renderDataRow(dataColumns, i);
    });

    return (
      <Container style={styles.containerStyle}>
        <h5>{title}</h5>
        {dataRows}
      </Container>
    );
  };

  const renderDataSections = (dataSections) => {
    const titleMap = ["Property Information", "Bank Lien Information"];

    return dataSections.map((dataSection, i) => {
      return (
        <Row style={styles.rowStyle}>
          {renderDataSection(titleMap[i], dataSection)}
        </Row>
      );
    });
  };

  const renderSoldAlert = () => {
    const { wasSold } = props;

    let soldJSX = null;

    if (wasSold) {
      soldJSX = (
        <Alert variant="danger">
          <Alert.Heading>This Property Was Sold.</Alert.Heading>
          <p>
            It may be too late to save your lot. This property was one of
            thousands controlled by an out of state bank.
            <span style={styles.boldType}> It has recently been sold.</span> It
            may not be too late - if you'd like to learn more about this
            property, please complete this form. All information will be kept
            confidential. Please tell us the story of your lot. A representative
            of the Iglesias Gardens community will be in touch!
          </p>
        </Alert>
      );
    }

    return soldJSX;
  };

  return (
    <Container
      className="SearchFormContainer"
      style={styles.searchFormContainer}
    >
      <h2>{propertyAddress}</h2>
      {renderSoldAlert()}
      {renderDataSections(dataSections)}
      <Row style={styles.rowStyle}>
        <ContactUs propertyObject={propertyObject} />
      </Row>
    </Container>
  );
};

export default Property;
