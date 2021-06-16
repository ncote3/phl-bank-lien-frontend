import React, { useState } from "react";
import { makeUseAxios } from "axios-hooks";
import axios from "axios";

import fuzzyMatchProperties from "../../utils/FuzzyMatchers";

import Loading from "../Common/Loading";
import Error from "../Common/Error";
import Search from "./Subcomponents/Search";
import PropertyList from "./Subcomponents/PropertyList";
import PropertyDisplay from "../PropertyDisplay/PropertyDisplay";

const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: "https://phl-bank-lien-backend.herokuapp.com/",
  }),
});

const SearchAndDisplay = () => {
  // eslint-disable-next-line no-unused-vars
  const [dataRes, refetch] = useAxios("/api/getAddresses");

  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [stringMatches, setStringMatches] = useState([]);
  const [propertyToDisplay, setPropertyToDisplay] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data_keys = dataRes.data.map((property) => property.propertyAddress);
    const matches = fuzzyMatchProperties(inputValue, data_keys, 10);
    setStringMatches(matches);
    setShowResults(true);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
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
              setPropertyToDisplay={setPropertyToDisplay}
            />
          </>
        );
      } else {
        const propertyToDisplayObject = dataRes.data.filter(
          (property) => property.propertyAddress === propertyToDisplay
        );

        if (propertyToDisplayObject) {
          return (
            <>
              <PropertyDisplay
                propertyToDisplayObject={propertyToDisplayObject}
              />
            </>
          );
        } else {
          return <>I cry everytime :_(</>;
        }
      }
    }
  }
};

export default SearchAndDisplay;
