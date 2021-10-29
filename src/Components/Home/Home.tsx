import React, { useState, CSSProperties } from "react";
import { Container } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import PropertyDisplay from "../PropertyDisplay/PropertyDisplay";

import SearchAndDisplay from "../SearchAndFuzzy/SearchAndFuzzy";

const jumbotronStyles: CSSProperties = {
  marginTop: "5vw",
  textAlign: "left",
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
      <Jumbotron style={jumbotronStyles}>
        <h1>Is My Vacant Lot Controlled by the US Bank Liens?</h1>
        <SearchAndDisplay
          updatePropertyToDisplay={updatePropertyStateHandler}
        />
      </Jumbotron>
      {renderPropertyDisplay()}
    </Container>
  );
};

export default Home;
