import React from "react";
import { makeUseAxios } from "axios-hooks";
import axios from "axios";

import Loading from "../Common/Loading";
import Error from "../Common/Error";
import Property from "./Subcomponents/Property";

const useAxios = makeUseAxios({
  axios: axios.create({
    baseURL: "https://phl-bank-lien-backend.herokuapp.com/",
  }),
});

const PropertyDisplay = (props: any) => {
  const { propertyToDisplayObject } = props;
  const [currentProperty] = propertyToDisplayObject;
  const { accountId } = currentProperty;

  const [dataRes] = useAxios(
    `/api/accountIdGetsPropertyInformationCombined/${accountId}`
  );

  const { loading, error, data } = dataRes;

  const renderContent = () => {
    const { totalRecords = 0, records } = data;

    let content = <p>Oopsie Poopsie!</p>;

    if (totalRecords === 1) {
      const [firstRecordKeyEntry] = Object.keys(records);
      const currentPropertyObject = records[firstRecordKeyEntry];

      content = <Property propertyObject={currentPropertyObject} />;
    } else if (totalRecords > 1) {
      content = <p>More than one record</p>;
    }

    return content;
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error />;
  } else {
    return renderContent();
  }
};

export default PropertyDisplay;
