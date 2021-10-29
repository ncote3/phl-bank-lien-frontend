import React, { useState, CSSProperties } from "react";
import { Container } from "react-bootstrap";
import PropertyDisplay from "../PropertyDisplay/PropertyDisplay";

import SearchAndDisplay from "../SearchAndFuzzy/SearchAndFuzzy";

const jumbotronStyles: CSSProperties = {
  marginTop: "5vw",
  textAlign: "left",
  padding: "2rem 1rem",
  marginBottom: "2rem",
  backgroundColor: "#e9ecef",
  borderRadius: ".3rem",
};

const Home = () => {
  const [propertyToDisplay, updatePropertyToDisplay] = useState(null);

  const updatePropertyStateHandler = (propertyData: any) => {
    updatePropertyToDisplay(propertyData);
  };

  const renderPropertyDisplay = () => {
    let propertyDisplay = null;

    if (propertyToDisplay) {
      propertyDisplay = (
        <PropertyDisplay propertyToDisplayObject={propertyToDisplay} />
      );
    }

    return propertyDisplay;
  };

  return (
    <Container>
      <div style={jumbotronStyles}>
        <h1>Is My Vacant Lot Controlled by the US Bank Liens?</h1>
        <SearchAndDisplay
          updatePropertyToDisplay={updatePropertyStateHandler}
        />
      </div>
      {renderPropertyDisplay()}
    </Container>
  );
};

export default Home;
