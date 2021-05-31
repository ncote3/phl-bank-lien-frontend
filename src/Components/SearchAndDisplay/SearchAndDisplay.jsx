import React, { useState } from "react";
import { makeUseAxios } from "axios-hooks";
import axios from "axios";

import fuzzyMatchProperties from "../../utils/FuzzyMatchers";

import Loading from "./Subcomponents/Loading";
import Error from "./Subcomponents/Error";
import Search from "./Subcomponents/Search";
import PropertyList from "./Subcomponents/PropertyList";

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
    if (showResults) {
      return (
        <Search
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          propertyAddresses={Object.keys(dataRes.data)}
          cyclePlaceholder={true}
        />
      );
    } else {
      return (
        <>
          <Search
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            propertyAddresses={Object.keys(dataRes.data)}
            cyclePlaceholder={false}
            placeholder={inputValue}
          />
          <PropertyList stringMatches={stringMatches} />
        </>
      );
    }
  }
};

export default SearchAndDisplay;
