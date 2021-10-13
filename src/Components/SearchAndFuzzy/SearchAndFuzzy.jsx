import React, { useState } from "react";
import { makeUseAxios } from "axios-hooks";
import axios from "axios";

import Button from "react-bootstrap/Button";

import fuzzyMatchProperties from "../../utils/FuzzyMatchers";

import Loading from "../Common/Loading";
import Error from "../Common/Error";
import Search from "./Subcomponents/Search";
import PropertyList from "./Subcomponents/PropertyList";

const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: "https://phl-bank-lien-backend.herokuapp.com/",
  }),
});

const SearchAndDisplay = (props) => {
  const [dataRes] = useAxios("/api/getAddresses");

  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [stringMatches, setStringMatches] = useState([]);
  const [propertyToDisplay, setPropertyToDisplay] = useState("");
  const [showFuzzyMatches, setShowFuzzyMatches] = useState(false);

  const handlePropertySelection = (propertyToDisplay) => {
    const { updatePropertyToDisplay } = props;

    const propertyToDisplayObject = dataRes.data.filter(
      (property) => property.propertyAddress === propertyToDisplay
    );

    setPropertyToDisplay(propertyToDisplay);
    setShowFuzzyMatches(false);
    updatePropertyToDisplay(propertyToDisplayObject);
  };

  const handleShowFuzzyMatches = (e) => {
    e.preventDefault();

    setShowFuzzyMatches(!showFuzzyMatches);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data_keys = dataRes.data.map((property) => property.propertyAddress);
    const matches = fuzzyMatchProperties(inputValue, data_keys, 5);
    setStringMatches(matches);
    setShowResults(true);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const renderSearchWithFuzzyMatches = () => {
    return (
      <>
        <Search
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          propertyAddresses={Object.keys(dataRes.data)}
          cyclePlaceholder={false}
          placeholder={inputValue}
        />
        <PropertyList
          stringMatches={stringMatches}
          setPropertyToDisplay={handlePropertySelection}
        />
      </>
    );
  };

  const renderSearchWithFuzzyMatchesCollapsable = () => {
    let showText = "Hide";
    let fuzzyMatchJSX = (
      <PropertyList
        stringMatches={stringMatches}
        setPropertyToDisplay={handlePropertySelection}
      />
    );
    if (!showFuzzyMatches) {
      fuzzyMatchJSX = null;
      showText = "Show";
    }

    return (
      <>
        <Search
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          propertyAddresses={dataRes.data}
          cyclePlaceholder={false}
        />
        <Button
          onClick={handleShowFuzzyMatches}
          variant="dark"
          style={{ marginTop: "1vw" }}
        >
          {showText} Fuzzy Matches
        </Button>
        {fuzzyMatchJSX}
      </>
    );
  };

  if (dataRes.loading) {
    return <Loading />;
  } else if (dataRes.error) {
    return <Error />;
  } else {
    if (!showResults) {
      return (
        <Search
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          propertyAddresses={dataRes.data}
          cyclePlaceholder={true}
        />
      );
    } else {
      if (!propertyToDisplay) {
        return renderSearchWithFuzzyMatches();
      } else {
        if (showFuzzyMatches) {
          return renderSearchWithFuzzyMatchesCollapsable(false);
        } else {
          return renderSearchWithFuzzyMatchesCollapsable(true);
        }
      }
    }
  }
};

export default SearchAndDisplay;
